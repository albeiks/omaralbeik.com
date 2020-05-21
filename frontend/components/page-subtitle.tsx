import React, { Component } from "react";
import styled from "styled-components";
import { Container } from "reactstrap";
import Link from "next/link";

import { common as strings } from "public/static/locales/en";
import { sm } from "public/static/styles/breakpoints";


interface Props {
  icon?: JSX.Element
  subtitle: string
  header?: boolean
  showAllLink?: string
}

class Subtitle extends Component<Props> {
  renderShowAll = () => {
    const { showAllLink } = this.props;
    if (!showAllLink) {
      return null;
    }
    return [
      <div key="separator" className="separator" />,
      <Link key="link" href={showAllLink}><a>{strings.showAll}</a></Link>,
    ];
  }

  render() {
    const { icon, subtitle, header = false } = this.props;
    return (
      <Wrapper>
        {icon}
        {header ? <h1>{subtitle}</h1> : <h2>{subtitle}</h2>}
        {this.renderShowAll()}
      </Wrapper>
    );
  }
}

const Wrapper = styled(Container)`
  display: flex;
  align-items: center;
  user-select: none;
  margin-bottom: -32px;
  color: var(--color-text-3);
  svg {
    width: 32px;
    height: 32px;
    margin-right: 8px;
    margin-bottom: 4px;
    path {
      fill: var(--color-text-3);
    }
  }
  h1, h2 {
    font-size: 130%;
    margin-bottom: 0;
  }
  .separator {
    height: 2px;
    background: var(--color-bg-3);
    flex-grow: 2;
    margin: 0 24px;
  }
  a {
    margin-left: auto;
  }
  @media (${sm}) {
    margin-bottom: -16px;
    margin-top: 24px;
    .separator {
      display: none;
    }
    svg {
      width: 28px;
      height: 28px;
    }
    h1, h2 {
      font-size: 120%;
    }
  }
`;

export default Subtitle;
