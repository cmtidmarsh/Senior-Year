import uuid
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class PostCollection(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    post_content = models.TextField()
    post_timestamp = models.DateTimeField(default=timezone.now)
    likes = models.ManyToManyField(User, blank=True, related_name= 'likes')


class CommentCollection(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    post = models.ForeignKey(PostCollection, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.TextField()
    comment_timestamp = models.DateTimeField(default=timezone.now)
