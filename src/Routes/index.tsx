import { lazy } from "react";
import Loadable from "../Components/Loadable";

// Pages
import { Post } from "../pages/Post";
// import UpLoadImage from "../pages/Post/UpLoadImage";
import { ThongTinBatDongSan } from "../pages/Post/ThongTinBatDongSan";
import ThongTinBaiViet from "../pages/Post/ThongTinBaiViet";

// Lazily loaded components
const CreateUser = Loadable(lazy(() => import("../pages/CreateUser")));
const Login = Loadable(lazy(() => import("../pages/Login")));
const Dashboard = Loadable(lazy(() => import("../pages/Dashboard")));
const Details = Loadable(lazy(() => import("../pages/Details")));
const UpLoadImage = Loadable(lazy(() => import("../pages/Post/UpLoadImage")));
const Map = Loadable(lazy(() => import("../pages/Dashboard/Map")));
const PostDetails = Loadable(lazy(() => import("../pages/PostDetails")));
const Slideshow = Loadable(
  lazy(() => import("../pages/PostDetails/Slideshow"))
);
const UserProfile = Loadable(lazy(() => import("../pages/User")));
const SearchBDS = Loadable(lazy(() => import("../pages/Search")));
const BatDongSanChoThue = Loadable(
  lazy(() => import("../pages/Dashboard/BatDongSanChoThue"))
);
const MapComponentDirection = Loadable(lazy(() => import("../pages/Map")));
const QuanLyTinDang = Loadable(lazy(() => import("../pages/QuanLyTinDang")));
// Define public routes
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
  { path: "quan-ly-tin", component: QuanLyTinDang},
];

export { publicRoute };
