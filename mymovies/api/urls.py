from django.urls import path
from api import views


urlpatterns = [

    path("genre",views.createGenre),
    path("genre-list",views.genreList)


]
