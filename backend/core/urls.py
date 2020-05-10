from django.conf.urls import url, include
from core.routers import OptionalTrailingSlashRouter
from sitemap.views import SitemapViewSet

router = OptionalTrailingSlashRouter()
router.register(r"sitemap.xml", SitemapViewSet, basename='sitemap')

urlpatterns = [
    url(r"", include(router.urls)),
]