from django.contrib import admin
from redirects import models
from import_export.admin import ImportExportModelAdmin

@admin.register(models.Redirect)
class RedirectAdmin(ImportExportModelAdmin):
    search_fields = ["source", "destination"]
    list_display = ["source", "destination"]
    fields = ["source", "destination"]