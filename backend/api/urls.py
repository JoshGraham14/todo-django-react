from django.urls import path

from . import views

urlpatterns = [
    path('', views.api_overview, name='api_overview'),
    path('todo-list/', views.todo_item_list, name='todo_list'),
    path('todo-detail/<str:pk>/',
         views.todo_item_detail, name='todo_detail'),
    path('todo-create/', views.todo_item_create, name='todo_create'),
    path('todo-update/<str:pk>/',
         views.todo_item_update, name='todo_update'),
    path('todo-delete/<str:pk>/',
         views.todo_item_delete, name='todo_delete'),
]
