import React from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import "./App.css";
import { ListUser } from "./pages/ListUser";
import { CreateUser } from "./pages/CreateUser";
import { EditUser } from "./pages/EditUser";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Details } from "./pages/Details";
import { BDSNgoaiDuAn } from "./pages/BDSNgoaiDuAn";
import { BDSTrongDuAn } from "./pages/BDSTrongDuAn";
import { Post } from "./pages/Post";

function App() {
  if (!sessionStorage.getItem("username")) {
  }
  return (
    <div className="App">
      <h5>
        <BrowserRouter>
          <Routes>
            <Route index element={<CreateUser />} />
            <Route path="user/create" element={<CreateUser />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="user/authentication" element={<Login />} />
            <Route path="user/:id/edit" element={<EditUser />} />
            <Route path="bat-dong-san/chi-tiet" element={<Details />} />
            <Route
              path="/tra-cuu-bat-dong-san-ngoai-du-an"
              element={<BDSNgoaiDuAn />}
            />
            <Route
              path="/tra-cuu-bat-dong-san-trong-du-an"
              element={<BDSTrongDuAn />}
            />
            <Route path="/create/post" element={<Post />} />
            {/* <Route path="/user/profile" element={</>}/> */}
          </Routes>
        </BrowserRouter>
      </h5>
    </div>
  );
}

export default App;
