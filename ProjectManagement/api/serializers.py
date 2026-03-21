from rest_framework import serializers
from api.models import Project
from django.contrib.auth.models import User
from api.models import Profile
from django.contrib.auth import authenticate

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ['created_by']


class UserSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    organization = serializers.CharField()

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('Username already exists.')
        return value
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('Email already exists.')
        return value
    
    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError('Passwords do not match.')
        return data
    
    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = User.objects.create_user(
            username = validated_data['username'],
            email = validated_data['email'],
            password = validated_data['password']
        )

        Profile.objects.create(
            user = user,
            organization_name = validated_data['organization']
        )
        return user
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(
            username=data['username'],
            password = data['password']
        )
        if not user:
            raise serializers.ValidationError('Invalid username or password')
        data['user'] = user
        return data
