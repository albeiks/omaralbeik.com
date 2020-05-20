import React, { Component } from "react";
import styled from "styled-components";
import { Container, Badge } from "reactstrap";

import { sm } from "public/static/styles/breakpoints";
import Tag from "api/models/tag";


class Tags extends Component<{ tags: Tag[] }> {
  render() {
    const { tags } = this.props;
    return (
      <Container>
        <Inner>
          <ul>
            {tags.map((t) => (
              <li key={t.id}>
                <Badge>{t.name}</Badge>
              </li>
            ))}
          </ul>
        </Inner>
      </Container>
    );
  }
}

const Inner = styled(Container)`
  text-align: center;
  background: var(--color-bg-3);
  border-radius: 0  0 16px 16px;
  padding: 8px;
  margin-bottom: 48px;
  ul {
    padding: 0;
    margin: 16px;
  }
  li {
    display: inline-block;
    margin: 8px;
    .badge {
      background: var(--color-tag-bg);
      color: var(--color-tag-text);
      padding: 6px 12px;
      font-size: 90%;
    }
  }
  @media (${sm}) {
    li {
      margin: 4px;
      .badge {
        font-size: 80%;
      }
    }
  }
`;

export default Tags;
