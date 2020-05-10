import React from "react";
import API from "api";

export default class Sitemap extends React.Component {
  static async getInitialProps({ res }) {
    res.setHeader("Content-Type", "application/xml");
    const sitemap = await API.fetch("sitemap");
    res.write(sitemap);
    res.end();
  }
}