import fetch from "isomorphic-unfetch";

class API {
  static get BASE_URL() {
    return process.env.API_BASE_URL
  }

  static url(path) {
    return this._appendUrl(this.BASE_URL, path);
  }

  static async fetch(path, method = "GET", body) {
    const url = this.url(path);
    const init = {
      method,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    };
    return fetch(url, init)
      .then((resp) => ((this._validate(resp))))
      .then((resp) => resp.json());
  }

  static _validate(res) {
    if (res.ok && res.status >= 200 && res.status < 300) {
      return res;
    }
    const err = new Error(res.statusText);
    err.response = res;
    throw err;
  }

  static _appendUrl(url, path) {
    const cleanedUrl = url.endsWith("/") ? url.slice(0, -1) : url;
    const cleanedPath = path.startsWith("/") ? path.slice(0, -1) : path;
    return `${cleanedUrl}/${cleanedPath}`;
  }
}

export default API;
