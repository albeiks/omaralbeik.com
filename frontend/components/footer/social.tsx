import React, { PureComponent } from "react";
import styled from "styled-components";
import { Col } from "reactstrap";

import links from "public/static/links/social";
import { sm, md } from "public/static/styles/breakpoints";


class SocialLinks extends PureComponent {
  render() {
    return (
      <Wrapper>
        <ul>
          {links.map((l) => (
            <li key={l.url}>
              <a key={l.name} href={l.url} title={l.name} target="_blank" rel="noopener noreferrer">
                {l.icon}
              </a>
            </li>
          ))}
        </ul>
      </Wrapper>
    );
  }
}

const Wrapper = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      display: inline-block;
      margin-left: 16px;
      svg {
        path {
          fill: var(--color-footer-text);
        }
      }
    }
  }
  @media (${sm}) {
    justify-content: center;
    ul {
      li {
        margin: 8px;
      }
    }
  }
  @media (${md}) {
    ul {
      li {
        margin-left: 8px;
      }
    }
  }
`;

export default SocialLinks;
