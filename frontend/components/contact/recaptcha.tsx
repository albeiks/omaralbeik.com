import React, { Component } from "react";
import styled from "styled-components";
import CAPTCHA from "react-google-recaptcha";


class ReCAPTCHA extends Component<{ onChange: any, innerRef: any }> {
  render() {
    const { onChange, innerRef } = this.props;
    return (
      <Wrapper>
        <StyledCAPTCHA
          sitekey={process.env.FE_RECAPTCHA_SITE_KEY || "key"}
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

export default React.forwardRef((props: any, ref: any) => (
  <ReCAPTCHA
    innerRef={ref}
    {...props}
  />
));
