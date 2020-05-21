import React from "react";
import styled from "styled-components";
import { Container } from "reactstrap";

import { common as strings } from "public/static/locales/en";


class Empty extends React.Component {
  render() {
    return (
      <Wrapper>
        <h2>{strings.empty.title}</h2>
        <p>
          {strings.empty.subtitle1}
          <br />
          {strings.empty.subtitle2}
        </p>
      </Wrapper>
    );
  }
}

const Wrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 50vh;
  margin-top: 16px;
  margin-bottom: 16px;
  color: var(--color-text-4);
  h2 {
    font-size: 22pt;
    margin-bottom: 8px;
  }
`;

export default Empty;
