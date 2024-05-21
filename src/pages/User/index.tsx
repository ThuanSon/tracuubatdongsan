import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Base64 from "../../@type/Base64";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { User } from "../../@type/interface";
import {
  Grid,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import TinYeuThich from "./TinYeuThich";

// Define the TabPanelProps type for better type checking
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Define the User type to ensure type safety

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// Custom hook for fetching user data
const useUserData = (idnguoidang: string) => {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<User[]>(
          `http://localhost/api/Controller/function/getUser/?idnguoidang=${idnguoidang}`
        );
        setData(res.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idnguoidang]);

  return { data, loading, error };
};

const BasicTabs: React.FC<{ data: User[] }> = ({ data }) => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Tin đã đăng" {...a11yProps(0)} />
          <Tab label="Tin yêu thích" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        {data.length > 0 ? (
          <Grid container spacing={2}>
            {Array.isArray(data) &&
              data.map((item) => (
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
              ))}
          </Grid>
        ) : (
          <Typography>
            <h5>Khoong co du lieu</h5>
          </Typography>
        )}
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TinYeuThich />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
};

const UserProfile: React.FC = () => {
  const { idnguoidang } = useParams<{ idnguoidang: string }>();
  const decodedId = Base64.decode(Base64.decode(idnguoidang)); // Double decode as per your requirement
  const { data, loading, error } = useUserData(decodedId);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <BasicTabs data={data} />
    </div>
  );
};

export default UserProfile;
