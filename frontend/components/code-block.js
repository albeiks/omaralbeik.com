import React, { Component } from "react";
import styled from "styled-components";
import Highlight from "react-highlight.js";
import { Button } from "reactstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Copy from "public/static/images/copy.svg";
import config from "public/static/config.json";

import "public/static/styles/dracula.css";


class Block extends Component {
  state = { copied: false };

  onCopy = () => {
    this.setState({ copied: true });
    setTimeout(() => {
      this.setState({ copied: false });
    }, 1000);
  }

  renderCopyButton = () => {
    if (config.enableCodeBlockCopy) {
      const { value } = this.props;
      const { copied } = this.state;
      const title = copied ? "Copied!" : "Copy";
      const icon = copied ? null : <Copy />;

      return (
        <CopyToClipboard text={value} onCopy={this.onCopy}>
          <Button>
            {icon}
            {title}
          </Button>
        </CopyToClipboard>
      );
    }
    return null;
  }

  render() {
    const { value, language } = this.props;
    const copyClassName = config.enableCodeBlockCopy ? "copy" : "";
    return (
      <StyledDiv>
        <div className={`wrapper ${copyClassName}`}>
          <Highlight language={language}>{value}</Highlight>
          {this.renderCopyButton()}
        </div>
      </StyledDiv>
    );
  }
}

const StyledDiv = styled.div`
  background: #282a36;
  border-radius: 8px;
  position: relative;
  margin-top: 16px;
  margin-bottom: 16px;
  .wrapper {
    font-size: 85%;
    overflow: scroll;
    margin-top: 8px;
    pre {
      width: 100%;
      padding: 16px;
      tab-size: 4;
      white-space: pre;
      width: max-content;
      margin: 0;
    }
    &.copy {
      pre {
        padding-bottom: 48px;
      }
    }
  }

  button {
    font-size: 80%;
    border-radius: 0;
    position: absolute;
    bottom: 0;
    right: 0;
    border-bottom-right-radius: 8px;
    :focus {
      outline: none !important;
      box-shadow: none !important;
    }

    svg {
      width: 14px;
      height: 14px;
      margin-right: 8px;
    }
  }
`;

export default Block;
