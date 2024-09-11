import json
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from .permissions import IsAdminUserOrReadOnly
from EmployeeApp.models import Departments, Employees
from EmployeeApp.serializers import DepartementSerializer, EmployeesSerializer,UserRegistrationSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.views import APIView
from django.core.files.storage import default_storage
from django.http import HttpResponse
from .models import CustomUser

@csrf_exempt
def home(request):
    return HttpResponse("Bienvenue sur la page d'accueil")

@api_view(['GET', 'POST', 'PUT', 'DELETE' , 'OPTIONS'])
@permission_classes([IsAuthenticated,IsAdminUserOrReadOnly])
def departmentApi(request, id=0):
    if request.method == 'GET':
        if id == 0:
            # Obtenir tous les départements
            departments = Departments.objects.all()
            departments_serializer = DepartementSerializer(departments, many=True)
            return JsonResponse(departments_serializer.data, safe=False)
        else:
            # Obtenir un seul département par ID
            try:
                department = Departments.objects.get(DepartmentId=id)
                department_serializer = DepartementSerializer(department)
                return JsonResponse(department_serializer.data, safe=False)
            except Departments.DoesNotExist:
                return JsonResponse({"message": "Department not found"}, status=404)

    elif request.method == 'POST':
        department_data = JSONParser().parse(request)
        department_serializer = DepartementSerializer(data=department_data)
        if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse({"message": "Added successfully"}, status=201)
        return JsonResponse({"message": "Failed to add department", "errors": department_serializer.errors}, status=400)

    elif request.method == 'PUT':
        department_data = json.loads(request.body)
        try:
            department = Departments.objects.get(DepartmentId=department_data['DepartmentId'])
            department_serializer = DepartementSerializer(department, data=department_data)
            if department_serializer.is_valid():
                department_serializer.save()
                return JsonResponse({"message": "Updated successfully"}, status=200)
            return JsonResponse({"message": "Failed to update department", "errors": department_serializer.errors}, status=400)
        except Departments.DoesNotExist:
            return JsonResponse({"message": "Department not found"}, status=404)

    elif request.method == 'DELETE':
        try:
            department = Departments.objects.get(DepartmentId=id)
            department.delete()
            return JsonResponse({"message": "Deleted successfully"}, status=200)
        except Departments.DoesNotExist:
            return JsonResponse({"message": "Department not found"}, status=404)

    return JsonResponse({"message": "Method not allowed"}, status=405)
    
    

@csrf_exempt
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated,IsAdminUserOrReadOnly])
def employeeApi(request, id=0):
    if request.method == 'GET':
        employees = Employees.objects.all()
        employees_serializer = EmployeesSerializer(employees, many=True)
        return JsonResponse(employees_serializer.data, safe=False)
    
    elif request.method == 'POST':
        employees_data = JSONParser().parse(request)
        employees_serializer = EmployeesSerializer(data=employees_data)
        if employees_serializer.is_valid():  # Correction ici (is_valid() au lieu de is_valide())
            employees_serializer.save()
            return JsonResponse("Ajouté avec succès", safe=False)
        return JsonResponse(employees_serializer.errors, status=400)
    
    if request.method == 'PUT':
        try:
            employee_data = JSONParser().parse(request)
            print(employee_data)  # Afficher les données reçues dans la console pour déboguer

            if 'EmployeesId' not in employee_data:
                return JsonResponse({'error': 'EmployeesId not found in request'}, status=400)

            employee = Employees.objects.get(EmployeesId=employee_data['EmployeesId'])
            employee_serializer = EmployeesSerializer(employee, data=employee_data)
            
            if employee_serializer.is_valid():
                employee_serializer.save()
                return JsonResponse("Updated Successfully!!", safe=False)
            return JsonResponse("Failed to Update.", safe=False)
        
        except Employees.DoesNotExist:
            return JsonResponse("Employee not found.", safe=False)
        
        except KeyError as e:
            return JsonResponse({'error': f'Missing key: {str(e)}'}, status=400)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    elif request.method == 'DELETE':
        try:
            employee = Employees.objects.get(EmployeesId=id)
            employee.delete()
            return JsonResponse({"message": "Deleted successfully"}, status=200)
        except Departments.DoesNotExist:
            return JsonResponse({"message": "Employee not found"}, status=404)

    return JsonResponse({"message": "Method not allowed"}, status=405)

@csrf_exempt
def SaveFile(request):
    if request.method == 'POST' and 'uploadedFile' in request.FILES:
        file = request.FILES['uploadedFile']
        file_name = default_storage.save(file.name, file)
        return JsonResponse({'file_name': file_name, 'status': 'success'})
    else:
        return JsonResponse({'error': 'No file uploaded or invalid request method'}, status=400)
    
class UserRegistrationView(APIView):
    def get(self, request, *args, **kwargs):
        user_id = kwargs.get('pk')  # Récupère l'identifiant de l'utilisateur à partir des arguments
        if user_id:
            try:
                user = CustomUser.objects.get(pk=user_id)
                serializer = UserRegistrationSerializer(user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except CustomUser.DoesNotExist:
                return Response({"detail": "Utilisateur non trouvé"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"detail": "ID utilisateur manquant"}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Utilisateur créé avec succès"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


