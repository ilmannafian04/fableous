import json
import random
import string
from base64 import b64decode

from django.core.files.uploadedfile import SimpleUploadedFile
from django.http import HttpResponse, JsonResponse
from django_redis import get_redis_connection
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from fableous.models import FableousUser, Story, StoryPage


def ping(request):
    return HttpResponse('pong')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_drawing_session(request):
    room_code = ''.join(random.choice(string.ascii_uppercase) for _ in range(5))
    r = get_redis_connection()
    story = Story(owner=request.user, title='Crabbing in the disco')
    story.save()
    story_state = {'state': 0,
                   'players': [],
                   'role': {'0': [], '1': [], '2': [], '3': [], '4': []},
                   'page': [],
                   'current_page': 1,
                   'page_count': 2,
                   'story_id': story.id}
    r.set(room_code, json.dumps(story_state, separators=(',', ':')))
    return JsonResponse({'roomCode': room_code})


@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    if 'username' in request.POST and 'password' in request.POST and 'email' in request.POST:
        user = FableousUser.objects.create_user(request.POST['username'],
                                                request.POST['email'],
                                                request.POST['password'])
        user.save()
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_story_page(request):
    print(request.FILES)
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([AllowAny])
def upload_story_page(request):
    if 'story' in request.POST and 'page' in request.POST:
        if 'image' in request.POST:
            # modified from https://dev.to/ageumatheus/creating-image-from-dataurl-base64-with-pyhton-django-454g
            mime, _dataurl = request.POST['image'].split(';base64,')
            _extension = mime.split('/')[-1]
            file = SimpleUploadedFile(f'file.{_extension}', b64decode(_dataurl), mime)

        elif 'image' in request.FILES:
            file = request.FILES['image']
        else:
            return Response('Missing value(s)', status.HTTP_400_BAD_REQUEST)
        try:
            story = Story.objects.get(id=request.POST['story'])
        except Story.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        page = StoryPage(story=story, page=request.POST['page'], image=file)
        page.save()
        return Response({'status': 'OK'})
    else:
        return Response('Missing value(s)', status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def gallery(request):
    if 'id' in request.GET:
        try:
            story = Story.objects.get(id=request.GET['id'])
        except Story.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        result = {'pages': []}
        pages = StoryPage.objects.filter(story=story)
        for page in pages:
            result['pages'].append({'page': page.page,
                                    'url': page.image.url})
        return Response(result)
    else:
        stories = Story.objects.filter(owner=request.user)
        result = []
        for story in stories:
            try:
                thumbnail = StoryPage.objects.get(story=story, page=1)
                result.append({'id': story.id,
                               'title': story.title,
                               'thumbnail': thumbnail.image.url})
            except StoryPage.DoesNotExist:
                result.append({'id': story.id,
                               'title': story.title})
        return Response(result)
