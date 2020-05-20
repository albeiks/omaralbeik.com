import React from 'react';

import Github from "public/static/images/github.svg";
import Twitter from "public/static/images/twitter.svg";
import Linkedin from "public/static/images/linkedin.svg";
import StackOverflow from "public/static/images/stackoverflow.svg";

export const github = {
  name: "Github",
  url: "https://github.com/omaralbeik",
  icon: <Github />,
};

export const twitter = {
  name: "Twitter",
  handle: "@omaralbeik",
  url: "https://twitter.com/omaralbeik",
  icon: <Twitter />,
};

export const linkedin = {
  name: "Linkedin",
  url: "https://linkedin.com/in/omaralbeik",
  icon: <Linkedin />,
};

export const stackOverflow = {
  name: "Stack Overflow",
  url: "https://stackoverflow.com/users/3882644",
  icon: <StackOverflow />,
};

export default [github, twitter, linkedin, stackOverflow];
