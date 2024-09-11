from django.contrib import admin

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'role', 'is_staff', 'is_superuser')
    search_fields = ('username',)
