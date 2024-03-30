from restaraunts.models import Restaurant, Photo, Menu, TagGroup, Tag
from rest_framework import serializers

from restaraunts.models import RestaurantTags


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'address', 'owner', 'description', 'schedule']


class PhotoSerializer(serializers.Serializer):
    class Meta:
        model = Photo
        fields = ['id', 'image', 'title', 'restaurant']


class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ['id', 'name', 'restaurant']


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name', 'group']


class TagGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = TagGroup
        fields = ['id', 'name']


class RestaurantTagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantTags
        fields = ['id', 'restaurant', 'tag']