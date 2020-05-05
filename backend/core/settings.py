from os import path, environ as env


BASE_DIR = path.dirname(path.dirname(path.abspath(__file__)))

# Keep this value secret.
## Running Django with a known SECRET_KEY defeats many of Django’s security
## protections, and can lead to privilege escalation and remote code execution
## vulnerabilities.
SECRET_KEY = env.get("SECRET_KEY", default="change_me")

# Never deploy a site into production with DEBUG turned on.
DEBUG = int(env.get("DEBUG", default=1))

# A list of strings representing the host/domain names
# that this Django site can serve.
ALLOWED_HOSTS = env.get("ALLOWED_HOSTS", default="*").split(" ")

# Used for contact form validatation
RECAPTCHA_SECRET_KEY = env.get("RECAPTCHA_SECRET_KEY", default="change_me")

# Used to return canonical urls for meta objects in the REST API.
## must end in a slash
CLIENT_URL = env.get("CLIENT_URL", default="https://example.com/")

# Used in html_title for meta objects in the REST API.
CLIENT_NAME = env.get("CLIENT_NAME", default="")

INSTALLED_APPS = [
    # Django
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Apps
    "tags",
    "files",
    "blog",
    "snippets",
    "projects",
    "contents",
    "contact",
    "redirects",
    # 3rd party
    "rest_framework",
    "rest_framework.authtoken",
    "corsheaders",
    "django_hosts",
    "import_export",
    "markdown",
    "martor",
    "django_cleanup.apps.CleanupConfig",
]

MIDDLEWARE = [
    "django_hosts.middleware.HostsRequestMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "django_hosts.middleware.HostsResponseMiddleware",
    "redirects.middleware.RedirectsMiddleware",
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"

# A dictionary containing the settings for all databases to be used with Django.
if DEBUG:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": path.join(BASE_DIR, "db.sqlite3"),
        }
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": env.get("POSTGRES_DB"),
            "USER": env.get("POSTGRES_USER"),
            "PASSWORD": env.get("POSTGRES_PASSWORD"),
            "HOST": env.get("POSTGRES_HOST"),
            "PORT": env.get("POSTGRES_PORT"),
        }
    }

# Time zone settings
USE_TZ = True
TIME_ZONE = "UTC"

# Static files
STATIC_ROOT = path.join(BASE_DIR, "static")
STATIC_URL = "/static/"  # must end with a slash

# Media files
MEDIA_ROOT = path.join(BASE_DIR, "media")
MEDIA_URL = "/media/"  # must end with a slash

# Django Hosts for admin and api subdomains
ROOT_HOSTCONF = "core.hosts"
DEFAULT_HOST = "root"

# Accept all origins
CORS_ORIGIN_ALLOW_ALL = True

# A list of HTTP verbs that are allowed for the actual request.
CORS_ALLOW_METHODS = [
    "GET",
    "POST",
]

# Django REST framework related
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.TokenAuthentication"
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticatedOrReadOnly"
    ],
    # Pagination settings
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.LimitOffsetPagination",
    "PAGE_SIZE": 10,
    # Throttling
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.AnonRateThrottle",
        "rest_framework.throttling.UserRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {"anon": "500/day", "user": "1000/hour"},
    # Rendering
    "DEFAULT_RENDERER_CLASSES": ["rest_framework.renderers.JSONRenderer",],
}

# Allow API explorer in debug mode only
if DEBUG:
    REST_FRAMEWORK["DEFAULT_RENDERER_CLASSES"].append(
        "rest_framework.renderers.BrowsableAPIRenderer"
    )

# Martor markdown editor settings
MARTOR_ENABLE_CONFIGS = {
    "emoji": "true",
    "imgur": "false",
    "mention": "false",
    "jquery": "true",
    "living": "true",
    "spellcheck": "false",
    "hljs": "true",
}
MARTOR_MARKDOWN_EXTENSIONS = [
    "markdown.extensions.extra",
    "markdown.extensions.nl2br",
    "markdown.extensions.smarty",
    "markdown.extensions.fenced_code",
    "martor.extensions.urlize",
    "martor.extensions.del_ins",
    "martor.extensions.emoji",
    "martor.extensions.mdx_video",
]

# Import Export settings
IMPORT_EXPORT_USE_TRANSACTIONS = True

# Email settings
EMAIL_HOST = env.get("EMAIL_HOST", default="smtp.sendgrid.net")
EMAIL_PORT = env.get("EMAIL_PORT", default="587")
EMAIL_USE_TLS = int(env.get("EMAIL_USE_TLS", default=1))
EMAIL_HOST_USER = env.get("EMAIL_HOST_USER", default="apikey")
EMAIL_HOST_PASSWORD = env.get("EMAIL_HOST_PASSWORD", default="")