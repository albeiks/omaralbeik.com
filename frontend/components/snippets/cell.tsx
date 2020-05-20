import React, { Component } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Col, Badge } from "reactstrap";
import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";

import { sm } from "public/static/styles/breakpoints";
import { snippet as link } from "public/static/links";
import { SnippetSummary } from "api/models/snippet";


interface Props extends WithRouterProps {
  snippet: SnippetSummary
  onClick?: Function
}

class SnippetCell extends Component<Props> {
  handleClick = () => {
    const { snippet, onClick } = this.props;
    if (onClick) {
      onClick(snippet);
    }
  }

  render() {
    const { snippet, router } = this.props;
    const { page } = router.query;
    const { url, name } = link(snippet, `${page}`);
    return (
      <StyledCol md={4} onClick={this.handleClick}>
        <Link href={url}>
          <a className="inner" href={url} title={name}>
            <h2>
              {snippet.name}
              <Badge pill className="language">{snippet.language.name}</Badge>
            </h2>
            <p className="summary">{snippet.summary}</p>
          </a>
        </Link>
      </StyledCol>
    );
  }
}

const StyledCol = styled(Col)`
  padding: 16px;
  .inner {
    text-decoration: none;
    color: var(--color-text-1);
    transition: all 0.3s ease;
    overflow: hidden;
    :hover {
      background: var(--color-bg-3);
    }
    display: flex;
    flex-direction: column;
    background: var(--color-bg-2);
    padding: 24px;
    border-radius: 8px;
    cursor: pointer;
    height: 280px;
    h2 {
      font-size: 150%;
      font-weight: 700;
      margin-top: 8px;
      .language {
        display: inline-block;
        border: 2px var(--color-text-1) solid;
        background: none;
        font-size: 70%;
        color: var(--color-text-1);
        margin: 8px;
        padding-bottom: 1px;
        vertical-align: middle;
      }
    }
  }
  @media (${sm}) {
    padding: 8px 16px;
    .inner {
      height: unset;
      h2 {
        font-size: 140%;
        margin-top: 0;
        line-height: 24px;
        .language {
          font-size: 75%;
        }
      }
      .summary {
        font-size: 100%;
        margin-bottom: 0;
      }
    }
  }
`;

export default withRouter(SnippetCell);
