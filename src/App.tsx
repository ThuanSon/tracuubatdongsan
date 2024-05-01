import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { publicRoute } from "./Routes";
import { DefaultLayout, VerticalLayout } from "./Layout";
import { Grid, Paper } from "@mui/material";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          {publicRoute.map((route, index) => {
            const Layout = route.layout === null ? Fragment : DefaultLayout;
            const VertiLayout =
              route.vertiLayout === null ? Fragment : VerticalLayout;
            let Page = route.component;
            const mdsize = route.vertiLayout === null ? 12 : 9;
            const bgcolor = route.vertiLayout === null ? "white" : "#998e8e17";
            return (
              <Route
                path={route.path}
                key={index}
                element={
                  <Paper>
                    <Layout>
                      <div style={{ backgroundColor: "#998e8e17" }}> <br /></div>
                      <Grid container>
                        <VertiLayout />
                        <Grid
                          sx={{
                            backgroundColor: bgcolor,
                          }}
                          item
                          xs={12}
                          sm={12}
                          md={mdsize}
                        >
                          <div
                            style={{
                              marginLeft: "10px",
                              backgroundColor: "white",
                              // display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center'
                            }}
                          >
                            <Page />
                          </div>
                        </Grid>
                      </Grid>
                    </Layout>
                  </Paper>
                }
              ></Route>
            );
          })}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
