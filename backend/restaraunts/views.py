from restaraunts.serializers import RestaurantSerializer, PhotoSerializer
from restaraunts.models import Restaurant, Photo
from rest_framework import generics
from rest_framework.permissions import IsAdminUser


class RestaurantList(generics.ListCreateAPIView):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    permission_classes = [IsAdminUser]