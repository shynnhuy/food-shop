import React from "react";
import { Box } from "@material-ui/core";
import { Swiper } from "components/User";
import { Content } from "components/User/Content";

export const Home = () => {
  return (
    <React.Fragment>
      <Box style={{ padding: "0 0 32px 0" }} className="bg-white">
        <Swiper />
      </Box>
      <Content />
    </React.Fragment>
  );
};
