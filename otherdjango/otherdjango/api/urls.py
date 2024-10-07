from rest_framework.routers import DefaultRouter
from django.urls import path, include
from products.api.urls import product_router

router = DefaultRouter()

router.registry.extend(product_router.registry)

url_patterns = [
    path('', include(router.urls))
]