import React, { Component } from "react";
import styled from "styled-components";
import CAPTCHA from "react-google-recaptcha";


class ReCAPTCHA extends Component {
  render() {
    const { onChange, innerRef } = this.props;
    return (
      <Wrapper>
        <StyledCAPTCHA
          sitekey={process.env.FE_RECAPTCHA_SITE_KEY || ""}
          onChange={onChange}
          ref={innerRef}
        />
      </Wrapper>
    );
  }
}

export const StyledCAPTCHA = styled(CAPTCHA)`
  margin-left: auto;
`;

export const Wrapper = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

export default React.forwardRef((props, ref) => (
  <ReCAPTCHA
    innerRef={ref}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
));
