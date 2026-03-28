from rest_framework import serializers
from api.models import Project, Task
from django.contrib.auth.models import User
from api.models import Profile
from django.contrib.auth import authenticate
from api import models as m


# class ProjectDetailSerializer(serializers.ModelSerialzier):
#     role = serializers.SerializersMethodField()
#     members = serializers.SerializerMethodField()

#     def get_role(self, obj):
#         user = self.context.get('user')
#         project = self.context.get('project')
#         m.ProjectMembership.objects.get()
#     class Meta:
#         model = Project
#         fields = ['id', 'name', 'description', 'created_by', 'role', 'members', 'created_at']

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ['created_by']

    def create(self, validated_data):
        user = self.context['request'].user
        project = m.Project.objects.create(
            created_by=user,
            **validated_data
        )

        # Add creator as owner in ProjectMember
        m.ProjectMember.objects.create(
            user=user,
            project=project,
            role='owner'
        )
        
        return project


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

class UserDetailSerializer(serializers.ModelSerializer):
    organization = serializers.CharField(source='profile.organization_name')

    class Meta:
        model = User
        fields = [ 'id', 'username', 'email', 'organization']


class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class SafeUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']  # ✅ ONLY SAFE FIELDS


class CommentSerializer(serializers.ModelSerializer):
    user = SafeUserSerializer(read_only=True)
    class Meta:
        model = m.Comment
        fields = ['id', 'user', 'content', 'created_at']


class AttachmentSerializer(serializers.ModelSerializer):
    file = serializers.FileField(read_only=True)

    class Meta:
        model = m.Attachment
        fields = ['id', 'file', 'uploaded_at']


class TaskSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    attachments = AttachmentSerializer(many=True, read_only=True)

    assigned_to = serializers.StringRelatedField()
    created_by = serializers.StringRelatedField()

    class Meta:
        model = Task
        fields = [
            'id',
            'title',
            'description',
            'status',
            'priority',
            'due_date',
            'assigned_to',
            'created_by',
            'comments',
            'attachments',
            'created_at',
            'updated_at'
        ]


class ProjectMemberSerializer(serializers.ModelSerializer):
    user = SafeUserSerializer()

    class Meta:
        model = m.ProjectMember
        fields = ['id', 'user', 'role', 'joined_at']

# class ProjectMemberSerializer(serializers.ModelSerializer):
#     user = UserDetailSerializer()

#     class Meta:
#         # model = m.ProjectMembership
#         fields = ['id', 'role', 'user']
