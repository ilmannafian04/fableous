import json
import random
import string

from django.http import HttpResponse, JsonResponse
from django_redis import get_redis_connection
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from fableous.models import FableousUser


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


@api_view(['POST'])
@permission_classes([AllowAny,])
def signup(request):
    if 'username' in request.POST and 'password' in request.POST and 'email' in request.POST:
        user = FableousUser.objects.create_user(request.POST['username'],
                                                request.POST['email'],
                                                request.POST['password'])
        user.save()
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)
