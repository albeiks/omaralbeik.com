import React, { Component } from "react";
import styled from "styled-components";
import {
  Container, Row, Col, Button,
} from "reactstrap";
import { Img } from "react-image";

import DateWrapper, { DateFormat } from "components/date-wrapper";
import Loading from "components/loading";
import placeholder from "public/static/images/placeholders/project.png";
import { sm } from "public/static/styles/breakpoints";
import Arrow from "public/static/images/right-arrow.svg";
import Project from "api/models/project";

import Tags from "./tags";


class ProjectCell extends Component<{ project: Project }> {
  render() {
    const { project } = this.props;
    return (
      <Wrapper>
        <Container className="inner">
          <Row>
            <Col md={2} sm={12}>
              <Img src={[project.logo?.url, placeholder]} alt="logo" title={project.logo?.alt} loader={<Loading />} />
            </Col>
            <Col md={10} sm={12} className="info">
              <div className="stretchy">
                <DateWrapper format={DateFormat.month} date={project.date_published} />
                <h2>{project.name}</h2>
                <p className="summary">{project.summary}</p>
                <Tags tags={project.tags} />
              </div>
              <a href={project.url} title={project.name} target="_blank" rel="noopener noreferrer">
                <Button>
                  {project.url_name}
                  <Arrow />
                </Button>
              </a>
            </Col>
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

const Wrapper = styled(Container)`
  padding: 16px;
  .inner {
    transition: all 0.3s ease;
    :hover {
      background: var(--color-bg-3);
    }
    display: flex;
    flex-direction: column;
    background: var(--color-bg-2);
    padding: 24px;
    border-radius: 8px;
    .btn svg {
      margin-left: 8px;
    }
    img {
      border-radius: 16px;
      width: 100%;
      margin-top: 0;
      margin-bottom: auto;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .stretchy {
       flex: 1 0 auto;
      }
    }
    h2 {
      font-size: 170%;
      margin-top: 8px;
    }
  }
  @media (${sm}) {
    .inner {
      img {
       width: 30%;
      }
      .date {
        display: none;
      }
      h2 {
        margin-top: 24px;
        font-size: 150%;
      }
      .summary {
        font-size: 100%;
        margin-bottom: 8px;
      }
    }
  }
`;

export default ProjectCell;
