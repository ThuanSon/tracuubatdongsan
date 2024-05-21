import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import axios from "axios";
import { url } from "inspector";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Base64 from "../../@type/Base64";
import { Post } from "../../@type/interface";


const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(
          `http://localhost/api/Controller/function/getPost/?id=${Base64.decode(Base64.decode(id))}`
        );
        setData(res.data[0]);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const slideImages = [
    {
      url: `http://localhost/api/controller/test/img/${data.anh1}`,
      caption: "Slide 1",
    },
    {
      url: `http://localhost/api/controller/test/img/${data.anh2}`,
      caption: "Slide 2",
    },
    {
      url: `http://localhost/api/controller/test/img/${data.anh3}`,
      caption: "Slide 3",
    },
    {
      url: `http://localhost/api/controller/test/img/${data.anh4}`,
      caption: "Slide 4",
    },
  ];

  const Slideshow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slideImages.length);
      }, 3000); // Auto-slide interval: 3000ms (3 seconds)

      return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [slideImages.length]); // Restart interval when slideImages length changes

    const totalSlides = slideImages.length; // Total number of slides

    return (
      <div
        className="slide-container"
        style={{
          width: "100%",
        }}
      >
        <Slide
          duration={2000} // Slide transition duration: 2000ms (2 seconds)
          transitionDuration={500} // Transition effect duration: 500ms (0.5 seconds)
          arrows={false} // Hide navigation arrows
          // onChange={(oldIndex, newIndex) => {
          //   console.log(`Slide transitioned from ${oldIndex} to ${newIndex}`);
          // }}
          defaultIndex={0} // Start with the first slide
          indicators // Show slide indicators (dots)
        >
          {slideImages.map((slideImage, index) => (
            <div key={index}>
              <img
                src={slideImage.url}
                alt={slideImage.caption}
                width="100%"
                height="400vh"
                style={{
                  borderRadius: "13px",
                  // boxShadow:
                  // "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                }}
              />
            </div>
          ))}
        </Slide>
        {/* <span style={{ position: "sticky", right: 5 }}>
          {currentSlide + 1} / {totalSlides}
          {/* Display current slide index and total number of slides */}
        {/* </span> */}
      </div>
    );
  };

  return (
    <Container>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // backgroundImage: `url(${slideImages[0].url})`,
          // backgroundBlendMode:
          // eslint-disable-next-line no-restricted-globals
          // filter: blur()

          // backgroundRepeat: 'no-repeat',
          // width: '100%'
        }}
      >
        {/* <Grid item xs={4}></Grid> */}
        <Grid item xs={8} sx={{}}>
          <Slideshow />
        </Grid>
        <Grid item xs={4}>
          <Grid container>
            <Grid item xs={12}>
              <Card>
                <Link to ={`/user/profile/${Base64.encode(Base64.encode(data?.idnguoidang))}`}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }}>
                        {data?.nguoidang.charAt(0)}
                      </Avatar>
                    }
                    title={data?.nguoidang}
                    subheader={data?.ngaydang}
                  />
                </Link>
                <CardContent>
                  <Typography>
                    <h4>Thông tin liên hệ</h4>
                    <p>Email: {data?.emailnguoidang}</p>
                    <p>
                      Số điện thoại: +84 {data?.mobile} {`(${data?.nguoidang})`}
                    </p>
                    <p>Hoặc</p>
                    <p>Email: {data?.email}</p>
                    <p>
                      Số điện thoại: +84 {data?.sodienthoai}{" "}
                      {`(${data?.nguoiduoclienhe})`}
                    </p>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          background: "#efefef",
          color: "#000000",
        }}
      >
        <Grid item xs={12}>
          <h1>{data.tieude}</h1>
        </Grid>
        <Grid item xs={12}>
          <h3>Thông tin mô tả </h3>
          <p>{data?.mota}</p>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PostDetails;
