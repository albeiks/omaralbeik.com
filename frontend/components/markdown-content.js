import React, { Component } from "react";
import styled from "styled-components";
import Markdown from "react-markdown";
import CodeBlock from "components/code-block";
import InlineLaTeX from "components/latex/inline";
import BlockLaTeX from "components/latex/block";
import { sm } from "public/static/styles/breakpoints";
import MathJax from "react-mathjax";
import RemarkMathPlugin from "remark-math";


class Content extends Component {
  render() {
    const { source } = this.props;
    return (
      <MathJax.Provider>
        <StyledMarkdown
          source={source}
          escapeHtml={false}
          plugins={[RemarkMathPlugin]}
          className="container"
          linkTarget="_blank"
          renderers={{
            code: CodeBlock,
            math: BlockLaTeX,
            inlineMath: InlineLaTeX,
          }}
        />
      </MathJax.Provider>
    );
  }
}

const StyledMarkdown = styled(Markdown)`
  border-radius: 16px;
  padding: 40px 64px;
  background: var(--color-bg-2);
  color: var(--color-text-1);
  font-size: 100%;
  font-family: var(--font-primary);

  p {
    margin-top: 16px;
    margin-bottom: 16px;
    font-size: 100%;
  }

  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 8px;
  }

  h1 {
    margin-top: 40px;
    font-size: 160%;
    font-weight: 800;
  }

  h2 {
    margin-top: 24px;
    font-size: 130%;
  }

  h3 {
    margin-top: 16px;
    font-size: 115%;
  }

  h4 {
    margin-top: 10px;
    font-size: 110%;
  }

  img {
    max-width: 100%;
    border-radius: 8px;
  }

  @media (${sm}) {
    border-radius: 0;
    padding: 16px 32px;
  }
`;

export default Content;
