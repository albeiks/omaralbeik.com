import React, { PureComponent } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Container } from "reactstrap";

import { common, footer } from "public/static/locales/en";
import { home } from "public/static/links";
import { sm } from "public/static/styles/breakpoints";


class Copyright extends PureComponent {
  render() {
    return (
      <Wrapper>
        <Container>
          {footer.copyright}
          <Link href={home.url}>
            <a href={home.url} title={common.name}>{common.name}</a>
          </Link>
          {footer.allRightsReserved}
        </Container>
      </Wrapper>
    );
  }
}

const Wrapper = styled(Container)`
  .container {
    text-align: center;
    padding-top: 16px;
    padding-bottom: 16px;
    width: 100%;
    a {
      font-family: var(--font-title);
      font-weight: 700;
    }
  }
  @media (${sm}) {
    .container {
      font-size: 80%;
    }
  }
`;

export default Copyright;
