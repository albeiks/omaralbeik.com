from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.filters import SearchFilter
from snippets import models, serializers


class ProgrammingLanguageViewSet(viewsets.ModelViewSet):
    http_method_names = ["get"]
    queryset = models.ProgrammingLanguage.objects.all()
    serializer_class = serializers.ProgrammingLanguageSerializer
    filter_backends = [SearchFilter]
    search_fields = ["name"]

    def get_language(self, request, pk=None):
        try:  # retrieve language by primary key
            pk = int(pk)
            return get_object_or_404(self.get_queryset(), pk=pk)
        except:  # retrieve language by slug
            return get_object_or_404(self.get_queryset().filter(slug=pk))

    def retrieve(self, request, pk=None):
        language = self.get_language(request, pk)
        serializer = self.get_serializer(language)
        return Response(serializer.data)

    # detail route to return all snippets for a language
    # .../languages/[language_id]|[language_slug]/snippets
    @action(detail=True, methods=["get"])
    def snippets(self, request, pk=None):
        language = self.get_language(request, pk)
        snippets = models.Snippet.visible.filter(language=language)
        page = self.paginate_queryset(snippets)
        serializer = serializers.SnippetSerializer(page, many=True)
        return self.get_paginated_response(serializer.data)


class SnippetViewSet(viewsets.ModelViewSet):
    http_method_names = ["get"]
    queryset = models.Snippet.visible.all()
    serializer_class = serializers.SnippetSerializer
    filter_backends = [SearchFilter]
    search_fields = ["name", "summary", "text", "language__name"]

    def get_serializer_class(self):
        if self.action == "list":
            return serializers.SnippetSummarySerializer
        else:
            return serializers.SnippetSerializer

    def retrieve(self, request, pk=None):
        snippet = self.get_snippet(request, pk)
        serializer = self.get_serializer(snippet)
        return Response(serializer.data)

    def get_snippet(self, request, pk=None):
        try:  # retrieve snippet by primary key
            pk = int(pk)
            return get_object_or_404(self.get_queryset(), pk=pk)
        except:  # retrieve snippet by slug
            return get_object_or_404(self.get_queryset().filter(slug=pk))
