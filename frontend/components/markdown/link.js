import React, { Component } from "react";
import Link from "next/link";
import { prod } from "public/static/links";


class MarkdownLink extends Component {
  render() {
    const { href, children } = this.props;
    const [ child ] = children;
    const { value } = child?.props;
    
    if (href.startsWith(prod.url)) {
      return (
        <Link href={href}>
          <a href={href} title={value}>{children.map(elem => elem)}</a>
        </Link>
      );
    }
    return <a href={href} title={value} target="_blank" rel="noopener noreferrer">{children.map(elem => elem)}</a>;
  }
}

export default MarkdownLink;
