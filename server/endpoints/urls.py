from django.urls import path
from . import views
from . import firebase_views

urlpatterns = [
    # note that '' is the one that is run by default
    # path('', firebase_views.tryAddingData, name='tryAddingData'),
    # path('', firebase_views.tryRetrievingData, name='tryRetrievingData'),
    # path('', firebase_views.tryUpdatingCount, name='tryUpdatingCount'),
    # path('', firebase_views.tryUpdatingPassword, name='tryUpdatingPassword'),
    # path('', firebase_views.tryDeletingCustomer, name='tryDeletingCustomer'),
    # path('', firebase_views.tryPasswordChecking, name='tryPasswordChecking'),

    # orders_db testing paths
    # path('', firebase_views.tryAddingOrder, name='tryAddingOrder'),
    # path('', firebase_views.tryDeletingOrder, name='tryDeletingOrder'),
    # path('', firebase_views.tryAddingItem, name='tryAddingItem'),
    # path('', firebase_views.tryDeletingItem, name='tryDeletingItem'),
    # path('', firebase_views.tryEditingItemQty, name='tryEditingItemQty'),
    # path('', firebase_views.tryGettingOrder, name='tryRetrievingOrder'),
    # path('', firebase_views.tryGetttingAllOrders, name='tryRetrievingAllOrders'),
    # path('', firebase_views.tryDeletingItem, name='tryDeletingAllOldOrders'),

    path('', firebase_views.hello, name='hello'),
    path('endpoints/', views.init, name='init'),
    path('endpoints/getmeals', views.getmeals, name='getmeals')
]

