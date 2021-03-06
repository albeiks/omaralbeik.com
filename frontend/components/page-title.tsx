import React, { Component } from "react";
import styled from "styled-components";
import { Container } from "reactstrap";

import { sm } from "public/static/styles/breakpoints";


class Title extends Component<{ title: string, subtitle?: string }> {
  render() {
    const { title, subtitle } = this.props;
    return (
      <Wrapper>
        {title ? <h1>{title}</h1> : null}
        {subtitle ? <h2>{subtitle}</h2> : null}
      </Wrapper>
    );
  }
}

const Wrapper = styled(Container)`
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
