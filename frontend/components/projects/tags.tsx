import React, { Component } from "react";
import styled from "styled-components";
import { Badge } from "reactstrap";

import Tag from "api/models/tag";


class Tags extends Component<{ tags: Tag[] }> {
  render() {
    const { tags } = this.props;
    return (
      <Wrapper>
        {tags.map((t) => (<li key={t.id}><Badge>{t.name}</Badge></li>))}
      </Wrapper>
    );
  }
}

const Wrapper = styled.ul`
  padding: 0;
  li {
    display: inline-block;
    margin: 4px 8px 4px 0;
    .badge {
      background: var(--color-bg-1);
      color: var(--color-text-1);
      padding: 6px 12px;
    }
  }
`;

export default Tags;
