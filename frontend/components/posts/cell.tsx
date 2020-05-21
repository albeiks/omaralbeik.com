import React, { Component } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Col, Button } from "reactstrap";

import DateWrapper from "components/date-wrapper";
import { blogPost as link } from "public/static/links";
import { common as strings } from "public/static/locales/en";
import { sm } from "public/static/styles/breakpoints";
import Arrow from "public/static/images/right-arrow.svg";
import config from "public/static/config.json";
import { PostSummary } from "api/models/post";


export enum PostCellType {
  normal = "normal",
  latest = "latest"
}

class PostCell extends Component<{ post: PostSummary, type?: PostCellType }> {
  render() {
    const { post } = this.props;
    let { type = PostCellType.normal } = this.props;
    if (!config.blog.highlightLatest) {
      type = PostCellType.normal;
    }
    const url = link(post);
    const readTime = `${post.read_time} ${strings.read}`;
    return (
      <Wrapper md={type === PostCellType.latest ? 12 : 6}>
        <Link href={url.templateUrl} as={url.url}>
          <a className={`inner ${type}`} href={url.url} title={url.name}>
            <DateWrapper date={post.date_published} />
            <h2 className={type}>{post.title}</h2>
            <p className="summary">{post.summary}</p>
            <div className="bottom">
              <p>{readTime}</p>
              <Link href={url.url}>
                <Button title={url.name}>
                  {strings.readMore}
                  <Arrow />
                </Button>
              </Link>
            </div>
          </a>
        </Link>
      </Wrapper>
    );
  }
}

const Wrapper = styled(Col)`
  padding: 16px;
  .inner {
    text-decoration: none;
    color: var(--color-text-1);
    transition: all 0.3s ease;    
    &.latest {
      border-bottom: 8px var(--color-bg-3) solid;
    }
    :hover {
      background: var(--color-bg-3);
    }
    display: flex;
    flex-direction: column;
    background: var(--color-bg-2);
    padding: 24px;
    border-radius: 8px;
    cursor: pointer;
    height: 320px;
    .btn svg {
      margin-left: 8px;
    }
    .summary {
      overflow: hidden;
      flex-grow: 2;
    }
    h2 {
      font-size: 150%;
      margin-top: 16px;
      &.latest {
        font-size: 200%;
      }
    }
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      p {
        margin: 0;
      }
    }
  }
  @media (${sm}) {
    padding: 8px 16px;
    .inner {
      height: unset;
      h2 {
        font-size: 160%;
        &.latest {
          font-size: 160%;
        }
      }
      .summary {
        margin-bottom: 0;
      }
      .bottom {
        margin-top: 24px;
      }
    }
  }
`;

export default PostCell;
