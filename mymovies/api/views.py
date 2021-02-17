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


@api_view(["GET"])
def genreList(request):

    queryset=Genre.objects.all()
    serializer=GenreSerializer(queryset,many=True)

    return Response(serializer.data)

@api_view(["POST"])
def createGenre(request):
    try:
        Genre.objects.get(id=request.data['id'])
        return Response({"message":"This genre already exists"})
    except:
        Genre.objects.create(id=request.data['id'], name=request.data['name'])

        return Response({"message":"Created"})

