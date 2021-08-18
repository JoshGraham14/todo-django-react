from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import TodoItem
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


@api_view(['GET'])
def todo_item_list(request):
    todo_items = TodoItem.objects.all()
    serializer = TodoItemSerializer(todo_items, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def todo_item_detail(request, pk):
    todo_item = TodoItem.objects.get(id=pk)
    serializer = TodoItemSerializer(todo_item, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def todo_item_create(request):
    serializer = TodoItemSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['PUT'])
def todo_item_update(request, pk):
    todo_item = TodoItem.objects.get(id=pk)
    serializer = TodoItemSerializer(instance=todo_item, data=request.data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['DELETE'])
def todo_item_delete(request, pk):
    todo_item = TodoItem.objects.get(id=pk)
    todo_item.delete()
    return Response('Successfully deleted item!')
