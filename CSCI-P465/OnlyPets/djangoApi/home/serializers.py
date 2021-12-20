# from rest_framework import serializers
# from .models import PostCollection, CommentCollection

# class PostCollectionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PostCollection
#         fields = ['id', 'author', 'post_content', 'post_timestamp', 'likes']

# class CommentCollectionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CommentCollection
#         fields = ['id', 'post', 'author', 'comment', 'comment_timestamp']

from rest_framework import serializers
from .models import PostCollection, CommentCollection

class CommentCollectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = CommentCollection
        fields = "__all__"
        # depth = 1

class PostCollectionSerializer(serializers.ModelSerializer):
    # comments = CommentCollectionSerializer(many = True, read_only = False, allow_null = True)

    class Meta:
        model = PostCollection
        fields = ['id', 'author', 'post_content', 'post_timestamp', 'likes' ] #, 'comments']

    # def create(self, validated_data):
    #     modified_comments = validated_data.pop('comments')
    #     post = PostCollection.objects.create(**validated_data)

    #     comments = CommentCollection.objects.create(**modified_comments, post = post)

    #     return post


