import React, { Component } from "react";
import Markdown from "components/markdown-content";
import config from "public/static/config.json";
import Cover from "./cover";
import Tags from "./tags";
import Related from "./related";

class Post extends Component {
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

  render() {
    const { post } = this.props;
    return [
      <Cover key="cover" post={post} />,
      <Markdown key="markdown" source={post.text} />,
      this.renderTags(),
      this.renderRelated(),
    ];
  }
}

export default Post;
