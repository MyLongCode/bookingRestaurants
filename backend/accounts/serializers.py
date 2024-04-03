from rest_framework import serializers
from accounts.models import User


class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(user.password)
        user.save()
        return user

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        if validated_data.get('password'):
            instance.set_password(validated_data.get('password'))
        instance.full_name = validated_data.get('full_name', instance.full_name)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.avatar = validated_data.get('avatar', instance.avatar)
        instance.birth_date = validated_data.get('birth_date', instance.birth_date)
        instance.is_active = validated_data.get('is_active', instance.is_active)
        instance.username = validated_data.get('username', instance.username)
        instance.role = validated_data.get('role', instance.role)
        return instance

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'role', 'username', 'avatar']
        write_only_fields = ('password',)
