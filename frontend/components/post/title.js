import React, { Component } from "react";
import styled from "styled-components";
import { Container } from "reactstrap";
import Moment from "react-moment";
import { sm } from "public/static/styles/breakpoints";


class Title extends Component {
  render() {
    const { post } = this.props;

    return (
      <StyledContainer>
        <h1>{post.title}</h1>
        <Moment className="date" format="D/M/YYYY">{post.date_published}</Moment>
      </StyledContainer>
    );
  }
}

const StyledContainer = styled(Container)`
  padding-top: 0;
  padding-bottom: 48px;

  h1 {
    margin-bottom: 0;
    font-weight: 700;
  }

  .date {
    color: var(--color-text-3);
    font-weight: 700;
    font-size: 120%;
    opacity: 0.85;
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
