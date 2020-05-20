/* eslint-disable max-classes-per-file */

import fetch from "isomorphic-unfetch";

export enum HTTPMethod {
  get = "GET",
  post = "POST"
}

export class HTTPError extends Error {
  constructor(public code: number, message?: string) {
    super(message);
    Object.setPrototypeOf(this, HTTPError.prototype);
  }
}

class API {
  static get BASE_URL() {
    return process.env.FE_API_BASE_URL || "http://api.localhost:8000/v2";
  }

  static url(path: string) {
    return this._appendUrl(this.BASE_URL, path);
  }

  static error(code: number): HTTPError {
    return new HTTPError(code, `${code}`);
  }

  static async fetch(path: string, method: HTTPMethod = HTTPMethod.get, body: any = null) {
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

  static _validate(res: any) {
    if (res.ok && res.status >= 200 && res.status < 300) {
      return res;
    }
    throw this.error(res.status);
  }

  static _appendUrl(url: string, path: string) {
    const cleanedUrl = url.endsWith("/") ? url.slice(0, -1) : url;
    const cleanedPath = path.startsWith("/") ? path.slice(0, -1) : path;
    return `${cleanedUrl}/${cleanedPath}`;
  }
}

export default API;
