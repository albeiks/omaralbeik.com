import React, { Component } from "react";
import styled from "styled-components";
import { Container, Breadcrumb, BreadcrumbItem } from "reactstrap";

import { home } from "public/static/links";
import { sm } from "public/static/styles/breakpoints";


class Crumb extends Component<{ title: string }> {
  render() {
    const { title } = this.props;
    return (
      <Wrapper>
        <Breadcrumb>
          <BreadcrumbItem>
            <a href={home.url} title={home.name}>{home.name}</a>
          </BreadcrumbItem>
          <BreadcrumbItem active><h1>{title}</h1></BreadcrumbItem>
        </Breadcrumb>
      </Wrapper>
    );
  }
}

const Wrapper = styled(Container)`
  nav {
    .breadcrumb {
      margin: 0;
      padding-left: 0;
      background: var(--color-bg-1);
      li {
        color: var(--color-text-1);
        line-height: 16px;
        h1 {
          font-size: 100%;
          margin: 0;
          display: inline;
          font-family: var(--font-primary);
          font-weight: 400;
        }
      }
    }
  }
  @media (${sm}) {
    padding: 0;
  }
`;

export default Crumb;
