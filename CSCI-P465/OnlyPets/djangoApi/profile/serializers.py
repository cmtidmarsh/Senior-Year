from rest_framework import serializers
from .models import Friends, Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"

class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friends
        fields = "__all__"