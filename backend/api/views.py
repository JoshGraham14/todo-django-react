from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import TodoItemSerializer


@api_view(['GET'])
def api_overview(request):
    api_urls = {
        'List': '/todo-list/',
        'Detail View': '/todo-detail/<str:pk>/',
        'Create': '/todo-create/',
        'Update': '/todo-update/<str:pk>/',
        'Delete': '/todo-delete/<str:pk>',
    }
    return Response(api_urls)
