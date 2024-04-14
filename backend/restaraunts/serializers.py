from restaraunts.models import (
    Restaurant, Photo, Menu, TagGroup, Tag, Category, DishItem, Booking)
from rest_framework import serializers

from restaraunts.models import RestaurantTags
import rest_framework
from drf_writable_nested.serializers import WritableNestedModelSerializer


class RestaurantSerializer(serializers.ModelSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if 'context' in kwargs:
            a = kwargs['context']['request']
            print(a)
            fields = kwargs['context']['request'].query_params.get('select')
            if fields is not None:
                fields = fields.split(';')
                allowed = set(fields)
                existing = set(self.fields)
                for field_name in existing - allowed:
                    self.fields.pop(field_name)

    class Meta:
        model = Restaurant
        fields = ['id', 'name', 'address', 'owner', 'description', 'phone', 'site',
                  'schedule', 'capacityOnTable', 'logo', 'preview']


class PhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Photo
        fields = ['id', 'image', 'title', 'restaurant']


class DishItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = DishItem
        fields = ['id', 'name', 'price', 'weight', 'compound', 'category', 'photo']


class NestedCategorySerializer(WritableNestedModelSerializer):
    dish_item = DishItemSerializer(many=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'photo', 'menu', 'dish_item']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'photo', 'menu']


class MenuListSerializer(WritableNestedModelSerializer):
    category = NestedCategorySerializer(many=True)

    class Meta:
        model = Menu
        fields = ['id', 'name', 'category']


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


class NestedTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


class BookingSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        restaurant_pk = self.context['restaurant_pk']
        status = self.context['status']
        restaurant = Restaurant.objects.get(pk=restaurant_pk)
        validated_data['restaurant'] = restaurant
        validated_data['status'] = status
        post = Booking.objects.create(**validated_data)
        return post


    class Meta:
        model = Booking
        fields = ['id', 'date', 'count_people', 'status', 'wishes', 'user', 'restaurant']
        read_only_fields = ['restaurant', 'status']


class BookingStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ['id', 'date', 'count_people', 'status', 'wishes', 'user', 'restaurant']
        read_only_fields = ['id', 'date', 'count_people', 'wishes', 'user', 'restaurant']
