import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Container, Button } from "reactstrap";
import { error as strings } from "public/static/locales/en";
import { home } from "public/static/links";
import Img from "react-image";
import FiveHundred from "public/static/images/500.png";
import FourOhFour from "public/static/images/404.png";

import { sm } from "public/static/styles/breakpoints";
import Loading from "components/loading";


class Error extends React.Component {
  render() {
    const { error } = this.props;

    let src;
    let title;
    let subtitle;
    let backHome;

    if (error.code === 404) {
      src = FourOhFour;
      title = strings["404"].title;
      subtitle = strings["404"].subtitle;
      backHome = strings["404"].backHome;
    } else {
      src = FiveHundred;
      title = strings["500"].title;
      subtitle = strings["500"].subtitle;
      backHome = strings["500"].backHome;
    }

    return (
      <StyledContainer>
        <Img src={src} alt="error" loader={<Loading />} />
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <Link href={home.url}>
          <Button>{backHome}</Button>
        </Link>
      </StyledContainer>
    );
  }
}

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 16px;
  margin-bottom: 16px;
  img {
    width: 300px;
  }
  h1 {
    margin: 24px;
    margin-bottom: 8px;
  }
  button {
    margin-top: 16px;
    margin-bottom: 16px;
  }

  @media (${sm}) {
    img {
      width: 200px;
    }
    h1 {
      font-size: 175%;
    }
  }
`;

export default Error;
