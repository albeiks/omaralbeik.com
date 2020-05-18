import urllib.parse
from django.conf import settings
from rest_framework import serializers
from files import models

class ImageSerializer(serializers.ModelSerializer):
    kind = serializers.SerializerMethodField()
    url = serializers.SerializerMethodField()

    class Meta:
        model = models.Image
        fields = ["kind", "url", "alt"]

    def get_kind(self, image):
        return "image"

    def get_url(self, image):
        return urllib.parse.urljoin(settings.CLIENT_CANONICAL_URL, image.image.url)

class FileSerializer(serializers.ModelSerializer):
    kind = serializers.SerializerMethodField()
    url = serializers.SerializerMethodField()

    class Meta:
        model = models.File
        fields = ["kind", "url", "name"]

    def get_kind(self, file):
        return "file"

    def get_url(self, file):
        return urllib.parse.urljoin(settings.CLIENT_CANONICAL_URL, file.file.url)
