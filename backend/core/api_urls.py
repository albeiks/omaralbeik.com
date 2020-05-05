from django.conf.urls import url, include
from rest_framework.routers import SimpleRouter

from blog import views as blogViews
from snippets import views as snippetsViews
from projects import views as projectsViews
from tags import views as tagsViews
from contents import views as contentsViews
from contact import views as contactViews


class OptionalTrailingSlashRouter(SimpleRouter):
    def __init__(self):
        self.trailing_slash = "/?"
        super(SimpleRouter, self).__init__()


router = OptionalTrailingSlashRouter()
router.register(r"blog", blogViews.PostViewSet)
router.register(r"snippets", snippetsViews.SnippetViewSet)
router.register(r"languages", snippetsViews.ProgrammingLanguageViewSet)
router.register(r"projects", projectsViews.ProjectViewSet)
router.register(r"tags", tagsViews.TagViewSet)
router.register(r"contents", contentsViews.ContentViewSet)
router.register(r"contact", contactViews.MessageViewSet)

# List or url patterns for the api subdomain
urlpatterns = [
    url(r"^v2/", include(router.urls)),
]
