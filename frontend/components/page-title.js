import React, { Component } from "react";
import styled from "styled-components";
import { Container } from "reactstrap";
import { sm } from "public/static/styles/breakpoints";


class Title extends Component {
  render() {
    const { title, subtitle = null } = this.props;
    return (
      <StyledContainer>
        {title ? <h1>{title}</h1> : null}
        {subtitle ? <h2>{subtitle}</h2> : null}
      </StyledContainer>
    );
  }
}

const StyledContainer = styled(Container)`
  margin-bottom: 32px;

  h2 {
    font-size: 130%;
    font-family: var(--font-primary);
  }

  @media (${sm}) {
    margin-top: 16px;
    text-align: center;
    h1 {
      font-size: 170%;
    }
    h2 {
      font-size: 120%;
    }
  }
`;

export default Title;
