import React, { Component } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Modal, ModalBody, Badge } from "reactstrap";
import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";

import Markdown from "components/markdown";
import Close from "public/static/images/close.svg";
import ShareButtons from "components/share-buttons";
import { sm } from "public/static/styles/breakpoints";
import config from "public/static/config.json";
import { Snippet } from "api/models/snippet";


interface Props extends WithRouterProps {
  snippet: Snippet
}

class SnippetModal extends Component<Props> {
  url = () => {
    const { router } = this.props;
    let url = router.asPath;
    if (router.query.page) {
      url = url.replace(`&id=${router.query.id}`, "");
    } else {
      url = url.replace(`?id=${router.query.id}`, "");
    }
    return url;
  }

  toggle = () => {
    const { router } = this.props;
    router.push(this.url());
  }

  renderSocialSharing = () => {
    const { snippet } = this.props;
    if (config.snippets.enableSocialSharing) {
      return <ShareButtons title={snippet.name} meta={snippet.meta} />;
    }
    return null;
  }

  render() {
    const { snippet } = this.props;

    if (!snippet) {
      return null;
    }

    return (
      <div>
        <Modal toggle={this.toggle} isOpen centered scrollable size="md">
          <StyledModalBody>
            <Link href={this.url()}>
              <Close className="close" />
            </Link>
            <div className="header">
              <h1>
                {snippet.name}
                <Badge pill className="language">{snippet.language.name}</Badge>
              </h1>
              <p>{snippet.summary}</p>
            </div>
            <Markdown source={snippet.text} />
            {this.renderSocialSharing()}
          </StyledModalBody>
        </Modal>
      </div>
    );
  }
}

const StyledModalBody = styled(ModalBody)`
  position: relative;
  color: var(--color-text-1);
  background: var(--color-bg-2);
  padding: 48px 32px;
  padding-bottom: 24px;
  .header {
    h1 {
      font-size: 180%;
      .language {
        display: inline-block;
        border: 2px var(--color-text-1) solid;
        background: none;
        font-size: 80%;
        color: var(--color-text-1);
        margin: 8px;
        padding-bottom: 1px;
        vertical-align: middle;
      }
    }
    margin-bottom: 40px;
  }
  .close {
    opacity: 1;
    cursor: pointer;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 12px;
    right: 12px;
    path {
      fill: var(--color-primary-2);
    }
  }
  .container {
    margin-top: 32px;
    margin-bottom: 32px;
    padding: 0;
  }

  @media (${sm}) {
    .header {
      h1 {
        font-size: 140%;
        .language {
          font-size: 80%;
        }
      }
    }
  }
`;

export default withRouter(SnippetModal);
