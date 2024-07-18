import React, { useState, useEffect } from "react";
import { Grid, AppBar, Typography, Toolbar, Avatar, Button, IconButton } from "@mui/material";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PasswordIcon from '@mui/icons-material/Password';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import * as actionType from "../../constants/actionTypes";
import { styles } from "./styles";

const Navbar = () => {
  const [user, setUser] = useState(
    localStorage.getItem("profile")
      ? jwtDecode(JSON.parse(localStorage.getItem("profile")).token)
      : "null"
  );
  const dispatch = useDispatch();
  let location = useLocation();
  const history = useNavigate();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history("/auth");
    setUser("null");
  };

  useEffect(() => {
    if (user !== "null" && user !== null) {
      if (user.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(
      localStorage.getItem("profile")
        ? jwtDecode(JSON.parse(localStorage.getItem("profile")).token)
        : "null"
    );
  }, [location]);

  const syncData = useSelector((state) => state.game.syncData)

  return (
    <AppBar sx={styles.appBar} position="static" color="inherit">
      <div sx={styles.brandContainer}>
        <Typography
          component={Link}
          to="/"
          sx={styles.heading}
          variant="h5"
          align="center"
        >
          CoinToss
        </Typography>
      </div>
      <Toolbar sx={styles.toolbar}>
        {user !== "null" && user !== null ? (
          <Grid container justifyContent={'flex-end'} alignItems={'center'}>
            <Avatar sx={styles.purple} alt={user.name} src={user.picture}>
              {user.name.charAt(0)}
            </Avatar>
            <Typography mx={1} variant="body1">
              {user.name} ,
            </Typography>
            <Typography variant="body2">
              TOKEN
            </Typography>
            <Typography mx={1} variant="h6">
              <b>x{syncData?.crypto_token}</b>
            </Typography>
            <IconButton
              color="secondary"
              onClick={() => {
                history("/password");
              }}
              sx={styles.button}
            >
              <PasswordIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={logout}
              sx={styles.button}
            >
              <ExitToAppIcon />
            </IconButton>
          </Grid>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
