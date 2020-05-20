import React, { Component } from "react";
import styled from "styled-components";
import { Container, Row } from "reactstrap";

import { sm } from "public/static/styles/breakpoints";
import { Snippet, SnippetSummary } from "api/models/snippet";

import Cell from "./cell";
import Modal from "./modal";


interface Props {
  snippets: SnippetSummary[],
  selected?: Snippet
}

class Snippets extends Component<Props> {
  renderModal = () => {
    const { selected } = this.props;
    if (selected) {
      return <Modal snippet={selected} />;
    }
    return null;
  }

  render() {
    const { snippets } = this.props;

    return (
      <StyledContainer>
        <Row>{snippets.map((s) => (<Cell key={s.id} snippet={s} />))}</Row>
        {this.renderModal()}
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
