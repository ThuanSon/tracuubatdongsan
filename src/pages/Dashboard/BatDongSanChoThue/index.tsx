import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Post } from "../../../@type/interface";
import Base64 from "../../../@type/Base64";
import { BASE_API_URL } from "../../../BaseURL";
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
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
const BatDongSanChoThue = () => {
  let { q } = useParams<{ q: string }>();
//   q = Base64.decode(Base64.decode(q));
  const [listPost, setListPost] = useState<Post[]>([]);
  const fetch = async () => {
    try {
      const res = await axios.get(
        `${BASE_API_URL}Controller/function/getBatDongSanTheoLoaiTin/?q=${q}`
      );
      setListPost(res.data);
    } catch (error) {
      console.log(error);
      setListPost([]);
    }
  };
  console.log(listPost);
  useEffect(() => {
    fetch();
  }, [q]);
  return (
    <Grid container spacing={2} className="">
      {listPost.map((item) => (
        <Grid key={item.id} className="zoom" item xs={12} sm={6} md={4}>
          <Link
            to={`/chi-tiet-bai-dang/${Base64.encode(Base64.encode(item.id))}`}
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
                  {item.mota.slice(0, 200) + "...Xem thêm"}
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
      ))}
    </Grid>
  );
};

export default BatDongSanChoThue;
