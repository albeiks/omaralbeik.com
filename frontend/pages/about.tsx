import React from "react";

import API, { HTTPError } from "api";
import Error from "components/error";
import FreeTitle from "components/page-title";
import Markdown from "components/markdown";
import Contact from "components/contact";
import config from "public/static/config.json";
import SEO from "components/seo";
import Content from "api/models/content";


interface Props {
  content?: Content
  error?: HTTPError
}

class About extends React.Component<Props> {
  static async getInitialProps() {
    try {
      const content = await API.fetch("contents/about");
      return { content };
    } catch (error) {
      return { error };
    }
  }

  renderContact = () => {
    if (config.about.enableContact) {
      return <Contact key="contact" />;
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
      <FreeTitle key="title" title={content?.title ?? ""} />,
      <Markdown key="free" source={content?.text ?? ""} />,
      this.renderContact(),
    ];
  }
}

export default About;
