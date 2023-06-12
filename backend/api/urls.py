from django.urls import path
from .views import (
    BoardListView,
    BoardDetailView,
    ListCreateView,
    ListDetailView,
    TaskCreateView
)
from djoser.views import UserViewSet
from djoser.views import TokenCreateView, TokenRefreshView

urlpatterns = [
    path('users/', UserViewSet.as_view({'get': 'list'}), name='user-list'),
    path('users/<int:pk>/', UserViewSet.as_view({'get': 'retrieve'}), name='user-detail'),
    path('token/login/', TokenCreateView.as_view(), name='token_create'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('boards/', BoardListView.as_view(), name='board-list'),
    path('boards/<int:pk>/', BoardDetailView.as_view(), name='board-detail'),
    path('lists/', ListCreateView.as_view(), name='list-create'),
    path('lists/<int:pk>/', ListDetailView.as_view(), name='list-detail'),
    path('tasks/', TaskCreateView.as_view(), name='task-create'),
]

