from django.http import JsonResponse
from django.http import HttpResponse
from firebase_admin import firestore
from datetime import datetime

from .databases import customers_db
from .databases import orders_db
from django.views.decorators.csrf import csrf_exempt
import json

import logging

def hello(request) -> HttpResponse:
    return HttpResponse('HELLO TO the BLANK PAGE')

def my_view(request):
    # Access the Firestore client
    db = firestore.client() 

    response_data = ""

    collections = ['Trial Collection', 'Customer', 'Orders']

    for collection_name in collections:
        collection_ref = db.collection(collection_name)
        docs = collection_ref.stream()

    for doc in docs:
        return HttpResponse(str(doc.to_dict()))

# ======================================== ======================================== ======================================== ========================================

# Customers Collection Section

    
def tryAddingData(request):

    client = customers_db.CustomersDB()
    retVal = client.createCustomer(name='Trial', spireId=9999, email='trial@gmail.com', password='passwordHere')

    if retVal == False:
        return HttpResponse('FAILURE. Customer already exists')
    else:
        return HttpResponse('SUCCESS')
@csrf_exempt   
def tryAddCustomer(request):
    print("HIA")
    name = ""
    spireId = ""
    email = ""
    password=""
    if request.method == 'POST':
        # If the content type is JSON
        if request.content_type == 'application/json':
            body_unicode = request.body.decode('utf-8')
            body_data = json.loads(body_unicode)
            
            # Extract fields from JSON data
            name = body_data.get('name')
            spireId = body_data.get('spireId')
            email = body_data.get('email')
            password = body_data.get('password')
    client = customers_db.CustomersDB()
    retVal = client.createCustomer(name=name, spireId=spireId, email=email, password=password)

    if retVal == False:
        return HttpResponse(json.dumps('FAILURE. Customer already exists'))
    else:
        return HttpResponse(json.dumps('SUCCESS'))
    

def tryRetrievingData(request):
    client = customers_db.CustomersDB()
    retVal = client.getCustomerInfo(spireId=123478)

    if retVal == None:
        return HttpResponse('FAILURE. Customer does not exist')
    else:
        return HttpResponse(str(retVal))
    
def tryPasswordChecking(request):
    client = customers_db.CustomersDB()

    retVal = client.isCorrectPassword(spireId=9999, password='password')

    if retVal == True:
        return HttpResponse('SUCCESS. Password mathcesss')
    else:
        return HttpResponse('FAILURE. Either customer non-existent of password does not match')
    
@csrf_exempt  
def tryLogin(request):
    spireId = ""
    password = ""
    if request.method == 'POST':
        # If the content type is JSON
        if request.content_type == 'application/json':
            body_unicode = request.body.decode('utf-8')
            body_data = json.loads(body_unicode)
            
            # Extract fields from JSON data
            spireId = body_data.get('spireId')
            password = body_data.get('password')
    client = customers_db.CustomersDB()

    retVal = client.isCorrectPassword(spireId=spireId, password=password)

    if retVal == True:
        return HttpResponse(json.dumps('SUCCESS. Password mathcesss'))
    else:
        return HttpResponse(json.dumps('FAILURE. Either customer non-existent of password does not match'))
    
def tryUpdatingCount(request):
    client = customers_db.CustomersDB()
    retVal = client.updateFailedPickupCount(spireId=331100, newCount=99)

    if retVal == 1:
        return HttpResponse('Successfully updated pickup count')
    elif retVal == 0:
        return HttpResponse('Customer does not exist')
    
def tryUpdatingPassword(request):
    client = customers_db.CustomersDB()
    retVal = client.updatePassword(spireId=33221100, newPass='subbu')

    if retVal == 1:
        return HttpResponse('Successfully updated password')
    elif retVal == 0:
        return HttpResponse('Customer does not exist')
    
def tryDeletingCustomer(request):
    client = customers_db.CustomersDB()
    retVal = client.deleteCustomer(spireId=12345678)
    
    if retVal == True:
        return HttpResponse('Successfully deleted customer profile')
    elif retVal == 0:
        return HttpResponse('Customer does not exist so could not delete')   
    

# ======================================== ======================================== ======================================== ========================================

# Orders Collection Section

order_datetime = datetime.now().strftime('%Y-%m-%d %H:%M:%S') # Get the current datetime

# Try adding an order method call
def tryAddingOrder(request):
    client = orders_db.OrdersDB()
    itemList = [{'itemCount': '0', 'itemName': 'bananas'}, {'itemCount': '0', 'itemName': 'chocolate milk'}]

    retVal = client.addOrder(spireId=12345678, itemList=itemList, order_datetime=order_datetime, payment_amt='0.0', payment_type='U-Swipe')

    if retVal == False:
        return HttpResponse('FAILURE. Order already exists')
    else:
        return HttpResponse('SUCCESS')
    
# Try deleting an order method call
def tryDeletingOrder(request):
    client = orders_db.OrdersDB()
    retVal = client.deleteOrder(spireId=12345678, order_id='ord1700865307')
    
    if retVal == True:
        return HttpResponse('Successfully deleted order')
    elif retVal == 0:
        return HttpResponse('Order does not exist so could not delete')
    
def tryDeletingAllOldOrders(request):
    client = orders_db.OrdersDB()
    status = client.deleteOldOrders(spireId=9999)

    return HttpResponse(status)

def tryAddingItem(request):
    client = orders_db.OrdersDB()
    status = client.addItem(order_id='ord1', spireId=12345678, itemName='Grapes', itemCount=1)

    return HttpResponse(status)

def tryDeletingItem(request):
    client = orders_db.OrdersDB()
    status = client.deleteItem(order_id='ord1', spireId=12345678, itemName='Orange')

    return HttpResponse(status)

def tryEditingItemQty(request):
    client = orders_db.OrdersDB()
    status = client.editOrderQty(order_id='ord1700865110', spireId=12345678, itemName='bananas', newQty=10)

    return HttpResponse(status) 
    
def tryGettingOrder(request):
    client = orders_db.OrdersDB()
    retVal = client.getOrderInfo(order_id='ord1', spireId=12345678)

    if retVal == None:
        return HttpResponse('FAILURE. Customer does not exist')
    else:
        return HttpResponse(str(retVal))

def tryGetttingAllOrders(request):
    client = orders_db.OrdersDB()
    retVal = client.getAllOrders(spireId=12345678)

    if retVal == None:
        return HttpResponse('FAILURE. Customer does not exist')
    else:
        return HttpResponse(str(retVal))