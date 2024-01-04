import '../App.css';
import image_dp from '../assets/default_image.png'; // Imports image
import 'bootstrap/dist/css/bootstrap.min.css'; // Imports boostrap css
import { getProfile, getProfiles, createAccountFollows, getAccountFollows, deleteAccountFollow } from "./DataRepository";
import { useState, useEffect, } from "react"; // Imports the useState and useEffect hooks from React
import { IoReaderOutline, IoPersonAddOutline, IoPersonRemoveOutline } from "react-icons/io5"; // Import images from md
import { useNavigate } from "react-router-dom"; // Imports the useNavigate hook from React-Router-Dom

function AccountList(props) {
  const [profile, setProfile] = useState([]);
  const [profiles, setProfiles] = useState({});
  const [follows, setFollows] = useState({});
  const navigate = useNavigate(); // Allows the navigate hook from React-Router-D
  
  // Call function to load logged-in user's profile -
  useEffect(() => {
    async function loadProfile() {
      const currentProfile = await getProfile(props.user.email);
      setProfile(currentProfile);
    }
    loadProfile();
  }, [props.user.email]);

  useEffect(() => {
    async function loadProfiles() {
      const currentProfiles = await getProfiles();
      setProfiles(currentProfiles);
    }
    loadProfiles();
  }, []);

  // Call function to load logged-in user's profile followers -
  useEffect(() => {
    async function loadFollows() {
      const currentAccountFollows = await getAccountFollows();
      setFollows(currentAccountFollows);
    }
    loadFollows();
  }, []);

  // Follow a user and send to database -
  function follow(id) {
    let account = {follow_email: id, email: props.user.email}
    createAccountFollows(account)
    window.location.reload()
  }

  // Unfollow a user and send to database -
  function unfollow(id) {
    let email = id
    deleteAccountFollow(email)
    window.location.reload()
  }

  // View a user and their posts if follwoed -
  function viewAccountPosts(id) {
    localStorage.setItem("account_selected", id)
    navigate("/ChosenAccountPosts");
  }

  function test(id) {
    console.log(id)
    let i = 0
    while (i < follows.length) {
        if (follows[i].followedEmail === id && follows[i].email === props.user.email) {
            return false
        } else {
            i++
        }
    }
  }

  // Account List Icons Hovering - UseState Function //
  const [isHoveringFollow, setIsHoveringFollow] = useState(false);
  const [isHoveringUnfollow, setIsHoveringUnfollow] = useState(false);
  const [isHoveringPost, setIsHoveringPost] = useState(false);

  const handleMouseOverFollow = () => { // Function if user hovers over accountList Icons -> Follow
    setIsHoveringFollow(true);
  };
  const handleMouseOutFollow = () => {
    setIsHoveringFollow(false);
  };

  const handleMouseOverUnfollow = () => { // Function if user hovers over accountList Icons -> Unfollow
    setIsHoveringUnfollow(true);
  };
  const handleMouseOutUnfollow = () => {
    setIsHoveringUnfollow(false);
  };

  const handleMouseOverPost = () => { // Function if user hovers over accountList Icons -> Post
    setIsHoveringPost(true);
  };
  const handleMouseOutPost = () => {
    setIsHoveringPost(false);
  };

  function returnToProfile() {
    navigate("/Profile");
  };
  
  return (
    // Profile Page //
    <div className = "home_profile">
      <div className = "profile_box">
        <div classname = "profile_dp">
          <img src = {image_dp} alt = "profile_dp"/>
        </div>
        <span classname = "profile_info">
          <h3 className = "profile_name">{profile.first_name} {profile.last_name}</h3>  
          <p><i>"This is about me, me and guess who, also me!"</i></p>    <p align = "left">Date Joined: {props.user.date_of_registration}</p>
        </span>
        <div className = "button_container">
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
          <div className = "view_post_button">
            <form onSubmit = {returnToProfile}>
              <input type = "submit" value = "Back to Profile" class="returnToProfile"></input>
            </form>
          </div>  
        </div>
      </div> 
      <hr className = "feed_separate"/>

      {/* Account List - Follow -> View User Posts / Unfollow */}
      <div className = "userList">
        <p className="account_container">Suggested for you</p>
        {/* Map Profile Values to Display */}
          {Object.values(profiles).map((value, index) => 
          <div>
            {value.email !== props.user.email ?
              <div className = "account_box">
                <>
                  <div className="post_comment">
                    <div className="post_comment_wrap"> 
                      <div className="post_content_top">
                        <div className="post_top_left">
                          <span className="post_username">{value.first_name} {value.last_name}</span> {/* Display profile's user name */}
                        </div>
                        {/* See respective functions depending if you follow or unfollow a user */}
                        {test(value.email) !== false ? 
                        <div className="post_top_right_first">
                          <form onSubmit={follow} onMouseOver = {handleMouseOverFollow} onMouseOut = {handleMouseOutFollow}>
                            <IoPersonAddOutline class="follow_icon" alt="options" id={index} value="Follow" onClick={() => follow(value.email)}/>
                            {/* If hovered over, display name of accountList icon */}
                            {isHoveringFollow && <h3 className = "hovered_accountList_Follow">Follow</h3>}
                          </form>
                        </div>
                        :
                        <div className="post_top_right_first">
                          <form onSubmit={unfollow} onMouseOver = {handleMouseOverUnfollow} onMouseOut = {handleMouseOutUnfollow}>
                            <IoPersonRemoveOutline class="unfollow_icon" alt="options" id={index} value="Following" onClick={() => unfollow(value.email)}/>
                            {/* If hovered over, display name of accountList icon */}
                            {isHoveringUnfollow && <h3 className = "hovered_accountList_Unfollow">Unfollow</h3>}
                          </form>
                        </div>
                        }
                      </div>
                      <div className = "accountListBio">
                        {test(value.email) !== false ? 
                          <p>About:<i> "This is about me, me and guess who, also me!"</i></p>
                          :
                          <p>About:<i> "This is about me, me and guess who, also me!"</i><br></br>
                            <p className="accountList_container">Visit Friend Now 
                              <form onSubmit={follow} className = "viewPostsIcon" onMouseOver = {handleMouseOverPost} onMouseOut = {handleMouseOutPost}> 
                                <IoReaderOutline class="post_icon" alt="options" id={index} value="View User Posts" onClick={() => viewAccountPosts(value.email)}/>
                                {/* If hovered over, display name of accountList icon */}
                                {isHoveringPost && <h3 className = "hovered_accountList_Post">View Account</h3>}
                              </form>
                            </p>
                          </p>
                        }
                      </div>
                    </div>
                  </div>
                </> 
              </div>
              :
              <></> 
            } 
          </div>
          )}
        </div>
      </div>
  );
}

export default AccountList;