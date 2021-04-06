from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *
from rest_framework.response import Response
from .models import *
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination

# Create your views here.


class MovieViewSet(ModelViewSet):

    queryset = Movie.objects.all()
    serializer_class = MovieSerializer
    @action(methods=['get'],detail=False)
    def newest(self,request):
        newest=self.get_queryset().order_by('creatinon_date').last()
        serializer=self.get_serializer_class()(newest)
        return Response(serializer.data)


class GenreViewSet(ModelViewSet):

    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    
