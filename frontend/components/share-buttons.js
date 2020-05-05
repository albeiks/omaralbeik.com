import React, { Component } from "react";
import styled from "styled-components";
import { common as strings } from "public/static/locales/en";
import { sm } from "public/static/styles/breakpoints";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
  PocketShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon,
  PocketIcon,
} from "react-share";


class ShareButtons extends Component {
  render() {
    const { title, meta } = this.props;
    const { canonical } = meta;
    const message = title;
    const twitterMessage = `“${title}” by @${strings.twitterHandler}`;

    return (
      <StyledDiv>
        <p className="share">{strings.share}</p>
        <FacebookShareButton url={canonical} quote={message}>
          <FacebookIcon size={38} round />
        </FacebookShareButton>
        <TwitterShareButton url={canonical} title={twitterMessage}>
          <TwitterIcon size={38} round />
        </TwitterShareButton>
        <LinkedinShareButton url={canonical} title={message}>
          <LinkedinIcon size={38} round />
        </LinkedinShareButton>
        <RedditShareButton url={canonical} title={message}>
          <RedditIcon size={38} round />
        </RedditShareButton>
        <PocketShareButton url={canonical} title={message}>
          <PocketIcon size={38} round />
        </PocketShareButton>
      </StyledDiv>
    );
  }
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  p {
    font-size: 15px;
    margin: 0 8px 0 0;
  }
  button {
    margin: 0 4px;
  }
  @media (${sm}) {
    .share {
      display: none;
    }
  }
`;

export default ShareButtons;
