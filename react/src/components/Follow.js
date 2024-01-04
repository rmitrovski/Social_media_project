import '../App.css';
import { useContext } from "react";
import image_dp from '../assets/default_image.png'; // Imports image
import 'bootstrap/dist/css/bootstrap.min.css'; // Imports boostrap css
import MessageContext from "./MessageContext";
import { getProfile, getPosts, getPostReactions, getAccountFollows, findPost, getProfiles} from "./DataRepository";
import { useState, useEffect, } from "react"; // Imports the useState and useEffect hooks from React
import { Navigate, useNavigate } from "react-router-dom"; // Imports the useNavigate hook from React-Router-Dom
import { BiSad } from "react-icons/bi"; // Import icons from BoxIcons

function Follow(props) {
  const navigate = useNavigate(); // Allows the navigate hook from React-Router-Dom
  const { message } = useContext(MessageContext) || {};
  const [profile, setProfile] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postReactions, setPostReactions] = useState([]);
  const [follows, setFollows] = useState([]);
  const [profiles, setProfiles] = useState([]);
  let selected_email = localStorage.getItem("account_selected")
  
  const followers = function(fn, ln) { // Function to display followers
    const first_name = fn;
    const last_name = ln;
    return {first_name, last_name};
  }

  const following = function(fn, ln) { // Function to display following
    const first_name = fn;
    const last_name = ln;
    return {first_name, last_name};
  }

  useEffect(() => { // Call function to load logged-in user's profile
    async function loadProfile() {
      const currentProfile = await getProfile(selected_email);
      setProfile(currentProfile);
    }
    loadProfile();
  }, [selected_email]);

  useEffect(() => { // Call function to load logged-in profiles
    async function loadProfiles() {
      const currentProfiles = await getProfiles();
      setProfiles(currentProfiles);
    }
    loadProfiles();
  }, []);
  
  // Load posts.
  useEffect(() => {
    async function loadPosts() {
      const currentPosts = await getPosts();
      setPosts(currentPosts);
    }

    loadPosts();
  }, []);

    // Load post.
    useEffect(() => {
      async function loadReactions() {
        const currentPosts = await getPostReactions();
        setPostReactions(currentPosts);
      }
  
      loadReactions();
    }, []);

  // Call function to load logged-in user's profile followers -
  useEffect(() => {
    async function loadFollows() {
      const currentAccountFollows = await getAccountFollows();
      setFollows(currentAccountFollows);
    }
    loadFollows();
  }, []);

  let x = 0
  let y = 0
  let z = 0
  while (x < follows.length) { // Loop through follows
    if (follows[x].followedEmail === profile["email"]) { // If the followed email is the same as the logged-in user's email
      while (y < profiles.length) { // Loop through profiles
        if (follows[x].email === profiles[y].email) { // If the email is the same as the logged-in user's email
            followers[z] = followers(profiles[y].first_name, profiles[y].last_name) // Add the first name and last name to the followers array
            z++
       
        }
        y++
    }                                           
}   y = 0
    x++
  }; 

  let xx = 0
  let yy = 0
  let zz = 0
  while (xx < follows.length) { // Loop through follows
    if (follows[xx].email === profile["email"]) { // If the followed email is the same as the logged-in user's email
      while (yy < profiles.length) { // Loop through profiles
        if (follows[xx].followedEmail === profiles[yy].email) { // If the email is the same as the logged-in user's email
            following[zz] = following(profiles[yy].first_name, profiles[yy].last_name) // Add the first name and last name to the followers array
            zz++
        }
        yy++
    }                                           
}   yy = 0
    xx++
  }; 

  function viewAccounts() { // Function to view accounts
    navigate("/AccountList");
  };

  function returnToProfile() { // Function to return to profile
    navigate("/Profile");
  };

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
          <h3 className = "profile_name">{profile.first_name} {profile.last_name}'s Friends</h3>  
          <p><i>"This is about me, me and guess who, also me!"</i></p>   <p align = "left">Date Joined: {profile.date_of_registration}</p>
        </span>
        <div className = "button_container">
          <div className = "view_post_button">
            <form action = "Feed">
              <input type = "submit" value = "View Posts" id = "view_post_button"></input>
            </form>
          </div> 
          <div className = "edit_post_button">
            <form onSubmit={viewAccounts}> {/* Calls the viewAccounts function */}
              <input type = "submit" value = "Follower List" class="chosenAccount_post_button"></input>
            </form>
          </div> 
          <div className = "view_post_button">
            <form onSubmit = {returnToProfile}> {/* Calls the returnToProfile function */}
              <input type = "submit" value = "Back to Profile" class="returnToProfile"></input>
            </form>
          </div> 
        </div>
      </div>
      <hr className = "feed_separate"/>

      <div className = "feed">
        <p className="account_container">Followers</p>
        {followers[0] !== undefined ? // If the followers array is not undefined
          <div>
            {Object.values(followers).map((value, index) =>  // Loop through the followers array
              <div className="post">
                <div className="post_wrap">
                  <div className="post_content_top">
                    <div className="post_top_left">
                      <img className="post_profile_dp" src={image_dp} alt="post_profile_dp" />
                      <span className="post_username">{value.first_name} {value.last_name}</span>
                    </div>
                  </div>
                  <div className="post_content_bottom">
                    <div className="post_bottom_right">
                      <span className="post_comments">
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        :
        <div>
          <span className="post_username">No followers atm...</span>
          <BiSad className="post_like_icon" alt="options"/>        
        </div>
        }
        <p className="account_container">Following</p>
        {following[0] !== undefined ? // If the following array is not undefined
        <div>
        {Object.values(following).map((value, index) =>  // Loop through the following array
          <div className="post">
            <div className="post_wrap">
          
              <div className="post_content_top">
                <div className="post_top_left">
                  <img className="post_profile_dp" src={image_dp} alt="post_profile_dp" />
                  <span className="post_username">{value.first_name} {value.last_name}</span>
                </div>
              </div>
              <div className="post_content_bottom">
                <div className="post_bottom_right">
                  <span className="post_comments">
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
        :
        <div>
        <span className="post_username">Not following anyone atm...</span>
        <BiSad className="post_like_icon" alt="options"/>        
      </div>
      }
      </div>
    </div>
  );
}

export default Follow;