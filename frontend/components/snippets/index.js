import React, { Component } from "react";
import styled from "styled-components";
import { Container, Row } from "reactstrap";
import { sm } from "public/static/styles/breakpoints";
import Cell from "./cell";
import Modal from "./modal";


class Snippets extends Component {
  render() {
    const { snippets, selected } = this.props;

    return (
      <StyledContainer>
        <Row>{snippets.map((s) => (<Cell key={s.id} snippet={s} />))}</Row>
        <Modal snippet={selected} />
      </StyledContainer>
    );
  }
}

const StyledContainer = styled(Container)`
  margin-top: 40px;
  margin-bottom: 64px;
  @media (${sm}) {
    margin-top: 24px;
    margin-bottom: 24px;
  }
`;

export default Snippets;
