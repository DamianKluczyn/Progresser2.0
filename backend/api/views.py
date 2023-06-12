from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Board, List, Task
from .serializers import (
    BoardSerializer,
    ListSerializer,
    TaskSerializer
)


class BoardListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        boards = Board.objects.filter(users__id=request.user.id)
        serializer = BoardSerializer(boards, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BoardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BoardDetailView(APIView):
    def get(self, request, pk):
        board = Board.objects.get(pk=pk)
        serializer = BoardSerializer(board)
        return Response(serializer.data)


class ListCreateView(APIView):
    def get(self, request):
        board_id = request.query_params.get('board', None)
        if board_id is not None:
            lists = List.objects.filter(board_id=board_id)
            serializer = ListSerializer(lists, many=True)
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        serializer = ListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListDetailView(APIView):
    def get(self, request, pk):
        list = List.objects.get(pk=pk)
        serializer = ListSerializer(list)
        return Response(serializer.data)


class TaskCreateView(APIView):
    def get(self, request):
        list_id = request.query_params.get('list', None)
        if list_id is not None:
            tasks = Task.objects.filter(list_id=list_id)
            serializer = TaskSerializer(tasks, many=True)
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
