from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from api.models import Project
from api.serializers import ProjectSerializer, UserSerializer, LoginSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_projects(request):
    projects = Project.objects.filter(created_by=request.user).order_by('-created_at')
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)

# 🔹 Create project
@api_view(['POST'])
def create_project(request):
    serializer = ProjectSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(created_by=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data = request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            'message' : f'{user.username} account created successfully.'},
            status = status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data = request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        return Response({
            'message':'Login successful',
            'username':user.username,
        }, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_project_detail(request, id):
    # project = get_object_or_404(Project, id=id)
    project = get_object_or_404(Project, id=id, created_by=request.user)
    serializer = ProjectSerializer(project)
    return Response(serializer.data)