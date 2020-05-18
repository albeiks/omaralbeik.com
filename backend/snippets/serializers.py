import urllib.parse
from django.conf import settings
from rest_framework import serializers
from snippets import models
from files.serializers import ImageSerializer


class ProgrammingLanguageSerializer(serializers.ModelSerializer):
    kind = serializers.SerializerMethodField()

    class Meta:
        model = models.ProgrammingLanguage
        icon = serializers.SerializerMethodField()
        fields = [
            "kind",
            "id",
            "name",
            "slug",
            "icon",
        ]

    def get_kind(self, language):
        return "language"

    def get_icon(self, language):
        if not language.icon:
            return None
        serializer = ImageSerializer(language.icon)
        return serializer.data


class SnippetSummarySerializer(serializers.ModelSerializer):
    kind = serializers.SerializerMethodField()
    language = serializers.SerializerMethodField()

    class Meta:
        model = models.Snippet
        fields = [
            "kind",
            "id",
            "name",
            "slug",
            "language",
            "summary",
            "date_published",
        ]

    def get_kind(self, snippet):
        return "snippet"

    def get_language(self, snippet):
        serializer = ProgrammingLanguageSerializer(snippet.language)
        return serializer.data


class SnippetSerializer(serializers.ModelSerializer):
    kind = serializers.SerializerMethodField()
    language = serializers.SerializerMethodField()
    meta = serializers.SerializerMethodField()

    class Meta:
        model = models.Snippet
        fields = [
            "kind",
            "id",
            "name",
            "slug",
            "summary",
            "text",
            "date_published",
            "language",
            "meta",
        ]

    def get_kind(self, snippet):
        return "snippet"

    def get_language(self, snippet):
        serializer = ProgrammingLanguageSerializer(snippet.language)
        return serializer.data

    def get_html_title(self, snippet):
        name = settings.CLIENT_CANONICAL_NAME
        return "{} | {}".format(snippet.name, name) if name else snippet.name

    def get_canonical(self, snippet):
        base = urllib.parse.urljoin(settings.CLIENT_CANONICAL_URL, "snippets/")
        path = "?id={}".format(snippet.slug)
        return urllib.parse.urljoin(base, path)

    def get_meta(self, snippet):
        return {
            "title": snippet.name,
            "html_title": self.get_html_title(snippet),
            "description": snippet.summary,
            "keywords": snippet.language.name,
            "canonical": self.get_canonical(snippet),
        }
