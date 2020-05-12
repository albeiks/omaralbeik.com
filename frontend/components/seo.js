import React, { Component } from "react";
import Head from "next/head";
import { NextSeo } from "next-seo";

class SEO extends Component {
  render() {
    const { meta } = this.props;
    return (
      <div key="seo">
        <Head>
          <meta name="keywords" content={meta?.keywords} />
        </Head>
        <NextSeo
          title={meta?.html_title}
          description={meta?.description}
          canonical={meta?.canonical}
          additionalMetaTags={[{
            property: "keywords",
            content: meta?.keywords,
          }]}
          openGraph={{
            url: meta?.canonical,
            title: meta?.title,
            description: meta?.description,
          }}
        />
      </div>
    );
  }
}

export default SEO;
