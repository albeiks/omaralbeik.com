import React, { Component } from "react";
import styled from "styled-components";
import MathJax from "react-mathjax";


class Block extends Component<{ value: string }> {
  render() {
    const { value } = this.props;
    return (
      <Wrapper>
        <MathJax.Node formula={value} />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  overflow-x: scroll;
  max-width: 100%;
`;

export default Block;
