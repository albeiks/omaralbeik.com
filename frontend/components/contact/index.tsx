import React, { Component } from "react";
import Toast from "cogo-toast";
import styled from "styled-components";
import {
  Container, Col, Form, FormGroup, Label, Input, Button,
} from "reactstrap";

import { countries, contact as strings } from "public/static/locales/en";
import API, { HTTPMethod } from "api";
import { sm } from "public/static/styles/breakpoints";

import ReCAPTCHA from "./recaptcha";

interface State {
  name: string
  email: string
  phone?: string
  country?: string
  city?: string
  subject: string
  message: string
  is_valid: boolean,
  recaptcha_response?: string
}

const emptyState: State = {
  name: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  subject: "",
  message: "",
  is_valid: false,
};

class ContactForm extends Component<{}, State> {
  initialState = emptyState

  state = this.initialState;

  reCaptchaRef: any = React.createRef();

  handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState((oldState) => ({
      ...oldState,
      [name]: value,
    }));
  }

  onReCAPTCHAChange = (response: any) => {
    this.setState((oldState) => ({
      ...oldState,
      recaptcha_response: response,
    }));
  }

  showAlert = (message: string, success: boolean) => {
    const options: any = { position: "bottom-center", hideAfter: 5 };
    if (success) {
      Toast.success(message, options);
    } else {
      Toast.error(message, options);
    }
  }

  handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await API.fetch("contact", HTTPMethod.post, this.state);
      this.setState(this.initialState);
      this.reCaptchaRef.current.reset();
      this.showAlert(strings.success, true);
    } catch (error) {
      this.showAlert(error, false);
    }
  }

  render() {
    const {
      name, email, phone, country, city, subject, message, recaptcha_response,
    } = this.state;
    const isValid = (name && email && subject && message && recaptcha_response);

    return (
      <StyledContainer>
        <h2>{strings.title}</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup row>
            <Label for="name" md={3} hide="xs">
              {strings.namePlaceholder}
            </Label>
            <Col md={9} sm={12}>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder={strings.namePlaceholder}
                value={name}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="email" md={3} hide="xs">{strings.emailPlaceholder}</Label>
            <Col md={9} sm={12}>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder={strings.emailPlaceholder}
                value={email}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="phone" md={3} hide="xs">{strings.phonePlaceholder}</Label>
            <Col md={9} sm={12}>
              <Input
                type="tel"
                name="phone"
                id="phone"
                placeholder={strings.phonePlaceholder}
                value={phone}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="country" md={3} hide="xs">{strings.countryPlaceholder}</Label>
            <Col md={9} sm={12}>
              <Input type="select" name="country" id="country" value={country} onChange={this.handleChange}>
                <option value="">{strings.defaultCountry}</option>
                {countries.map((c) => (<option key={c} value={c}>{c}</option>))}
                <option>1</option>
              </Input>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="city" md={3} hide="xs">{strings.cityPlaceholder}</Label>
            <Col md={9} sm={12}>
              <Input
                type="text"
                name="city"
                id="city"
                placeholder={strings.cityPlaceholder}
                value={city}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="subject" md={3} hide="xs">{strings.subjectPlaceholder}</Label>
            <Col md={9} sm={12}>
              <Input
                type="text"
                name="subject"
                id="subject"
                placeholder={strings.subjectPlaceholder}
                value={subject}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="message" md={3} hide="xs">{strings.messagePlaceholder}</Label>
            <Col md={9} sm={12}>
              <Input
                type="textarea"
                name="message"
                id="message"
                rows={10}
                placeholder={strings.messagePlaceholder}
                value={message}
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <ReCAPTCHA onChange={this.onReCAPTCHAChange} ref={this.reCaptchaRef} />
          <FormGroup row>
            <Col sm={12}>
              <Button disabled={!isValid} className="float-right">{strings.submit}</Button>
            </Col>
          </FormGroup>
        </Form>
      </StyledContainer>
    );
  }
}

const StyledContainer = styled(Container)`
  margin-top: 80px;
  form {
    margin-top: 40px;
    input, select, textarea {
      background-color: var(--color-bg-2);
      color: var(--color-text-1);
      border: none;
      -webkit-appearance: none;
      :focus {
        background-color: var(--color-bg-3);
        color: var(--color-text-1);
        -webkit-box-shadow: none;
        box-shadow: none;
      }
      ::placeholder {
        color: var(--color-text-4);
      }
    }
    textarea {
      min-height: 100px;
    }
  }
  @media (${sm}) {
    h2 {
      text-align: center;
      font-size: 150%;
    }
    form {
      padding-left: 24px;
      padding-right: 24px;
      label {
        display: none;
      }
    }
  }
`;

export default ContactForm;
