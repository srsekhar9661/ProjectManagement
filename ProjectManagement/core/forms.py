from django import forms
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.utils.text import slugify
from core.models import Organization, Profile, Role

class SignupForm(forms.Form):
    organization_name = forms.CharField()
    username = forms.CharField()
    password1 = forms.CharField()
    password2 = forms.CharField()
    email = forms.EmailField()

    def clean_usename(self):
        username = self.cleaned_data.get('username')
        if User.objects.filete(username__iexact=username).exists():
            raise ValidationError("A user with that username already exists.")
        return username
    
    def clean_email(self):
        email = self.cleaned_data.get('email')
        if User.objects.filter(email__iexact=email).exists():
            return ValidationError("A user with email already exists.")
        return email
    
    def clean(self):
        data = super().clean()
        pwd1 = data.get('password1')
        pwd2 = data.get('password2')
        if not pwd1:
            return ValidationError("Password is required.")
        if not pwd2:
            return ValidationError('Confirm Password is required.')
        if pwd1 != pwd2:
            return ValidationError('Password and Confirm Password does not match.')
        return data


    def save(self, *args, **kwargs):
        if not self.is_valid():
            raise ValueError('Cannot save the form when it is invalid. Call is_valid() first.')
        
        data = self.cleaned_data
        org_name = data.get('organization_name')
        username = data.get('username')
        email = data.get('email')
        password = data.get('password1')

        # Create User
        user = User.objects.create_user(
                username=username,
                password=password,
                email=email
            )
        
        # craete organization and slug (ensure uniqueness )
        slug_base = slugify(org_name) or username
        slug = slug_base
        i = 1
        while Organization.objects.filter(name=org_name, slug=slug).exists():
            slug = f"{slug_base}-{i}"
            i += 1
        
        organization = Organization.objects.create(
            name=org_name, slug=slug
        )

        # get or craete role 
        org_admin_role, _ = Role.objects.get_or_create(
            code='org',
            defaults ={
                'name' : 'Oragnization Admin'
            }
        )

        # create a profile linking the user and the organization and role
        Profile.objects.create(
            user=user,
            role=org_admin_role
        )

        return user, organization
    

class LoginForm(forms.Form):
    username_or_email = forms.CharField()
    password = forms.CharField()


