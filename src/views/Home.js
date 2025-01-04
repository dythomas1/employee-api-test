import React, { Fragment } from "react";

import Hero from "../components/Hero.tsx";
import Content from "../components/Content";

const Home = () => (
  <Fragment>
    <Hero />
    <hr />
    <Content />
  </Fragment>
);

export default Home;
