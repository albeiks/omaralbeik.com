import React, { Component } from "react";
import styled from "styled-components";
import {
  Modal, ModalHeader, ModalBody, ModalFooter, Badge,
} from "reactstrap";
import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";

import Markdown from "components/markdown";
import ShareButtons from "components/share-buttons";
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
        <Wrapper isOpen scrollable size="lg" toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            {snippet.name}
            <Badge pill className="language">{snippet.language.name}</Badge>
          </ModalHeader>
          <ModalBody>
            <p>{snippet.summary}</p>
            <Markdown className="markdown" source={snippet.text} />
          </ModalBody>
          <ModalFooter>
            {this.renderSocialSharing()}
          </ModalFooter>
        </Wrapper>
      </div>
    );
  }
}

const Wrapper = styled(Modal)`
  .modal-content {
    border-radius: 8px;
    max-height: 75vh;
  }
  .modal-header, .modal-body, .modal-footer {
    color: var(--color-text-1);
    background: var(--color-bg-2);
    border: none;
  }
  .modal-header .close {
    color: var(--color-text-1);
    text-shadow: none;
    opacity: 1;
  }
  .modal-body {
    padding: 32px;
  }
  .language {
    border: 2px var(--color-text-1) solid;
    background: none;
    font-size: 80%;
    color: var(--color-text-1);
    margin: 2px 8px;
    padding-bottom: 1px;
    vertical-align: middle;
  }
  .markdown {
    padding: 0;
  }
`;

export default withRouter(SnippetModal);
