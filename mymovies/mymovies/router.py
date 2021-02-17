
from api.views import *
from rest_framework import routers



router = routers.DefaultRouter()
router.register('movies',MovieViewSet)
