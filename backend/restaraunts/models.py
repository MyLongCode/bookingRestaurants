from django.db import models

from accounts.models import User


class Restaurant(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=255)
    schedule = models.CharField(max_length=255)


class Photo(models.Model):
    image = models.ImageField(upload_to='images/restaurant_photos')
    title = models.CharField(max_length=255)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
