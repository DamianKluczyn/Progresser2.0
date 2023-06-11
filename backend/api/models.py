from django.db import models
from django.contrib.auth.models import User

class Board(models.Model):
    title = models.CharField(max_length=100)
    users = models.ManyToManyField(User, through='UserBoard')

class UserBoard(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)

class List(models.Model):
    name = models.CharField(max_length=100)
    order = models.IntegerField()
    board = models.ForeignKey(Board, on_delete=models.CASCADE)

class Task(models.Model):
    priority = models.IntegerField()
    difficulty = models.IntegerField()
    name = models.CharField(max_length=100)
    list = models.ForeignKey(List, on_delete=models.CASCADE)
