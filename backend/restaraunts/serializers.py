from restaraunts.models import Restaurant
from restaraunts.models import Photo
from rest_framework import serializers


class RestaurantSerializer(serializers.Serializer):
    class Meta:
        model = Restaurant
        fields = ['name', 'address', 'owner', 'description', 'schedule']


class PhotoSerializer(serializers.Serializer):
    class Meta:
        model = Photo
        fields = ['image', 'title', 'restaurant']
