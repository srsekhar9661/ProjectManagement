from django.urls import path
from api import views as v
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('projects/', v.get_projects),
    path('signup/', v.signup),
    path('login/', v.login),
    path('projects/create/', v.create_project),
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
]
