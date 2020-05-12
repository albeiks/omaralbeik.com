from core.models import BaseModel
from django.db import models
from martor.models import MartorField


class Content(BaseModel):
    name = models.CharField(max_length=140)
    slug = models.SlugField(max_length=140, unique=True)
    title = models.CharField(max_length=140, blank=True, null=True)
    image = models.ForeignKey("files.Image", on_delete=models.SET_NULL, blank=True, null=True)
    summary = models.TextField(max_length=255, blank=True, null=True)
    text = MartorField(blank=True, null=True)
    tags = models.ManyToManyField("tags.Tag", blank=True)
    dynamic_page = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["-date_created"]
