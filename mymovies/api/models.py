from django.db import models
from datetime import date
# Create your models here.

class Genre(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=15)

    def __str__(self):
        return self.name


class Movie(models.Model):

    title=models.CharField(max_length=100)
    backdrop_path=models.CharField(max_length=50,blank=True)
    poster_path=models.CharField(max_length=50,blank=True)
    homepage=models.CharField(max_length=100,blank=True)
    genres = models.ManyToManyField(Genre,default=None,blank=True)
    imdb_id=models.CharField(max_length=15,blank=True)
    overview=models.TextField(blank=True)
    runtime=models.IntegerField(blank=True)
    release_date=models.CharField(max_length=10)
    creatinon_date=models.DateTimeField(auto_now_add=True)
    tagline=models.TextField(blank=True)
    vote_average=models.FloatField(blank=True)

    def __str__(self):

        return self.title
