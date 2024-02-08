"""
URL configuration for tutorial project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from endpoints import views

urlpatterns = [
    path("admin/", admin.site.urls),
    path('', views.index, name='index'), 
    path('abcd', views.index2, name='index2'),# name field isn't needed
    path('getmenu', views.get_dining_menu, name='get_menu'),
    path('getmenuitems', views.get_dining_menu_items, name='get_menu_items'),
    path('getmenu/worc', views.get_menu_worc, name='get_menu_worc'),
    path('getmenu/berk', views.get_menu_berk, name='get_menu_berk'),
    path('getmenu/hamp', views.get_menu_hamp, name='get_menu_hamp'),
    path('getmenu/frank', views.get_menu_frank, name='get_menu_frank'),
]
