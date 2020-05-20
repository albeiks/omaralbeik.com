import Image from "./image";
import Meta from "./meta";


export interface Language {
  id: number
  name: string
  slug: string
  icon?: Image
}

export interface SnippetSummary {
  id: number
  name: string
  slug: string
  language: Language
  date_published: string
  summary: string
}

export interface Snippet extends SnippetSummary {
  text: string
  meta: Meta
}
