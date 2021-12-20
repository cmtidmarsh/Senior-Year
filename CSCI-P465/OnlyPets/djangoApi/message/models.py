from django.db import models
import uuid
from profile.models import Profile
from django.utils import timezone

# Create your models here.
class Message(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	fromProfile = models.CharField(max_length= 25, null = True, blank= True)
	toProfile = models.CharField(max_length= 25, null = True, blank= True)
	message_content = models.TextField(max_length= 300, null = True, blank = True)
	message_timestamp = models.DateTimeField(default=timezone.now)
	status = models.CharField(max_length= 25, null = True, blank= True)