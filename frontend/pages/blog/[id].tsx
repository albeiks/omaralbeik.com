import React from "react";

import API, { HTTPError } from "api";
import SEO from "components/seo";
import Details from "components/post";
import Error from "components/error";
import { Post } from "api/models/post";


interface Props {
  error?: HTTPError
  post: Post
}

class PostDetails extends React.Component<Props> {
  static async getInitialProps({ query }: any) {
    const { id } = query;
    try {
      const post = await API.fetch(`blog/${encodeURIComponent(id)}`);
      return { post };
    } catch (error) {
      return { error };
    }
  }

  render() {
    const { post, error } = this.props;
    if (error) {
      return <Error error={error} />;
    }
    const { meta } = post;
    return [
      <SEO key="seo" meta={meta} />,
      <Details key="details" post={post} />,
    ];
  }
}

export default PostDetails;
