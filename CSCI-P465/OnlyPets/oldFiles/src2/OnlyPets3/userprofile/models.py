from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, primary_key= True, null = False, on_delete= models.CASCADE, related_name = 'profile')
    firstname = models.CharField(max_length= 25)
    lastname = models.CharField(max_length= 25, null = True, blank= True)
    gender = models.CharField(max_length= 25, null = True, blank= True)
    bio = models.TextField(max_length= 300, null = True, blank = True)
    birthdate = models.DateField(null= True, blank= True)
    displaypic = models.ImageField(upload_to = 'uploads/display_pictures', blank = True, default = 'uploads/display_pictures/default.png')
    city = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)


@receiver(post_save, sender = User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user = instance)

@receiver(post_save, sender = User)
def save_user_profile(sender, instance, created, **kwargs):
    instance.profile.save()