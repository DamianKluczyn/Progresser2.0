from django.urls import path
from .views import (
    BoardListView,
    BoardDetailView,
    ListCreateView,
    ListDetailView,
    TaskCreateView,
    BoardCreateView
)

urlpatterns = [
    path('boards/', BoardListView.as_view(), name='board-list'),
    path('boards/create/', BoardCreateView.as_view(), name='board-create'),
    path('boards/<int:pk>/', BoardDetailView.as_view(), name='board-detail'),
    path('lists/', ListCreateView.as_view(), name='list-create'),
    path('lists/<int:pk>/', ListDetailView.as_view(), name='list-detail'),
    path('tasks/', TaskCreateView.as_view(), name='task-create'),
]

