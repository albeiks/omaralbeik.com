from django.conf import settings
from django_hosts import patterns, host

# List of all subdomains used in the app
host_patterns = patterns(
    "",
    host(r"admin", "core.admin_urls", name="admin"),
    host(r"api", "core.api_urls", name="api"),
    host(r"", settings.ROOT_URLCONF, name="root"),
)
