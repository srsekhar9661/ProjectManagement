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
