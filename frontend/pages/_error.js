import React from "react";
import Err from "components/error";


class Error extends React.Component {
  render() {
    return <Err code={500}/>;
  }
}

export default Error;
