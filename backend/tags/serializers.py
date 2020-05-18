from rest_framework import serializers
from tags import models


class TagSerializer(serializers.ModelSerializer):
    kind = serializers.SerializerMethodField()
    
    class Meta:
        model = models.Tag
        fields = ["kind", "id", "name", "slug"]

    def get_kind(self, tag):
        return "tag"
