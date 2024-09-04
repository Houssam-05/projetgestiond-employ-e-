from DjangoApi.EmployeeApp.models import Departments
import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient


@pytest.mark.django_db  
class TestDepartmentApi:

    def setup_method(self):
        self.client = APIClient()

    def test_get_department_list(self):
        # Arrange: créer des départements pour le test
        Departments.objects.create(name="IT")
        Departments.objects.create(name="HR")

        url = reverse('department_list')  # Assurez-vous d'avoir ce nom dans votre urls.py
        
        # Act: envoyer une requête GET à l'API
        response = self.client.get(url)

        # Assert: vérifier que la réponse est correcte
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 2

    def test_get_department_detail(self):
        # Arrange: créer un département pour le test
        department = Departments.objects.create(name="IT")

        url = reverse('department_detail', args=[department.id])
        
        # Act: envoyer une requête GET pour un département spécifique
        response = self.client.get(url)

        # Assert: vérifier que la réponse est correcte
        assert response.status_code == status.HTTP_200_OK
        assert response.data['name'] == "IT"