from django.shortcuts import get_object_or_404
from rest_framework.viewsets import GenericViewSet
from restaraunts.serializers import (
    RestaurantSerializer, PhotoSerializer, MenuSerializer,
    TagSerializer, TagGroupSerializer, RestaurantTagsSerializer,
    NestedCategorySerializer, DishItemSerializer, MenuListSerializer,
    CategorySerializer
)
from django.db.models import Count
from rest_framework import status, mixins, generics
from restaraunts.models import (
    Restaurant, Photo, Menu, TagGroup, Category, DishItem, RestaurantTags, Tag)
from rest_framework import viewsets
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
            self.queryset = self.queryset.filter(
                id__in=RestaurantTags.objects.filter(id__in=tags_ids).values_list('restaurant', flat=True))
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
    serializer_class = MenuListSerializer

    def list(self, request, restaurant_pk=None):
        queryset = Menu.objects.filter(restaurant=restaurant_pk)
        serializer = self.serializer_class(queryset, many=True, context={"request": request})
        return Response(serializer.data)


class PhotoListViewSet(viewsets.ViewSet):
    serializer_class = PhotoSerializer

    def list(self, request, restaurant_pk=None):
        queryset = Photo.objects.filter(restaurant=restaurant_pk)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class MenuViewSet(mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin,
                  GenericViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    permission_classes = []


class TagViewSet(mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin,
                 GenericViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = []

    def list(self, request):
        tags = Tag.objects.all()
        data = dict()
        for i in tags:
            group = i.group.name
            if group not in data:
                data[group] = [{'id': i.id, 'name': i.name}]
            else:
                data[group].append({'id': i.id, 'name': i.name})

        return Response(data)


class TagGroupViewSet(viewsets.ModelViewSet):
    queryset = TagGroup.objects.all()
    serializer_class = TagGroupSerializer
    permission_classes = []


class RestaurantTagsViewSet(viewsets.ModelViewSet):
    queryset = RestaurantTags.objects.all()
    serializer_class = RestaurantTagsSerializer
    permission_classes = []


class NestedCategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = NestedCategorySerializer
    permission_classes = []


class DishItemViewSet(mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                      mixins.DestroyModelMixin, GenericViewSet):
    queryset = DishItem.objects.all()
    serializer_class = DishItemSerializer
    permission_classes = []


class PhotoViewSet(mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin, GenericViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotoSerializer
    permission_classes = []


class CategoryViewSet(mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                      mixins.DestroyModelMixin, GenericViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = []


class RestaurantTagsListViewSet(viewsets.ViewSet):
    permission_classes = []

    def list(self, request, restaurant_pk=None):
        restaurant_tags = RestaurantTags.objects.filter(restaurant=restaurant_pk).values_list('tag', flat=True)
        tags = Tag.objects.filter(id__in=restaurant_tags)
        data = dict()
        for i in tags:
            group = i.group.name
            if group not in data:
                data[group] = [{'id': i.id, 'name': i.name}]
            else:
                data[group].append({'id': i.id, 'name': i.name})

        return Response(data)


class RestaurantTagsPUTViewSet(viewsets.ViewSet):
    permission_classes = []

    def create(self, request, restaurant_pk=None):
        restaurant = Restaurant.objects.get(pk=restaurant_pk)
        r_tags = RestaurantTags.objects.filter(restaurant=restaurant_pk)
        restaurant_tags = Tag.objects.filter(id__in=r_tags.values_list('tag', flat=True))
        data = {"tags": []}
        for tag in r_tags:
            tag.delete()
        for i in request.data['tags']:
            try:
                tag = Tag.objects.get(pk=int(i))
            except Tag.DoesNotExist:
                return Response({'message': f'Tag: {i} not found'})
            if tag not in restaurant_tags:
                data['tags'].append(int(i))
                RestaurantTags.objects.create(restaurant=restaurant, tag=tag)
        return Response(data)


class RestaurantTagsPATCHViewSet(viewsets.ViewSet):
    permission_classes = []

    def create(self, request, restaurant_pk=None):
        restaurant = Restaurant.objects.get(pk=restaurant_pk)
        r_tags = RestaurantTags.objects.filter(restaurant=restaurant_pk)
        restaurant_tags = Tag.objects.filter(id__in=r_tags.values_list('tag', flat=True))
        data = {"tags-add": [], "tags-remove": []}
        if 'tags-add' in request.data:
            for i in request.data['tags-add']:
                try:
                    tag = Tag.objects.get(pk=int(i))
                except Tag.DoesNotExist:
                    return Response({'message': f'Tag: {i} not found'})
                if tag not in restaurant_tags:
                    data['tags-add'].append(int(i))
                    RestaurantTags.objects.create(restaurant=restaurant, tag=tag)
        if 'tags-remove' in request.data:
            for i in request.data['tags-remove']:
                try:
                    tag = Tag.objects.get(pk=int(i))
                except Tag.DoesNotExist:
                    return Response({'message': f'Tag: {i} not found'})
                if tag in restaurant_tags:
                    data['tags-remove'].append(int(i))
                    RestaurantTags.objects.get(restaurant=restaurant, tag=tag).delete()
        return Response(data)


class DishListViewSet(viewsets.ViewSet):
    serializer_class = DishItemSerializer

    def list(self, request, category_pk=None):
        queryset = DishItem.objects.filter(category=category_pk)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)


class RestaurantListViewSet(viewsets.ViewSet):
    serializer_class = RestaurantSerializer

    def list(self, request, users_pk=None):
        queryset = Restaurant.objects.filter(owner=users_pk)
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

# class CategoryViewSet(mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, GenericViewSet)
