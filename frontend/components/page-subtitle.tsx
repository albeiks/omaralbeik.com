import React, { Component } from "react";
import styled from "styled-components";
import { Container } from "reactstrap";

import { sm } from "public/static/styles/breakpoints";


interface Props {
  icon?: any
  subtitle: string
  header?: boolean
}


class Subtitle extends Component<Props> {
  render() {
    const { icon, subtitle, header = false } = this.props;
    return (
      <StyledContainer>
        {icon}
        {header ? <h1>{subtitle}</h1> : <h2>{subtitle}</h2>}
      </StyledContainer>
    );
  }
}

const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  user-select: none;
  margin-bottom: -32px;
  color: var(--color-text-3);
  svg {
    width: 32px;
    height: 32px;
    margin-right: 8px;
    margin-bottom: 4px;
    path {
      fill: var(--color-text-3);
    }
  }
  h1, h2 {
    font-size: 130%;
    margin-bottom: 0;
  }
  @media (${sm}) {
    margin-bottom: -16px;
    margin-top: 24px;
    svg {
      width: 28px;
      height: 28px;
    }
    h1, h2 {
      font-size: 120%;
    }
  }
`;

export default Subtitle;
