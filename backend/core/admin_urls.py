from django.urls import path
from django.conf.urls import url, include
from django.contrib import admin

# List or url patterns for the admin subdomain
urlpatterns = [
    path("martor/", include("martor.urls")),
    url(r"", admin.site.urls),
]
