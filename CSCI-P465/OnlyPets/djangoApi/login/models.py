# from django.db import models
# from django.contrib.auth.models import User
# from django.db.models.signals import post_save
# from django.dispatch import receiver

# # Create your models here.
# class UserRegistration(models.Model):
#     user = models.OneToOneField(User, primary_key= True, null = False, on_delete= models.CASCADE)
#     firstname = models.CharField(max_length= 32)
#     lastname = models.CharField(max_length= 32, null = True, blank= True)
#     email = models.EmailField()
#     username = models.CharField(max_length = 32)
#     password1= models.CharField(max_length= 32)
#     password2= models.CharField(max_length= 32)
#     birthday = models.DateField()

# @receiver(post_save, sender=User)
# def create_user_account(sender, instance, created, **kwargs):
#     if created:
#         UserRegistration.objects.create(user=instance)

# @receiver(post_save, sender=User)
# def save_user_account(sender, instance, **kwargs):
#     instance.userregistration.save()

