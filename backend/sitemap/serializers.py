import urllib.parse
from django.conf import settings
from rest_framework import serializers

from blog.models import Post
from snippets.models import Snippet
from contents.models import Content

class PostSerializer(serializers.HyperlinkedModelSerializer):
    loc = serializers.SerializerMethodField()
    priority = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ["loc", "priority"]

    def get_loc(self, post):
        base = urllib.parse.urljoin(settings.CLIENT_CANONICAL_URL, "blog/")
        return urllib.parse.urljoin(base, post.slug)

    def get_priority(self, post):
        return "0.90"


class SnippetSerializer(serializers.HyperlinkedModelSerializer):
    loc = serializers.SerializerMethodField()
    priority = serializers.SerializerMethodField()

    class Meta:
        model = Snippet
        fields = ["loc", "priority"]

    def get_loc(self, snippet):
        base = urllib.parse.urljoin(settings.CLIENT_CANONICAL_URL, "snippets/")
        return urllib.parse.urljoin(base, snippet.slug)

    def get_priority(self, snippet):
        return "0.90"


class ContentSerializer(serializers.HyperlinkedModelSerializer):
    loc = serializers.SerializerMethodField()
    priority = serializers.SerializerMethodField()

    class Meta:
        model = Content
        fields = ["loc", "priority"]

    def get_loc(self, content):
        path = "" if content.slug in ["index", "home"] else content.slug
        return urllib.parse.urljoin(settings.CLIENT_CANONICAL_URL, path)

    def get_priority(self, content):
        return "1.00"