import json

from channels.generic.websocket import AsyncWebsocketConsumer


class DrawingConsumer(AsyncWebsocketConsumer):
    # noinspection PyAttributeOutsideInit
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room']
        self.room_group_name = f'drawing_{self.room_name}'
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data=None, bytes_data=None):
        message = json.loads(text_data)
        await self.channel_layer.group_send(
            self.room_group_name, {
                'type': 'drawing',
                'message': message
            }
        )

    async def drawing(self, event):
        message = event['message']
        await self.send(text_data=json.dumps(message))
