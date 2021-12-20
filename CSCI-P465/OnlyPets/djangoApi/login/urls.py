from django.urls import path
from login.views import Index #, UserRegistrationView

urlpatterns = [
    path('', Index.as_view(), name = 'index'),
    # path('register', UserRegistrationView, name  = 'account_register')
    ]