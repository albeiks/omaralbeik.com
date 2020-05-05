import urllib.parse
from django.conf import settings
from rest_framework import serializers
from files import models

class ImageSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = models.Image
        fields = ["url", "alt"]

    def get_url(self, image):
        return urllib.parse.urljoin(settings.CLIENT_URL, image.image.url)

class FileSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()

    class Meta:
        model = models.File
        fields = ["url", "name"]

    def get_url(self, file):
        return urllib.parse.urljoin(settings.CLIENT_URL, file.file.url)
