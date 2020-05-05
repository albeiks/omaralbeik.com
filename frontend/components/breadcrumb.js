import React, { Component } from "react";
import styled from "styled-components";
import { Container, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { home } from "public/static/links";
import { sm } from "public/static/styles/breakpoints";


class Crumb extends Component {
  render() {
    const { title } = this.props;
    return (
      <StyledContainer>
        <Breadcrumb>
          <BreadcrumbItem><a href={home.url}>{home.name}</a></BreadcrumbItem>
          <BreadcrumbItem active><h1>{title}</h1></BreadcrumbItem>
        </Breadcrumb>
      </StyledContainer>
    );
  }
}

const StyledContainer = styled(Container)`
  nav {
    .breadcrumb {
      margin: 0;
      padding-left: 0;
      background: var(--color-bg-1);
      li {
        color: var(--color-text-1);
        h1 {
          font-size: 100%;
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
