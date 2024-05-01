// import { Card, Grid } from "@mui/material";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { styled } from "@mui/material/styles";
// // import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
// import Collapse from "@mui/material/Collapse";
// import Avatar from "@mui/material/Avatar";
// import IconButton, { IconButtonProps } from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import { red } from "@mui/material/colors";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShareIcon from "@mui/icons-material/Share";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { Hash } from "crypto";
// import { encode } from "punycode";
// interface Property {
//   anh1: string;
//   anh2: string;
//   anh3: string;
//   anh4: string;
//   dientich: string;
//   donvi: string;
//   email: string;
//   giatri: string;
//   giaytophaply: string;
//   id: number;
//   mota: string;
//   name: string;
//   nguoiduoclienhe: string;
//   noithat: string;
//   sodienthoai: string;
//   sophongngu: number;
//   sotang: number;
//   tieude: string;
//   ngaydang: string;
// }
// interface ExpandMoreProps extends IconButtonProps {
//   expand: boolean;
// }

// const ExpandMore = styled((props: ExpandMoreProps) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));
// const ListBatDongSan = () => {
//   const [expanded, setExpanded] = React.useState(false);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   const [listPost, setListPost] = useState<Property[]>([]);
//   useEffect(() => {
//     getListBDS();
//   }, []);
//   const getListBDS = async () => {
//     const response = await axios.get(
//       "http://localhost/api/Controller/function/getListBDS/"
//     );
//     console.log(response.data);
//     setListPost(response.data);
//   };
//   return (
//     <>
//       {listPost.map((item) => (
//         <Grid
//           key={item?.id}
//           item
//           xs={4}
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//         >
//           <Link
//             to={
//               "/chi-tiet-bai-dang/?mq=" +
//               item?.id +
//               "&query=" +
//               encodeURIComponent(item?.tieude)
//             }
//           >
//             {/* <Card>
//               <img
//                 src={"http://localhost/api/controller/test/img/" + item?.anh1}
//                 alt="Avatar"
//               />
//             </Card> */}
//             <Card
//               sx={{
//                 // maxWidth: 345,
//                 width: "100%",
//                 boxShadow:
//                   "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;",
//               }}
//             >
//               <CardHeader
//                 avatar={
//                   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
//                     {item?.name}
//                   </Avatar>
//                 }
//                 action={
//                   <IconButton aria-label="settings">
//                     <MoreVertIcon />
//                   </IconButton>
//                 }
//                 sx={{
//                   height: "75px",
//                 }}
//                 title={item?.tieude}
//                 subheader={item?.ngaydang}
//               />
//               <CardMedia
//                 component="img"
//                 height="194"
//                 image={"http://localhost/api/controller/test/img/" + item?.anh1}
//                 alt={"Ảnh" + item?.tieude}
//               />
//               <CardContent>
//                 <Typography variant="body2" color="text.secondary">
//                   {
//                     item?.mota /*nên yêu cầu có phần mô tả ngắn cho từng bài viết*/
//                   }
//                 </Typography>
//               </CardContent>
//               <CardActions disableSpacing>
//                 <IconButton aria-label="add to favorites">
//                   <FavoriteIcon />
//                 </IconButton>
//                 <IconButton aria-label="share">
//                   <ShareIcon />
//                 </IconButton>
//                 {/* <ExpandMore
//                   expand={expanded}
//                   onClick={handleExpandClick}
//                   aria-expanded={expanded}
//                   aria-label="show more"
//                 >
//                   <ExpandMoreIcon />
//                 </ExpandMore> */}
//               </CardActions>
//               {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
//                 <CardContent>
//                   <Typography paragraph>Method:</Typography>
//                   <Typography paragraph>
//                     Heat 1/2 cup of the broth in a pot until simmering, add
//                     saffron and set aside for 10 minutes.
//                   </Typography>
//                   <Typography paragraph>
//                     Heat oil in a (14- to 16-inch) paella pan or a large, deep
//                     skillet over medium-high heat. Add chicken, shrimp and
//                     chorizo, and cook, stirring occasionally until lightly
//                     browned, 6 to 8 minutes. Transfer shrimp to a large plate
//                     and set aside, leaving chicken and chorizo in the pan. Add
//                     pimentón, bay leaves, garlic, tomatoes, onion, salt and
//                     pepper, and cook, stirring often until thickened and
//                     fragrant, about 10 minutes. Add saffron broth and remaining
//                     4 1/2 cups chicken broth; bring to a boil.
//                   </Typography>
//                   <Typography paragraph>
//                     Add rice and stir very gently to distribute. Top with
//                     artichokes and peppers, and cook without stirring, until
//                     most of the liquid is absorbed, 15 to 18 minutes. Reduce
//                     heat to medium-low, add reserved shrimp and mussels, tucking
//                     them down into the rice, and cook again without stirring,
//                     until mussels have opened and rice is just tender, 5 to 7
//                     minutes more. (Discard any mussels that don&apos;t open.)
//                   </Typography>
//                   <Typography>
//                     Set aside off of the heat to let rest for 10 minutes, and
//                     then serve.
//                   </Typography>
//                 </CardContent>
//               </Collapse> */}
//             </Card>
//           </Link>
//         </Grid>
//       ))}
//     </>
//   );
// };

// export default ListBatDongSan;

import { Card, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

interface Property {
  id: number;
  anh1: string;
  tieude: string;
  mota: string;
  ngaydang: string;
}

const ListBatDongSan = () => {
  const [listPost, setListPost] = useState<Property[]>([]);

  useEffect(() => {
    const getListBDS = async () => {
      try {
        const response = await axios.get<Property[]>(
          "http://localhost/api/Controller/function/getListBDS/"
        );
        console.log(response.data);
        setListPost(response.data || []); // Set empty array if response.data is falsy
      } catch (error) {
        console.error("Error fetching posts:", error);
        setListPost([]); // Set empty array on error
      }
    };

    getListBDS();
  }, []);

  return (
    <Grid container spacing={2}>
      {listPost.map((item) => (
        <Grid key={item.id} item xs={4}>
          <Link
            to={`/chi-tiet-bai-dang/?mq=${item.id}&query=${encodeURIComponent(
              item.tieude
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
                height="194"
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

export default ListBatDongSan;
