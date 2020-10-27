from uuid import uuid4

from django.contrib.auth.models import AbstractUser
from django.db import models


class FableousUser(AbstractUser):
    pass


class Story(models.Model):
    owner = models.ForeignKey(FableousUser, models.CASCADE)
    title = models.CharField(max_length=100)
    created_date = models.DateTimeField(auto_now_add=True)


def upload_to_path(instance, filename):
    return f'story/{instance.story.id}/{uuid4()}.{filename.split(".")[-1]}'


class StoryPage(models.Model):
    story = models.ForeignKey(Story, models.CASCADE)
    page = models.IntegerField()
    image = models.ImageField(upload_to=upload_to_path)


class StoryTag(models.Model):
    story = models.ForeignKey(Story, models.CASCADE)
    name = models.CharField(max_length=30)
