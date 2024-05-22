import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Idpost, Post, Property } from "../../../@type/interface";
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
import { useTitle } from "../../../Components/useTitle";
const BatDongSanChoThue = () => {
  let { q } = useParams<{ q: string }>();
  //   q = Base64.decode(Base64.decode(q));
  useTitle(`Nhà đất ${q?.toLocaleLowerCase()}`);
  const [idPost, setIdPost] = useState<Idpost[]>([]);
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
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
  // console.log(listPost);
  const getIdPostLike = async () => {
    const iduser = sessionStorage.getItem("id-user-lg");
    try {
      const res = await axios.get(
        `${BASE_API_URL}Controller/function/getIdPostLiked/?iduser=${iduser}`
      );
      if (Array.isArray(res.data)) {
        setIdPost(res.data);
      } else {
        setIdPost([]);
        console.error("API returned data that is not an array:", res.data);
      }
    } catch (error) {
      setIdPost([]);
      console.error("Error fetching liked posts:", error);
    }
  };
  useEffect(() => {
    fetch();
    getIdPostLike();
  }, [q]);
  useEffect(() => {
    if (Array.isArray(idPost)) {
      const initialLikes: { [key: string]: boolean } = {};
      idPost.forEach((item) => {
        initialLikes[item.idpost] = true;
      });
      setLikes(initialLikes);
    } else {
      console.error("idPost is not an array:", idPost);
    }
  }, [idPost]);
  const nav = useNavigate();
  const handleClickLike = async (id: string) => {
    const iduser = sessionStorage.getItem("id-user-lg");
    if (!iduser) {
      alert("Please log in to like posts.");
      nav("/user/authentication");
      return;
    }

    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: !prevLikes[id],
    }));

    // You might want to send the like/unlike request to your server here
    if (!likes[id]) {
      const res = await axios.get(
        `${BASE_API_URL}Controller/function/addTinYeuThich/?idpost=${id}&iduser=${iduser}`
      );
      console.log(res.data);
    } else {
      const res = await axios.get(
        `${BASE_API_URL}Controller/function/deleteTinYeuThich/?idpost=${id}&iduser=${iduser}`
      );
      console.log(res.data);
    }
  };

  const handleShare = (item: Property) => {
    const url = `${window.location.origin}/chi-tiet-bai-dang/${Base64.encode(
      Base64.encode(item.id)
    )}`;
    const title = item.tieude;
    const text = item.mota;

    if (navigator.share) {
      navigator
        .share({
          title,
          text,
          url,
        })
        .then(() => console.log("Successfully shared"))
        .catch((error) => console.error("Error sharing", error));
    } else {
      navigator.clipboard.writeText(url).then(
        () => {
          alert("Link copied to clipboard");
        },
        (error) => {
          console.error("Error copying text: ", error);
        }
      );
    }
  };
  return (
    <Grid container spacing={2} className="">
      {listPost.map((item) => (
        <Grid key={item.id} className="zoom" item xs={12} sm={6} md={4}>
          <Card>
            <Link
              to={`/chi-tiet-bai-dang/${Base64.encode(Base64.encode(item.id))}`}
              style={{ textDecoration: "none" }}
            >
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
                image={`${BASE_API_URL}controller/test/img/${item.anh1}`}
                alt={item.tieude}
              />
              <CardContent sx={{ height: "50px" }}>
                <Typography variant="body2" color="text.secondary">
                  {item.mota.slice(0, 200) + "...Xem thêm"}
                </Typography>
              </CardContent>
            </Link>
            <CardActions disableSpacing>
              <IconButton
                aria-label="add to favorites"
                onClick={() => handleClickLike(item.id)}
              >
                <FavoriteIcon color={likes[item.id] ? "warning" : "inherit"} />
              </IconButton>
              <IconButton aria-label="share" onClick={() => handleShare(item)}>
                <ShareIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BatDongSanChoThue;
