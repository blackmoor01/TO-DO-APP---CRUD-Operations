from django.contrib import admin
from django.urls import path, include
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

schema_view = get_schema_view(
    openapi.Info(
        title="TO-DO LIST API",
        default_version='v1',
        description="The api endpoints for my to-do list app.",
        terms_of_service = "https://www.todo.com/terms/",
        contact=openapi.Contact(email="klvnafriyie123@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('todo.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('swagger.json', schema_view.without_ui(cache_timeout=0), name='schema-json'),  # JSON Schema
    path('swagger.yaml', schema_view.without_ui(cache_timeout=0), name='schema-yaml'),  # YAML Schema
]
