import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import { Box, CardMedia } from "@mui/material";
import HomeImage from "../../asset/image/Home.webp";

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
    </>
  );
};
