from typing import Dict, Any

from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenObtainSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import exceptions
from typing import Any, Dict
from accounts.models import User
from django.conf import settings
from rest_framework.settings import api_settings


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = User.USERNAME_FIELD

    def validate(self, attrs):
        data = super().validate(attrs)
        user_data = dict()
        user_data['id'] = self.user.id
        user_data['full_name'] = self.user.full_name
        user_data['email'] = self.user.email
        user_data['avatar'] = str(self.user.avatar)
        data['user_data'] = user_data
        return data





