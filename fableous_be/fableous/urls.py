from django.urls import path

from fableous import views

urlpatterns = [
    path('ping', views.ping),
    path('createsession', views.create_drawing_session)
]
