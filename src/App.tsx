import React from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import "./App.css";
import { ListUser } from "./components/ListUser";
import { CreateUser } from "./components/CreateUser";
import { EditUser } from "./components/EditUser";
import { Login } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { Details } from "./components/Details";
import { BDSNgoaiDuAn } from "./components/BDSNgoaiDuAn";
import { BDSTrongDuAn } from "./components/BDSTrongDuAn";

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
            <Route path="/tra-cuu-bat-dong-san-ngoai-du-an" element={<BDSNgoaiDuAn/>}/>
            <Route path="/tra-cuu-bat-dong-san-trong-du-an" element={<BDSTrongDuAn/>}/>
            {/* <Route path="/user/profile" element={</>}/> */}
          </Routes>
        </BrowserRouter>
      </h5>
    </div>
  );
}

export default App;
