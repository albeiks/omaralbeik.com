import React, { Children } from "react";
import Link from "next/link";
import { withRouter } from "next/router";


export default withRouter(({ router, children, ...rest }: any) => (
  <Link {...rest}>
    {React.cloneElement(Children.only(children as React.ReactNodeArray), {
      className: `/${router.pathname.split("/")[1]}` === rest.href ? "active" : null,
    })}
  </Link>
));
