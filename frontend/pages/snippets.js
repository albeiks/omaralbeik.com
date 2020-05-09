import React from "react";
import API from "api";
import Listing from "components/snippets";
import Pages from "components/pages";
import SEO from "components/seo";
import { offsetFromQuery } from "utils";
import Error from "components/error";
import SearchInput from "components/search-input";
import { common as strings } from "public/static/locales/en";
import config from "public/static/config.json";
import styled from "styled-components";
import { Container } from "reactstrap";
import { snippets as link } from "public/static/links";
import { sm } from "public/static/styles/breakpoints";
import Breadcrumb from "components/breadcrumb";


class Snippets extends React.Component {
  state = {};

  static async getInitialProps({ query }) {
    const page = query?.page ?? "1";
    const offset = offsetFromQuery(query, 9);
    const id = query?.id;

    let content;
    try {
      content = await API.fetch("contents/snippets");
    } catch (error) {
      console.warn("Create contents/snippets for better SEO");
    }

    try {
      const response = await API.fetch(`snippets?limit=9&${offset}`);
      if (id) {
        const selected = await API.fetch(`snippets/${id}`);
        return {
          content, response, selected, page,
        };
      }
      return { content, response, page };
    } catch (error) {
      return { error };
    }
  }

  preformSearch = (query) => {
    API.fetch(`snippets?search=${query}`).then((response) => {
      const { results } = response;
      this.setState({ results });
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
  }

  resetSearch = () => {
    this.setState({ results: null });
  }

  renderPages = () => {
    const { page, response } = this.props;
    const { count } = response;
    const { results } = this.state;
    if (results) { return null; }
    return <Pages key="pages" count={count} current={page} baseUrl="snippets" />;
  }

  renderSearch = () => {
    if (config.snippets.enableSearch) {
      return (
        <InputWrapper key="search">
          <Breadcrumb title={link().name} />
          <SearchInput
            placeholder={strings.searchSnippets}
            onInputUpdate={this.preformSearch}
            onReset={this.resetSearch}
          />
        </InputWrapper>
      );
    }
    return (
      <InputWrapper key="title">
        <Breadcrumb title={link().name} />
      </InputWrapper>
    );
  }

  render() {
    const {
      error, content, response, selected,
    } = this.props;

    if (error) {
      return <Error error={error} />;
    }

    const snippets = response.results;
    const { results } = this.state;

    const meta = selected ? selected?.meta : content?.meta;

    return [
      <SEO key="seo" meta={meta} />,
      this.renderSearch(),
      <Listing key="listing" snippets={results || snippets} selected={selected} />,
      this.renderPages(),
    ];
  }
}

const InputWrapper = styled(Container)`
  display: flex;
  flex-direction: row;
  @media (${sm}) {
    flex-direction: column;
  }
`;

export default Snippets;
