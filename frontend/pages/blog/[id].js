import React from "react";
import Head from "next/head";
import API from "api";
import Details from "components/post";
import { NextSeo } from "next-seo";
import Error from "components/error";


class Post extends React.Component {
  static async getInitialProps({ query }) {
    const { id } = query;
    try {
      const post = await API.fetch(`blog/${id}`);
      return { post };
    } catch (error) {
      return { error };
    }
  }

  render() {
    const { error, post } = this.props;

    if (error) {
      return <Error error={error} />;
    }

    const { meta } = post;

    return [
      <Head key="head">
        <meta name="keywords" content={meta?.keywords} />
        <meta name="article" content={post?.title} />
      </Head>,
      <NextSeo
        key="seo"
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
          images: [{ url: post?.cover_image?.url, alt: post?.title }],
          article: {
            tags: meta?.keywords,
            publishedTime: post?.date_published,
          },
        }}
      />,
      <Details key="details" post={post} />,
    ];
  }
}

export default Post;
