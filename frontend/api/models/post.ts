import Meta from "./meta";
import Tag from "./tag";
import Image from "./image";


export interface PostSummary {
  id: number
  title: string
  slug: string
  summary: string
  date_published: string
  read_time?: string
}

export interface Post extends PostSummary {
  cover_image?: Image
  text: string
  related: PostSummary[]
  tags: Tag[]
  meta: Meta
}
