from django.urls import path
from .views import FriendsView, ProfileView, FriendsDetailView

urlpatterns = [
    path('', ProfileView.as_view()),
    path('id/<str:username>/', ProfileView.as_view()),
    path('friends/', FriendsView.as_view(), name = 'friend-list'),
    path('friends/<str:id>/', FriendsView.as_view(), name = 'friend-list'),
    path('<str:followingusername>/friends/<str:followerusername>/', FriendsDetailView.as_view(), name = 'friend-edit')
]
