from .models import Friends, Profile
from .serializers import FriendSerializer, ProfileSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class ProfileView(APIView):
    def post(self, request):
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_200_OK)

    def get(self, request, username=None):
        if username:
            try:
                item = Profile.objects.get(username=username)
                serializer = ProfileSerializer(item)
                return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
            except Profile.DoesNotExist:
                return Response({"status": "error", "data": "username does not exist"}, status=status.HTTP_200_OK)

        items = Profile.objects.all()
        serializer = ProfileSerializer(items, many=True)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

    def delete(self, request, username=None):
        print(username)
        try:
            item = Profile.objects.get(username=username)
        except Profile.DoesNotExist:
            return Response({"status": "error", "data": "username does not exist"}, status=status.HTTP_200_OK)

        item.delete()
        return Response({"status": "success", "data": "Item Deleted"})

    def patch(self, request, username=None):
        try:
            item = Profile.objects.get(username=username)
        except Profile.DoesNotExist:
            return Response({"status": "error", "data": "username does not exist"}, status=status.HTTP_200_OK)

        serializer = ProfileSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data})
        else:
            return Response({"status": "error", "data": serializer.errors})

class FriendsView(APIView):
    def get(self, request, id=None):
        id2 = Profile.objects.get(id=id)
        friends = Friends.objects.filter(user_id = id2).all()
        serializer = FriendSerializer(friends, many = True)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

    def post(self, request, username=None):
        serializer = FriendSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_200_OK)

class FriendsDetailView(APIView):
    def get(self, *args, **kwargs):
        followingusername = self.kwargs.get('followingusername')
        followerusername = self.kwargs.get('followerusername')

        user = Profile.objects.get(username = followingusername)
        friend = Profile.objects.get(username = followerusername)

        relationship = Friends.objects.get(user = user, friend = friend)

        serializer = FriendSerializer(relationship)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)


    def delete(self, *args, **kwargs):
        try:
            followingusername = self.kwargs.get('followingusername')
            followerusername = self.kwargs.get('followerusername')

            user = Profile.objects.get(username = followingusername)
            friend = Profile.objects.get(username = followerusername)

            relationship = Friends.objects.get(user = user, friend = friend)
        except Friends.DoesNotExist:
            return Response({"status": "error", "data": "username does not exist"}, status=status.HTTP_200_OK)

        relationship.delete()
        return Response({"status": "success", "data": "Unfollowed"})        






