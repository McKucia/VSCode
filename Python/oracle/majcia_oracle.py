import cx_Oracle

class Customer:
    def __init__(self, firstName, lastName, DOB, phone, customerId):
        self.firstName = firstName
        self.lastName = lastName
        self.DOB = DOB
        self.phone = phone
        self.customerId = customerId

class CRUD:
    def __init__(self):
        cx_Oracle.init_oracle_client(lib_dir=r"C:\instantclient_19_11")
        self.connection = cx_Oracle.connect(
            user="user1",
            password="user123",
            dsn="localhost/xepdb1")
        self.cursor = self.connection.cursor()
        print("Successfully connected to Oracle Database")

    def create(self, customer):
        self.cursor.execute("""insert into 
            customers(first_name, last_name, DOB, phone, customer_id)
            values(:1, :2, :3, :4, :5)""", 
            (customer.firstName, customer.lastName, 
            customer.DOB, customer.phone, 
            customer.customerId))
        self.connection.commit()
    def read(self):
        for row in self.cursor.execute('select * from employees'):
            print(row[1], row[2],row[3],row[4])
    def update(self, customer):
        self.cursor.execute("""update customers set 
            first_name= :1,
            last_name= :2,
            DOB= :3,
            phone= :4,
            customer_id= :5 where customer_id= :6""",
            (customer.firstName, customer.lastName, 
            customer.DOB, customer.phone, 
            customer.customer_id))
        self.connection.commit()
    def delete(id):
        self.cursor.execute("delete from customers where customer_id=:id", {'id':id})
        self.connection.commit()

crud = CRUD()
newCustomer = Customer("Maja", "Kornaga", "00/04/07", "666-666-666", 6)
crud.create(newCustomer)
crud.read()
crud.delete(6)
crud.read()
newCustomer2 = Customer("Maja", "Kornaga", "01/04/07", "123-123-123", 6)
crud.update(newCustomer2)