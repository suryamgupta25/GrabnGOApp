from firebase_admin import firestore
import google.cloud.exceptions as gex

# TODO (Consideration): Do we want to create this as a static class??
# TODO (MUST Implement): Add consistent return types to denote success and failure
class CustomersDB:
  def __init__(self) -> None:
    # client for any database dealings
    self.client = firestore.client()
    self.NAME = 'name'
    self.EMAIL = 'email'
    self.SPIREID = 'spireId'
    self.FAILEDPICKUPCOUNT = 'failedPickupCount'
    self.PASSWORD = 'password'

    self.CUSTOMERS = 'Customers'

  def createCustomer(self, name : str, spireId : int, email : str, password : str) -> bool:
    '''
    Creates a customer entry in the customers collection on firestore
    
    Returns:
      - False if customer with given spireId already exists
      - True otherwise

    Assumptions:
      - Email is a valid email id
      - spireId is a valid spireId
      - student exists with given name
    '''

    try:
      customerCollection = self.client.collection(self.CUSTOMERS)
      
      custInfo : dict = {self.NAME : name, self.EMAIL : email, self.SPIREID : spireId, self.FAILEDPICKUPCOUNT : 0, self.PASSWORD : password}
      customerCollection.add(document_data = custInfo, document_id = str(spireId))
      self.createOrdersCollection(spireId=spireId)

      return True
    except gex.Conflict:
      return False
  
  def createOrdersCollection(self, spireId : int):
    docRef = self.client.document(self.CUSTOMERS, str(spireId))
    # docRef = self.client.collection(self.CUSTOMERS).document(str(spireId))
    collRef = docRef.collection('Orders')
    collRef.add(document_data = {'fakeFieldName': 'fakeFieldValue'}, document_id='-1')

  def getCustomerInfo(self, spireId : int) -> dict:
    '''
    Gets all the customer info for a customer with the given spire id

    Returns:
      - None if such a customer does not exist
      - A dictionary containing key value pairs of all info regarding a customer
      - Must use array indexing since keys are strings so . indexing won't work
      - Keys - Type: 'name' - str, 'email' - str, 'password' - str, 'spireId' - int, 'failedPickupCount' - int
    '''

    # TODO (Consideration): Even if doc does not exist no exception raised. Just to_dict returns None
    # Is this fine??

    try:
      # document takes in the path as comma separated values
      # / is also allowed but used comma for clarity
      docRef = self.client.document(self.CUSTOMERS, str(spireId))
      docSnap = docRef.get()

      return docSnap.to_dict()
    except Exception as e:
      return None
    
  def isCorrectPassword(self, spireId : int, password : str) -> bool:
    '''
    Checks if the password for the customer with the given spireId matches

    Returns:
      - False if customer does not exist or password does not match
      - True if customer exists and password does match
    '''
    customerDict = self.getCustomerInfo(spireId=spireId)
    if (customerDict == None) or (customerDict[self.PASSWORD] != password) :
      return False
    else:
      return True 
    

  def updatePassword(self, spireId : int, newPass : str) -> int:
    '''
    Updates the password of a customer with the given spire id to the new one provided.
    Does not permit empty passwords. Note for legacy customers can be used to add a password field

    Returns:
      - 1 if successfull
      - 0 if customer does not exist
      - -1 if password is empty string
    '''

    if newPass == '':
      return -1

    try:
      # document takes in the path as comma separated values
      # / is also allowed but used comma for clarity
      customerRef = self.client.document(self.CUSTOMERS, str(spireId))
      customerSnap = customerRef.get()

      customerProfile = customerSnap.to_dict()

      # Needed. NotFound exception is not raised
      if customerProfile == None:
        return 0

      customerProfile[self.PASSWORD] = newPass
      customerRef.update(field_updates=customerProfile)
      return 1
    except gex.NotFound:
      return 0

  def updateEmail(self, spireId : int, newEmail : str) -> int:
    '''
    Updates the name of a customer with the given spire id to the new name provided.
    Does not permit empty names.

    Assumptions: newEmail is a valid email id

    Returns:
      - 1 if successfull
      - 0 if customer does not exist
      - -1 if newEmail is empty string
    '''

    if newEmail == '':
      return -1

    try:
      # document takes in the path as comma separated values
      # / is also allowed but used comma for clarity
      customerRef = self.client.document(self.CUSTOMERS, str(spireId))
      customerSnap = customerRef.get()

      customerProfile = customerSnap.to_dict()

      # Needed. NotFound exception is not raised
      if customerProfile == None:
        return 0

      customerProfile[self.EMAIL] = newEmail
      customerRef.update(field_updates=customerProfile)
      return 1
    except gex.NotFound:
      return 0

  def updateName(self, spireId : int, newName : str) -> int:
    '''
    Updates the name of a customer with the given spire id to the new name provided.
    Does not permit empty names.

    Assumptions: newName does not contain special characters and weird numbers

    Returns:
      - 1 if successfull
      - 0 if customer does not exist
      - -1 if newName is empty string
    '''

    if newName == '':
      return -1

    try:
      # document takes in the path as comma separated values
      # / is also allowed but used comma for clarity
      customerRef = self.client.document(self.CUSTOMERS, str(spireId))
      customerSnap = customerRef.get()

      customerProfile = customerSnap.to_dict()

      # Needed. NotFound exception is not raised
      if customerProfile == None:
        return 0

      customerProfile[self.NAME] = newName
      customerRef.update(field_updates=customerProfile)
      return 1
    except gex.NotFound:
      return 0
    
  def updateFailedPickupCount(self, spireId : int, newCount : int) -> int:
    '''
    Updates the failedPickupCount of a customer with the given spire id to the new value provided.
    Permits increasing, decreasing or keeping the same.

    Returns:
      - 1 if successfully updated
      - 0 if customer does not exist
      - -1 if newCount is negative (takes precedence over customer not existing)
    '''

    if newCount < 0:
      return -1

    try:
      # document takes in the path as comma separated values
      # / is also allowed but used comma for clarity
      customerRef = self.client.document(self.CUSTOMERS, str(spireId))
      customerSnap = customerRef.get()

      customerProfile = customerSnap.to_dict()

      # Needed. NotFound exception is not raised
      if customerProfile == None:
        return 0 

      customerProfile[self.FAILEDPICKUPCOUNT] = newCount
      customerRef.update(field_updates=customerProfile)
      return 1
    except gex.NotFound:
      return 0
  
  def deleteCustomer(self, spireId : int) -> bool:
    '''
    Irreversibly deletes the all data relating to a customer - profile + orders \n

    Returns:
      - True [does nothing if user with spireId does not exist]
    '''

    # TODO (Consideration): As of now delete does not permit error checking with whether document was present
    # Do we really need to know whether customer even existed in the first place??
    try:

      customerRef = self.client.document(self.CUSTOMERS, str(spireId))
      customerRef.delete()
      return True
    except Exception as e:
      return False