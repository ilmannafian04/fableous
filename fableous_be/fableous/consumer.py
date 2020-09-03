from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer


class DrawingConsumer(JsonWebsocketConsumer):
    # noinspection PyAttributeOutsideInit
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room']
        self.room_group_name = f'drawing_{self.room_name}'
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive_json(self, content, **kwargs):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name, {
                'type': 'drawing',
                'message': content
            }
        )

    def drawing(self, event):
        message = event['message']
        self.send_json(content=message)
