from django.contrib.auth import logout, authenticate, login
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView

from chess_app.models import Games, Moves
from rest_framework import serializers
from django.contrib.auth.models import User, Permission

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = User
        # Поля, которые мы сериализуем
        fields = ["pk", "email", "username", "password", "is_staff"]

class GamesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Games
        fields = ['pk', 'Name', 'WhitePlayerID', 'BlackPlayerID', 'Status', 'Result']

# class PlayersSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Players
#         fields = ['pk', 'name', 'login', 'password']

class MovesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Moves
        fields = ['pk', 'GameID', 'PlayerID', 'Cur_pos', 'FigureKEY', 'Status']


class Registration(APIView):
    def post(self, request, format=None):
        data = self.request.data
        username = data['username']
        password = data['password']
        if User.objects.filter(username = username).exists():
            return Response({'error':'Username already exists'})
        else:
            user = User.objects.create_user( username=username, password=password)
            user.user_permissions.add(*Permission.objects.filter(codename='view_sign_up'))
            user.user_permissions.add(*Permission.objects.filter(codename='add_sign_up'))
            # user.user_permissions.add(permissions)
            user.save()
        return Response({'success': 'User created'});

class GetCSRFToken(APIView):
    def get(self, request, format=None):
        return Response({'success': 'CSRF cookie set'})

class Check(APIView):
    def get(self, request, format=None):
        user = self.request.user
        isAuthenticated = user.is_authenticated

        if isAuthenticated:
            return Response({'isAuthenticated':'success'})
        else:
            return Response({'isAutheticated': 'error'})

class LoginView(APIView):
    def post(self, request, format=None):
        data = self.request.data
        username = data['username']
        password = data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return Response({'success':'User authenticated', 'username': username, 'pk':user.pk})
        else:
            return Response({'error':'Error Authenticated'})

class LogoutView(APIView):
    def post(self, request, format=None):

        try:
            logout(request)
            return Response({'success': 'User Logout'})
        except:
            return Response({'error':'Error logout'})



class profile(APIView):
    serializer_class = UserSerializer
    def get(self, request, format=None):
        data = self.request.data

        #     profile = User.objects.get(pk = user.data.pk)
        return HttpResponse({'success': data})