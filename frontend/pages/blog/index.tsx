import React, { Component } from "react";
import styled from "styled-components";
import { Container } from "reactstrap";
import { NextPageContext } from "next";

import API, { HTTPError } from "api";
import Listing from "components/posts";
import Pages from "components/pages";
import { offsetFromQuery } from "utils";
import Error from "components/error";
import SearchInput from "components/search-input";
import { common as strings } from "public/static/locales/en";
import config from "public/static/config.json";
import Breadcrumb from "components/breadcrumb";
import Empty from "components/empty";
import { blog as link } from "public/static/links";
import { sm } from "public/static/styles/breakpoints";
import SEO from "components/seo";
import Content from "api/models/content";
import Response from "api/models/response";
import { PostSummary } from "api/models/post";


interface Props {
  content?: Content
  page: string
  response: Response<PostSummary>
  error?: HTTPError
}

interface State {
  results?: PostSummary[]
}

class Blog extends Component<Props, State> {
  state: State = { results: undefined };

  static async getInitialProps({ query }: NextPageContext) {
    let content;
    try {
      content = await API.fetch("contents/blog");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn("Create contents/blog for better SEO");
    }

    const page = query?.page ?? "1";
    const numberOfCells = config.blog.highlightLatest ? 9 : 10;
    const offset = offsetFromQuery(query, numberOfCells);
    try {
      const response = await API.fetch(`blog?limit=${numberOfCells}&${offset}`);
      return { content, response, page };
    } catch (error) {
      return { error };
    }
  }

  preformSearch = (query: string) => {
    API.fetch(`blog?search=${query}`).then((response) => {
      const { results } = response;
      this.setState({ results });
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error(error);
    });
  }

  resetSearch = () => {
    this.setState({ results: undefined });
  }

  renderPages = () => {
    const { page, response } = this.props;
    const { count } = response;
    const { results } = this.state;
    if (results) { return null; }
    return <Pages key="pages" count={count} current={page} baseUrl="blog" />;
  }

  renderSearch = () => {
    if (config.blog.enableSearch) {
      const { count } = this.props.response;
      const placeholder = strings.searchBlogPosts.replace("%count%", `${count}`);
      return (
        <InputWrapper key="search">
          <Breadcrumb title={link.name} />
          <SearchInput
            placeholder={placeholder}
            onInputUpdate={this.preformSearch}
            onReset={this.resetSearch}
          />
        </InputWrapper>
      );
    }
    return (
      <InputWrapper key="title">
        <Breadcrumb title={link.name} />
      </InputWrapper>
    );
  }

  renderListing = () => {
    const { response } = this.props;
    const { previous } = response;
    const posts = response.results;
    const { results } = this.state;
    if (results?.length === 0) {
      return <Empty key="empty" />;
    }
    return (
      <Listing key="listing" posts={results ?? posts} homepage={!previous && !results} />
    );
  }

  render() {
    const { error, content } = this.props;
    if (error) {
      return <Error error={error} />;
    }
    return [
      <SEO key="seo" meta={content?.meta} />,
      this.renderSearch(),
      this.renderListing(),
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

export default Blog;
