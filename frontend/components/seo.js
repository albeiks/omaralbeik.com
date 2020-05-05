import React, { Component } from "react";
import { NextSeo } from "next-seo";


class SEO extends Component {
  render() {
    const { meta } = this.props;
    return (
      <NextSeo
        key="seo"
        title={meta.html_title}
        description={meta.description}
        canonical={meta.canonical}
        additionalMetaTags={[{
          property: "keywords",
          content: meta.keywords,
        }]}
        openGraph={{
          url: meta.canonical,
          title: meta.title,
          description: meta.description,
        }}
      />
    );
  }
}

export default SEO;
