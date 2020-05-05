from django.contrib import admin
from blog import models
from import_export.admin import ImportExportModelAdmin


@admin.register(models.Post)
class BlogAdmin(ImportExportModelAdmin):
    search_fields = ["title", "summary", "text", "tags__name"]
    list_filter = ["published", "tags"]
    list_display = [
        "title",
        "slug",
        "summary",
        "date_created",
        "date_published",
        "published",
    ]
    fields = [
        "title",
        "slug",
        "cover_image",
        "summary",
        "text",
        "related",
        "tags",
        "published",
        "date_published",
    ]
    prepopulated_fields = {"slug": ["title"]}
    autocomplete_fields = ["cover_image", "related", "tags"]
