import React, { Component } from "react";
import Link from "next/link";
import styled from "styled-components";
import Moment from "react-moment";
import { Col, Button } from "reactstrap";
import { blogPost as link } from "public/static/links";
import { common as strings } from "public/static/locales/en";
import { sm } from "public/static/styles/breakpoints";
import Arrow from "public/static/images/right-arrow.svg";
import config from "public/static/config.json";


class PostCell extends Component {
  render() {
    const { post } = this.props;
    let { type = "normal" } = this.props;
    if (!config.blog.highlightLatest) {
      type = "normal";
    }
    const readTime = `${post.read_time} ${strings.read}`;
    return (
      <StyledCol md={type === "latest" ? 12 : 6}>
        <Link href={link(post).templateUrl} as={link(post).url}>
          <a className={`inner ${type}`}>
            <Moment className="date" format="D/M/YYYY">{post.date_published}</Moment>
            <h2 className={type}>{post.title}</h2>
            <p className="summary">{post.summary}</p>
            <div className="bottom">
              <p>{readTime}</p>
              <Link href={link(post).url}>
                <Button>
                  {strings.readMore}
                  <Arrow />
                </Button>
              </Link>
            </div>
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
    height: 280px;

    .btn svg {
      margin-left: 8px;
    }

    .summary {
      overflow: hidden;
      flex-grow: 2;
    }

    .date {
      color: var(--color-text-2);
      font-weight: 700;
      font-size: 90%;
      opacity: 0.75;
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
