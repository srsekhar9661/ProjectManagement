from django.urls import path
from core import views 


app_name = 'core'
urlpatterns = [
    path('auth/signup/', views.signup_view, name='signup'),
    path('auth/login/', views.login_view, name='login'),
    path('auth/logout/', views.logout_view, name='logout'),

    path('', views.home_view, name='home'),
    # path('pricing/', views.pricing_page, name='pricing_page'),
    path('dashboard/', views.dashboard_view, name='dashboard_page'),
]