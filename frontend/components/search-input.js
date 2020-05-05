import React, { Component } from "react";
import { common as strings } from "public/static/locales/en";
import { throttle, debounce } from "throttle-debounce";
import styled from "styled-components";
import { Container, Input, Button } from "reactstrap";
import { sm } from "public/static/styles/breakpoints";


class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.searchDebounced = debounce(500, this.search);
    this.searchThrottled = throttle(500, this.search);
    this.state = { q: "" };
  }

  changeQuery = (event) => {
    this.setState({ q: event.target.value }, () => {
      // eslint-disable-next-line react/destructuring-assignment
      const timmedQuery = this.state.q.trim();
      if (timmedQuery.length > 0 && timmedQuery.length < 5) {
        this.searchThrottled(timmedQuery);
      } else {
        this.searchDebounced(timmedQuery);
      }
    });
  };

  search = (query) => {
    const { onReset, onInputUpdate } = this.props;
    const timmedQuery = query.trim();
    if (timmedQuery.length === 0) {
      onReset();
    } else {
      onInputUpdate(timmedQuery);
    }
  }

  keyPress = (event) => {
    if (event.keyCode !== 13) { return; }
    event.target.blur();
    const query = event.target.value.trim();
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
    // eslint-disable-next-line react/destructuring-assignment
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
      <StyledContainer>
        <Input
          placeholder={placeholder}
          value={q}
          onChange={this.changeQuery}
          onKeyDown={this.keyPress}
          aria-label={placeholder}
        />
        {this.renderClearButton()}
      </StyledContainer>
    );
  }
}

const StyledContainer = styled(Container)`
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
  }

  @media (${sm}) {
    input {
      width: 100%;
    }
  }
`;

export default SearchInput;
