import React, { Component } from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";

import Meta from "api/models/meta";


class SEO extends Component<{ meta?: Meta }> {
  article() {
    const { meta } = this.props;
    if (meta?.article) {
      return <meta name="article" content={meta?.article} />;
    }
    return undefined;
  }

  images() {
    const { meta } = this.props;
    if (meta?.images) {
      return meta.images.map((i) => ({ url: i.url, alt: i.alt }));
    }
    return undefined;
  }

  articleInfo() {
    const { meta } = this.props;
    if (meta?.article) {
      return {
        tags: meta?.tags,
        publishedTime: meta?.published_time,
      };
    }
    return undefined;
  }

  render() {
    const { meta } = this.props;
    return (
      <div key="seo">
        <Head>
          <meta name="keywords" content={meta?.keywords} />
          {this.article()}
        </Head>
        <NextSeo
          title={meta?.html_title}
          description={meta?.description}
          canonical={meta?.canonical}
          additionalMetaTags={[{
            property: "keywords",
            content: meta?.keywords ?? "",
          }]}
          openGraph={{
            url: meta?.canonical,
            title: meta?.title,
            description: meta?.description,
            images: this.images(),
            article: this.articleInfo(),
          }}
        />
      </div>
    );
  }
}

export default SEO;
