from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from api.models import Project, ProjectMembership, Task
from api.serializers import ProjectSerializer, UserSerializer, LoginSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from api import models as m
from api import serializers as s

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
    project = get_object_or_404(Project, id=id)
    serializer = ProjectSerializer(project)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_member(request, project_id):
    user_id = request.data.get('user_id')
    membership, created = ProjectMembership.objects.get_or_create(
        user_id=user_id,
        project_id=project_id
    )
    return Response({'message':'User added to project'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_task(request, project_id):
    data = request.data
    task = Task.objects.create(
        title=data['title'],
        description=data['description'],
        project_id=project_id,
        # assigned_to_id=data.get('assigned_to')
    )
    return Response({'message':'Task created'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_tasks(request, project_id):
    tasks = Task.objects.filter(project_id=project_id)
    data = [
        {
            "id": t.id,
            "title": t.title,
            'description':t.description,
            "status": t.status,
            # "assigned_to": t.assigned_to.username if t.assigned_to else None
        }
        for t in tasks
    ]
    return Response(data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_project(request, id):
    project = Project.objects.filter(id=id, created_by=request.user).first()

    if not project:
        return Response({"error": "Not found"}, status=404)

    project.delete()
    return Response({"message": "Deleted successfully"})


from api.serializers import UserSerializer, TaskSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    data = UserSerializer(request.user)
    return Response(data.data, status=200)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_all_tasks(request):
    tasks = Task.objects.filter(
        project__created_by=request.user
    )
    print(f'Tasks {tasks}')
    serializer = TaskSerializer(tasks, many=True)
    return Response(serializer.data, status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_task_detail(request, id):
    task = get_object_or_404(m.Task, id=id)

    serializer = TaskSerializer(task)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_comments(request, task_id):
    task = get_object_or_404(m.Task, id=task_id)
    content = request.data.get('content')

    if not content:
        return Response(
            {'error':'Comment content is required'},
            status = status.HTTP_400_BAD_REQUEST
        )
    
    comment = m.Comment.objects.create(
        task= task,
        content = content,
        user=request.user
    )
    serializer = s.CommentSerializer(comment)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_collaboration_projects(request):
    user = request.user
    projects = m.Project.objects.filter(
        membership__user__id = user.id
    )
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)

