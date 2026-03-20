from django.db import models
import uuid
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.utils import timezone

ORG_STATUS = [
    ('pending', "Pending"),
    ('active', 'Active'),
    ('suspended', 'Suspended'),
    ('archived', 'Archieved'),
]
class Organization(models.Model):
    id = models.UUIDField(
        default=uuid.uuid4,
        primary_key=True,
        editable=False
    )
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, max_length=200)
    description = models.TextField(blank=True)
    status = models.CharField(choices=ORG_STATUS, max_length=20, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.name)[:200]
            # ensure uniqueness if necessary
            slug = base
            counter = 1
            while Organization.objects.filter(slug=slug).exists():
                slug = f"{base}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
    


ROLE_CHOICES = [
    ('admin', "Admin"),
    ('manager', 'Manager'),
    ('developer', 'Developer'),
    ('viewer', 'Viewer')
]
class Role(models.Model):
    name = models.CharField(max_length=50, blank=True)
    code = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)

    def save(self, *args, **kwargs):
        if not self.name:
            self.name = dict(ROLE_CHOICES).get(self.code, self.code)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    phone = models.CharField(max_length=20, null=True)
    role = models.ForeignKey(Role, null=True, blank=True, on_delete=models.SET_NULL, related_name='profiles')
    is_active_member = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.get_username()}"


MEMBER_STATUS = [
    ('invited', 'Invited'),
    ('active', 'Active'),
    ('suspended', 'Suspended'),
    ('left', 'Left')
]

class OrganizationMember(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='org_memberships')
    organization =  models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='memberships')
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, blank=True, related_name='org_members')
    status = models.CharField(max_length=20, choices=MEMBER_STATUS, default='invited')
    invited_by = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name='invites_sent')
    joined_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    metadata = models.JSONField(null=True, blank=True)

    class Meta:
        unique_together = ('user', 'organization')
        ordering = ['-created_at']

    def activate(self):
        self.status = 'active'
        if not self.joined_at:
            self.joined_at = timezone.now()
        self.save(update_fields=['status', 'joined_at'])
    
    def suspend(self):
        self.status = 'suspended'
        self.save(update_fields=['status'])
    
    def leave(self):
        self.status = 'left'
        self.save(update_fields=['status'])

    def __str__(self):
        role_code = self.role.code if self.role else 'no-role'
        return f"{self.user.get_username()} @ {self.organization.name} ({role_code})"



# Plan and Subscriptions
class Plan(models.Model):
    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    currency = models.CharField(max_length=10, default='USD')
    billing_cycle = models.CharField(max_length=20, default='monthly')
    features = models.JSONField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.price} {self.currency})"
    
class Subscription(models.Model):
    organization = models.ForeignKey(Organization, null=True, blank=True, on_delete=models.CASCADE, related_name='subscriptions')
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.CASCADE, related_name='subscriptions')
    plan = models.ForeignKey(Plan, on_delete=models.SET_NULL, null=True, related_name='subscriptions')
    is_active = models.BooleanField(default=True)
    started_at = models.BooleanField(null=True, blank=True)
    ended_at = models.DateTimeField(null=True, blank=True)
    metadata =  models.JSONField(null=True, blank=True)

    def __str__(self):
        target = self.organization or self.user
        return f"Subscription({target} -> {self.plan})"

# class Pricing(models.Model):
#     name = models.CharField(max_length=200)
#     user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='pricing')
#     price = models.IntegerField(default=0)
#     currency_symbol = models.CharField(max_length=50, null=True, blank=True)
#     plan = models.CharField(max_length=100)
#     is_paid = models.BooleanField(default=False)

#     def __str__(self):
#         return self.name

# ---------------------------------------------------------------------
#               Project
# ---------------------------------------------------------------------
class Project(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name='projects')
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, max_length=200)
    description = models.TextField(blank=True)
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    progress = models.FloatField(default=0.0)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='created_projects')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.name)[:200]
            slug = base
            counter = 0
            while Project.objects.filter(slug=slug).exists():
                slug = f"{base}-{counter}"
                counter =+ 1
            self.slug = slug
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.name
    