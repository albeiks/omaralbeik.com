import React, { Component } from "react";
import styled from "styled-components";
import { Container, Breadcrumb, BreadcrumbItem } from "reactstrap";
import Img from "react-image";
import Loading from "components/loading";
import { blog } from "public/static/links";
import { sm } from "public/static/styles/breakpoints";
import ShareButtons from "components/share-buttons";
import config from "public/static/config.json";
import Title from "./title";


class Cover extends Component {
  renderSocialSharing = () => {
    const { post } = this.props;
    if (config.blog.enableSocialSharing) {
      return <ShareButtons title={post.title} meta={post.meta} />;
    }
    return null;
  }

  render() {
    const { post } = this.props;
    return (
      <div>
        <Title post={post} />
        <StyledImg src={[post.cover_image?.url]} alt={post.cover_image?.alt} loader={<Loading />} />
        <StyledContainer>
          <Breadcrumb>
            <BreadcrumbItem><a href={blog.url}>{blog.name}</a></BreadcrumbItem>
            <BreadcrumbItem active>{post.title}</BreadcrumbItem>
          </Breadcrumb>
          {this.renderSocialSharing()}
        </StyledContainer>
      </div>
    );
  }
}

const StyledContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  padding-top: 16px;
  padding-bottom: 16px;
  nav {
    .breadcrumb {
      margin: 0;
      padding-left: 0;
      background: var(--color-bg-1);
      li {
        color: var(--color-text-1);
      }
    }
  }

  @media (${sm}) {
    nav {
      display: none;
    }
    padding-top: 0;
    margin-bottom: 16px;
    flex-direction: column;
    align-items: center;
  }
`;

export const StyledImg = styled(Img)`
  width: 100vw;
  object-fit: cover;
  @media (${sm}) {
    margin-bottom: 32px;
  }
`;

export default Cover;
