import React, { useState,  useEffect  } from "react"; // Imports useState from React
import './App.css'; // Imports the css component from App.css
import Navi from './components/Navi.js'; // Imports all the components from the components folder
import Home from './components/Home.js';
import Footer from './components/Footer.js';
import Register from './components/Register.js';
import Feed from './components/Feed.js';
import Login from './components/Login.js';
import Profile from './components/Profile.js';
import EditProfile from './components/EditProfile.js';
import Post from './components/Post.js';
import AccountList from './components/AccountList.js';
import ChosenAccountPosts from './components/ChosenAccountPosts.js';
import Follow from './components/Follow.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; //Imports Router from React-Router-Dom
// import { getUser, removeUser } from "./components/VerifyUser.js" //Imports getUser and removeUser from VerifyUser.js
import { getUser, removeUser } from "./components/DataRepository";
import MessageContext from "./components/MessageContext.js";

function App() {
 
  const [user, setUser] = useState(getUser());

  const loginUser = (user) => {
    setUser(user);
  };

  const logoutUser = () => {
    removeUser();
    setUser(null);
  };

  const [message, setMessage] = useState(null);

  // Set message to null automatically after a period of time.
  useEffect(() => {
    if(message === null)
      return;
    const id = setTimeout(() => setMessage(null), 5000);

    // When message changes clear the queued timeout function.
    return () => clearTimeout(id);
  }, [message]);

  return (
    <div className = "pageContainer">
      <MessageContext.Provider value={{ message, setMessage }}>
      <div className = "pageWrap">
     
        {/* Sets the router for the website, so all the components are available*/}
        <Navi user = {user} logoutUser = {logoutUser}/>  {/*Gives the Navigation component, the user information and also sents the logout function*/}
        <BrowserRouter> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Feed" element={<Feed user = {user} />} />
            <Route path="/Register" element={<Register loginUser = {loginUser} />} />
            <Route path="/Login" element={<Login loginUser = {loginUser} />} />
            <Route path="/Profile" element={<Profile user = {user} />} /> {/*Gives the Profile component the user information*/}
            <Route path="/EditProfile" element={<EditProfile user = {user} />} /> {/*Gives the Profile component the user information*/}
            <Route path="/edit/:email"  /> {/*Gives the EditProfile component the user information*/}
            <Route path="/Post" element={<Post user = {user} />} /> {/*Gives the Post component the user information*/}
            <Route path="/AccountList" element={<AccountList user = {user} />} /> {/*Gives the accountList component the user information*/}
            <Route path="/ChosenAccountPosts" element={<ChosenAccountPosts user = {user} />} /> {/*Gives the ChosenAccountPosts component the user information*/}
            <Route path="/Follow" element={<Follow user = {user} />} /> {/*Gives the Followers/Following component the user information*/}
          </Routes>
        </BrowserRouter>
      </div> 
      </MessageContext.Provider>
      {/* FOOTER */}
      <Footer user = {user} logoutUser = {logoutUser}/>
    </div>
  );
}

export default App;
