import React, { Component } from "react";
import styled from "styled-components";
import { Container, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Img } from "react-image";

import Loading from "components/loading";
import { blog } from "public/static/links";
import { sm } from "public/static/styles/breakpoints";
import ShareButtons from "components/share-buttons";
import config from "public/static/config.json";
import { Post } from "api/models/post";

import Title from "./title";


class Cover extends Component<{ post: Post }> {
  renderImage() {
    const { post } = this.props;
    const image = post.cover_image;
    if (image) {
      return <Img src={image.url} alt="cover" title={image.alt} loader={<Loading />} />;
    }
    return null;
  }

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
      <Wrapper>
        <Title post={post} />
        {this.renderImage()}
        <Container className="navigation">
          <Breadcrumb>
            <BreadcrumbItem><a href={blog.url} title={blog.name}>{blog.name}</a></BreadcrumbItem>
            <BreadcrumbItem active>{post.title}</BreadcrumbItem>
          </Breadcrumb>
          {this.renderSocialSharing()}
        </Container>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  img {
    width: 100vw;
    object-fit: cover;
  }
  .navigation {
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
  }
  @media (${sm}) {
    img {
      margin-bottom: 32px;
    }
    .navigation {
      nav {
        display: none;
      }
      padding-top: 0;
      margin-bottom: 16px;
      flex-direction: column;
      align-items: center;
    }
  }
`;

export default Cover;
