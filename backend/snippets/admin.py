from django.contrib import admin
from snippets import models
from import_export.admin import ImportExportModelAdmin


@admin.register(models.ProgrammingLanguage)
class ProgrammingLanguageAdmin(ImportExportModelAdmin):
    search_fields = ["name", "slug"]
    list_display = ["name", "slug"]
    fields = ["name", "slug", "icon"]
    autocomplete_fields = ["icon"]
    prepopulated_fields = {"slug": ["name"]}


@admin.register(models.Snippet)
class SnippetsAdmin(ImportExportModelAdmin):
    search_fields = ["name", "slug", "summary", "text", "language"]
    list_filter = ["language__name", "published"]
    list_display = [
        "name",
        "slug",
        "summary",
        "language",
        "date_created",
        "date_published",
        "published",
    ]
    fields = [
        "name",
        "slug",
        "summary",
        "text",
        "language",
        "published",
        "date_published",
    ]
    prepopulated_fields = {"slug": ["name"]}
    autocomplete_fields = ["language"]
