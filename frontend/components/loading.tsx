import * as React from "react";
import styled from "styled-components";
import ReactLoading from "react-loading";

class Loading extends React.Component {
  public render() {
    return (<StyledLoading type="spin" />);
  }
}

const StyledLoading = styled(ReactLoading)`
  margin: 30% auto;
  svg {
    fill: var(--color-primary-1);
  }
`;

export default Loading;
