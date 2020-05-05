from rest_framework import serializers
from contact import models


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Message
        fields = [
            "name",
            "email",
            "phone",
            "country",
            "city",
            "subject",
            "message",
        ]
