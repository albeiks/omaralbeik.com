import React, { Component } from "react";
import styled from "styled-components";
import {
  Container, Pagination, PaginationItem, PaginationLink,
} from "reactstrap";


class Pages extends Component {
  pagesCount = () => {
    const { count } = this.props;
    return Math.ceil(count / 10);
  }

  itemUrl = (page) => {
    const { baseUrl } = this.props;
    return `${baseUrl}?page=${page}`;
  }

  renderItems = () => {
    const { current } = this.props;
    const count = this.pagesCount();
    const pages = [...Array(count).keys()].map((i) => (`${i + 1}`));
    return pages.map((i) => (
      <PaginationItem key={i} active={current === i}>
        <PaginationLink href={this.itemUrl(i)} title={`Page ${i}`}>{i}</PaginationLink>
      </PaginationItem>
    ));
  }

  render() {
    if (this.pagesCount() === 1) {
      return null;
    }

    return (
      <StyledContainer>
        <Pagination aria-label="pages">
          {this.renderItems()}
        </Pagination>
      </StyledContainer>
    );
  }
}

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;

  .active a {
    background: var(--color-primary-1) !important;
  }

  a {
    padding: 8px 32px;
    border: none;
    color: var(--color-text-1);
    background: var(--color-bg-3);
    :hover {
      background: var(--color-bg-2);
      color: var(--color-text-1);
    }
  }
`;

export default Pages;
