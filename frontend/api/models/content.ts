import Image from "./image";
import Tag from "./tag";
import Meta from "./meta";


export default interface Content {
  id: number
  name: string
  slug: string
  title: string
  image?: Image
  summary: string
  text: string
  dynamic_page: boolean
  tags: Tag[]
  meta: Meta
}
