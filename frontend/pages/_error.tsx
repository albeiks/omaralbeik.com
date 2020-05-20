import React from "react";

import Err from "components/error";
import API from "api";


class Error extends React.Component {
  render() {
    return <Err error={API.error(500)} />;
  }
}

export default Error;
