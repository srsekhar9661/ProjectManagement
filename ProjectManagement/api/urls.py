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
    path('projects/<int:id>/', v.get_project_detail),
    path('projects/<int:project_id>/tasks/', v.get_tasks),
    path('projects/<int:project_id>/tasks/create/', v.create_task),
    path('projects/<int:id>/', v.delete_project),
    path('get-user-info/', v.get_user_info),
    path('get-all-tasks/', v.get_all_tasks),
]
