from django.contrib import admin
from .models import CommentCollection, PostCollection

admin.site.register(PostCollection)
admin.site.register(CommentCollection)


