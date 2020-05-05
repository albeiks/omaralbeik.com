from os import environ as env
from django.core.asgi import get_asgi_application

env.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
application = get_asgi_application()
