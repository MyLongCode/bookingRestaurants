from django.db import models
from accounts.models import User


class Restaurant(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=255)
    schedule = models.CharField(max_length=255)
    capacityOnTable = models.IntegerField(default=10)
    logo = models.ImageField(upload_to='images/logo/')
    preview = models.ImageField(upload_to='images/preview/')


class Photo(models.Model):
    image = models.ImageField(upload_to='images/restaurant_photos/')
    title = models.CharField(max_length=255)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)


class Menu(models.Model):
    name = models.CharField(max_length=255)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)


class Category(models.Model):
    name = models.CharField(max_length=255)
    photo = models.ImageField(upload_to='images/category_photos/')
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)


class DishItem(models.Model):
    name = models.CharField(max_length=255)
    price = models.IntegerField()
    weight = models.IntegerField()
    compound = models.CharField(max_length=400)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)


class TagGroup(models.Model):
    name = models.CharField(max_length=255)


class Tag(models.Model):
    name = models.CharField(max_length=100)
    group = models.ForeignKey(TagGroup, on_delete=models.CASCADE)


class RestaurantTags(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)


class FavoriteRestaurant(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
