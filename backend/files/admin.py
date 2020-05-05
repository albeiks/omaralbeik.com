from django.contrib import admin
from files import models


@admin.register(models.Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ["id", "image", "alt"]
    fields = ["image", "alt"]
    search_fields = ["alt"]


@admin.register(models.File)
class FileAdmin(admin.ModelAdmin):
    list_display = ["id", "file", "name"]
    fields = ["file", "name"]
    search_fields = ["name"]