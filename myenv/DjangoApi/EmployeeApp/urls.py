from django.urls import path
from EmployeeApp import views
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
urlpatterns = [
    path('', views.home),
    path('department/', views.departmentApi,name='department_list'),
    path('department/<int:id>/', views.departmentApi,name='department_detail'),
    path('employee/',views.employeeApi,name='employee_list'),
    path('employee/<int:id>/',views.departmentApi,name='employee_detail'),
    path ('saveFile/',views.SaveFile),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)