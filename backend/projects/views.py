from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.filters import SearchFilter
from projects import models, serializers


class ProjectViewSet(viewsets.ModelViewSet):
    http_method_names = ["get"]
    queryset = models.Project.visible.all()
    serializer_class = serializers.ProjectSerializer
    filter_backends = [SearchFilter]
    search_fields = ["name", "summary", "tags__name"]

    def retrieve(self, request, pk=None):
        project = self.get_project(request, pk)
        serializer = self.get_serializer(project)
        return Response(serializer.data)

    def get_project(self, request, pk=None):
        try:  # retrieve project by id
            pk = int(pk)
            return get_object_or_404(self.get_queryset(), pk=pk)
        except:  # retrieve project by slug
            return get_object_or_404(self.get_queryset().filter(slug=pk))
