from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets
from tags import models, serializers


class TagViewSet(viewsets.ModelViewSet):
    http_method_names = ["get"]
    queryset = models.Tag.objects.all()
    serializer_class = serializers.TagSerializer

    def retrieve(self, request, pk=None):
        tag = self.get_tag(request, pk)
        serializer = self.get_serializer(tag)
        return Response(serializer.data)

    def get_tag(self, request, pk=None):
        try:  # retrieve tag by id
            pk = int(pk)
            return get_object_or_404(self.get_queryset(), pk=pk)
        except:  # retrieve tag by slug
            return get_object_or_404(self.get_queryset().filter(slug=pk))
