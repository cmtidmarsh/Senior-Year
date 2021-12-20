from django.urls import path
from .views import MessageView

urlpatterns = [
    path('', MessageView.as_view()),
    path('<str:username>/', MessageView.as_view()),
    path('change/<str:message_content>/', MessageView.as_view()),
]
