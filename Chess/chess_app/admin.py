from django.contrib import admin
from .models import *
from .models import User

admin.site.register(Moves)
# admin.site.register(Games)
# admin.site.register(Players)

class GamesAdmin(admin.ModelAdmin):
    list_display = ('id', 'Name')
    list_display_links = ('id', 'Name')

admin.site.register(Games, GamesAdmin)

