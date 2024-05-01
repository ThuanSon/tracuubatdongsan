import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { Box, CardMedia, Grid } from "@mui/material";
import HomeImage from "../../asset/image/banner.png";
import Search from "./Search";
import ListBatDongSan from "./ListBatDongSan";
import Map from "./Map";

const Dashboard = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const username = sessionStorage.getItem("username");
  //   if (username === null) {
  //     navigate("/user/authentication");
  //   }
  // }, [navigate]);

  return (
    <>
      {/* <Box className="boxImage"> */}

      <Grid container className="boxImage">
        <Grid item sm={1}></Grid>
        <Grid
          item
          sm={10}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "10px",
            paddingTop: "20px",
            // boxShadow:
            //   "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;",
          }}
        >
          {/* <Search /> */}
          <CardMedia
            sx={{
              height: 300,
              width: "100%",
              borderRadius: "14px",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
              // box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
            }}
            component="img"
            image={HomeImage}
            alt="Home"
          />
        </Grid>
        <Grid item sm={1}></Grid>
      </Grid>
      {/* </Box> */}
      <br />
      <Grid container>
        <Grid item sm={2}></Grid>
        <Grid item sm={8}>
          <Search />
        </Grid>
        <Grid item sm={2}></Grid>
      </Grid>
      <br />
      <Grid
        container
        sx={{
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          paddingBottom: "50px",
        }}
      >
        <Grid item sm={1}></Grid>
        <Grid item sm={10}>
          <h2>Bất động sản dành cho bạn</h2>
        </Grid>
        <Grid item sm={1}></Grid>
        <Grid item sm={1}></Grid>
        <Grid item sm={10}>
          <Grid
            container
            spacing={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <ListBatDongSan />
          </Grid>
        </Grid>
        <Grid item sm={1}></Grid>
        <Grid item sm={1}></Grid>
        <Grid
          item
          sm={10}
          // display="flex"
          // justifyContent="center"
          // alignItems="center"
        >
          {/* <Grid
            container
            spacing={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
          > */}
          <Map />
          {/* </Grid> */}
        </Grid>
        <Grid item sm={1}></Grid>
      </Grid>
    </>
  );
};
export default Dashboard;
