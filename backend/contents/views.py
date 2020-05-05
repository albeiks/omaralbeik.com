from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets, mixins
from rest_framework.filters import SearchFilter
from contents import models, serializers


class ContentViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    http_method_names = ["get"]
    queryset = models.Content.objects.all()
    serializer_class = serializers.ContentSerializer
    filter_backends = [SearchFilter]
    search_fields = ["title", "name", "text"]

    def retrieve(self, request, pk=None):
        try:  # retrieve post by primary key
            pk = int(pk)
            content = get_object_or_404(self.get_queryset(), pk=pk)
            serializer = self.get_serializer(content)
            return Response(serializer.data)

        except:  # retrieve post by slug
            content = get_object_or_404(self.get_queryset().filter(slug=pk))
            serializer = self.get_serializer(content)
            return Response(serializer.data)
