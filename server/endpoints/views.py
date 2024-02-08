from django.shortcuts import render
from django.http import HttpResponse
from umass_toolkit import dining
from umass_toolkit import dining_utils
import json
# Create your views here.

def index(request):
    return HttpResponse("Hello World")

def index2(request):
    return HttpResponse("Requests work!")


# Could also use json.stringify() to convert Python object to JSON string

"""
Request types:
GET (get the menu):
1) Worcester
2) Franklin
3) Hampshire
4) Berkshire

POST (logging in)

POST (getting order information)
"""

def get_menu_worc(request):
    result = dining.get_menu_items(dining.location_name_to_id('Worcester Grab ‘N Go'))
    return HttpResponse(json.dumps(result))

def get_menu_hamp(request):
    result = dining.get_menu_items(dining.location_name_to_id('Hampshire Grab ‘N Go'))
    return HttpResponse(json.dumps(result))

def get_menu_berk(request):
    result = dining.get_menu_items(dining.location_name_to_id('Berkshire Grab ‘N Go'))
    return HttpResponse(json.dumps(result))

def get_menu_frank(request):
    result = dining.get_menu_items(dining.location_name_to_id('Franklin Grab ‘N Go'))
    return HttpResponse(json.dumps(result))