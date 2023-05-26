from django.db import models
from django.contrib.auth.models import User

class Games(models.Model):
    Name = models.CharField(max_length=100, null=True)
    WhitePlayerID = models.ForeignKey(User, on_delete = models.CASCADE, null=True, related_name='requests_created')
    BlackPlayerID = models.ForeignKey(User, on_delete = models.CASCADE, null=True, related_name='requests_assigned')
    Status = models.CharField(max_length=4, null=True)
    Result = models.CharField(max_length=50, null=True)

    class Meta:
        managed = False
        db_table = 'games'

# class Players(models.Model):
#     name = models.CharField(max_length=100, null=False)
#     login = models.CharField(max_length=100, null=False)
#     password = models.CharField(max_length=45, null=False)
#
#     class Meta:
#         managed = False
#         db_table = 'players'

class Moves(models.Model):
    GameID = models.ForeignKey(Games, on_delete = models.CASCADE, null=True, related_name='request')
    PlayerID = models.ForeignKey(User, on_delete = models.CASCADE, null=True, related_name='requestt')
    Cur_pos = models.CharField(max_length=4, null=True)
    FigureKEY = models.CharField(max_length=8, null=True)
    Status = models.CharField(max_length=8, null=True)

    class Meta:
        managed = False
        db_table = 'moves'