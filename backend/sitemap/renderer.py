from io import StringIO
from django.utils.xmlutils import SimplerXMLGenerator
from rest_framework_xml.renderers import XMLRenderer


attributes = {
  "xmlns": "http://www.sitemaps.org/schemas/sitemap/0.9",
  "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
  "xmlns:xhtml": "http://www.w3.org/1999/xhtml",
  "xsi:schemaLocation": "http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
}

class SitemapRenderer(XMLRenderer):
    root_tag_name = "urlset"
    item_tag_name = "url"

    def render(self, data, accepted_media_type=None, renderer_context=None):
        if data is None:
            return ""

        stream = StringIO()

        xml = SimplerXMLGenerator(stream, self.charset)
        xml.startDocument()
        xml.startElement(self.root_tag_name, attributes)

        self._to_xml(xml, data)

        xml.endElement(self.root_tag_name)
        xml.endDocument()
        return stream.getvalue()
