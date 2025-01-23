from rest_framework import serializers
from . import models

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Todo # specify the model to use
        fields = '__all__' # specifies all fields to be serialized