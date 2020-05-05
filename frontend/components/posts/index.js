import React, { Component } from "react";
import styled from "styled-components";
import { Container, Row } from "reactstrap";
import { sm } from "public/static/styles/breakpoints";
import Cell from "./cell";

class Posts extends Component {
  cellType = (index) => {
    const { homepage } = this.props;
    if (!homepage) {
      return "normal";
    }
    return index === 0 ? "latest" : "normal";
  }

  render() {
    const { posts } = this.props;

    return (
      <StyledContainer>
        <Row>{posts.map((p, i) => (<Cell key={p.id} type={this.cellType(i)} post={p} />))}</Row>
      </StyledContainer>
    );
  }
}

const StyledContainer = styled(Container)`
  margin-top: 40px;
  margin-bottom: 64px;
  @media (${sm}) {
    margin-top: 24px;
    margin-bottom: 24px;
  }
`;

export default Posts;
