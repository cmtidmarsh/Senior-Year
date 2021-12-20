from django.shortcuts import render
from .models import PostCollection, CommentCollection
from profile.models import Profile
from django.http import HttpResponseRedirect
from django.views import View
from .forms import PostForm, CommentForm
from django.urls import reverse_lazy
from django.contrib.auth.mixins import UserPassesTestMixin, LoginRequiredMixin
from django.views.generic.edit import UpdateView, DeleteView
from django.db.models import Q

from .serializers import PostCollectionSerializer, CommentCollectionSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

class PostCollectionView(APIView):
    def get(self, request, id=None):
        if id:
            try:
                item = PostCollection.objects.get(id=id)
                serializer = PostCollectionSerializer(item)
                return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
            except PostCollection.DoesNotExist:
                return Response({"status": "error", "data": "post does not exist"}, status=status.HTTP_200_OK)

        items = PostCollection.objects.all().order_by('-post_timestamp')
        serializer = PostCollectionSerializer(items, many=True)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

    def delete(self, request, id=None):
        try:
            item = PostCollection.objects.get(post_content=id)
        except PostCollection.DoesNotExist:
            return Response({"status": "error", "data": "username does not exist"}, status=status.HTTP_200_OK)

        item.delete()
        return Response({"status": "success", "data": "Item Deleted"})

    def post(self, request, *args, **kwargs):
        serializer = PostCollectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_200_OK)

    def patch(self, request, id=None):
        try:
            item = PostCollection.objects.get(id=id)
        except PostCollection.DoesNotExist:
            return Response({"status": "error", "data": "post id does not exist"}, status=status.HTTP_200_OK)

        serializer = PostCollectionSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data})
        else:
            return Response({"status": "error", "data": serializer.errors})


