import React from "react";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";
// import ProfilePost from "./components/ProfilePost";
import { UserContextProvider } from "./context/UserContext";
import MyBlogs from "./pages/MyBlogs";
const App = () => {
  return (
    <div>
     
      <UserContextProvider>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/write" element={<CreatePost />}></Route>
        <Route exact path="/posts/post/:id" element={<PostDetails/>}></Route>
        <Route exact path="/edit/:id" element={<EditPost/>}></Route>
        <Route exact path="/myblogs/:id" element={<MyBlogs/>}></Route>
        <Route exact path="/profile/:id" element={<Profile/>}></Route>
      </Routes>
      </UserContextProvider>
    </div>
  );
};

export default App;

