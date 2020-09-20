import asyncio
import random
import string

from channels.generic.websocket import AsyncJsonWebsocketConsumer
from django_redis import get_redis_connection


class DrawingConsumer(AsyncJsonWebsocketConsumer):
    # noinspection PyAttributeOutsideInit
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room']
        self.room_group_name = f'drawing_{self.room_name}'
        self.keys = {'name': f'{self.room_name}.{self.channel_name}.name',
                     'role': f'{self.room_name}.{self.channel_name}.role',
                     'isReady': f'{self.room_name}.{self.channel_name}.isReady'}
        r = get_redis_connection()
        raw_state = r.get(f'{self.room_name}.state').decode('utf-8')
        if raw_state is not None:
            state = int(raw_state)
            if state == 0:
                r.sadd(f'{self.room_name}.players', self.channel_name)
                r.set(self.keys['name'], f'Fableous #{"".join(random.choice(string.digits) for _ in range(4))}')
                r.set(self.keys['role'], 0)
                r.set(self.keys['isReady'], str(False))
                await self.channel_layer.group_add(self.room_group_name, self.channel_name)
                await self.accept()
                await self.channel_layer.group_send(self.room_group_name, {'type': 'draw.lobby_state'})
            else:
                await self.close()
        else:
            await self.close()

    async def disconnect(self, close_code):
        r = get_redis_connection()
        r.srem(f'{self.room_name}.role.{int(r.get(self.keys["role"]))}', self.channel_name)
        for key in self.keys.keys():
            r.delete(self.keys[key])
        players_key = f'{self.room_name}.players'
        r.srem(players_key, self.channel_name)
        if r.scard(players_key) == 0:
            r.delete(players_key)
            r.delete(f'{self.room_name}.state')
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive_json(self, content, **kwargs):
        content['sender_channel_name'] = self.channel_name
        if content['command'] == 'draw.lobby.name':
            await self.change_name(content['name'])
        elif content['command'] == 'draw.lobby.role':
            await self.change_role(content['role'])
        elif content['command'] == 'draw.lobby.isReady':
            await self.change_is_ready(content['isReady'])
        elif content['command'] == 'draw.story.stroke':
            await self.new_stroke(content['data'])

    async def change_name(self, name):
        r = get_redis_connection()
        r.set(self.keys['name'], name)
        await self.validate_state()

    async def change_role(self, role):
        r = get_redis_connection()
        r.srem(f'{self.room_name}.role.{int(r.get(self.keys["role"]))}', self.channel_name)
        r.set(self.keys['role'], role)
        r.sadd(f'{self.room_name}.role.{role}', self.channel_name)
        await self.validate_state()

    async def change_is_ready(self, is_ready):
        r = get_redis_connection()
        r.set(self.keys['isReady'], str(is_ready))
        await self.validate_state()

    async def new_stroke(self, data):
        # TODO: persist the stroke data
        r = get_redis_connection()
        await self.channel_layer.group_send(self.room_group_name, {
            'type': 'draw.new_stroke',
            'data': data,
            'layer': int(r.get(f'{self.room_name}.{self.channel_name}.role').decode('utf-8'))
        })

    async def validate_state(self):
        r = get_redis_connection()
        current_state = int(r.get(f'{self.room_name}.state'))
        players = r.smembers(f'{self.room_name}.players')
        if current_state == 0:
            advance_state = True
            for role in [1, 2, 3, 4]:
                if r.scard(f'{self.room_name}.role.{role}') == 0:
                    advance_state = False
            if advance_state:
                for player in players:
                    player = player.decode('utf-8')
                    if r.get(f'{self.room_name}.{player}.isReady') == b'False':
                        advance_state = False
            if not advance_state:
                await self.channel_layer.group_send(self.room_group_name, {'type': 'draw.lobby_state'})
            else:
                r.set(f'{self.room_name}.state', 1)
                asyncio.create_task(self.story_loop())
                await self.channel_layer.group_send(self.room_group_name, {'type': 'draw.change_state'})

    async def story_loop(self):
        for time_left in range(3 * 60, -1, -1):
            await self.channel_layer.group_send(self.room_group_name, {'type': 'draw.draw_state',
                                                                       'time_left': time_left})
            await asyncio.sleep(1.0)

    async def draw_change_state(self, _):
        r = get_redis_connection()
        await self.send_json(content={'state': int(r.get(f'{self.room_name}.state').decode('utf-8'))})

    async def draw_lobby_state(self, _):
        r = get_redis_connection()
        players_channel_name = r.smembers(f'{self.room_name}.players')
        players = []
        current_player = None
        for channel_name in players_channel_name:
            channel_name = channel_name.decode('utf-8')
            key_prefix = f'{self.room_name}.{channel_name}'
            if channel_name == self.channel_name:
                current_player = {'name': r.get(self.keys['name']).decode('utf-8'),
                                  'role': int(r.get(self.keys['role']).decode('utf-8')),
                                  'isReady': r.get(self.keys['isReady']).decode('utf-8') == 'True'}
                players.append(current_player)
            else:
                players.append({'name': r.get(f'{key_prefix}.name').decode('utf-8'),
                                'role': int(r.get(f'{key_prefix}.role').decode('utf-8')),
                                'isReady': r.get(f'{key_prefix}.isReady').decode('utf-8') == 'True'})
        await self.send_json(content={'players': players,
                                      'state': int(r.get(f'{self.room_name}.state').decode('utf-8')),
                                      'self': current_player})

    async def draw_draw_state(self, event):
        await self.send_json({'type': 'state',
                              'data': {'timeLeft': event['time_left']}})

    async def draw_new_stroke(self, event):
        r = get_redis_connection()
        if int(r.get(f'{self.room_name}.{self.channel_name}.role').decode('utf-8')) == 4:
            await self.send_json(content={'type': 'draw',
                                          'data': {'strokes': event['data'],
                                                   'layer': event['layer']}})
