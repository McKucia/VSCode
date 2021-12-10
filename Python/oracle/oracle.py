import cx_Oracle

class Employee:
    def __init__(self, firstName, lastName, title, salary, managerId, employeeId):
        self.firstName = firstName
        self.lastName = lastName
        self.title = title
        self.salary = salary
        self.managerId = managerId
        self.employeeId = employeeId

class CRUD:
    def __init__(self):
        cx_Oracle.init_oracle_client(lib_dir=r"C:\instantclient_19_11")
        self.connection = cx_Oracle.connect(
            user="MCKUCIA",
            password="AlfaRomeo147!",
            dsn="localhost/xepdb1")
        self.cursor = self.connection.cursor()
        print("Successfully connected to Oracle Database")

    def create(self, employee):
        self.cursor.execute("""insert into 
            employees(first_name, last_name, title, salary, manager_id, employee_id)
            values(:1, :2, :3, :4, :5, :6)""", 
            (employee.firstName, employee.lastName, 
            employee.title, employee.salary, 
            employee.managerId, employee.employeeId))
        self.connection.commit()
    def read(self):
        for row in self.cursor.execute('select * from employees'):
            print(row[1], row[2],row[3],row[4],row[5])
    def update(self, employee):
        self.cursor.execute("""update employees set 
            first_name= :1,
            last_name= :2,
            title= :3,
            salary= :4,
            manager_id= :5 where employee_id= :6""",
            (employee.firstName, employee.lastName, 
            employee.title, employee.salary, 
            employee.managerId, employee.employeeId))
        self.connection.commit()
    def delete(id):
        self.cursor.execute("delete from employees where employee_id=:id", {'id':id})
        self.connection.commit()

crud = CRUD()
newEmployee = Employee("Maciej", "Kucia", "Developer", 20000, 2, 5)
crud.create(newEmployee)
crud.read()
crud.delete(5)
crud.read()
newEmployee2 = Employee("Maciej", "Kucia", "CEO", 15000, 2, 5)
crud.update(newEmployee2)