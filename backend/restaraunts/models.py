from datetime import datetime

from django.db import models
from accounts.models import User
from django_jsonform.models.fields import JSONField


class Restaurant(models.Model):
    ITEMS_SCHEMA = {
        'type': 'array',
        'items': {
            'type': 'object',
            'title': 'day',
            'keys': {
                'dayName': {
                    'type': 'string',
                },
                'timeStart': {
                    'type': 'string',
                },
                'timeEnd': {
                    'type': 'string',
                },
                'isActive': {
                    'type': 'boolean',
                    'choices': [True, False]
                },
            },
        },

    }

    #'default': [{'dayName': 'пн', 'isActive': False},
    #            {'dayName': 'вт', 'isActive': False},
    #            {'dayName': 'ср', 'isActive': False},
    #            {'dayName': 'чт', 'isActive': False},
    #            {'dayName': 'пт', 'isActive': False},
    #            {'dayName': 'сб', 'isActive': False},
    #            {'dayName': 'вс', 'isActive': False}]

    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=255)
    phone = models.CharField(max_length=50)
    site = models.CharField(max_length=255)
    schedule = JSONField(schema=ITEMS_SCHEMA)
    capacityOnTable = models.IntegerField(default=10)
    logo = models.ImageField(upload_to='images/logo/', null=True, blank=True)
    preview = models.ImageField(upload_to='images/preview/', null=True, blank=True)


class Photo(models.Model):
    image = models.ImageField(upload_to='images/restaurant_photos/', null=True, blank=True)
    title = models.CharField(max_length=255)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)


class Menu(models.Model):
    name = models.CharField(max_length=255)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='menu')


class Category(models.Model):
    name = models.CharField(max_length=255)
    photo = models.ImageField(upload_to='images/category_photos/', null=True, blank=True)
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE, related_name='category')


class DishItem(models.Model):
    name = models.CharField(max_length=255)
    price = models.IntegerField()
    weight = models.IntegerField()
    compound = models.CharField(max_length=400)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='dish_item')
    photo = models.ImageField(upload_to='images/dish_photos/', null=True, blank=True)


class TagGroup(models.Model):
    name = models.CharField(max_length=255)


class Tag(models.Model):
    name = models.CharField(max_length=100)
    group = models.ForeignKey(TagGroup, on_delete=models.CASCADE, related_name='tag')


class RestaurantTags(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)


class FavoriteRestaurant(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)


class Booking(models.Model):
    date = models.DateTimeField(auto_now=True, )
    booking_date = models.DateField(null=False, blank=False)
    booking_time = models.TimeField(null=False, blank=False)
    count_people = models.IntegerField()
    status = models.CharField(max_length=255)
    wishes = models.CharField(max_length=255, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='booking_user')
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='booking_restaurant')


class Reviews(models.Model):
    rating = models.FloatField()
    text = models.TextField(null=True, blank=True)
    photo = models.ImageField(upload_to='images/reviews/', null=True)
    time = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews_user')
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='reviews_restaurant')