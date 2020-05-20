import React, { Component } from "react";
import styled from "styled-components";
import { Container } from "reactstrap";
import { DiscussionEmbed } from "disqus-react";

import { blog as strings } from "public/static/locales/en";
import { sm } from "public/static/styles/breakpoints";
import { Post } from "api/models/post";


class Comments extends Component<{ post: Post }> {
  render() {
    const { post } = this.props;
    const name = process.env.FE_DISQUS_SHORT_NAME ?? "shortname";
    return (
      <StyledContainer>
        <h2 className="title">{strings.commentsTitle}</h2>
        <Container className="inner">
          <DiscussionEmbed
            key="comments"
            shortname={name}
            config={{
              url: post.meta.canonical,
              identifier: post.slug,
              title: post.meta.title,
            }}
          />
        </Container>
      </StyledContainer>
    );
  }
}

const StyledContainer = styled(Container)`
  margin-top: 80px;
  margin-bottom: 32px;
  .title {
    font-size: 180%;
  }
  .inner {
    border-radius: 16px;
    padding: 32px;
    background: var(--color-bg-2);
  }
  @media (${sm}) {
    margin: 40px 0;
    padding: 0;
    .title {
      text-align: center;
      font-size: 140%;
    }
    .inner {
      border-radius: 0;
    }
  }
`;

export default Comments;
