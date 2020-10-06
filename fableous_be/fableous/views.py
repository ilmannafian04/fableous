import json
import random
import string

from django.http import HttpResponse, JsonResponse
from django_redis import get_redis_connection


def ping(request):
    return HttpResponse('pong')


def create_drawing_session(request):
    room_code = ''.join(random.choice(string.ascii_uppercase) for _ in range(5))
    r = get_redis_connection()
    story_state = {'state': 0,
                   'players': [],
                   'role': {'0': [], '1': [], '2': [], '3': [], '4': []},
                   'page': [],
                   'current_page': 1,
                   'page_count': 2}
    r.set(room_code, json.dumps(story_state, separators=(',', ':')))
    return JsonResponse({'roomCode': room_code})
