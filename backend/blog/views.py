from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from blog import models, serializers


class PostViewSet(viewsets.ModelViewSet):
    http_method_names = ["get"]
    queryset = models.Post.visible.all()
    serializer_class = serializers.PostSerializer
    filter_backends = [SearchFilter]
    search_fields = ["title", "summary", "text", "tags__name"]

    def get_serializer_class(self):
        if self.action == "list":
            return serializers.PostSummarySerializer
        else:
            return serializers.PostSerializer

    def retrieve(self, request, pk=None):
        post = self.get_post(request, pk)
        serializer = self.get_serializer(post)
        return Response(serializer.data)

    def get_post(self, request, pk=None):
        try:  # retrieve post by id
            pk = int(pk)
            return get_object_or_404(self.get_queryset(), pk=pk)
        except:  # retrieve post by slug
            return get_object_or_404(self.get_queryset().filter(slug=pk))
