import { PostSummary } from "api/models/post";
import { SnippetSummary } from "api/models/snippet";

export const prod = {
  url: "https://omaralbeik.com",
};

export const home = {
  name: "Home",
  url: "/",
};

export const blog = {
  name: "Blog",
  url: "/blog",
};

export function blogPost(p: PostSummary) {
  return {
    name: p.title,
    url: `${blog.url}/${p.slug}`,
    templateUrl: `${blog.url}/[id]`,
  };
}

export function snippets(page?: string) {
  const url = page ? `/snippets?page=${page}` : "/snippets";
  return {
    name: "Snippets",
    url,
  };
}

export function snippet(s: SnippetSummary, page?: string) {
  const base = snippets(page).url;
  const url = page ? `${base}&id=${s.slug}` : `${base}?id=${s.slug}`;
  return {
    name: s.name,
    url,
  };
}

export const about = {
  name: "About",
  url: "/about",
};

export const projects = {
  name: "Portfolio",
  url: "/projects",
};

export const api = {
  name: "RESTful API",
  url: "/api",
};

export const repo = {
  name: "Github",
  url: "https://github.com/albeiks",
};

export const navbar = [blog, snippets(), projects, about];
export const footer = [blog, projects, snippets(), api, about];
