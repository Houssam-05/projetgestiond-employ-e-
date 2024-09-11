from rest_framework.permissions import BasePermission

class IsAdminUserOrReadOnly(BasePermission):
    

    def has_permission(self, request, view):
        # Vérifie si l'utilisateur est authentifié
        if request.user and request.user.is_authenticated:
            # Accès complet pour les administrateurs
            if request.user.is_staff:
                return True
            # Accès en lecture seule pour les utilisateurs non admin
            if request.method in ['GET', 'HEAD', 'OPTIONS']:
                return True
        return False

    def has_object_permission(self, request, view, obj):
        # La vérification est la même pour les objets que pour les vues
        return self.has_permission(request, view)