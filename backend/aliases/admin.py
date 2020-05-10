from django.contrib import admin
from aliases import models
from import_export.admin import ImportExportModelAdmin

@admin.register(models.Alias)
class AliasAdmin(ImportExportModelAdmin):
    search_fields = ["source", "destination"]
    list_display = ["source", "destination"]
    fields = ["source", "destination"]