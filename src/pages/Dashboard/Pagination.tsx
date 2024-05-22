import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Base64 from "../../@type/Base64";
import { Idpost, Property } from "../../@type/interface";
import { BASE_API_URL } from "../../BaseURL";

const Pagination: React.FC = () => {
  const nav = useNavigate();
  const [listPost, setListPost] = useState<Property[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [pageNumberLimit] = useState(12);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(12);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [idPost, setIdPost] = useState<Idpost[]>([]);
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});

  const getListBDS = async () => {
    try {
      const response = await axios.get<Property[]>(
        `${BASE_API_URL}Controller/function/getListBDS/`
      );
      setListPost(response.data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setListPost([]);
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

  const getLikeCounts = async () => {
    try {
      const response = await axios.get<{ [key: string]: number }[]>(
        `${BASE_API_URL}Controller/function/getNumLike/`
      );
      const initialLikeCounts = response.data.reduce(
        (acc: { [key: string]: number }, item) => {
          const key = Object.keys(item)[0];
          acc[key] = Number(item[key]);
          return acc;
        },
        {}
      );
      setLikeCounts(initialLikeCounts);
    } catch (error) {
      console.error("Error fetching like counts:", error);
      setLikeCounts({});
    }
  };

  useEffect(() => {
    getListBDS();
    getIdPostLike();
    getLikeCounts();
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

  const pages = [];
  for (let i = 1; i <= Math.ceil(listPost.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPageItems = listPost.slice(indexOfFirstItem, indexOfLastItem);

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const pageNumber = Number(event.currentTarget.getAttribute("data-id"));
    if (!isNaN(pageNumber)) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentPage(pageNumber);
        setIsAnimating(false);
      }, 300); // Duration of the animation
    }
  };

  const renderPageNumbers = pages.map((number) => {
    if (number <= maxPageNumberLimit && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          data-id={number.toString()}
          onClick={handleClick}
          className={currentPage === number ? "active" : undefined}
        >
          {number}
        </li>
      );
    }
    return null;
  });

  const handleNextbtn = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage((prev) => {
        const newPage = prev + 1;
        if (newPage > maxPageNumberLimit) {
          setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
          setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
        return newPage;
      });
      setIsAnimating(false);
    }, 300);
  };

  const handlePrevbtn = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage((prev) => {
        const newPage = prev - 1;
        if ((newPage - 1) % pageNumberLimit === 0) {
          setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
          setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
        return newPage;
      });
      setIsAnimating(false);
    }, 300);
  };

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

    if (!likes[id]) {
      await axios.get(
        `${BASE_API_URL}Controller/function/addTinYeuThich/?idpost=${id}&iduser=${iduser}`
      );
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [id]: (prevCounts[id] || 0) + 1,
      }));
    } else {
      await axios.get(
        `${BASE_API_URL}Controller/function/deleteTinYeuThich/?idpost=${id}&iduser=${iduser}`
      );
      setLikeCounts((prevCounts) => ({
        ...prevCounts,
        [id]: (prevCounts[id] || 0) - 1,
      }));
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
    <>
      <h2>Bất động sản dành cho bạn</h2>
      <Grid container spacing={2} className={isAnimating ? "fade" : ""}>
        {currentPageItems.map((item) => (
          <Grid key={item.id} className="zoom" item xs={12} sm={6} md={4}>
            <Card>
              <Link
                to={`/chi-tiet-bai-dang/${Base64.encode(
                  Base64.encode(item.id)
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
                  onClick={() => handleClickLike(item.id)}
                >
                  <FavoriteIcon
                    color={likes[item.id] ? "warning" : "inherit"}
                  />
                  <Typography>
                    {likeCounts[item.id] || 0} lượt yêu thích
                  </Typography>
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
      <ul className="pageNumbers">
        <li>
          <button onClick={handlePrevbtn} disabled={currentPage === pages[0]}>
            Prev
          </button>
        </li>
        {renderPageNumbers}
        <li>
          <button
            onClick={handleNextbtn}
            disabled={currentPage === pages[pages.length - 1]}
          >
            Next
          </button>
        </li>
      </ul>
    </>
  );
};

export default Pagination;
