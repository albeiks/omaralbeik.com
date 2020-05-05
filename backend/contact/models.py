from django.db import models


class Message(models.Model):
    name = models.CharField(max_length=140)
    email = models.EmailField()
    phone = models.CharField(max_length=55, blank=True, null=True)
    country = models.CharField(max_length=74, blank=True, null=True)
    city = models.CharField(max_length=55, blank=True, null=True)
    subject = models.CharField(max_length=255)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    date_created = models.DateField(auto_now_add=True)

    class Meta:
        ordering = [
            "is_read",
            "-date_created",
            "email",
        ]
