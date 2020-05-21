import React, { Component } from "react";
import styled from "styled-components";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  RedditShareButton,
  PocketShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon,
  PocketIcon,
} from "react-share";

import { common as strings } from "public/static/locales/en";
import { sm } from "public/static/styles/breakpoints";
import Meta from "api/models/meta";


class ShareButtons extends Component<{ title: string, meta: Meta }> {
  render() {
    const { title, meta } = this.props;
    const { canonical } = meta;
    const message = title;
    const twitterMessage = `“${title}” by @${strings.twitterHandler}`;
    return (
      <Wrapper>
        <p className="share">{strings.share}</p>
        <FacebookShareButton url={canonical} quote={message}>
          <FacebookIcon size={38} round />
        </FacebookShareButton>
        <TwitterShareButton url={canonical} title={twitterMessage}>
          <TwitterIcon size={38} round />
        </TwitterShareButton>
        <WhatsappShareButton url={canonical} title={message}>
          <WhatsappIcon size={38} round />
        </WhatsappShareButton>
        <LinkedinShareButton url={canonical} title={message}>
          <LinkedinIcon size={38} round />
        </LinkedinShareButton>
        <RedditShareButton url={canonical} title={message}>
          <RedditIcon size={38} round />
        </RedditShareButton>
        <PocketShareButton url={canonical} title={message}>
          <PocketIcon size={38} round />
        </PocketShareButton>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
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
