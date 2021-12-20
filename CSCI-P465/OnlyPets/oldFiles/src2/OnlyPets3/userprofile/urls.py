from django.urls import path
from .views import ProfileEditView, ProfileView

urlpatterns = [
    path('<pk>/', ProfileView.as_view(), name='user-profile'),
    path('edit/<pk>/', ProfileEditView.as_view(), name='edit-user-profile'),
]
