from django.urls import path

from fableous import consumer

websocket_urlpatterns = [
    path('ws/drawing/<room>/', consumer.DrawingConsumer)
]
