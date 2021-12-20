from django.contrib.auth.models import User
from django.urls import path
from .views import PostCollectionView, PostEditView, CommentDetailView, PostDetailView #, HitLike #, PostEditView, PostDeleteView, CommentDeleteView, UserSearch

urlpatterns = [
    path('', PostCollectionView.as_view(), name='post-collection'),
    path('<str:id>', PostCollectionView.as_view(), name='post-remove'),
    path('post/<uuid:pk>/', PostEditView.as_view(), name='post-edit'),
    # path('post/<uuid:id>/', PostEditView.as_view(), name = 'post-edit'),
    # path('post/<uuid:id>/', PostDeleteView.as_view(), name = 'post-delete'),
    path('post/<uuid:postId>/comment/', PostDetailView.as_view(), name = 'post-detail'),
    path('post/<uuid:postId>/comment/<uuid:commentId>/', CommentDetailView.as_view(), name = 'comment-detail'),
    # path('post/<id>/like', HitLike.as_view(), name = 'like'),
    # path('search/', UserSearch.as_view(), name = 'user-search'),
]

