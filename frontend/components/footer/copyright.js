import React, { Component } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Container } from "reactstrap";
import { common, footer } from "public/static/locales/en";
import { home } from "public/static/links";
import { sm } from "public/static/styles/breakpoints";


class Copyright extends Component {
  render() {
    return (
      <Container>
        <Inner>
          {footer.copyright}
          <Link href={home.url} title={common.name}>
            <a href={home.url} title={common.name}>{common.name}</a>
          </Link>
          {footer.allRightsReserved}
        </Inner>
      </Container>
    );
  }
}

const Inner = styled(Container)`
  text-align: center;
  padding-top: 16px;
  padding-bottom: 16px;
  width: 100%;
  a {
    font-family: var(--font-title);
    font-weight: 700;
  }

  @media (${sm}) {
    font-size: 80%;
  }
`;

export default Copyright;
