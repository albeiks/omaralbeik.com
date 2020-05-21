import React, { Component } from "react";


class MarkdownLink extends Component<{ href: string, children: any[] }> {
  render() {
    const { href, children } = this.props;
    const [child] = children;
    const { value } = child?.props;
    return <a href={href} title={value} target="_blank" rel="noopener noreferrer">{children.map((elem) => elem)}</a>;
  }
}

export default MarkdownLink;
