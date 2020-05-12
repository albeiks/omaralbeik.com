from core.models import BaseModel
from django.db import models


class ProjectManager(models.Manager):
    def get_queryset(self):
        queryset = super(ProjectManager, self).get_queryset()
        return queryset.filter(published=True)


class Project(BaseModel):
    name = models.CharField(max_length=140)
    slug = models.SlugField(max_length=140, unique=True)
    logo = models.ForeignKey("files.Image", on_delete=models.SET_NULL, blank=True, null=True)
    summary = models.TextField(max_length=255, blank=True)
    date_published = models.DateField(blank=True, null=True)
    url_name = models.CharField(max_length=50, default="Website")
    url = models.URLField()
    published = models.BooleanField(default=False)
    tags = models.ManyToManyField("tags.Tag", blank=True)

    objects = models.Manager()
    visible = ProjectManager()

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["-published", "-date_published", "-date_created"]
