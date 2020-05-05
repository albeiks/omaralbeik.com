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

export function blogPost(p) {
  return {
    name: p.title,
    url: `${blog.url}/${p.slug}`,
    templateUrl: `${blog.url}/[id]`,
  };
}

export const snippets = {
  name: "Snippets",
  url: "/snippets",
};

export function snippet(s) {
  return {
    name: s.name,
    url: `${snippets.url}?id=${s.slug}`,
    templateUrl: `${snippets.url}/[id]`,
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

export const navbar = [blog, snippets, projects, about];
export const footer = [blog, projects, snippets, api, about];
