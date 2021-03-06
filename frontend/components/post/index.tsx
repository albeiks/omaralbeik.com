import React, { Component } from "react";

import Markdown from "components/markdown";
import config from "public/static/config.json";
import { Post } from "api/models/post";

import Cover from "./cover";
import Tags from "./tags";
import Related from "./related";
import Comments from "./comments";


class Details extends Component<{ post: Post }> {
  renderTags = () => {
    const { post } = this.props;
    const { tags } = post;
    if (config.blog.enableTags && tags.length !== 0) {
      return <Tags key="tags" tags={tags} />;
    }
    return null;
  }

  renderRelated = () => {
    if (config.blog.enableRelatedPosts) {
      const { post } = this.props;
      return <Related key="related" posts={post.related} />;
    }
    return null;
  }

  renderComments = () => {
    const { post } = this.props;
    if (config.blog.enableDisqus) {
      return (<Comments key="comments" post={post} />);
    }
    return null;
  }

  render() {
    const { post } = this.props;
    return [
      <Cover key="cover" post={post} />,
      <Markdown key="markdown" source={post.text} />,
      this.renderTags(),
      this.renderComments(),
      this.renderRelated(),
    ];
  }
}

export default Details;
