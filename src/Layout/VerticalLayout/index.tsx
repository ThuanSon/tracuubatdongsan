import { Avatar, Box, Grid, Typography } from "@mui/material";
import React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Link } from "react-router-dom";
const VerticalLayout = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <Grid item xs={0} sm={0} md={2}>
        <Grid
          container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // padding: '5px'
          }}
        >
          <Grid item xs={4} style={{ paddingTop: "10px", paddingLeft: "5px" }}>
            <Avatar sx={{ bgcolor: "deeppink", width: 35, height: 35 }}>
              MT
            </Avatar>
          </Grid>
          <Grid item xs={8}>
            <Typography>{sessionStorage.getItem("username")}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Quản lý tin đăng" value="1" />
                    {/* <Tab label="Item Two" value="2" />
                <Tab label="Item Three" value="3" /> */}
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Link to="/create/post">Đăng tin</Link>
                </TabPanel>
                <TabPanel value="1">
                  <Link to="/quan-ly-tin">Danh sách tin đăng</Link>
                </TabPanel>
                {/* <TabPanel value="3">Item Three</TabPanel> */}
              </TabContext>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Quản lý tài khoản cá nhân" value="1" />
                    {/* <Tab label="Item Two" value="2" />
                <Tab label="Item Three" value="3" /> */}
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <Link to="/tai-khoan/chinh-sua-thong-tin">
                    Chỉnh sửa thông tin
                  </Link>
                </TabPanel>
                <TabPanel value="1">
                  <Link to="/tai-khoan/cai-dat">Cài đặt tài khoản</Link>
                </TabPanel>
                {/* <TabPanel value="3">Item Three</TabPanel> */}
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={0} sm={0} md={1}></Grid>
    </>
  );
};

export default VerticalLayout;
