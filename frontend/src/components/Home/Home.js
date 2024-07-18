import React from "react";
import { Container, Grow, Paper, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import Game from "../Game";

const Home = () => {

  const user = localStorage.getItem("profile")
    ? jwtDecode(JSON.parse(localStorage.getItem("profile")).token)
    : "null";
  const isSingedIn = user;

  return (
    <Grow in>
      <Container component="main">
        {isSingedIn !== "null" && isSingedIn !== null ? (
          <Paper elevation={3}>
            <Game />
          </Paper>
        ) : (
          <Paper elevation={3} sx={{ padding: 10 }}>
            <Typography variant="h4" align="center" color="primary">
              Login to Play
            </Typography>
          </Paper>
        )}
      </Container>
    </Grow>
  );
};

export default Home;
