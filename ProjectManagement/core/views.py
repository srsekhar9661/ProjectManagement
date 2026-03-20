from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from django.http import HttpResponse, JsonResponse
from core.forms import SignupForm, LoginForm
from django.contrib.auth.decorators import login_required
# from core.models import (Pricing, )

def signup_view(request):
    if request.method == 'GET':
        return render(request, 'auth/signup.html')
    elif request.method == 'POST':
        # import ipdb;ipdb.set_trace(context=15)
        form = SignupForm(request.POST)
        if form.is_valid():
            user, org = form.save()
            return redirect('core:login')
    else:
        return HttpResponse('Unsupported method', status=405)


def login_view(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():    
            username_or_email = form.cleaned_data.get('username_or_email')
            password = form.cleaned_data.get('password')

            user = None
            
            if '@' in username_or_email:
                try:
                    user_obj = User.objects.get(email=username_or_email)
                    user = authenticate(username=user_obj.username, password=password)
                except Exception as e:
                    user = None
            else:
                user = authenticate(username=username_or_email, password=password)
            
            if user is not None:
                login(request, user)
                return redirect('core:home')
            else:
                errors = ["Invalid credentials"]
                return render(request, 'auth/login.html', {'errors':errors})
        else:
            errors = ['Credentials are missing.']
            return render(request, 'auth/login.html', {'errors':errors})
            
    return render(request, 'auth/login.html')


def logout_view(request):
    logout(request)
    return redirect('core:login')

def home_view(request):
    return render(request, 'core/home.html')

# def pricing_page( 


def create_project(request):
    pass

@login_required
def dashboard_view(request):
    return render(request, 'core/dashboard.html')