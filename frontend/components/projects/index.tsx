import React, { Component } from "react";
import styled from "styled-components";
import { Container, Row } from "reactstrap";

import { sm } from "public/static/styles/breakpoints";
import Project from "api/models/project";

import Cell from "./cell";


class Projects extends Component<{ projects: Project[] }> {
  render() {
    const { projects } = this.props;
    return (
      <Wrapper>
        <Row>{projects.map((p) => (<Cell key={p.id} project={p} />))}</Row>
      </Wrapper>
    );
  }
}

const Wrapper = styled(Container)`
  margin-top: 40px;
  margin-bottom: 64px;
  @media (${sm}) {
    margin-top: 24px;
    margin-bottom: 24px;
  }
`;

export default Projects;
