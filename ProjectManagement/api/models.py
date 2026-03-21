from django.db import models
from django.contrib.auth.models import User


class Project(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return self.name


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    organization_name = models.CharField(max_length=255)

    def __str__(self):
        return self.user.username

ROLES = [
    ('admin', 'admin'),
    ('ProjectManager', 'ProjectManager'),
    ('developer', 'developer'),
]

class ProjectMembership(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project = models.ForeignKey('Project', on_delete=models.CASCADE)
    role = models.CharField(max_length=50, choices=ROLES, default='member')

    def __str__(self):
        return f'{self.user.username} - {self.project.name}'
    

class Task(models.Model):
    STATUS_CHOICES = [
        ('todo', 'To Do'),
        ('progress', 'In Progress'),
        ('done', 'Done')
    ]
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    project = models.ForeignKey('Project', on_delete=models.CASCADE, related_name='tasks')
    status  = models.CharField(max_length=20, choices=STATUS_CHOICES, default='todo')
    created_at =models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
