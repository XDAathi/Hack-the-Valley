from django.urls import path
from . import views

urlpatterns = [path('city/', views.return_city)



               ]