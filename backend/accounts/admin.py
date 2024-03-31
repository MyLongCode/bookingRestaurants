from accounts.models import User
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin


class MyUserAdmin(UserAdmin):

    fieldsets = (
            (None, {'fields': ('full_name', )}),
    ) + UserAdmin.fieldsets


admin.site.register(User, MyUserAdmin)