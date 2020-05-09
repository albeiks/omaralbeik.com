import urllib.parse
from django.conf import settings
from rest_framework import serializers
from projects import models
from tags.serializers import TagSerializer
from files.serializers import ImageSerializer


class ProjectSerializer(serializers.ModelSerializer):
    tags = serializers.SerializerMethodField()
    meta = serializers.SerializerMethodField()
    logo = serializers.SerializerMethodField()

    class Meta:
        model = models.Project
        fields = [
            "id",
            "name",
            "slug",
            "logo",
            "summary",
            "published",
            "date_published",
            "url_name",
            "url",
            "tags",
            "meta",
        ]

    def get_logo(self, project):
        if not project.logo:
            return None
        serializer = ImageSerializer(project.logo)
        return serializer.data

    def get_tags(self, project):
        serializer = TagSerializer(project.tags, many=True)
        return serializer.data

    def get_keywords(self, project):
        return ", ".join([tag.name for tag in project.tags.all()])

    def get_canonical(self, project):
        base = urllib.parse.urljoin(settings.CLIENT_CANONICAL_URL, "projects/")
        return urllib.parse.urljoin(base, project.slug)

    def get_html_title(self, project):
        name = settings.CLIENT_CANONICAL_NAME
        return "{} | {}".format(project.name, name) if name else project.name

    def get_meta(self, project):
        return {
            "title": project.name,
            "html_title": self.get_html_title(project),
            "description": project.summary,
            "keywords": self.get_keywords(project),
            "canonical": self.get_canonical(project),
        }
