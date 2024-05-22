import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { Box, CardMedia, Grid } from "@mui/material";
import HomeImage from "../../asset/image/banner.png";
import Search from "./Search";
import ListBatDongSan from "./ListBatDongSan";
import Map from "./Map";
import axios from "axios";
import MapComponent from "./MapProps";
import { useTitle } from "../../Components/useTitle";
interface Position {
  dientich: string;
  donvi: string;
  email: string;
  giatri: string;
  giaytophaply: string;
  id: string;
  latitude: number;
  longitude: number;
  mota: string;
  name: string;
  ngaydang: string;
  nguoiduoclienhe: string;
  noithat: string;
  sodienthoai: string;
  sophongngu: string;
  sotang: string;
  tieude: string;
}

const Dashboard = () => {
  useTitle("Dashboard");
  const navigate = useNavigate();
  const [pos, setPos] = useState<Position[]>([]);
  const getListPosBDS = async () => {
    try {
      const response = await axios.get(
        "http://localhost/api/Controller/function/getListPositionBDS/"
      );
      setPos(response.data); // Set empty array if response.data is falsy
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPos([]); // Set empty array on error
    }
  };
  useEffect(() => {
    getListPosBDS();
  }, []);
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
        <Grid item sm={1}></Grid>
        <Grid item sm={10}>
          <Search />
        </Grid>
        <Grid item sm={1}></Grid>
      </Grid>
      <br />
      <Grid
        container
        sx={{
          paddingBottom: "50px",
        }}
      >
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
        <br />
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
          <MapComponent pos={pos} />
          {/* </Grid> */}
        </Grid>
        <Grid item sm={1}></Grid>
      </Grid>
    </>
  );
};
export default Dashboard;
