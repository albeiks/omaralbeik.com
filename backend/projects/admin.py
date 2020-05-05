from django.contrib import admin
from projects import models
from import_export.admin import ImportExportModelAdmin


@admin.register(models.Project)
class ProjectAdmin(ImportExportModelAdmin):
    search_fields = ["name", "summary", "tags__name"]
    list_filter = ["published", "tags"]
    list_display = [
        "name",
        "slug",
        "summary",
        "date_created",
        "date_published",
        "published",
    ]
    fields = [
        "name",
        "slug",
        "logo",
        ("url_name", "url"),
        "summary",
        "tags",
        "published",
        "date_published",
    ]
    prepopulated_fields = {"slug": ["name"]}
    autocomplete_fields = ["logo", "tags"]
