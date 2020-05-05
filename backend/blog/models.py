from django.db import models
from martor.models import MartorField


class PostManager(models.Manager):
    def get_queryset(self):
        queryset = super(PostManager, self).get_queryset()
        return queryset.filter(published=True)


class Post(models.Model):
    title = models.CharField(max_length=140)
    slug = models.SlugField(max_length=140, unique=True)
    cover_image = models.ForeignKey("files.Image", on_delete=models.SET_NULL, blank=True, null=True)
    summary = models.TextField(max_length=255, blank=True, null=True)
    text = MartorField()
    date_created = models.DateTimeField(auto_now_add=True)
    date_published = models.DateTimeField(blank=True, null=True)
    related = models.ManyToManyField("blog.Post", blank=True)
    published = models.BooleanField(default=False)
    tags = models.ManyToManyField("tags.Tag", blank=True)

    objects = models.Manager()
    visible = PostManager()

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["-published", "-date_published", "-date_created"]
