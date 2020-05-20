import React, { Component } from "react";
import Link from "next/link";
import styled from "styled-components";
import {
  Container,
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  NavbarToggler,
} from "reactstrap";

import ActiveLink from "components/active-link";
import { common as strings } from "public/static/locales/en";
import { navbar as links, home } from "public/static/links";
import { sm } from "public/static/styles/breakpoints";
import Menu from "public/static/images/menu.svg";
import config from "public/static/config.json";


interface State {
  isOpen: boolean,
  small: boolean
}

class Bar extends Component<{}, State> {
  state = { isOpen: false, small: false };

  open = () => {
    this.setState({
      isOpen: true,
    });
  }

  close = () => {
    this.setState({
      isOpen: false,
    });
  }

  toggle = () => {
    this.setState((oldState) => ({
      isOpen: !oldState.isOpen,
    }));
  }

  componentDidMount = () => {
    if (config.header.sticky) {
      window.addEventListener("scroll", this.handleScroll);
    }
  }

  componentWillUnmount = () => {
    if (config.header.sticky) {
      window.removeEventListener("scroll", this.handleScroll);
    }
  }

  handleScroll = () => {
    if (window.scrollY > 100) {
      this.setState({ small: true });
    } else {
      this.setState({ small: false });
    }
  }

  render() {
    const { isOpen, small } = this.state;
    const className = small ? "small" : "large";
    const sticky = config.header.sticky ? "top" : null;
    return (
      <StyledNavbar expand="md" sticky={sticky} className={className}>
        <Container>
          <Link href={home.url}>
            <span title={home.name}>
              <NavbarBrand>{strings.name}</NavbarBrand>
            </span>
          </Link>
          <NavbarToggler className="menu" onClick={this.toggle}><Menu /></NavbarToggler>
          <Collapse isOpen={isOpen} navbar>
            <Nav navbar className="ml-auto">
              {links.map((link) => (
                <NavItem key={link.name}>
                  <ActiveLink href={link.url}>
                    <NavLink href={link.url} title={link.name} onClick={() => { this.close(); }}>
                      {link.name}
                    </NavLink>
                  </ActiveLink>
                </NavItem>
              ))}
            </Nav>
          </Collapse>
        </Container>
      </StyledNavbar>
    );
  }
}

const StyledNavbar = styled(Navbar)`
  background: var(--color-header);
  color: var(--color-header-text);
  height: 100px;
  transition: all 0.3s ease, color .1ms;
  box-shadow: 0 8px 0 0 var(--color-header-active);

  &.small {
    height: 56px;
    margin-bottom: 44px;
    box-shadow: none;
    .navbar-brand {
      font-size: 24px;
    }
  }

  .navbar-brand {
    font-size: 32px;
    font-family: var(--font-title);
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease, color .1ms;
  }

  li {
    padding: 0 8px;
    a {
      border-radius: 8px;
      color: var(--color-primary-text-1);
      :hover {
        color: var(--color-header-text);
        background: var(--color-header-hover);
      }
      &.active {
        padding-left: 24px !important;
        padding-right: 24px !important;
        color: var(--color-header-text);
        background: var(--color-header-active);
      }
    } 
  }

  @media (${sm}) {
    height: unset;

    &.small {
      height: unset;
      margin-bottom: unset;
    }

    .navbar-brand {
      padding-top: 12px;
      font-size: 24px;
    }

    .menu {
      padding-right: 0;
      :focus {
        outline: 0;
      }
      svg {
        path {
          fill: var(--color-footer-text);
        }
      }
    }

    ul {
      margin: 24px 0;
    }

    li {
      text-align: center;
      margin: 8px 0;
    }
  }
`;

export default Bar;
