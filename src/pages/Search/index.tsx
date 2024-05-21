import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Base64 from "../../@type/Base64";
import axios from "axios";
import HomeImage from "../../asset/image/banner.png";
import { Property } from "../../@type/interface";
import {
  Grid,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { red } from "@mui/material/colors";
import Search from "../Dashboard/Search";

const SearchBDS = () => {
  let { q } = useParams<{ q: string }>();
  q = Base64.decode(Base64.decode(q));
  const [listPost, setListPost] = useState<Property[]>([]);

  const fetch = async () => {
    try {
      const res = await axios.get(
        `http://localhost/api/Controller/function/getBDSByAddress/?q=${q}`
      );
      if (Array.isArray(res.data)) {
        setListPost(res.data);
      } else {
        setListPost([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setListPost([]);
    }
  };

  useEffect(() => {
    fetch();
  }, [q]);

  return (
    <>
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
          }}
        >
          <CardMedia
            sx={{
              height: 300,
              width: "100%",
              borderRadius: "14px",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
            }}
            component="img"
            image={HomeImage}
            alt="Home"
          />
        </Grid>
        <Grid item sm={1}></Grid>
      </Grid>
      <br />
      <Grid container>
        <Grid item sm={1}></Grid>
        <Grid item sm={10}>
          <Search />
        </Grid>
        <Grid item sm={1}></Grid>
      </Grid>
      <br />
      <Grid container>
        <Grid item sm={1}></Grid>
        <Grid item sm={10}>
          <h2>Bất động sản tại khu vực {q}</h2>
        </Grid>
        <Grid item sm={1}></Grid>
      </Grid>
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
            <Grid container spacing={2} className="fade">
              {listPost.length > 0 ? (
                listPost.map((item) => (
                  <Grid
                    key={item.id}
                    className="zoom"
                    item
                    xs={12}
                    sm={6}
                    md={4}
                  >
                    <Link
                      to={`/chi-tiet-bai-dang/${Base64.encode(
                        Base64.encode(item.id)
                      )}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Card>
                        <CardHeader
                          sx={{ height: "50px" }}
                          avatar={
                            <Avatar sx={{ bgcolor: red[500] }}>
                              {item.name.charAt(0).toUpperCase()}
                            </Avatar>
                          }
                          title={item.tieude}
                          subheader={item.ngaydang}
                        />
                        <CardMedia
                          component="img"
                          height="194"
                          image={`http://localhost/api/controller/test/img/${item.anh1}`}
                          alt={item.tieude}
                        />
                        <CardContent sx={{ height: "50px" }}>
                          <Typography variant="body2" color="text.secondary">
                            {item.mota}
                          </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                          <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                          </IconButton>
                          <IconButton aria-label="share">
                            <ShareIcon />
                          </IconButton>
                        </CardActions>
                      </Card>
                    </Link>
                  </Grid>
                ))
              ) : (
                <Typography
                  variant="h6"
                  color="text.secondary"
                  display="flex"
                  paddingTop="13px"
                  justifyContent="center"
                  align="center"
                >
                  Không có dữ liệu
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={1}></Grid>
        <br />
        <Grid item sm={1}></Grid>
        <Grid item sm={10}></Grid>
        <Grid item sm={1}></Grid>
      </Grid>
    </>
  );
};

export default SearchBDS;
