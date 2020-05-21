import React, { Component } from "react";
import { Container } from "reactstrap";
import styled, { createGlobalStyle } from "styled-components";

import Navbar from "components/navbar";
import Footer from "components/footer";
import { sm } from "public/static/styles/breakpoints";


interface Props extends React.HTMLAttributes<HTMLElement> {}

class Layout extends Component<Props> {
  render() {
    const { children } = this.props;
    return (
      <div id="root">
        <GlobalStyle />
        <Navbar />
        <StretchyWrapper fluid>{children}</StretchyWrapper>
        <Footer />
      </div>
    );
  }
}

const StretchyWrapper = styled(Container)`
  flex: 1 0 auto;
  overflow-x: hidden;
  padding: 0;
  margin-top: 64px;
  margin-bottom: 64px;
  @media (${sm}) {
    margin-top: 24px;
    margin-bottom: 24px;
  }
`;

const GlobalStyle = createGlobalStyle`
    #root {
      position: absolute;
      left: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      min-height: 100%;
    }
    #nprogress {
      pointer-events: none;
    }
    #nprogress .bar {
      background: var(--color-header-text);
      position: fixed;
      z-index: 1031;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
    }
    body {
      font-family: var(--font-primary);
      color: var(--color-text-1);
      background: var(--color-bg-1);
      font-size: 100%;
      h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-title);
        font-weight: 700;
        margin: 0 0 16px;
      }
      h1, h2 {
        letter-spacing: -0.5px;
      }
      h3, h4 {
        letter-spacing: -1px;
        margin: 0 0 14px;
      }
      h5, h6 {
        letter-spacing: 0;
        margin: 0 0 13px;
      }
      a {
        color: var(--color-primary-1);
        font-weight: 600;
        :hover {
          color: var(--color-primary-3);
          text-decoration: underline;
        }
      }
      .btn {
        border: none;
        background: var(--color-primary-1);
        color: var(--color-primary-text);
        font-weight: 600;
        letter-spacing: 0;
        padding: 8px 16px;
        text-transform: uppercase;
        transition: all 0.15s ease-in-out;
        text-align: center;
        display: flex;
        align-items: center;
        svg {
          margin-right: 8px;
          width: 14px;
          height: 14px;
          margin: 0;
          path {
            fill: var(--color-primary-text);
          }
        }
        :hover {
          background: var(--color-primary-2);
        }
        :active,
        :visited,
        :focus {
          background: var(--color-primary-3) !important;
        }
      }
      table {
        display: block;
        overflow-x: scroll;
        margin-bottom: 20px;
        max-width: 100%;
        width: 100%;
        border-collapse: collapse;
        border-spacing: 0;
      }
      table > caption + thead > tr:first-child > th, table > colgroup + thead > tr:first-child > th, table > thead:first-child > tr:first-child > th, table > caption + thead > tr:first-child > td, table > colgroup + thead > tr:first-child > td, table > thead:first-child > tr:first-child > td {
        border-top: 0 none;
      }
      table > thead > tr > th {
        border-bottom: 2px solid var(--color-text-5);
        vertical-align: bottom;
      }
      table > thead > tr > th, table > tbody > tr > th, table > tfoot > tr > th, table > thead > tr > td, table > tbody > tr > td, table > tfoot > tr > td {
        border-top: 1px solid var(--color-text-5);
        line-height: 1.42857;
        padding: 8px;
        vertical-align: top;
      }
    }
`;

export default Layout;
