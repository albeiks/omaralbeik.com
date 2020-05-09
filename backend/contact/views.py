from os import path
from django.conf import settings
from rest_framework import mixins, viewsets, permissions, status
from rest_framework.response import Response
from django.core.mail import send_mail
import requests
from contact import models, serializers


class MessageViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    http_method_names = ["post"]
    queryset = models.Message.objects.all()
    serializer_class = serializers.MessageSerializer
    permission_classes = (permissions.AllowAny,)

    def create(self, request):
        serializer = serializers.MessageSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        try:
            self.validate_recaptcha(request)
            serializer.save()
            self.send_new_message_email(request.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_406_NOT_ACCEPTABLE)

    def validate_recaptcha(self, request):
        err_message = "Unable to verify ReCAPTCHA"
        if "recaptcha_response" not in request.data:
            raise ValueError(err_message)
        req = requests.post(
            "https://www.google.com/recaptcha/api/siteverify",
            {
                "secret": settings.RECAPTCHA_SECRET_KEY,
                "response": request.data["recaptcha_response"],
                "remoteip": self.get_client_ip(request),
            },
        )
        if not req.json()["success"]:
            raise ValueError(err_message)

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            ip = x_forwarded_for.split(",")[0]
        else:
            ip = request.META.get("REMOTE_ADDR")
        return ip

    def send_new_message_email(self, data):
        enabled = settings.EMAIL_ENABLED
        from_address = settings.EMAIL_NO_REPLY_ADDRESS
        to_address = settings.EMAIL_ADMIN_ADDRESS
        if enabled and from_address and to_address:
            send_mail(data["subject"], self.create_message(data), from_address, [to_address])

    def create_message(self, data):
        return f"""subject:
{data["subject"]}

from:
{data["name"]} | {data["email"]}
        
phone number:
{data["phone"] if "phone" in data else "-"}

country:
{data["country"] if "country" in data else "-"}

city:
{data["city"] if "city" in data else "-"}
        
message:
{data["message"]}
"""