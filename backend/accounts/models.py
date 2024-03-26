from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    full_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=255)
    avatar = models.ImageField(upload_to='images/avatars')
    birth_date = models.DateField()


