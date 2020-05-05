from django.utils.deprecation import MiddlewareMixin
from django.shortcuts import redirect
from redirects.models import Redirect

class RedirectsMiddleware(MiddlewareMixin):
    def process_request(self, request):
        path = request.path
        source = path.split("/")[-1]
        match = Redirect.objects.filter(source=source).first()
        if match:
            path = path.replace(source, match.destination)
            return redirect(path)
