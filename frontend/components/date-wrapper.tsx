import React from "react";
import styled from "styled-components";

import { months } from "public/static/locales/en";

export enum DateFormat {
  full,
  month
}

interface Props extends React.HTMLAttributes<HTMLElement> {
  date: string
  format?: DateFormat
}

class DateWrapper extends React.Component<Props> {
  dateString(): string {
    const date = new Date(this.props.date);
    const format = this.props.format ?? DateFormat.full;

    switch (format) {
      case DateFormat.full:
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
      case DateFormat.month:
        return `${months[date.getMonth()]} ${date.getFullYear()}`;
      default:
        return "";
    }
  }

  render() {
    const { className } = this.props;
    return (
      <Wrapper className={className}>{this.dateString()}</Wrapper>
    );
  }
}

const Wrapper = styled.span`
  color: var(--color-text-2);
  font-weight: 700;
  font-size: 90%;
  opacity: 0.75;
`;

export default DateWrapper;
