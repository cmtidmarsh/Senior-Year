from .models import Message
from .serializers import MessageSerializer
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q

# Create your views here.
class MessageView(APIView):
    def post(self, request):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_200_OK)

    def get(self, request, username=None):
        if username:
            try:
                items = Message.objects.filter(Q(toProfile=username) | Q(fromProfile=username)).order_by('message_timestamp')
                serializer = MessageSerializer(items, many=True)
                return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
            except Message.DoesNotExist:
                return Response({"status": "error", "data": "username does not exist"}, status=status.HTTP_200_OK)

        items = Message.objects.all()
        serializer = MessageSerializer(items, many=True)
        return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)

    def delete(self, request, message_content=None):
        try:
            item = Message.objects.get(message_content=message_content)
        except Message.DoesNotExist:
            return Response({"status": "error", "data": "message does not exist"}, status=status.HTTP_200_OK)

        item.delete()
        return Response({"status": "success", "data": "Item Deleted"})

    def patch(self, request, message_content=None):
        try:
            item = Message.objects.get(message_content=message_content)
        except Message.DoesNotExist:
            return Response({"status": "error", "data": "message does not exist"}, status=status.HTTP_200_OK)

        serializer = MessageSerializer(item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data})
        else:
            return Response({"status": "error", "data": serializer.errors})