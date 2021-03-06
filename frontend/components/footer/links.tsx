import React, { PureComponent } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Col, Row } from "reactstrap";

import { footer as links, repo } from "public/static/links";
import { footer as strings } from "public/static/locales/en";
import { sm } from "public/static/styles/breakpoints";


class Links extends PureComponent {
  render() {
    return (
      <Wrapper md={8}>
        <Row>
          <ul>
            {links.map((link) => (
              <li key={link.name}>
                <Link href={link.url}>
                  <a href={link.url} title={link.name}>{link.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </Row>
        <Row>
          <p className="repo">
            {strings.openSource}
            <a href={repo.url} title={repo.name} target="_blank" rel="noopener noreferrer">{repo.name}</a>
          </p>
        </Row>
      </Wrapper>
    );
  }
}

const Wrapper = styled(Col)`
  ul {
    list-style: none;
    padding: 0;
    margin: 16px 0;
    li {
      display: inline-block;
      margin-right: 16px;
      font-size: 110%;
      a {
        color: var(--color-footer-text);
        font-weight: 700;
        :hover {
          color: var(--color-footer-text);            
        }
      }
    }
  }
  .repo {
    width: 75%;
  }
  @media (${sm}) {
    ul {
      text-align: center;
      li {
        margin: 8px;
        padding: 4px 16px;
        border-radius: 8px;
        background: var(--color-footer-2);
        a {
          font-size: 90%;
          font-weight: 600;
        }
      }
    }
    .repo {
      width: 100%;
      text-align: center;
      font-size: 90%;
    }
  }
`;

export default Links;
