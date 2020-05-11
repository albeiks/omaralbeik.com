import React from "react";
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

    return [
      <NextSeo
        key="seo"
        title={post.meta.html_title}
        description={post.meta.description}
        canonical={post.meta.canonical}
        additionalMetaTags={[{
          property: "keywords",
          content: post.meta.keywords,
        }]}
        openGraph={{
          url: post.meta.canonical,
          title: post.meta.title,
          description: post.meta.description,
          images: [{ url: post.cover_image?.url, alt: post.title }],
          article: {
            tags: post.meta.keywords,
            publishedTime: post.date_published,
          },
        }}
      />,
      <Details key="details" post={post} />,
    ];
  }
}

export default Post;
