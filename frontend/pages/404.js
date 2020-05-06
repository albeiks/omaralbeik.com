import React from "react";
import Error from "components/error";


class FourOhFour extends React.Component {
  render() {
    return <Error code={404}/>;
  }
}

export default FourOhFour;
