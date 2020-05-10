from rest_framework import viewsets
from rest_framework.response import Response
from sitemap.renderer import SitemapRenderer
from sitemap import serializers

from blog.models import Post
from snippets.models import Snippet
from contents.models import Content

class SitemapViewSet(viewsets.ViewSet):
    renderer_classes = [SitemapRenderer]

    def list(self, request):
        contents = Content.objects.all()
        contentSerializer = serializers.ContentSerializer(contents, many=True)
        contentsData = contentSerializer.data

        posts = Post.visible.all()
        postSerializer = serializers.PostSerializer(posts, many=True)
        postsData = postSerializer.data

        snippets = Snippet.visible.all()
        snippetSerializer = serializers.SnippetSerializer(snippets, many=True)
        snippetsData = snippetSerializer.data

        return Response(contentsData + postsData + snippetsData)