from django.urls import path

from fableous.views import ping

urlpatterns = [
    path('ping', ping),
]
