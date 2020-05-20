import React from "react";
import { NextPageContext } from "next";

import API, { HTTPError } from "api";
import Error from "components/error";
import FreeTitle from "components/page-title";
import Markdown from "components/markdown";
import SEO from "components/seo";
import Content from "api/models/content";

interface Props {
  content: Content
  error?: HTTPError
}

class Dynamic extends React.Component<Props> {
  static async getInitialProps({ query }: NextPageContext) {
    try {
      const content = await API.fetch(`contents/${query.slug}`);
      if (content?.dynamic_page === true) {
        return { content };
      }
      return { error: API.error(404) };
    } catch (error) {
      return { error };
    }
  }

  render() {
    const { error, content } = this.props;

    if (error) {
      return <Error error={error} />;
    }

    return [
      <SEO key="seo" meta={content?.meta} />,
      <FreeTitle key="title" title={content?.title} />,
      <Markdown key="markdown" source={content?.text} />,
    ];
  }
}

export default Dynamic;
