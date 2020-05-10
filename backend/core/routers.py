from rest_framework.routers import SimpleRouter


class OptionalTrailingSlashRouter(SimpleRouter):
    def __init__(self):
        self.trailing_slash = "/?"
        super(SimpleRouter, self).__init__()