class PostEditView(APIView):
    def get_object(self, *args, **kwargs):
        id = self.kwargs.get('pk')
        try: 
            return PostCollection.objects.get(id = id)
        except PostCollection.DoesNotExist:
            return Response({"status": "error", "data": "post does not exist"}, status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):
        post = self.get_object()

        postSerializer = PostCollectionSerializer(post)

        return Response({"status": "success", "data": {'post': postSerializer.data}}, status=status.HTTP_200_OK)
        
    def patch(self, request, *args, **kwargs):

        post = self.get_object()
        
        serializer = PostCollectionSerializer(post, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()

            return Response({"status": "success", "data": serializer.data})
        else:
            return Response({"status": "error", "data": serializer.errors})

    def delete(self, request, *args, **kwargs):

        post = self.get_object()
        post.delete()
        
        return Response({"status": "error", "data": "post deleted"})

    # def post(self, request, *args, **kwargs):
    #     id = self.kwargs.get('pk')
    #     try:
    #         post = PostCollection.objects.get(pk=id)
    #         postSerializer = PostCollectionSerializer(post)
    #     except PostCollection.DoesNotExist:
    #         return Response({"status": "error", "data": "post does not exist"}, status=status.HTTP_400_BAD_REQUEST)

    #     comments = CommentCollection.objects.filter(post = post).order_by('-comment_timestamp')
    #     commentSerializer = CommentCollectionSerializer(comments)

    #     if commentSerializer.is_valid():
    #         new_comment = commentSerializer.save(commit= False)
    #         new_comment.author = request.user
    #         new_comment.post = post
    #         new_comment.save()
    #         return Response({"status": "success", "data": {'post': postSerializer.data, 'comments': commentSerializer.data}}, status=status.HTTP_200_OK)
    #     else:
    #         return Response({"status": "error", "data": commentSerializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# class HitLike(APIView):
#     def post(self, request, *args, **kwargs):
#         id = self.kwargs.get('pk')
        
#         post = PostCollection.objects.get(id = id)

#         liked_ind = False

#         for like in post.likes.all():
#             if like == request.user:
#                 liked_ind = True
#                 post.likes.remove(request.user)
#                 break
        
#         if not liked_ind:
#             post.likes.add(request.user)

#         serializer = PostCollectionSerializer(post)

#         return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)


class PostDetailView(APIView):
    def get_object(self, *args, **kwargs):
        pid = self.kwargs.get('postId')

        try: 
            return PostCollection.objects.get(id = pid)
        except PostCollection.DoesNotExist:
            return Response({"status": "error", "data": "post does not exist"}, status=status.HTTP_200_OK)
       
    def get(self, *args, **kwargs):
        post = self.get_object()
        postserializer = PostCollectionSerializer(post)

        comments = CommentCollection.objects.filter(post=post).all()
        commentserializer = CommentCollectionSerializer(comments, many = True)

        return Response({"status": "success", "data": {"post": postserializer.data, "comments": commentserializer.data}}, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        # post = self.get_object()
        # postserializer = PostCollectionSerializer(post)
        commentserializer = CommentCollectionSerializer(data=request.data)

        post = self.get_object()
        postserializer = PostCollectionSerializer(post)
        
        # commentserializer.post = self.kwargs.get('postId')

        if commentserializer.is_valid():
            commentserializer.save()
            return Response({"status": "success", "data": {"post": postserializer.data,"comments":commentserializer.data}}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": commentserializer.errors}, status=status.HTTP_200_OK)
            
        post = self.get_object()
        
        serializer = PostCollectionSerializer(post, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()

            return Response({"status": "success", "data": serializer.data})
        else:
            return Response({"status": "error", "data": serializer.errors})
    

class CommentDetailView(APIView):

    def get_commentobject(self, *args, **kwargs):
        cid = self.kwargs.get('commentId')
        try: 
            return CommentCollection.objects.get(id = cid)
        except CommentCollection.DoesNotExist:
            return Response({"status": "error", "data": "comment does not exist"}, status=status.HTTP_200_OK)

    def get_postobject(self, *args, **kwargs):
        pid = self.kwargs.get('postId')
        try: 
            return PostCollection.objects.get(id = pid)
        except PostCollection.DoesNotExist:
            return Response({"status": "error", "data": "post does not exist"}, status=status.HTTP_200_OK)

        pid = self.kwargs.get('postId')

    def get(self, request, *args, **kwargs):
        comment = self.get_commentobject()
        serializer = CommentCollectionSerializer(comment)

        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

    # def post(self, request, *args, **kwargs):
    #     serializer = CommentCollectionSerializer(request.data) 

    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
    #     else:
    #         return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, *args, **kwargs):
        comment = self.get_commentobject()

        serializer = CommentCollectionSerializer(comment, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data})
        else:
            return Response({"status": "error", "data": serializer.errors})

    def delete(self, request, *args, **kwargs):
        comment = self.get_commentobject()
        comment.delete()
        
        return Response({"status": "error", "data": "comment deleted"})

# class UserSearch(LoginRequiredMixin, View):
#     def get(self, request, *args, **kwargs):
#         fname = self.request.GET.get('query')

#         user_profiles = Profile.objects.filter(Q(firstname__contains = fname))

#         context = {
#             'user_profiles' : user_profiles
#         }

#         return render(request, 'home/usersearch.html', context)

        


# from django.shortcuts import render
# from .models import PostCollection, CommentCollection, User
# from profile.models import Profile
# from django.http import HttpResponseRedirect
# from django.views import View
# from .forms import PostForm, CommentForm
# from django.urls import reverse_lazy
# from django.contrib.auth.mixins import UserPassesTestMixin, LoginRequiredMixin
# from django.views.generic.edit import UpdateView, DeleteView
# from django.db.models import Q

# from .serializers import PostCollectionSerializer, CommentCollectionSerializer
# from rest_framework import status
# from rest_framework.views import APIView
# from rest_framework.response import Response

# class PostCollectionView(APIView):
#     def get(self, request, id=id):
#         if id:
#             try:
#                 item = PostCollection.objects.get(id=id)
#                 serializer = PostCollectionSerializer(item)
#                 return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
#             except PostCollection.DoesNotExist:
#                 return Response({"status": "error", "data": "post does not exist"}, status=status.HTTP_400_BAD_REQUEST)

#         items = PostCollection.objects.all().order_by('-post_timestamp')
#         serializer = PostCollectionSerializer(items, many=True)
#         return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

#     def post(self, request):
#         serializer = PostCollectionSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
#         else:
#             return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# class PostDetailView(APIView):
#     def get(self, request, id):
#         try:
#             post = PostCollection.objects.get(id=id)
#             PostCollectionSerializer = PostCollectionSerializer(post)

#             comments = CommentCollection.objects.filter(post = post).order_by('-comment_timestamp')
#             commentSerializer = CommentCollectionSerializer(comments)
            
#             return Response({"status": "success", "data": {'post': PostCollectionSerializer.data, 'comments': commentSerializer.data}}, status=status.HTTP_200_OK)
#         except PostCollection.DoesNotExist:
#             return Response({"status": "error", "data": "post does not exist"}, status=status.HTTP_400_BAD_REQUEST)

#     def post(self, request, id):
#         try:
#             post = PostCollection.objects.get(id=id)
#             PostCollectionSerializer = PostCollectionSerializer(post)
#         except PostCollection.DoesNotExist:
#             return Response({"status": "error", "data": "post does not exist"}, status=status.HTTP_400_BAD_REQUEST)

#         comments = CommentCollection.objects.filter(post = post).order_by('-comment_timestamp')
#         commentSerializer = CommentCollectionSerializer(comments)

#         if commentSerializer.is_valid():
#             new_comment = commentSerializer.save(commit= False)
#             new_comment.author = request.user
#             new_comment.post = post
#             new_comment.save()
#             return Response({"status": "success", "data": {'post': PostCollectionSerializer.data, 'comments': commentSerializer.data}}, status=status.HTTP_200_OK)
#         else:
#             return Response({"status": "error", "data": commentSerializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# class PostEditView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
#     model = PostCollection
#     fields = ['post_content']
#     template_name = 'home/post_edit.html'

#     def get_success_url(self):
#         pk = self.kwargs['pk']
#         return reverse_lazy('post-detail', kwargs = {'pk': pk})

#     def test_func(self):
#         post = self.get_object()
#         return self.request.user == post.author

# class PostDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
#     model = PostCollection
#     template_name = 'home/post_delete.html'
#     success_url = reverse_lazy('post-collection')

#     def test_func(self):
#         post = self.get_object()
#         return self.request.user == post.author

# class CommentDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
#     model = CommentCollection
#     template_name = 'home/comment_delete.html'

#     def get_success_url(self):
#         # pk = self.kwargs['pk']
#         post = self.get_object().post
#         return reverse_lazy('post-detail', kwargs = {'pk': post.id})

#     def test_func(self):
#         comment = self.get_object()
#         return self.request.user == comment.author

# class HitLike(LoginRequiredMixin, View):
#     def post(self, request, id):
#         post = PostCollection.objects.get(id = id)

#         liked_ind = False

#         for like in post.likes.all():
#             if like == request.user:
#                 liked_ind = True
#                 post.likes.remove(request.user)
#                 break
        
#         if not liked_ind:
#             post.likes.add(request.user)

#         next = request.POST.get('next', '/')
#         return HttpResponseRedirect(next)
        

# class UserSearch(LoginRequiredMixin, View):
#     def get(self, request):
#         fname = self.request.GET.get('query')

#         user_profiles = Profile.objects.filter(Q(firstname__contains = fname))

#         context = {
#             'user_profiles' : user_profiles
#         }

#         return render(request, 'home/usersearch.html', context)

        