import { Box, Card, CardMedia, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./styles";

const list = [
  {
    name: "Food",
    image:
      "https://blogs.biomedcentral.com/on-medicine/wp-content/uploads/sites/6/2019/09/iStock-1131794876.t5d482e40.m800.xtDADj9SvTVFjzuNeGuNUUGY4tm5d6UGU5tkKM0s3iPk-620x342.jpg",
  },
  {
    name: "Drink",
    image:
      "https://img.delicious.com.au/CKMUcpx-/w1200/del/2015/11/summer-cocktails-24374-3.jpg",
  },
  {
    name: "Drink",
    image:
      "https://img.delicious.com.au/CKMUcpx-/w1200/del/2015/11/summer-cocktails-24374-3.jpg",
  },
  {
    name: "Drink",
    image:
      "https://img.delicious.com.au/CKMUcpx-/w1200/del/2015/11/summer-cocktails-24374-3.jpg",
  },
  {
    name: "Drink",
    image:
      "https://img.delicious.com.au/CKMUcpx-/w1200/del/2015/11/summer-cocktails-24374-3.jpg",
  },
  {
    name: "Drink",
    image:
      "https://img.delicious.com.au/CKMUcpx-/w1200/del/2015/11/summer-cocktails-24374-3.jpg",
  },
];

const SwiperItem = ({ name, image }) => {
  const classes = useStyles();
  return (
    <Card className={classes.Card}>
      <Typography variant="body1" className={classes.Title}>{name}</Typography>
      <CardMedia className={classes.cover} image={image} title={name} />
    </Card>
  );
};

export const Swiper = () => {
  const classes = useStyles();
  return (
    <Box component={Container} className={classes.root}>
      <Grid container className={classes.Container} spacing={2}>
        {list.map((item, key) => (
          <Grid key={key} item xs={4} md={2} zeroMinWidth>
            <SwiperItem {...item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
