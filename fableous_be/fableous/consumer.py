import asyncio
import json
import random
import string

from channels.generic.websocket import AsyncJsonWebsocketConsumer
from django_redis import get_redis_connection


class DrawingConsumer(AsyncJsonWebsocketConsumer):
    # noinspection PyAttributeOutsideInit
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room']
        self.room_group_name = f'drawing_{self.room_name}'
        r = get_redis_connection()
        story_state = await self.get_story_state()
        if story_state is not None:
            if story_state['state'] == 0:
                story_state['players'].append(self.channel_name)
                story_state['role']['0'].append(self.channel_name)
                self_state = {'name': f'Fableous #{"".join(random.choice(string.digits) for _ in range(4))}',
                              'role': 0,
                              'isReady': False}
                r.set(f'{self.room_name}.{self.channel_name}', json.dumps(self_state, separators=(",", ":")))
                r.set(self.room_name, json.dumps(story_state, separators=(",", ":")))
                await self.channel_layer.group_add(self.room_group_name, self.channel_name)
                await self.accept()
                await self.channel_layer.group_send(self.room_group_name, {'type': 'draw.lobby_state'})
            else:
                await self.close()
        else:
            await self.close()

    async def disconnect(self, close_code):
        r = get_redis_connection()
        player_state = await self.get_self_state()
        story_state = await self.get_story_state()
        if story_state is not None:
            if player_state is not None:
                story_state['role'][str(player_state['role'])].remove(self.channel_name)
                r.delete(f'{self.room_name}.{self.channel_name}')
            story_state['players'].remove(self.channel_name)
            if len(story_state['players']) == 0:
                r.delete(self.room_name)
            else:
                await self.save_story_state(story_state)
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive_json(self, content, **kwargs):
        content['sender_channel_name'] = self.channel_name
        if content['command'] == 'draw.lobby.playerState':
            await self.change_player_state(content['key'], content['value'])
        elif content['command'] == 'draw.story.stroke':
            await self.new_stroke(content['data'])

    async def change_player_state(self, key, value):
        player_state = await self.get_self_state()
        if key == 'role':
            story_state = await self.get_story_state()
            story_state['role'][f'{player_state["role"]}'].remove(self.channel_name)
            story_state['role'][f'{value}'].append(self.channel_name)
            await self.save_story_state(story_state)
        player_state[key] = value
        await self.save_self_state(player_state)
        await self.validate_state()

    async def new_stroke(self, data):
        # TODO: persist the stroke data
        player_state = await self.get_self_state()
        await self.channel_layer.group_send(self.room_group_name, {
            'type': 'draw.new_stroke',
            'data': data,
            'layer': player_state['role']
        })

    async def validate_state(self):
        story_state = await self.get_story_state()
        if story_state['state'] == 0:
            advance_state = True
            for role in [1, 2, 3, 4]:
                if len(story_state['role'][f'{role}']) == 0:
                    advance_state = False
            if advance_state:
                for player in story_state['players']:
                    other_player_state = await self.get_json_state(f'{self.room_name}.{player}')
                    if not other_player_state['isReady']:
                        advance_state = False
            if not advance_state:
                await self.channel_layer.group_send(self.room_group_name, {'type': 'draw.lobby_state'})
            else:
                story_state['state'] = 1
                await self.save_json_state(self.room_name, story_state)
                asyncio.create_task(self.story_loop())
                await self.channel_layer.group_send(self.room_group_name, {'type': 'draw.change_state'})

    async def story_loop(self):
        for time_left in range(3 * 60, -1, -1):
            await self.channel_layer.group_send(self.room_group_name, {'type': 'draw.draw_state',
                                                                       'time_left': time_left})
            await asyncio.sleep(1.0)

    async def draw_change_state(self, _):
        story_state = await self.get_story_state()
        await self.send_json(content={'state': story_state['state']})

    async def draw_lobby_state(self, _):
        story_state = await self.get_story_state()
        player_state = await self.get_self_state()
        players = []
        for player_name in story_state['players']:
            players.append(await self.get_json_state(f'{self.room_name}.{player_name}'))
        await self.send_json(content={'players': players,
                                      'state': story_state['state'],
                                      'self': player_state})

    async def draw_draw_state(self, event):
        await self.send_json({'type': 'state',
                              'data': {'timeLeft': event['time_left']}})

    async def draw_new_stroke(self, event):
        player_state = await self.get_self_state()
        if player_state['role'] == 4:
            await self.send_json(content={'type': 'draw',
                                          'data': {'strokes': event['data'],
                                                   'layer': event['layer']}})

    @staticmethod
    async def get_json_state(key):
        r = get_redis_connection()
        raw_state = r.get(key)
        return json.loads(raw_state.decode('utf-8')) if raw_state is not None else None

    async def get_self_state(self):
        return await self.get_json_state(f'{self.room_name}.{self.channel_name}')

    async def get_story_state(self):
        return await self.get_json_state(f'{self.room_name}')

    @staticmethod
    async def save_json_state(key, value):
        r = get_redis_connection()
        r.set(key, json.dumps(value, separators=(",", ":")))

    async def save_self_state(self, value):
        return await self.save_json_state(f'{self.room_name}.{self.channel_name}', value)

    async def save_story_state(self, value):
        return await self.save_json_state(self.room_name, value)
