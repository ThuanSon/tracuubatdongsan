import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { Box, CardMedia, Grid } from "@mui/material";
import HomeImage from "../../asset/image/Home.webp";
import Search from "./Search";


export const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (username === null) {
      navigate("/user/authentication");
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <br />
      <Box className="boxImage" >
        <CardMedia
          sx={{
            height: 100,
            width: "90%"
          }}
          component="img"
          image={HomeImage}
          alt="Home"
        />
      </Box>
      <br />
      <Grid container>
        <Grid item sm={3}></Grid>
        <Grid item sm={6}>
        <Search/>
        </Grid>
        <Grid item sm={3}></Grid>
      </Grid>

    </>
  );
};
