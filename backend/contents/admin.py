from django.contrib import admin
from contents import models
from import_export.admin import ImportExportModelAdmin


@admin.register(models.Content)
class ContentAdmin(ImportExportModelAdmin):
    search_fields = ["name", "slug", "title", "summary"]
    list_display = ["name", "slug", "title", "date_created", "dynamic_page"]
    fields = [
        "name",
        "slug",
        "title",
        "image",
        "summary",
        "text",
        "tags",
        "dynamic_page",
    ]
    prepopulated_fields = {"slug": ["name"]}
    autocomplete_fields = ["image", "tags"]
