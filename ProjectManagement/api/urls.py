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
    path('projects/<int:pk>/update/', v.update_project),
    path('projects/<int:pk>/delete/', v.delete_project),
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('projects/<int:id>/', v.get_project_detail),
    path('projects/<int:project_id>/tasks/', v.get_tasks),
    path('projects/<int:project_id>/tasks/create/', v.create_task),
    # path('projects/<int:id>/', v.delete_project),
    path('get-user-info/', v.get_user_info),
    path('get-all-tasks/', v.get_all_tasks),
    path('get-task-detail/<int:id>/', v.get_task_detail),
    path('tasks/<int:task_id>/add-comment/', v.add_comments),
    path('get-collaboration-projects/', v.get_collaboration_projects),
    path('projects/<int:project_id>/invite/', v.invite_user),
    path('accept-invite/<uuid:token>/', v.accept_invite),
    path('invite-details/<uuid:token>/', v.get_invite_details),
    path('projects/<int:project_id>/members/', v.get_project_members),
]
