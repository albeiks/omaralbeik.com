from django.contrib import admin
from tags import models
from import_export.admin import ImportExportModelAdmin


@admin.register(models.Tag)
class BlogAdmin(ImportExportModelAdmin):
    search_fields = ["name", "slug"]
    prepopulated_fields = {"slug": ["name"]}
