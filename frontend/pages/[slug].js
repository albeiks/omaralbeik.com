import React from "react";
import API from "api";
import Error from "components/error";
import FreeTitle from "components/page-title";
import Markdown from "components/markdown-content";
import SEO from "components/seo";


class Dynamic extends React.Component {
  static async getInitialProps({ query }) {
    try {
      const content = await API.fetch(`contents/${query.slug}`);
      // eslint-disable-next-line camelcase
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
