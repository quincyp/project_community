from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('resources/', views.resources_index, name='index'),
    path('resources/<int:resource_id>/detail', views.resources_detail, name='detail'),
]