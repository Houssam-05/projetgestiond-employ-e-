from rest_framework import serializers
from EmployeeApp.models import Departments,Employees

class DepartementSerializer(serializers.ModelSerializer):
    class Meta:
        model= Departments
        fields= ('DepartmentId',
                 'DepartmentName')
class EmployeesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Employees
        fields=('EmployeesId',
                'EmployeesName',
                'Department',
                'DateOfJoining',
                'PhotoFileName')

