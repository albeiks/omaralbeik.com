import React, { Component } from "react";
import styled from "styled-components";
import { Container, Row } from "reactstrap";

import { sm } from "public/static/styles/breakpoints";
import { PostSummary } from "api/models/post";

import Cell, { PostCellType } from "./cell";


class Posts extends Component<{ posts: PostSummary[], homepage?: boolean }> {
  cellType = (index: number): PostCellType => {
    const { homepage = false } = this.props;
    if (!homepage) {
      return PostCellType.normal;
    }
    return index === 0 ? PostCellType.latest : PostCellType.normal;
  }

  render() {
    const { posts } = this.props;
    return (
      <Wrapper>
        <Row>{posts.map((p, i) => (<Cell key={p.id} type={this.cellType(i)} post={p} />))}</Row>
      </Wrapper>
    );
  }
}

const Wrapper = styled(Container)`
  margin-top: 40px;
  margin-bottom: 64px;
  @media (${sm}) {
    margin-top: 24px;
    margin-bottom: 24px;
  }
`;

export default Posts;
