import React, { Component } from "react";
import styled from "styled-components";
import MathJax from "react-mathjax";


class Block extends Component {
  render() {
    const { value } = this.props;
    return (
      <StyledDiv>
        <MathJax.Node formula={value} />
      </StyledDiv>
    );
  }
}

const StyledDiv = styled.div`
  overflow-x: scroll;
  max-width: 100%;
`;

export default Block;
