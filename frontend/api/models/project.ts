import Image from "./image";
import Tag from "./tag";
import Meta from "./meta";


export default interface Project {
  id: number
  name: string
  slug: string
  logo?: Image
  summary: string
  date_published: string
  url_name: string
  url: string
  tags: Tag[]
  meta: Meta
}
