from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api import views

router = DefaultRouter()
router.register('movies', views.MovieViewSet)
router.register('genres', views.GenreViewSet)
urlpatterns = [
    path('',include(router.urls)),


]
