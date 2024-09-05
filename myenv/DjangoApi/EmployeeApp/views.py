from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from EmployeeApp.models import Departments,Employees
from EmployeeApp.serializers import DepartementSerializer,EmployeesSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes


from django.core.files.storage import default_storage
from django.http import HttpResponse

@csrf_exempt
def home(request):
    return HttpResponse("Bienvenue sur la page d'accueil")

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def departmentApi(request,id=0):
    if request.method=='GET':
        departments=Departments.objects.all()
        departments_serializer=DepartementSerializer(departments,many=True)
        return JsonResponse(departments_serializer.data,safe=False)
    elif request.method=='POST':
        department_data=JSONParser().parse(request)
        department_serializer=DepartementSerializer(data=department_data)
        if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse("Ajouter avec succer ",safe=False)
        return JsonResponse("employee non ajouter",safe=False)
    
    elif request.method=='PUT':
        department_data=JsonResponse.parse(request)
        department=Departments.objects.get(DepartmentsId=department_data['DepartementId'])
        department_serializer=DepartementSerializer(department,data=department_data)
        if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse("la modification a été faite avec succès")
        return JsonResponse("la modification n'a pas été ")
    elif request.method =='DELETE':
        department=Departments.objects.get(DepartmentsId=id)
        department.delet()
        return JsonResponse("supprimer avec succes",safe=False)
    

@csrf_exempt
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
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
    
    elif request.method == 'PUT':
        employees_data = JSONParser().parse(request)  # Correction ici (utiliser JSONParser pour parser)
        employees = Employees.objects.get(EmployeesId=employees_data['EmployeesId'])  # Correction ici (EmployeesId au lieu de DepartmentId)
        employees_serializer = EmployeesSerializer(employees, data=employees_data)  # Correction ici (utiliser EmployeesSerializer)
        if employees_serializer.is_valid():
            employees_serializer.save()
            return JsonResponse("La modification a été faite avec succès", safe=False)
        return JsonResponse("La modification n'a pas été effectuée", safe=False)
    
    elif request.method == 'DELETE':
        employees = Employees.objects.get(EmployeesId=id)
        employees.delete()  # Correction ici (delete() au lieu de delet())
        return JsonResponse("Supprimé avec succès", safe=False)
    


def SaveFile(request):
    if request.method == 'POST' and 'uploadedFile' in request.FILES:
        file = request.FILES['uploadedFile']
        file_name = default_storage.save(file.name, file)
        return JsonResponse({'file_name': file_name, 'status': 'success'})
    else:
        return JsonResponse({'error': 'No file uploaded or invalid request method'}, status=400)
