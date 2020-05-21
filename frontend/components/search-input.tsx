import React, { Component } from "react";
import { throttle, debounce } from "throttle-debounce";
import styled from "styled-components";
import { Container, Input, Button } from "reactstrap";

import { common as strings } from "public/static/locales/en";
import { sm } from "public/static/styles/breakpoints";


interface Props {
  placeholder: string
  onReset(): void
  onInputUpdate(query: string): void
}

interface State {
  q: string
}

class SearchInput extends Component<Props, State> {
  state: State = { q: "" };

  private searchDebounced: Function;

  private searchThrottled: Function;

  constructor(props: Props) {
    super(props);

    this.searchDebounced = debounce(500, this.search);
    this.searchThrottled = throttle(500, this.search);
  }

  changeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ q: event.target.value }, () => {
      const timmedQuery = this.state.q.trim();
      if (timmedQuery.length > 0 && timmedQuery.length < 5) {
        this.searchThrottled(timmedQuery);
      } else {
        this.searchDebounced(timmedQuery);
      }
    });
  };

  search = (query: string) => {
    const { onReset, onInputUpdate } = this.props;
    const timmedQuery = query.trim();
    if (timmedQuery.length === 0) {
      onReset();
    } else {
      onInputUpdate(timmedQuery);
    }
  }

  keyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode !== 13) { return; }
    event.currentTarget.blur();
    const query = event.currentTarget.value.trim();
    const { onReset, onInputUpdate } = this.props;
    if (query.length === 0) {
      onReset();
    } else {
      onInputUpdate(query);
    }
  }

  reset = () => {
    const { onReset } = this.props;
    this.setState({ q: "" });
    onReset();
  }

  renderClearButton = () => {
    const trimmedQuery = this.state.q.trim();
    if (trimmedQuery) {
      return <Button onClick={this.reset}>{strings.clear}</Button>;
    }
    return null;
  }

  render() {
    const { placeholder } = this.props;
    const { q } = this.state;

    return (
      <Wrapper>
        <Input
          placeholder={placeholder}
          value={q}
          onChange={this.changeQuery}
          onKeyDown={this.keyPress}
          aria-label={placeholder}
        />
        {this.renderClearButton()}
      </Wrapper>
    );
  }
}

const Wrapper = styled(Container)`
  display: flex;
  flex-direction: row;
  user-select: none;
  justify-content: flex-end;
  padding: 0;
  input {
    background-color: var(--color-bg-2);
    border: none;
    width: 80%;
    height: 45px;
    :focus {
      background-color: var(--color-bg-3);
      color: var(--color-text-1);
      -webkit-box-shadow: none;
      box-shadow: none;
    }
    ::placeholder {
      color: var(--color-text-4);
    }
  }
  button {
    margin-left: 8px;
    height: 45px;
  }
  @media (${sm}) {
    input {
      width: 100%;
    }
  }
`;

export default SearchInput;
