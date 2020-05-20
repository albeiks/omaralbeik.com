import React, { Component } from "react";
import MathJax from "react-mathjax";


class Inline extends Component<{ value: string }> {
  render() {
    const { value } = this.props;
    return <MathJax.Node inline formula={value} />;
  }
}

export default Inline;
