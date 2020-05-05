import React, { Component } from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";


class Loading extends Component {
  render() {
    return <StyledReactLoading type="spin" />;
  }
}

const StyledReactLoading = styled(ReactLoading)`
  margin: 30% auto;
  svg {
    fill: var(--color-primary-1);
  }
`;

export default Loading;
