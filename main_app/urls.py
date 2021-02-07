from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('about/', views.about, name='about'),
    path('resources/', views.resources_index, name='resources_index'),
    path('resources/<int:resource_id>/detail', views.resources_detail, name='resources_detail'),
    path('resources/new', views.resources_new, name='resources_new'),
    path('resources/<int:resource_id>/edit', views.resources_edit, name='resources_edit'),
]