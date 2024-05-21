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
import { Link } from "react-router-dom";
import Base64 from "../../@type/Base64";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

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

  const fetch = async () => {
    try {
      const id = sessionStorage.getItem("id-user-lg");
      const res = await axios.get<TinYeuThich[]>(
        `${BASE_API_URL}Controller/function/getTinYeuThich/?id=${id}`
      );
      setTin(res.data);
      console.log(tin);
    } catch (error) {
      setTin([]);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      {tin.length === 0 ? (
        <p>No favorite posts available.</p>
      ) : (
        <Grid container spacing={2}>
          {tin.map((item) => (
            item?.idpost ? (
              <Grid key={item.idpost} item xs={12} sm={6} md={4}>
                <Link
                  to={`/chi-tiet-bai-dang/${Base64.encode(
                    Base64.encode(item.idpost)
                  )}`}
                  style={{ textDecoration: "none" }}
                >
                  <Card>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: red[500] }}>
                          {item.tieude.charAt(0)}
                        </Avatar>
                      }
                      title={item.tieude}
                      subheader={item.ngaydang}
                    />
                    <CardMedia
                      component="img"
                      height="150"
                      image={`http://localhost/api/controller/test/img/${item.anh1}`}
                      alt={item.tieude}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {item.mota}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon color="primary" />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Link>
              </Grid>
            ) : null
          ))}
        </Grid>
      )}
    </div>
  );
};

export default TinYeuThich;
