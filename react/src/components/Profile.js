import '../App.css';
import { useContext } from "react";
import image_dp from '../assets/default_image.png'; // Imports image
import 'bootstrap/dist/css/bootstrap.min.css'; // Imports boostrap css
import MessageContext from "../components/MessageContext";
import { getProfile } from "../components/DataRepository";
import { useState, useEffect, } from "react"; // Imports the useState and useEffect hooks from React
import { Navigate, useNavigate } from "react-router-dom"; // Imports the useNavigate hook from React-Router-Dom

function Profile(props) {
  const navigate = useNavigate(); // Allows the navigate hook from React-Router-Dom
  const { message } = useContext(MessageContext) || {};
  const [profile, setProfile] = useState([]);
  
  
  useEffect(() => {
    async function loadProfile() {
      const currentProfile = await getProfile(props.user.email);
      setProfile(currentProfile);
    }
    loadProfile();
  }, [props.user.email]);

  function viewAccounts() {
    navigate("/AccountList");
  }

  function viewFriends() {
    localStorage.setItem("account_selected", props.user.email);
    navigate("/Follow");
  }

  return (
    // Profile Page //
    <div className = "home_profile">
      <div className = "edit_alert">
        {message && <div className="alert alert-success" role="alert">{message}</div>}
      </div>
      <div className = "profile_box">
        <div classname = "profile_dp">
          <img src = {image_dp} alt = "profile_dp"/>
        </div>
        <span classname = "profile_info">
          <h3 className = "profile_name">Welcome, {profile.first_name} {profile.last_name}</h3>  
          <p><i>"This is about me, me and guess who, also me!"</i></p>   <p align = "left">Date Joined: {props.user.date_of_registration}</p>
        </span>
        <div className = "button_container">
        {/* View All Friends */}
        <div className = "logout_button">
            <form onSubmit={viewFriends}>
              <input type = "submit" value = "Friends" id = "view_post_button"></input>
            </form>
          </div>
          <div className = "logout_button">
            <form action = "EditProfile">
              <input type = "submit" value = "Edit Profile" id = "view_post_button"></input>
            </form>
          </div>
          <div className = "view_post_button">
            <form action = "Feed">
              <input type = "submit" value = "View Posts" id = "view_post_button"></input>
            </form>
          </div> 
          {/* View All Suggested Users to Follow */}
          <div className = "edit_post_button">
            <form onSubmit={viewAccounts}>
              <input type = "submit" value = "People Nearby" id = "view_post_button"></input>
            </form>
          </div> 
        </div>
      </div>
      <hr className = "feed_separate"/>
    </div>
  );
}

export default Profile;