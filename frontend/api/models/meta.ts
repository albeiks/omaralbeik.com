import Image from "./image";


export default interface Meta {
  title: string
  html_title: string
  description?: string
  canonical: string
  keywords?: string
  article?: string
  published_time?: string
  images?: Image[]
  tags?: string[]
}
