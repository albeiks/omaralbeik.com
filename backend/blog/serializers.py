import urllib.parse
from django.conf import settings
from rest_framework import serializers
import readtime
from blog import models
from tags.serializers import TagSerializer
from files.serializers import ImageSerializer


class PostSummarySerializer(serializers.ModelSerializer):
    read_time = serializers.SerializerMethodField()

    class Meta:
        model = models.Post
        fields = [
            "id",
            "title",
            "slug",
            "summary",
            "date_published",
            "read_time",
        ]

    def get_read_time(self, post):
        return readtime.of_markdown(post.text).text


class PostSerializer(serializers.ModelSerializer):
    cover_image = serializers.SerializerMethodField()
    related = serializers.SerializerMethodField()
    tags = serializers.SerializerMethodField()
    meta = serializers.SerializerMethodField()
    

    class Meta:
        model = models.Post
        fields = [
            "id",
            "title",
            "slug",
            "cover_image",
            "summary",
            "text",
            "date_published",
            "related",
            "tags",
            "meta",
        ]

    def get_cover_image(self, post):
        if not post.cover_image:
            return None
        serializer = ImageSerializer(post.cover_image)
        return serializer.data

    def get_related(self, post):
        posts = post.related.filter(published=True)
        serializer = PostSummarySerializer(posts, many=True)
        return serializer.data

    def get_tags(self, post):
        serializer = TagSerializer(post.tags, many=True)
        return serializer.data

    def get_html_title(self, post):
        name = settings.CLIENT_NAME
        return "{} | {}".format(post.title, name) if name else post.title

    def get_keywords(self, post):
        return ", ".join([tag.name for tag in post.tags.all()])

    def get_canonical(self, post):
        base = urllib.parse.urljoin(settings.CLIENT_URL, "blog")
        return urllib.parse.urljoin(base, post.slug)

    def get_meta(self, post):
        return {
            "title": post.title,
            "html_title": self.get_html_title(post),
            "description": post.summary,
            "keywords": self.get_keywords(post),
            "canonical": self.get_canonical(post),
        }
