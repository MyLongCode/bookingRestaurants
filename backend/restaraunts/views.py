from django.shortcuts import get_object_or_404
from restaraunts.serializers import (
    RestaurantSerializer, PhotoSerializer, MenuSerializer,
    TagSerializer, TagGroupSerializer, RestaurantTagsSerializer,
    CategorySerializer, DishItemSerializer
)
from restaraunts.models import Restaurant, Photo, Menu, TagGroup, Category, DishItem
from rest_framework import viewsets
from restaraunts.models import RestaurantTags, Tag
from rest_framework.response import Response


class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    permission_classes = []

    def get_queryset(self):
        tags = self.request.query_params.get('tag')
        orderby = self.request.query_params.get('orderby')
        limit = self.request.query_params.get('limit')
        skip = self.request.query_params.get('skip')

        if tags is not None:
            tags_ids = Tag.objects.filter(name__in=tags.split(';')).values_list('id', flat=True)
            self.queryset = self.queryset.filter(id__in=RestaurantTags.objects.filter(id__in=tags_ids).values_list('restaurant', flat=True))
        if orderby is not None:
            print(orderby)
            # НАДО ПОДУМАТЬ НАД СОРТИРОВКОЙ
        if skip is not None and limit is not None and str(limit).isdigit() and str(skip).isdigit():
            return self.queryset[skip:limit]
        if skip is not None and str(skip).isdigit():
            return self.queryset[skip:]
        if limit is not None and str(limit).isdigit():
            return self.queryset[:int(limit)]
        return self.queryset

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class MenuListViewSet(viewsets.ViewSet):
    serializer_class = MenuSerializer

    def list(self, request, restaurant_pk=None):
        queryset = Menu.objects.filter(restaurant=restaurant_pk)
        serializer = MenuSerializer(queryset, many=True)
        return Response(serializer.data)


class PhotoListViewSet(viewsets.ViewSet):
    serializer_class = PhotoSerializer

    def list(self, request, restaurant_pk=None):
        queryset = Photo.objects.filter(restaurant=restaurant_pk)
        serializer = PhotoSerializer(queryset, many=True)
        return Response(serializer.data)


class MenuViewSet(viewsets.ViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    permission_classes = []

    def retrieve(self, request, pk):
        menu = get_object_or_404(self.queryset, pk=pk)
        serializer = MenuSerializer(menu)
        return Response(serializer.data)

    def create(self, request):
        post_data = request.data
        name = post_data['name']
        restaurant = post_data['restaurant']
        if not isinstance(name, str):
            return Response(data="write correct name")
        if not str(restaurant).isdigit():
            return Response(data="write correct restaurant")
        restaurant = Restaurant.objects.get(id=int(restaurant))
        menu = Menu.objects.create(name=name, restaurant=restaurant)
        menu.save()
        return Response(data={"name": name, "restaurant": int(post_data['restaurant'])})

    def delete(self, request, pk):
        menu = get_object_or_404(self.queryset, pk=pk)
        serializer = MenuSerializer(menu)
        menu.delete()
        return Response(serializer.data)


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = []


class TagGroupViewSet(viewsets.ModelViewSet):
    queryset = TagGroup.objects.all()
    serializer_class = TagGroupSerializer
    permission_classes = []


class RestaurantTagsViewSet(viewsets.ModelViewSet):
    queryset = RestaurantTags.objects.all()
    serializer_class = RestaurantTagsSerializer
    permission_classes = []


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = []


class DishItemViewSet(viewsets.ModelViewSet):
    queryset = DishItem.objects.all()
    serializer_class = DishItemSerializer
    permission_classes = []


class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = []
