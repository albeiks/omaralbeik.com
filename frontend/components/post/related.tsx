import React, { Component } from "react";
import styled from "styled-components";
import { Container, Row } from "reactstrap";

import { blog as strings } from "public/static/locales/en";
import { sm } from "public/static/styles/breakpoints";
import { PostSummary } from "api/models/post";

import PostCell from "./related-cell";


class Related extends Component<{ posts: PostSummary[] }> {
  render() {
    const { posts } = this.props;
    if (posts.length === 0) {
      return null;
    }
    return (
      <Wrapper>
        <h2>{strings.relatedTitle}</h2>
        <h3>{strings.relatedSubtitle}</h3>
        <Row>{posts.map((p) => (<PostCell key={p.id} post={p} />))}</Row>
      </Wrapper>
    );
  }
}

const Wrapper = styled(Container)`
  padding-top: 48px;
  padding-bottom: 48px;
  h2 {
    font-size: 180%;
  }
  h3 {
    font-family: var(--font-primary);
    font-size: 120%;
    padding-bottom: 16px;
  }
  @media (${sm}) {
    padding-top: 24px;
    padding-bottom: 40px;
    text-align: center;
    h2 {
     font-size: 140%;
    }
    h3 {
      font-size: 90%;
      padding-bottom: 16px;
    }
  }
`;

export default Related;
