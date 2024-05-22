import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_API_URL } from "../../BaseURL";
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
import { Link, useNavigate } from "react-router-dom";
import Base64 from "../../@type/Base64";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Idpost, Property } from "../../@type/interface";

// Define the TinYeuThich type to ensure type safety
interface TinYeuThich {
  anh1: string;
  anh2: string;
  anh3: string;
  anh4: string;
  dientich: string;
  donvi: string;
  email: string;
  giachothue: string | null;
  giatri: string;
  giaytophaply: string;
  id: string;
  idnguoidang: string;
  latitude: string;
  longitude: string;
  mobile: string;
  mota: string;
  name: string;
  ngaydang: string;
  noithat: string;
  sophongngu: string;
  sotang: string;
  tieude: string;
  idpost: string;
}

const TinYeuThich = () => {
  const [tin, setTin] = useState<TinYeuThich[]>([]);
  const [idPost, setIdPost] = useState<Idpost[]>([]);
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  const fetch = async () => {
    try {
      const id = sessionStorage.getItem("id-user-lg");
      const res = await axios.get<TinYeuThich[]>(
        `${BASE_API_URL}Controller/function/getTinYeuThich/?id=${id}`
      );
      setTin(res.data);
    } catch (error) {
      setTin([]);
      console.error("Error fetching data:", error);
    }
  };

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
    console.log(tin);

    getIdPostLike();
  }, []);
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
    <div>
      {tin.length === 0 ? (
        <p>No favorite posts available.</p>
      ) : (
        <Grid container spacing={2}>
          {tin.map((item) => (
            <Grid key={item.idpost} className="zoom" item xs={12} sm={6} md={4}>
              <Card>
                <Link
                  to={`/chi-tiet-bai-dang/${Base64.encode(
                    Base64.encode(item.idpost)
                  )}`}
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
                    onClick={() => handleClickLike(item.idpost)}
                  >
                    <FavoriteIcon
                      color={likes[item.idpost] ? "warning" : "inherit"}
                    />
                  </IconButton>
                  <IconButton
                    aria-label="share"
                    onClick={() => handleShare(item)}
                  >
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default TinYeuThich;
