from core.models import BaseModel
from django.db import models


class Image(BaseModel):
    image = models.ImageField(upload_to="images")
    alt = models.CharField(max_length=140, blank=True, null=True)

    def __str__(self):
        return "{} ({})".format(self.alt, self.image.url) if self.alt else self.image.url

    class Meta:
        ordering = ["id", "alt"]


class File(BaseModel):
    file = models.FileField(upload_to="files")
    name = models.CharField(max_length=140, blank=True, null=True)
    
    def __str__(self):
        return "{} ({})".format(self.name, self.file.url) if self.name else self.file.url

    class Meta:
        ordering = ["id", "name"]
