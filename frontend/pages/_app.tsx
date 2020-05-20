import React from "react";
import NextApp from "next/app";
import Router from "next/router";
import ReactGA from "react-ga";
import { NextSeo } from "next-seo";
import Progress from "nprogress";
import { register, unregister } from "next-offline/runtime";

import { common as strings } from "public/static/locales/en";
import config from "public/static/config.json";
import Layout from "components/layout";

import "bootstrap/dist/css/bootstrap.min.css";
import "public/static/styles/_variables.scss";

if (config.enableGoogleAnalytics) {
  ReactGA.initialize(process.env.FE_GA_TRACKING_NUMBER ?? "key");
}

if (config.enablePageLoadingBar) {
  Progress.configure({
    trickleSpeed: 100,
    showSpinner: false,
  });

  Router.events.on("routeChangeStart", () => {
    Progress.start();
  });
  Router.events.on("routeChangeComplete", () => {
    Progress.done();
  });
  Router.events.on("routeChangeError", () => {
    Progress.done();
  });
}

class App extends NextApp {
  componentDidMount() {
    register();
    if (config.enableGoogleAnalytics) {
      this.logPageView(window.location.pathname + window.location.search);

      Router.events.on("routeChangeComplete", (url: string) => {
        this.logPageView(url);
      });
    }
  }

  componentWillUnmount() {
    unregister();
  }

  logPageView = (url: string) => {
    try {
      ReactGA.set({ page: url });
      ReactGA.pageview(url);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(error);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <div>
        <NextSeo
          openGraph={{
            site_name: strings.name,
          }}
          twitter={{
            handle: `@${strings.twitterHandler}`,
            site: `@${strings.twitterHandler}`,
            cardType: "summary_large_image",
          }}
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    );
  }
}

export default App;
