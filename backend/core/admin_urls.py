from os import path, environ as env
from django.urls import path
from django.conf.urls import url, include
from django.contrib import admin

# List or url patterns for the admin subdomain
urlpatterns = [
    path("martor/", include("martor.urls")),
    url(r"", admin.site.urls),
]

# Set admin site title
admin.site.site_title = env.get("BE_CLIENT_CANONICAL_NAME", default="Admin")
admin.site.site_header = env.get("BE_CLIENT_CANONICAL_NAME", default="Admin")
admin.site.index_title = env.get("BE_CLIENT_CANONICAL_NAME", default="Admin")
admin.site.site_url = env.get("BE_CLIENT_CANONICAL_URL")