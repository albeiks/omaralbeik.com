import urllib.parse
from django.conf import settings
from rest_framework import serializers

from blog.models import Post
from snippets.models import Snippet
from contents.models import Content

date_format = "%Y-%m-%dT%H:%M:%S+00:00"

class PostSerializer(serializers.HyperlinkedModelSerializer):
    loc = serializers.SerializerMethodField()
    lastmod = serializers.SerializerMethodField()
    priority = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ["loc", "lastmod", "priority"]

    def get_loc(self, post):
        base = urllib.parse.urljoin(settings.CLIENT_CANONICAL_URL, "blog/")
        return urllib.parse.urljoin(base, post.slug)

    def get_lastmod(self, post):
        return post.date_modified.strftime(date_format)

    def get_priority(self, post):
        return "0.90"


class SnippetSerializer(serializers.HyperlinkedModelSerializer):
    loc = serializers.SerializerMethodField()
    lastmod = serializers.SerializerMethodField()
    priority = serializers.SerializerMethodField()

    class Meta:
        model = Snippet
        fields = ["loc", "lastmod", "priority"]

    def get_loc(self, snippet):
        base = urllib.parse.urljoin(settings.CLIENT_CANONICAL_URL, "snippets/")
        path = "?id={}".format(snippet.slug)
        return urllib.parse.urljoin(base, path)

    def get_lastmod(self, snippet):
        return snippet.date_modified.strftime(date_format)

    def get_priority(self, snippet):
        return "0.90"


class ContentSerializer(serializers.HyperlinkedModelSerializer):
    loc = serializers.SerializerMethodField()
    lastmod = serializers.SerializerMethodField()
    priority = serializers.SerializerMethodField()
    changefreq = serializers.SerializerMethodField()

    def to_representation(self, content):
        ret = super(ContentSerializer, self).to_representation(content)
        if not content.change_frequency:
            ret.pop('changefreq')
        return ret 

    class Meta:
        model = Content
        fields = ["loc", "lastmod", "changefreq", "priority"]

    def get_loc(self, content):
        path = "" if content.slug in ["index", "home"] else content.slug
        return urllib.parse.urljoin(settings.CLIENT_CANONICAL_URL, path)

    def get_lastmod(self, content):
        return content.date_modified.strftime(date_format)

    def get_changefreq(self, content):
        if not content.change_frequency:
            return None
        choice = Content.Frequency(content.change_frequency)
        return choice.label

    def get_priority(self, content):
        return "1.00"