from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings

from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView, TokenVerifyView,
)
from accounts.views import UserList, UserViewSet
from restaraunts.views import (
    RestaurantViewSet, MenuViewSet, MenuListViewSet, TagViewSet, TagGroupViewSet, RestaurantTagsViewSet)
from rest_framework_nested import routers


router = routers.DefaultRouter()
router.register(r'users', UserViewSet, basename='users')
router.register(r'restaurant', RestaurantViewSet)
router.register(r'menu', MenuViewSet, basename='menu')
router.register(r'tag', TagViewSet, basename='tag')
router.register(r'tag-group', TagGroupViewSet, basename='tagGroup')
router.register(r'restaurant-tags', RestaurantTagsViewSet, basename='restaurantTags')

domains_router = routers.NestedSimpleRouter(router, r'restaurant', lookup='restaurant')
domains_router.register(r'menu', MenuListViewSet, basename='menu')

urlpatterns = [
                  path(r'', include(router.urls)),
                  path(r'', include(domains_router.urls)),
                  path('admin/', admin.site.urls),
                  path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
                  path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
                  path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
                  path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
