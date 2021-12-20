from django.shortcuts import render, redirect
from django.views import View
# from .forms import UserRegistrationForm
# from django.contrib.auth import login
# from django.contrib import messages
from django.contrib.auth.mixins import UserPassesTestMixin, LoginRequiredMixin

class Index(View):
    def get(self, request, *args, **kwargs):
        return render(request, 'login/index.html')

# def UserRegistrationView(request):
#     if request.method == "POST":
#         form = UserRegistrationForm(request.POST)
#         if form.is_valid():
#             form = form.save()
#             return redirect("account_login")
#         messages.error(request, "Unsuccessful registration")
	
#     form = UserRegistrationForm()

#     context = {"registration_form": form}
    
#     return render (request=request, template_name="login/register.html", context= context)