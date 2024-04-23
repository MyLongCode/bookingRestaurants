from django.shortcuts import get_object_or_404
from rest_framework.viewsets import GenericViewSet

from accounts.models import User
from accounts.serializers import UserSerializer
from restaraunts.serializers import (
    RestaurantSerializer, PhotoSerializer, MenuSerializer,
    TagSerializer, TagGroupSerializer, RestaurantTagsSerializer,
    NestedCategorySerializer, DishItemSerializer, MenuListSerializer,
    CategorySerializer, BookingSerializer, BookingStatusSerializer, UserBookingSerializer, EmployeeSerializer
)

from rest_framework import mixins, pagination, status
from restaraunts.models import (
    Restaurant, Photo, Menu, TagGroup, Category, DishItem, RestaurantTags, Tag, Booking, Employee)
from rest_framework import viewsets
from rest_framework.response import Response


class RestaurantViewSet(viewsets.ModelViewSet):
    queryset = Restaurant.objects.all()
    serializer_class = RestaurantSerializer
    permission_classes = []

    def get_queryset(self):
        tags = self.request.query_params.get('tag')

        if tags is not None:
            tags_ids = Tag.objects.filter(name__in=tags.split(';')).values_list('id', flat=True)
            self.queryset = self.queryset.filter(
                id__in=RestaurantTags.objects.filter(id__in=tags_ids).values_list('restaurant', flat=True))

        return self.queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        owner = User.objects.get(pk=serializer.data['owner'])
        owner.role = 'owner'
        owner.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

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
        serializer = self.serializer_class(queryset, many=True, context={"request": request})
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
        serializer = self.serializer_class(queryset, many=True, context={"request": request})
        return Response(serializer.data)


class RestaurantListViewSet(viewsets.ViewSet):
    serializer_class = RestaurantSerializer

    def list(self, request, user_pk=None):
        queryset = Restaurant.objects.filter(owner=user_pk)
        serializer = self.serializer_class(queryset, many=True, context={"request": request})
        return Response(serializer.data)


class BookingViewSet(viewsets.ViewSet, pagination.PageNumberPagination):
    serializer_class = BookingSerializer
    permission_classes = []

    def get_queryset(self):
        queryset = Booking.objects.all()
        return queryset

    def create(self, request, restaurant_pk=None):
        booking = self.serializer_class(data=request.data, context={"restaurant_pk": restaurant_pk, "status": "Ожидается"})
        booking.is_valid(raise_exception=True)
        booking.save()
        return Response(booking.data)

    def list(self, request, restaurant_pk=None):
        try:
            restaurant = Restaurant.objects.all().get(pk=restaurant_pk)
        except Restaurant.DoesNotExist:
            return Response(f"Restaurant {restaurant_pk} does not exist")
        queryset = self.get_queryset().filter(restaurant=restaurant_pk)

        orderby = self.request.query_params.get('orderby')
        status = self.request.query_params.get('status')
        if status is not None:
            if status == 'Подтверждено':
                queryset = queryset.filter(status='Подтверждено')
            elif status == 'Ожидается':
                queryset = queryset.filter(status='Ожидается')
            elif status == 'Завершено':
                queryset = queryset.filter(status='Завершено')
            elif status == 'Отклонено':
                queryset = queryset.filter(status='Отклонено')

        notstatus = self.request.query_params.get('notstatus')
        if notstatus is not None:
            if notstatus == 'Подтверждено':
                queryset = queryset.filter(status__in=['Ожидается', 'Завершено', 'Отклонено'])
            elif notstatus == 'Ожидается':
                queryset = queryset.filter(status__in=['Подтверждено', 'Завершено', 'Отклонено'])
            elif notstatus == 'Завершено':
                queryset = queryset.filter(status__in=['Подтверждено', 'Ожидается', 'Отклонено'])
            elif notstatus == 'Отклонено':
                queryset = queryset.filter(status__in=['Подтверждено', 'Ожидается', 'Завершено'])

        if orderby is not None:
            if orderby == 'datetime':
                queryset = queryset.order_by(f'-date')
            if orderby == 'status':
                queryset = queryset.order_by(f'-status')
            if orderby == 'countPeople':
                queryset = queryset.order_by(f'-count_people')

        page = self.paginate_queryset(queryset, request)
        if page is not None:
            serializer = self.serializer_class(page, many=True, context={"restaurant_pk": restaurant_pk})
            return self.get_paginated_response(serializer.data)

        serializer = self.serializer_class(queryset, many=True, context={"restaurant_pk": restaurant_pk})
        return Response(serializer.data)


