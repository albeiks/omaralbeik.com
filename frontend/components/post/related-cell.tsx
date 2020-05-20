import React, { Component } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Col } from "reactstrap";

import DateWrapper from "components/date-wrapper";
import { blogPost } from "public/static/links";
import { sm } from "public/static/styles/breakpoints";
import { PostSummary } from "api/models/post";


class PostCell extends Component<{ post: PostSummary }> {
  render() {
    const { post } = this.props;
    return (
      <StyledCol md={6}>
        <Link href={blogPost(post).templateUrl} as={blogPost(post).url}>
          <div className="inner" title={blogPost(post).name}>
            <DateWrapper date={post.date_published} />
            <h2>{post.title}</h2>
            <p className="summary">{post.summary}</p>
          </div>
        </Link>
      </StyledCol>
    );
  }
}

const StyledCol = styled(Col)`
  padding: 16px;
  display: flex;
  .inner {
    transition: all 0.3s ease;
    :hover {
      background-color: var(--color-bg-3);
    }
    display: flex;
    flex-direction: column;
    background-color: var(--color-bg-2);
    padding: 24px;
    border-radius: 8px;
    cursor: pointer;
    .summary {
      overflow: hidden;
      flex-grow: 2;
    }
    h2 {
      font-size: 140%;
      font-weight: 700;
      margin-top: 16px;
    }
  }
  @media (${sm}) {
    padding-top: 8px;
    padding-bottom: 8px;
    .inner {
      h2 {
        margin: 8px;
        font-size: 140%;
      }
      .summary {
        margin-bottom: 0;
      }
    }
  }
`;

export default PostCell;
