import urllib.parse
from django.conf import settings
from rest_framework import serializers
from contents import models
from tags.serializers import TagSerializer
from files.serializers import ImageSerializer


class ContentSerializer(serializers.ModelSerializer):
    kind = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()
    tags = serializers.SerializerMethodField()
    meta = serializers.SerializerMethodField()

    class Meta:
        model = models.Content
        fields = [
            "kind",
            "id",
            "name",
            "slug",
            "title",
            "image",
            "summary",
            "text",
            "dynamic_page",
            "tags",
            "meta",
        ]

    def get_kind(self, content):
        return "content"

    def get_image(self, content):
        if not content.image:
            return None
        serializer = ImageSerializer(content.image)
        return serializer.data

    def get_tags(self, project):
        serializer = TagSerializer(project.tags, many=True)
        return serializer.data

    def get_html_title(self, content):
        name = settings.CLIENT_CANONICAL_NAME
        content_name = content.name.capitalize()
        return "{} | {}".format(content_name, name) if name else content_name

    def get_keywords(self, content):
        return ", ".join([tag.name for tag in content.tags.all()])

    def get_canonical(self, content):
        path = "" if content.slug in ["index", "home"] else content.slug
        return urllib.parse.urljoin(settings.CLIENT_CANONICAL_URL, path)

    def get_meta(self, content):
        return {
            "title": content.title,
            "html_title": self.get_html_title(content),
            "description": content.summary,
            "keywords": self.get_keywords(content),
            "canonical": self.get_canonical(content),
        }
