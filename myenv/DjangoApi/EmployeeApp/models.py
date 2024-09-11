from django.db import models
from django.contrib.auth.models import AbstractUser,BaseUserManager


class Departments(models.Model):
    DepartmentId=models.AutoField(primary_key=True)
    DepartmentName=models.CharField(max_length=100)

class Employees(models.Model):
    EmployeesId=models.AutoField(primary_key=True)
    EmployeesName=models.CharField(max_length=100)
    Department=models.CharField(max_length=100)
    DateOfJoining=models.DateField()
    PhotoFileName=models.CharField(max_length=100)

class CustomUserManager(BaseUserManager):
    def create_user(self, username, password=None, role=None, **extra_fields):
        if not username:
            raise ValueError('The Username field must be set')
        user = self.model(username=username, role=role, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('role', 'admin') 

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, password, **extra_fields)

class CustomUser(AbstractUser):
    role = models.CharField(max_length=10, choices=[('admin', 'Admin'), ('user', 'User')], default='user')

    objects = CustomUserManager()


    