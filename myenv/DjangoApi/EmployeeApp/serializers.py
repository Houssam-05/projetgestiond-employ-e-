from rest_framework import serializers
from EmployeeApp.models import CustomUser, Departments,Employees
from django.contrib.auth.models import User



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
        
class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'password', 'role']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        role=validated_data['role']
        if role == 'admin':
            user = CustomUser.objects.create_superuser(
            username=validated_data['username'],
            password=validated_data['password'],
            role=validated_data['role']
        )
        else:
            
            user = CustomUser.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            role=validated_data['role'] 
            )
        return user