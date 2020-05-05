from django.db import models

class Redirect(models.Model):
    source = models.CharField(max_length=255, unique=True)
    destination = models.SlugField(max_length=255, unique=True)

    def __str__(self):
        return "{} → {}".format(self.source, self.destination)

    class Meta:
        ordering = ["source", "destination"]
        unique_together = ["source", "destination"]
