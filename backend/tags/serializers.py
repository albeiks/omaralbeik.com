from rest_framework import serializers
from tags import models


class TagSerializer(serializers.ModelSerializer):    
    class Meta:
        model = models.Tag
        fields = ["id", "name", "slug"]
