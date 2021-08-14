from django.urls import path

from . import views

urlpatterns = [
    path('', views.api_overview, name='api_overview'),
    path('todo-item-list/', views.todo_item_list, name='todo_item_list'),
    path('todo-item-detail/<str:pk>/',
         views.todo_item_detail, name='todo_item_detail'),
    path('todo-item-create/', views.todo_item_create, name='todo_item_create'),
    path('todo-item-update/<str:pk>/',
         views.todo_item_update, name='todo_item_update'),
    path('todo-item-delete/<str:pk>/',
         views.todo_item_delete, name='todo_item_delete'),
]
