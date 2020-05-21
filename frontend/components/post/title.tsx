import React, { Component } from "react";
import styled from "styled-components";
import { Container } from "reactstrap";

import DateWrapper from "components/date-wrapper";
import { sm } from "public/static/styles/breakpoints";
import { Post } from "api/models/post";


class Title extends Component<{ post: Post }> {
  render() {
    const { post } = this.props;
    return (
      <Wrapper>
        <h1>{post.title}</h1>
        <DateWrapper className="date" date={post.date_published} />
      </Wrapper>
    );
  }
}

const Wrapper = styled(Container)`
  padding-top: 0;
  padding-bottom: 48px;
  h1 {
    margin-bottom: 0;
    font-weight: 700;
  }
  .date {
    font-size: 120%;
  }
  @media (${sm}) {
    margin-top: 16px;
    padding-bottom: 0;
    margin-bottom: 32px;
    h1 {
      font-size: 160%;
    }
  }
`;

export default Title;
