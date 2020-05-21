import React, { PureComponent } from "react";
import styled from "styled-components";
import { Container, Row } from "reactstrap";

import { sm } from "public/static/styles/breakpoints";
import config from "public/static/config.json";

import Links from "./links";
import Social from "./social";
import Copyright from "./copyright";


class Footer extends PureComponent {
  renderFooter = () => {
    if (config.enableFooter) {
      return (
        <Wrapper fluid key="footer">
          <Container>
            <Row>
              <Links />
              <Social />
            </Row>
          </Container>
        </Wrapper>
      );
    }
    return null;
  }

  renderCopyright = () => {
    if (config.enableCopyright) {
      return <Copyright key="copyright" />;
    }
    return null;
  }

  render() {
    return [
      this.renderFooter(),
      this.renderCopyright(),
    ];
  }
}

const Wrapper = styled(Container)`
  background: var(--color-footer-1);
  color: var(--color-footer-text);
  padding-top: 40px;
  padding-bottom: 40px;
  border-top: 2px solid var(--color-bg-3);
  border-bottom: 2px solid var(--color-bg-3);
  @media (${sm}) {
    padding-top: 24px;
    padding-bottom: 24px;
  }
`;

export default Footer;
