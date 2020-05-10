from django.utils.deprecation import MiddlewareMixin
from django.shortcuts import redirect
from aliases.models import Alias

class AliasesMiddleware(MiddlewareMixin):
    def process_request(self, request):
        path = request.path
        source = path.split("/")[-1]
        match = Alias.objects.filter(source=source).first()
        if match:
            path = path.replace(source, match.destination)
            return redirect(path)
