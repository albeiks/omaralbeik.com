/* eslint-disable no-unused-expressions */

import React from "react";
import { NextPageContext } from "next";
import Router from "next/router";

import API, { HTTPError } from "api";
import Error from "components/error";
import Posts from "components/posts";
import Snippets from "components/snippets";
import Projects from "components/projects";
import { home as strings } from "public/static/locales/en";
import Subtitle from "components/page-subtitle";
import PostsIcon from "public/static/images/latest-posts.svg";
import SnippetsIcon from "public/static/images/latest-snippets.svg";
import ProjectsIcon from "public/static/images/latest-projects.svg";
import config from "public/static/config.json";
import SEO from "components/seo";
import Content from "api/models/content";
import { PostSummary } from "api/models/post";
import { SnippetSummary } from "api/models/snippet";
import Project from "api/models/project";
import * as links from "public/static/links";


interface Props {
  content?: Content
  posts: PostSummary[]
  snippets: SnippetSummary[]
  projects: Project[]
  error?: HTTPError
}

class Index extends React.Component<Props> {
  static async getInitialProps(ctx: NextPageContext) {
    const page = config.home.redirectToPage;

    if (page) {
      // redirect to page
      if (ctx && ctx.req) {
        ctx.res?.writeHead(302, { Location: `/${page}` });
        ctx.res?.end();
      } else {
        Router.push(`/${page}`);
      }
    } else {
      let content;
      try {
        content = await API.fetch("contents/home");
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn("Create contents/home for better SEO");
      }

      try {
        let posts = [];
        let snippets = [];
        let projects = [];

        if (config.home.latestPosts.enabled) {
          const { count } = config.home.latestPosts;
          const postsResponse = await API.fetch(`blog?limit=${count}`);
          posts = postsResponse.results;
        }

        if (config.home.latestSnippets.enabled) {
          const { count } = config.home.latestSnippets;
          const snippetsResponse = await API.fetch(`snippets?limit=${count}`);
          snippets = snippetsResponse.results;
        }

        if (config.home.latestProjects.enabled) {
          const { count } = config.home.latestProjects;
          const projectsResponse = await API.fetch(`projects?limit=${count}`);
          projects = projectsResponse.results;
        }

        return {
          content, posts, snippets, projects,
        };
      } catch (error) {
        return { error };
      }
    }

    return {};
  }

  renderLatestPosts = () => {
    const { posts } = this.props;
    const { highlightLatest } = config.home.latestPosts;
    if (config.home.latestPosts.enabled && posts.length !== 0) {
      return (
        <div key="posts">
          <Subtitle
            header
            icon={<PostsIcon />}
            subtitle={strings.latestPosts}
            showAllLink={links.blog.url}
          />
          <Posts homepage={highlightLatest} posts={posts} />
        </div>
      );
    }
    return null;
  }

  renderLatestSnippets = () => {
    const { snippets } = this.props;
    if (config.home.latestSnippets.enabled && snippets.length !== 0) {
      return (
        <div key="snippets">
          <Subtitle
            icon={<SnippetsIcon />}
            subtitle={strings.latestSnippets}
            showAllLink={links.snippets().name}
          />
          <Snippets snippets={snippets} />
        </div>
      );
    }
    return null;
  }

  renderLatestProjects = () => {
    const { projects } = this.props;
    if (config.home.latestProjects.enabled && projects.length !== 0) {
      return (
        <div key="projects">
          <Subtitle
            icon={<ProjectsIcon />}
            subtitle={strings.latestProjects}
            showAllLink={links.projects.url}
          />
          <Projects projects={projects} />
        </div>
      );
    }
    return null;
  }

  render() {
    const { error, content } = this.props;

    if (error) {
      return <Error error={error} />;
    }

    return [
      <SEO key="seo" meta={content?.meta} />,
      this.renderLatestPosts(),
      this.renderLatestSnippets(),
      this.renderLatestProjects(),
    ];
  }
}

export default Index;
