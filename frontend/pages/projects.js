import React from "react";
import API from "api";
import Listing from "components/projects";
import Pages from "components/pages";
import { offsetFromQuery } from "utils";
import Error from "components/error";
import Breadcrumb from "components/breadcrumb";
import SearchInput from "components/search-input";
import { common as strings } from "public/static/locales/en";
import config from "public/static/config.json";
import styled from "styled-components";
import { Container } from "reactstrap";
import { projects as link } from "public/static/links";
import { sm } from "public/static/styles/breakpoints";
import SEO from "components/seo";


class Projects extends React.Component {
  state = {};

  static async getInitialProps({ query }) {
    const page = query?.page ?? "1";
    const offset = offsetFromQuery(query);

    let content;
    try {
      content = await API.fetch("contents/projects");
    } catch (error) {
      console.warn("Create contents/projects for better SEO");
    }

    try {
      const response = await API.fetch(`projects?${offset}`);
      return { content, response, page };
    } catch (error) {
      return { error };
    }
  }

  preformSearch = (query) => {
    API.fetch(`projects?search=${query}`).then((response) => {
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
    return <Pages key="pages" count={count} current={page} baseUrl="projects" />;
  }

  renderSearch = () => {
    if (config.projects.enableSearch) {
      return (
        <InputWrapper key="serch">
          <Breadcrumb title={link.name} />
          <SearchInput
            placeholder={strings.searchProjects}
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

  render() {
    const { error, content, response } = this.props;

    if (error) {
      return <Error error={error} />;
    }

    const projects = response.results;
    const { results } = this.state;

    return [
      <SEO key="seo" meta={content?.meta} />,
      this.renderSearch(),
      <Listing key="listing" projects={results || projects} />,
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

export default Projects;
