from django.urls import path

from fableous import views

urlpatterns = [
    path('ping', views.ping),
    path('createsession', views.create_drawing_session),
    path('signup', views.signup),
    path('story/uploadpage', views.upload_story_page),
    path('gallery', views.gallery),
]
