import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from EmployeeApp.models import Employees

@pytest.mark.django_db
class TestEmployeeApi:

    def setup_method(self):
        self.client = APIClient()

    def test_get_employee_list(self):
        # Arrange: créer des employés pour le test
        Employees.objects.create(name="John Doe", position="Developer")
        Employees.objects.create(name="Jane Smith", position="Manager")

        url = reverse('employee_list')  # Assurez-vous d'avoir ce nom dans votre urls.py
        
        # Act: envoyer une requête GET à l'API
        response = self.client.get(url)

        # Assert: vérifier que la réponse est correcte
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 2

    def test_get_employee_detail(self):
        # Arrange: créer un employé pour le test
        employee = Employee.objects.create(name="John Doe", position="Developer")

        url = reverse('employee_detail', args=[employee.id])
        
        # Act: envoyer une requête GET pour un employé spécifique
        response = self.client.get(url)

        # Assert: vérifier que la réponse est correcte
        assert response.status_code == status.HTTP_200_OK
        assert response.data['name'] == "John Doe"