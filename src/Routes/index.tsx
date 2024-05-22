// import React, { lazy } from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { ListUser } from "../pages/ListUser";
import CreateUser from "../pages/CreateUser";
import { EditUser } from "../pages/EditUser";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Details from "../pages/Details";
import { BDSNgoaiDuAn } from "../pages/BDSNgoaiDuAn";
import { BDSTrongDuAn } from "../pages/BDSTrongDuAn";
import { Post } from "../pages/Post";
import UpLoadImage from "../pages/Post/UpLoadImage";
import { ThongTinBatDongSan } from "../pages/Post/ThongTinBatDongSan";
import ThongTinBaiViet from "../pages/Post/ThongTinBaiViet";
import FullPost from "../pages/Post/FullPost";
import Loadable from "../Components/Loadable";
import Map from "../pages/Dashboard/Map";
import { Fragment } from "react/jsx-runtime";
import PostDetails from "../pages/PostDetails";
import Slideshow from "../pages/PostDetails/Slideshow";
import UserProfile from "../pages/User";
import SearchBDS from "../pages/Search";
import BatDongSanChoThue from "../pages/Dashboard/BatDongSanChoThue";
// import MapLibreGL from "../pages/Map";
import MapComponentDirection from "../pages/Map";

// const CreateUser = Loadable(lazy(() => import("../pages/CreateUser")));

const publicRoute = [
  { path: "/*", component: Dashboard, vertiLayout: null },
  {
    path: "user/create",
    component: CreateUser,
    layout: null,
    vertiLayout: null,
  },
  {
    path: "user/authentication",
    component: Login,
    layout: null,
    vertiLayout: null,
  },
  { path: "dashboard", component: Dashboard, vertiLayout: null },
  { path: "map", component: MapComponentDirection, vertiLayout: null },
  {
    path: "/dashboard/bat-dong-san/:q",
    component: SearchBDS,
    vertiLayout: null,
  },
  { path: "bat-dong-san/chi-tiet", component: Details, vertiLayout: null },
  { path: "/create/post", component: Post },
  { path: "/upload-images", component: UpLoadImage },
  { path: "/bat-dong-san", component: ThongTinBatDongSan },
  { path: "/thong-tin-bai-viet", component: ThongTinBaiViet },
  { path: "/dashboard/map", component: Map, vertiLayout: null },
  { path: "/chi-tiet-bai-dang/:id", component: PostDetails, vertiLayout: null },
  { path: "/slide-show", component: Slideshow, vertiLayout: null },
  {
    path: "/user/profile/:idnguoidang",
    component: UserProfile,
    vertiLayout: null,
  },
  { path: "/bat-dong-san/:q", component: BatDongSanChoThue, vertiLayout: null },
];
export { publicRoute };
