import React from "react";
import styled from "styled-components";
import { Container } from "reactstrap";
import { error as strings } from "public/static/locales/en";


class Error extends React.Component {
  render() {
    const { title, error } = this.props;
    return (
      <StyledContainer>
        <h1>{title ?? strings.generic.title}</h1>
        <p>{error?.message}</p>
      </StyledContainer>
    );
  }
}

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;

  h1 {
    margin: 64px;
  }
`;

export default Error;
