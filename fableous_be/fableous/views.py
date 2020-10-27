import random
import string

from django.http import HttpResponse, JsonResponse
from django_redis import get_redis_connection


def ping(request):
    return HttpResponse('pong')


def create_drawing_session(request):
    room_code = ''.join(random.choice(string.ascii_uppercase) for _ in range(5))
    r = get_redis_connection()
    r.set(f'{room_code}.state', 0)
    return JsonResponse({'roomCode': room_code})
