from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Project
from api.serializers import ProjectSerializer, UserSerializer, LoginSerializer
from rest_framework import status


@api_view(['GET'])
def get_projects(request):
    projects = Project.objects.all()
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)



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