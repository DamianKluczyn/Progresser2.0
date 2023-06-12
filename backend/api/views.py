from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .models import Board, List, Task
from .serializers import (
    UserSerializer,
    BoardSerializer,
    ListSerializer,
    TaskSerializer
)


class BoardListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Zwraca tablice tylko dla zalogowanego użytkownika
        boards = Board.objects.filter(users__in=[request.user])
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
    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
