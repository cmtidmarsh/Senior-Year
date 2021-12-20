from django import forms
from .models import PostCollection, CommentCollection


class PostForm(forms.ModelForm):
    post_content = forms.CharField(label = '')

    class Meta:
        model = PostCollection
        fields = ['post_content']

class CommentForm(forms.ModelForm):
    comment = forms.CharField(label = '')

    class Meta:
        model = CommentCollection
        fields = ['comment']