import React, { Component } from "react";
import styled from "styled-components";
import Highlight from "react-highlight.js";
import { Button } from "reactstrap";
import CopyToClipboard from "react-copy-to-clipboard";

import Copy from "public/static/images/copy.svg";
import config from "public/static/config.json";
import "public/static/styles/dracula.css";

interface Props {
  value: string
  language: string
}

class Block extends Component<Props> {
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
    const count = value.split(/\r\n|\r|\n/).length;
    const lines = Array(count).fill(0).map((_, i) => (i + 1));
    const copyClassName = config.enableCodeBlockCopy ? "copy" : "";
    return (
      <Wrapper>
        <div className={`wrapper ${copyClassName}`}>
          <ul className="numbers">
            {lines.map((line) => (<li key={`${line}`}>{line}</li>))}
          </ul>
          <Highlight language={language}>{value}</Highlight>
          {this.renderCopyButton()}
        </div>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  background: #282a36;
  border-radius: 8px;
  position: relative;
  margin-top: 16px;
  margin-bottom: 16px;
  .wrapper {
    font-size: 85%;
    overflow-x: scroll;
    margin-top: 8px;
    .numbers {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: absolute;
      user-select: none;
      list-style: none;
      font-family: monospace;
      padding: calc(0.5em + 16px) 8px;
      margin: 0;
      color: #858ca0;
      background: #282a36;
      line-height: 1.55;
      border-right: 1px solid #3C4252;
      border-top-left-radius: 8px;
      text-align: right;
      height: calc(100% - 32px);
    }
    pre {
      width: 100%;
      padding: 16px;
      padding-left: 32px;
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
