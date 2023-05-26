from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from chess_app import views as chess_app_views

from chess_app.views import GamesViewSet, MovesViewSet, Registration, GetCSRFToken, LoginView, LogoutView, Check, profile, FilteredGames


router = routers.DefaultRouter()
router.register(r'games', GamesViewSet, basename='GamesViewSet')
# router.register(r'players', PlayersViewSet)
router.register(r'players', chess_app_views.UserViewSet)
router.register(r'moves', MovesViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),

    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/register/', Registration.as_view(), name='register'),
    path('csrf_cookie', GetCSRFToken.as_view()),
    path('authenticated', Check.as_view()),
    path('logout', LogoutView.as_view()),
    path('login', LoginView.as_view()),
    path('profile', profile.as_view()),
    path('stat/', FilteredGames.as_view()),
    # path('games/<pk>/', GamesViewSet.as_view(), name='index'),

]