class UserBookingViewSet(viewsets.ViewSet, pagination.PageNumberPagination):
    serializer_class = UserBookingSerializer
    permission_classes = []

    def get_queryset(self):
        queryset = Booking.objects.all()
        return queryset

    def list(self, request, user_pk=None):
        try:
            user = User.objects.all().get(pk=user_pk)
        except User.DoesNotExist:
            return Response(f"User {user_pk} does not exist")
        queryset = self.get_queryset().filter(user=user_pk)

        orderby = self.request.query_params.get('orderby')

        status = self.request.query_params.get('status')

        if status is not None:
            if status == 'Подтверждено':
                queryset = queryset.filter(status='Подтверждено')
            elif status == 'Ожидается':
                queryset = queryset.filter(status='Ожидается')
            elif status == 'Завершено':
                queryset = queryset.filter(status='Завершено')
            elif status == 'Отклонено':
                queryset = queryset.filter(status='Отклонено')

        notstatus = self.request.query_params.get('notstatus')
        if notstatus is not None:
            if notstatus == 'Подтверждено':
                queryset = queryset.filter(status__in=['Ожидается', 'Завершено', 'Отклонено'])
            elif notstatus == 'Ожидается':
                queryset = queryset.filter(status__in=['Подтверждено', 'Завершено', 'Отклонено'])
            elif notstatus == 'Завершено':
                queryset = queryset.filter(status__in=['Подтверждено', 'Ожидается', 'Отклонено'])
            elif notstatus == 'Отклонено':
                queryset = queryset.filter(status__in=['Подтверждено', 'Ожидается', 'Завершено'])

        if orderby is not None:
            if orderby == 'datetime':
                queryset = queryset.order_by(f'-date')
            if orderby == 'status':
                queryset = queryset.order_by(f'-status')

        page = self.paginate_queryset(queryset, request)
        if page is not None:
            serializer = self.serializer_class(page, many=True, context={"request": request})
            return self.get_paginated_response(serializer.data)

        serializer = self.serializer_class(queryset, many=True, context={"request": request})
        return Response(serializer.data)


class BookingStatusViewSet(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, GenericViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingStatusSerializer
    permission_classes = []


class EmployeeViewSet(viewsets.ViewSet, pagination.PageNumberPagination):
    serializer_class = EmployeeSerializer
    permission_classes = []

    def get_queryset(self):
        queryset = Employee.objects.all()
        return queryset

    def create(self, request, restaurant_pk=None):
        try:
            restaurant = Restaurant.objects.all().get(pk=restaurant_pk)
        except Restaurant.DoesNotExist:
            return Response(f"restaurant {restaurant_pk} does not exist")
        employee = self.serializer_class(data=request.data, context={"restaurant": restaurant})
        if employee.is_valid(raise_exception=True):
            print(employee.validated_data)
            employee.save()
            return Response(employee.data)
        return Response('error')

    def list(self, request, restaurant_pk=None):
        try:
            restaurant = Restaurant.objects.all().get(pk=restaurant_pk)
        except Restaurant.DoesNotExist:
            return Response(f"restaurant {restaurant_pk} does not exist")
        queryset = self.get_queryset().filter(restaurant=restaurant_pk)
        serializer = self.serializer_class(queryset, many=True, context={"request": request})
        return Response(serializer.data)

    def retrieve(self, request, restaurant_pk=None, pk=None):
        try:
            restaurant = Restaurant.objects.all().get(pk=restaurant_pk)
        except Restaurant.DoesNotExist:
            return Response(f"restaurant {restaurant_pk} does not exist")
        print(1)
        queryset = self.get_queryset().filter(restaurant=restaurant)
        employee = get_object_or_404(queryset, pk=pk)
        serializer = EmployeeSerializer(employee, context={"request": request})
        return Response(serializer.data)


class BookingAcceptViewSet(mixins.UpdateModelMixin, GenericViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingStatusSerializer
    permission_classes = []

    def update(self, data, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        data = dict()
        data['status'] = 'Подтверждено'
        return self.update(data, *args, **kwargs)


class BookingRejectViewSet(mixins.UpdateModelMixin, GenericViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingStatusSerializer
    permission_classes = []

    def update(self, data, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        data = dict()
        data['status'] = 'Отклонено'
        return self.update(data, *args, **kwargs)


class UserRestaurantViewSet(viewsets.ViewSet):
    serializer_class = UserSerializer
    permission_classes = []
    queryset = User.objects.all()

    def retrieve(self, request, pk=None):
        try:
            user = self.queryset.get(pk=pk)
        except User.DoesNotExist:
            return Response(f"user does not exist")
        data = dict()
        if user.role == "employee":
            try:
                employer = Employee.objects.filter(user=pk).values_list('restaurant', flat=True)
            except Employee.DoesNotExist:
                return Response(f"employer does not exist")
            data['restaurant'] = employer
            return Response(data)
        elif user.role == "owner":
            try:
                restaurant = Restaurant.objects.filter(owner=pk).values_list('id', flat=True)
            except Employee.DoesNotExist:
                return Response(f"restaurant does not exist")
            data['restaurant'] = restaurant
            return Response(data)
        else:
            return Response(f"нет привязанного ресторана")


# class CategoryViewSet(mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, GenericViewSet)
