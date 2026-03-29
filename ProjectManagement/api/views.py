from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from api.models import Project, Task
from api.serializers import ProjectSerializer, UserSerializer, LoginSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from api import models as m
from api import serializers as s
from django.conf import settings
from django.core.mail import send_mail


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@permission_classes([IsAuthenticated])
def get_projects(request):
    projects = Project.objects.filter(created_by=request.user).order_by('-created_at')
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)

# 🔹 Create project
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_project(request):
    serializer = ProjectSerializer(
        data=request.data,
        context={'request':request}
        )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_project(request, pk):
    try:
        project = Project.objects.get(id=pk)
    except Project.DoesNotExist:
        return Response({'error': 'Not found'}, status=404)

    # 🔒 Optional (IMPORTANT): only owner/admin can edit
    if project.created_by != request.user:
        return Response({'error': 'Permission denied'}, status=403)

    serializer = ProjectSerializer(project, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_project(request, pk):
    try:
        project = Project.objects.get(id=pk)
    except Project.DoesNotExist:
        return Response({'error': 'Not found'}, status=404)

    # 🔒 Only owner can delete
    if project.created_by != request.user:
        return Response({'error': 'Permission denied'}, status=403)

    project.delete()
    return Response({'message': 'Deleted successfully'}, status=204)


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
    print(serializer.data)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_member(request, project_id):
    user_id = request.data.get('user_id')
    # membership, created = ProjectMembership.objects.get_or_create(
    #     user_id=user_id,
    #     project_id=project_id
    # )
    # membership = pass
    return Response({'message':'User added to project'})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_task(request, project_id):
    user = request.user
    data = request.data

    task = Task.objects.create(
        title=data.get('title'),
        description=data.get('description', ''),
        project_id=project_id,
        created_by=user
    )

    return Response({
        'id': task.id,
        'title': task.title,
        'description': task.description,
        'status': task.status
    })


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_task(request, task_id):
    try:
        task = Task.objects.get(id=task_id)
    except Task.DoesNotExist:
        return Response({'error': 'Not found'}, status=404)

    # 🔒 Only creator (you can upgrade later with roles)
    if task.created_by != request.user:
        return Response({'error': 'Permission denied'}, status=403)

    task.title = request.data.get('title', task.title)
    task.description = request.data.get('description', task.description)

    task.save()

    return Response({
        'id': task.id,
        'title': task.title,
        'description': task.description,
        'status': task.status
    })


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_task(request, task_id):
    try:
        task = Task.objects.get(id=task_id)
    except Task.DoesNotExist:
        return Response({'error': 'Not found'}, status=404)

    if task.created_by != request.user:
        return Response({'error': 'Permission denied'}, status=403)

    task.delete()
    return Response({'message': 'Deleted'}, status=204)

from django.utils import timezone

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def complete_task(request, task_id):
    try:
        task = Task.objects.get(id=task_id)
    except Task.DoesNotExist:
        return Response({'error': 'Not found'}, status=404)

    task.status = 'done'
    task.completed_at = timezone.now()
    task.save()

    return Response({'message': 'Task completed'})


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


# @api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
# def delete_project(request, id):
#     project = Project.objects.filter(id=id, created_by=request.user).first()

#     if not project:
#         return Response({"error": "Not found"}, status=404)

#     project.delete()
#     return Response({"message": "Deleted successfully"})


from api.serializers import UserSerializer, TaskSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request):
    data = s.UserDetailSerializer(request.user)
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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_attachment(request, task_id):
    task = get_object_or_404(m.Task, id=task_id)

    file = request.FILES.get('file')

    if not file:
        return Response({'error': 'File required'}, status=400)

    attachment = m.Attachment.objects.create(
        task=task,
        file=file,
        upload_by=request.user
    )

    serializer = s.AttachmentSerializer(attachment)
    return Response(serializer.data, status=201)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_collaboration_projects(request):
    user = request.user
    projects = m.Project.objects.filter(
        members__user=user
    )
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def invite_user(request, project_id):
    email = request.data.get('email')
    role = request.data.get('role', 'member')

    try:
        project = m.Project.objects.get(id=project_id)
    except m.Project.DoesNotExist:
        return Response({'error': 'Project not found'}, status=404)

    invitation = m.ProjectInvitation.objects.create(
        email=email,
        project=project,
        role=role
    )

    # 🔥 IMPORTANT: FRONTEND URL (NOT Django URL)
    invite_link = f'http://localhost:5173/accept-invite/{invitation.token}'

    try:
        send_mail(
            subject='Project Invitation',
            message=f'''
You are invited to join the project: {project.name}

Click here to join:
{invite_link}
''',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
            fail_silently=False
        )

        return Response({'msg': 'Mail successfully sent'})

    except Exception as e:
        print("EMAIL ERROR:", e)
        return Response({'error': 'Error sending mail'}, status=500)
    

from ipdb import set_trace as st

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def accept_invite(request, token):
    try:
        invitation = m.ProjectInvitation.objects.get(token=token)
    except m.ProjectInvitation.DoesNotExist:
        return Response({'error': 'Invalid invite'}, status=404)

    if invitation.is_accepted:
        return Response({'error': 'Already used'}, status=400)

    user = request.user

    # 🔐 EMAIL MATCH CHECK
    if user.email != invitation.email:
        return Response({'error': 'Email does not match invite'}, status=403)

    # 🔥 CHECK if already member
    already_member = m.ProjectMember.objects.filter(
        user=user,
        project=invitation.project
    ).exists()

    if not already_member:
        # ✅ ADD USER TO PROJECT
        m.ProjectMember.objects.create(
            user=user,
            project=invitation.project,
            role=invitation.role
        )

    # mark invite accepted
    invitation.is_accepted = True
    invitation.save()

    return Response({'msg': 'Joined project successfully'})



@api_view(['GET'])
def get_invite_details(request, token):
    try:
        invite = m.ProjectInvitation.objects.get(token=token)
    except m.ProjectInvitation.DoesNotExist:
        return Response({"error": "Invalid invite"}, status=404)

    return Response({
        "email": invite.email,
        "project_name": invite.project.name,
        "role": invite.role,
        "is_accepted": invite.is_accepted
    })



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_project_members(request, project_id):
    # st(context=15)
    project = get_object_or_404(m.Project, id=project_id)

    is_member =  True
    # is_member = m.ProjectMembership.objects.filter(
    #     # user=request.user,
    #     project=project
    # ).exists()

    if not is_member:
        return Response({'error':"Not allowed"}, status=403)
    members = m.ProjectMember.objects.filter(project=project)
    # members = m.ProjectMembership.objects.filter(project=project)
    serializer = s.ProjectMemberSerializer(members, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user

    user.username = request.data.get('name', user.username)
    user.email = request.data.get('email', user.email)
    user.save()

    profile, _ = m.Profile.objects.get_or_create(user=user)
    profile.organization_name = request.data.get('organization', profile.organization_name)
    profile.save()

    return Response({'msg': 'Profile updated'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user

    if not user.check_password(request.data.get('current')):
        return Response({'error': 'Wrong password'}, status=400)

    user.set_password(request.data.get('new'))
    user.save()

    return Response({'msg': 'Password updated'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user

    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "phone": getattr(user.profile, 'phone', ''),
        "bio": getattr(user.profile, 'bio', ''),
        "organization": getattr(user.profile, 'organization_name', '')
    })


