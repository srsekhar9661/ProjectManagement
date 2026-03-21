from django.urls import path
from api import views as v

urlpatterns = [
    path('projects/', v.get_projects),
    path('signup/', v.signup),
]
