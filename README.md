# omaralbeik.com

Source code for [omaralbeik.com](https://omaralbeik.com)

## Table of Contents
- [Features](#features)
- [Getting started](#getting-started)
- [Deployment](#deployment)
- [Make it yours](#make-it-yours)
- [Rest API](#rest-api)
- [Contributing](#contributing)
- [License](#license)

## Features

- Fully dockerized apps for development and production
  - development: Django, SQLite and Node.
  - production: Django, PostgreSQL, Node, and Nginx
- `.env` files for quick and secure project setup
- Easy deployment to any linux server, docker takes care of the database, apps, and routing.

### Backend

- Modularized system with multiple applications.
- PostgreSQL for prodction, SQLite3 for development.
- REST API with results pagination and throttling.
- CMS Admin dashboard to edit database entries, blog posts, and more.
- Markdown and LaTeX support
- Universal tagging system for shared tags among all apps.
- Unlimited dynamic pages
- Dynamic `meta` object in API responses for SEO.

### Frontend

- Fully customizable web app, including theming, assets, strings, and [more](#configjson)
- Written in ES6 and built using NextJS.
- Server side rendering and SEO friendly
- Progressive web app (PWA).
- Google Analytics support.
- Light/Dark themes and CSS in JS using styled-componenets
- Fully responsive design with the help of Bootstrap.
- Markdown rendering including custom code block with a copy button.
- LaTeX rending using [MathJax](https://www.mathjax.org/)
- Unlimited dynamic pages rendering

---

## Getting started

> Both development and production environments require Docker and Docker Compose, make sure they are installed and running on your machine before starting

### Running the development server

1. Create an `.env.dev` file, use the [provided sample](sample%20.env.dev) as a starting point

2. Build the containers

```sh
docker-compose -f dev.yml build
```

3. Create a super user for the admin panel

```sh
docker-compose -f dev.yml run backend python manage.py createsuperuser
```

4. Start the containers

```sh
docker-compose -f dev.yml up
```

5. Voilà, you're all set!

URLs:

- Admin panel: `admin.localhost:8000`
- REST API: `api.localhost:8000/v2`
- Frontend website: `localhost:3000`

---

## Deployment

0. Initial server setup. [DigitalOcean](https://www.digitalocean.com) has a very nice [tutorial](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04)
1. Once the server setup is complete, ssh into the server and clone the repository to home (or any) directory
2. Create an `.env.prod` file, use the [provided sample](sample%20.env.prod) as a starting point.
3. Move to `/docker/prod/nginx/` and create an `app.conf` file, use the [provided sample](docker/prod/nginx/sample%20app.conf) as a starting point.

> Make sure to change localhost with your domain

4. Build the containers

```sh
docker-compose -f prod.yml build
```

5. Create a super user for the admin panel (please don't use admin/admin 😉)

```sh
docker-compose -f prod.yml run backend python manage.py createsuperuser
```

6. Start the containers

```sh
docker-compose -f prod.yml up -d
```

7. Done

Your server should be running now and accessible by its IP address

### Cloudflare

It is recommended to connect your domain to [Cloudflare](https://cloudflare.com/) for easy and quick DNS setup.

#### Add required DNS records

Once your cloudflare is set up, add the following records:

| Type | Name                | Content                |
|------|---------------------|------------------------|
| A    | `admin`             | your server IP address |
| A    | `api`               | your server IP address |
| A    | `[your_domain].com` | your server IP address |
| A    | `www.admin`         | your server IP address |
| A    | `www.api`           | your server IP address |
| A    | `www`               | your server IP address |

#### Set up HTTPS

In Cloudflare dashboard, move to the "SSL/TLS" tap, and enable the "Flexible" option

#### Make good use of Cloudflare free features

Cloudflare provides a set of great free features, expolore the dashboard and make sure to enable them!

---

## Make it yours

To configure and custimze the app to suite your needs, I recommend forking the repository and follow the following steps

> While this app allows for lots of customization, Keep in mind, it is not like a wordpress template!

### Backend configurations

Most of backend customizations are in the `.env.prod` file

| Key                    | Description                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| `DEBUG`                | Django debug more, **never set it to 1 in production**                                     |
| `SECRET_KEY`           | Django secret key (must be strong and not contain spaces)                                  |
| `ALLOWED_HOSTS`        | Set of domain names allowed to talk to Django app (space separated)                        |
| `RECAPTCHA_SECRET_KEY` | [ReCaptcha](https://www.google.com/recaptcha) server key used to validate contact messages |
| `CLIENT_URL`           | Production url for your website, usually `https://[your_domain]/`                          |
| `CLIENT_NAME`          | Your name, or your website name, used to return HTML titles in meta                        |
| `GA_TRACKING_NUMBER`   | [Google Analytics](https://analytics.google.com/) site number                              |
| `RECAPTCHA_SITE_KEY`   | [ReCaptcha](https://www.google.com/recaptcha) site key used to validate contact messages   |
| `EMAIL_ENABLED`        | Send email to admin on contact message submission, to disable, set it to `0`               |

### Frontend configurations

#### config.json

- The [config.json](frontend/public/static/config.json) file allows easy and powerful customizations in the frontend website.

### Theming

- The frontend support adaptive colors for both light and dark mode, to change the colors, update the values in [_variables.scss](frontend/public/static/styles/_variables.scss)

### Strings

- Strings are not hard-coded in the app, update them in [locales/en/index.js](frontend/public/static/locales/en/index.js).

### Links

- Customize header and footer links in [links/index.js](frontend/public/static/links/index.js)
- Customize social links in [links/social.js](frontend/public/static/links/social.js)

### Assets

- Customize the website's favicon in the [favicon](frontend/public/static/favicon) directory.
- Customize the website's PWA manifest in [manifest.json](frontend/public/static/manifest.json).

---

## Rest API

| URL                                                | Method | Description                                         |
|----------------------------------------------------|--------|-----------------------------------------------------|
| `api.[domain]/v2`                                  | N/A    | API base URL                                        |
| `blog`                                             | GET    | Get all blog posts                                  |
| `blog/[post.id]or[post.slug]`                      | GET    | Get a blog post                                     |
| `blog?search=[query]`                              | GET    | Search blog posts                                   |
| `snippets`                                         | GET    | Get all code snippets                               |
| `snippets/[snippet.id]or[snippet.slug]`            | GET    | Get a code snippet                                  |
| `languages`                                        | GET    | Get all programming languages used in code snippets |
| `language/[language.id]or[language.slug]`          | GET    | Get a programming language used in code snippet     |
| `language/[language.id]or[language.slug]/snippets` | GET    | Get all code snippets for a programming language    |
| `snippets?search=[query]`                          | GET    | Search code snippets                                |
| `projects`                                         | GET    | Get all portfolio projects                          |
| `projects/[project.id]or[project.slug]`            | GET    | Get a portfolio project                             |
| `projects?search=[query]`                          | GET    | Search protfolio projects                           |
| `tags`                                             | GET    | Get all tags                                        |
| `tags/[tag.id]or[tag.slug]`                        | GET    | Get a tag                                           |
| `contents/[content.id]or[content.slug]`            | GET    | Get page content                                    |
| `contact`                                          | POST   | Create a new contact message                        |

---

## Contributing

Your feedback is always appreciated and welcomed. If you find a bug in the source code or a mistake in the documentation, you can help me by submitting an issue [here](https://github.com/albeiks/omaralbeik.com/issues). Even better you can submit a Pull Request with a fix!

---

## License

This repo is released under the [MIT License](LICENSE).
