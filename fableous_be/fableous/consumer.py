import json

from channels.generic.websocket import WebsocketConsumer


class DrawingConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, code):
        pass

    def receive(self, text_data=None, bytes_data=None):
        message = {'ping': 'pong'}
        if text_data is not None:
            message['message'] = json.loads(text_data)['message']
        self.send(json.dumps(message))
