# # from django.db import models as djangoModel
# # from firebase_orm import models

# # Create your models here.
# class Customer(models.Model):
#   name = models.CharField(max_length=50)
#   spireId = models.IntegerField(primary_key=True)
#   email = models.EmailField()
#   failedPickupCount = models.IntegerField()

# class Order(models.Model):
#   orderDateTime = models.DateTimeField()
#   spireId = models.ForeignKey(Customer, on_delete=models.CASCADE)

#   paymentType = models.CharField(max_length=20)
#   paymentAmt = models.DecimalField(max_digits=5, decimal_places=2) # decimal > float due to precision, arithmetic exactness, etc

#   # cannot use arrayfield or jsonfield 
#   #   - requires using  MariaDB, MySQL, Oracle, PostgreSQL, and SQLite with 
#   #   - with json1 extension
#   # , delim or some other option
#   itemList = models.TextField()
# # # Create your models here.

# # # 1 - Customer info db/table clas
# # class Customer(djangoModel.Model):
# #   name = djangoModel.CharField(max_length=50)
# #   spireId = djangoModel.IntegerField(primary_key=True)
# #   email = djangoModel.EmailField()
# #   failedPickupCount = djangoModel.IntegerField()

# # class User(models.Model):
# #   name = models.TextField()
# #   email = models.TextField()

# #   class Meta:
# #     db_table = 'UserTable'

# # # 2 - The order db/table class
# # class Order(djangoModel.Model):
# #   orderDateTime = djangoModel.DateTimeField()
# #   spireId = djangoModel.ForeignKey(Customer, on_delete=djangoModel.CASCADE)

# #   paymentType = djangoModel.CharField(max_length=20)
# #   paymentAmt = djangoModel.DecimalField(max_digits=5, decimal_places=2) # decimal > float due to precision, arithmetic exactness, etc

# #   # cannot use arrayfield or jsonfield 
# #   #   - requires using  MariaDB, MySQL, Oracle, PostgreSQL, and SQLite with 
# #   #   - with json1 extension
# #   # , delim or some other option
# #   itemList = djangoModel.TextField()
