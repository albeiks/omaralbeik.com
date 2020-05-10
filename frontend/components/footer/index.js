import React, { Component } from "react";
import styled from "styled-components";
import { Container, Row } from "reactstrap";
import { sm } from "public/static/styles/breakpoints";
import config from "public/static/config.json";
import Links from "./links";
import Social from "./social";
import Copyright from "./copyright";


class Footer extends Component {
  renderFooter = () => {
    if (config.enableFooter) {
      return (
        <Outer fluid className="outer" key="footer">
          <Container>
            <Row>
              <Links />
              <Social />
            </Row>
          </Container>
        </Outer>
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

const Outer = styled(Container)`
  background: var(--color-footer-1);
  color: var(--color-footer-text);
  padding-top: 40px;
  padding-bottom: 40px;

  @media (${sm}) {
    padding-top: 24px;
    padding-bottom: 24px;
  }
`;

export default Footer;
