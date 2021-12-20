# from django import forms
# from django.contrib.auth.forms import UserCreationForm
# from django.contrib.auth.models import User

# class UserRegistrationForm(UserCreationForm):
#     firstname = forms.CharField(max_length = 30)
#     lastname = forms.CharField(max_length = 30)
#     email = forms.EmailField(required = True)
#     username = forms.CharField(max_length = 30)
#     password1= forms.CharField(widget = forms.PasswordInput)
#     password2= forms.CharField(widget = forms.PasswordInput)
#     birthday = forms.DateField(required = True)

#     class Meta:
#         model = User
#         fields = ('firstname', 'lastname', 'email', 'username', 'password1', 'password2', 'birthday')