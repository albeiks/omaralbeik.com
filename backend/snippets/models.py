from core.models import BaseModel
from django.db import models
from martor.models import MartorField


class SnippetManager(models.Manager):
    def get_queryset(self):
        return super(SnippetManager, self).get_queryset().filter(published=True)


class ProgrammingLanguage(BaseModel):
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=50, unique=True)
    icon = models.ForeignKey("files.Image", on_delete=models.SET_NULL, blank=True, null=True)

    def __str__(self):
        return self.name


class Snippet(BaseModel):
    name = models.CharField(max_length=140)
    slug = models.SlugField(max_length=140, unique=True)
    summary = models.TextField(max_length=255, blank=True)
    text = MartorField()
    published = models.BooleanField(default=False)
    date_published = models.DateField(blank=True, null=True)
    language = models.ForeignKey(
        "snippets.ProgrammingLanguage", on_delete=models.CASCADE
    )

    objects = models.Manager()
    visible = SnippetManager()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-published", "-date_published", "-date_created"]
