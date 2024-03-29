from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        user_data = dict()
        user_data['id'] = self.user.id
        user_data['full_name'] = self.user.full_name
        user_data['email'] = self.user.email
        user_data['avatar'] = str(self.user.avatar)
        data['user_data'] = user_data

        return data
