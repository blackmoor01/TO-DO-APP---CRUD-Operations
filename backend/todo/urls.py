from .import views
from rest_framework import routers # automatically generates URLs for viewsets

router = routers.DefaultRouter() # automatically handles URL routing for viewsets and creates an instance of the router, which maps viewsets to URLs
router.register('todo', views.TodoViewSet, basename='todo')

urlpatterns = [

]

urlpatterns += router.urls