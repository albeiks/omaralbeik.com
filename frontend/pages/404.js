import React from "react";
import Error from "components/error";
import API from "api";


class FourOhFour extends React.Component {
  render() {
    return <Error error={API.error(404)} />;
  }
}

export default FourOhFour;
