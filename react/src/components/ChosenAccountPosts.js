import '../App.css';
import { useContext } from "react";
import image_dp from '../assets/default_image.png'; // Imports image
import 'bootstrap/dist/css/bootstrap.min.css'; // Imports boostrap css
import MessageContext from "./MessageContext";
import { getProfile, getPosts, getPostReactions, createPostReaction, deletePostReaction } from "./DataRepository";
import { useState, useEffect, } from "react"; // Imports the useState and useEffect hooks from React
import { Navigate, useNavigate } from "react-router-dom"; // Imports the useNavigate hook from React-Router-Dom
import { MdMoreVert } from "react-icons/md"; // Import images from md
import { AiFillLike, AiFillDislike, AiFillHeart } from "react-icons/ai"; // Import images from ai

function Profile(props) {
  const navigate = useNavigate(); // Allows the navigate hook from React-Router-Dom
  const { message } = useContext(MessageContext) || {};
  const [profile, setProfile] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postReactions, setPostReactions] = useState([]);
  let selected_email = localStorage.getItem("account_selected")
  
  const profileDetails = function(fn, ln, ps, em, ps_id) { // Creates a function that returns an object
    const first_name = fn;
    const last_name = ln;
    const profile_post = ps;
    const email = em;
    const post_id = ps_id
    return {first_name, last_name, profile_post, email, post_id};
  }
  
  useEffect(() => { // Loads the profile
    async function loadProfile() {
      const currentProfile = await getProfile(selected_email);
      setProfile(currentProfile);
    }
    loadProfile();
  }, [selected_email]);

  // Load posts.
  useEffect(() => {
    async function loadPosts() {
      const currentPosts = await getPosts();
      setPosts(currentPosts);
    }

    loadPosts();
  }, []);

  // Load reactions.
  useEffect(() => {
    async function loadReactions() {
      const currentPosts = await getPostReactions();
      setPostReactions(currentPosts);
    }

    loadReactions();
  }, []);

  function postReply(id) { // Creates a function that goes to the post reply page
    localStorage.setItem("post_selected", id)
    navigate("/Post"); 
  }
  
  function isImage(url) { // Images uploaded need to be the image url
    return /.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  // Like Post React React -
  function likePostComments(id) {
    console.log(id)
    const likePost = { reaction: "Like", email: props.user.email, post_id: id};
    createPostReaction(likePost);
    window.location.reload();
  }

  // Disike Post React React -
  function DislikePostComments(id) {
    console.log(id)
    const likePost = { reaction: "Dislike", email: props.user.email, post_id: id};
    createPostReaction(likePost);
    window.location.reload();
  }
  // Heart Post React 
  function HeartPostComments(id) { // Creates function for hearting post comments
    const likePost = { reaction: "Heart", email: props.user.email, post_id: id};
    createPostReaction(likePost); // Creates post reaction
    window.location.reload();
  }

  let x = 0
  let z = 0
  while (x < posts.length) { // Loops through posts
    if (posts[x].email === profile["email"]) {
      profileDetails[z] = profileDetails(profile["first_name"], profile["last_name"], posts[x].text, posts[x].email, posts[x].post_id) // Creates a profile details object
      z++
    } 
    x++
  }; 

  function viewAccounts() { // Creates a function that goes to the view accounts page
    navigate("/AccountList");
  }

  function test(id) { //Checks if the user has reacted to a post
    let i = 0
    while (i < postReactions.length) { // Loops through post reactions
        if (postReactions[i].post_id === id && postReactions[i].email === props.user.email) { // Checks if the post id and email match fields match
            return false // Returns false
        } else {
            i++
        }
    }
  }

  // Like Post React Reaction Counter -
  function likeCounter(id) {
    let i = 0
    let x = 0
    while (i < postReactions.length) {
        if (postReactions[i].post_id === id && postReactions[i].reaction === "Like") {
            x++
        }
        i++
    }
    return x

  }

  // Dislike Post Reaction Counter -
  function dislikeCounter(id) {
    let i = 0
    let x = 0
    while (i < postReactions.length) {
        if (postReactions[i].post_id === id && postReactions[i].reaction === "Dislike") {
            x++
        }
        i++
    }
    return x

  }

  function heartCounter(id) { // Creates function for counting hearts
    let i = 0
    let x = 0
    while (i < postReactions.length) {  // Loops through all the post reactions
        if (postReactions[i].post_id === id && postReactions[i].reaction === "Heart") { // Checks if the post id and reaction are the same
            x++
        }
        i++
    }
    return x
  }

  // Delete Post React -
  function deleteReact(id)  {
    let i = 0
    while (i < postReactions.length) { // Loops through post reactions
        if (postReactions[i].post_id === id && postReactions[i].email === props.user.email) { // Checks if the post id and email fields match
            deletePostReaction(postReactions[i].id) // Deletes the post reaction
            window.location.reload();
            i++
        } else {
            i++
        }
    }
  }

  function viewFriends() { // Creates a function that goes to the view friends page
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
          <h3 className = "profile_name">{profile.first_name} {profile.last_name}</h3>  
          <p><i>"This is about me, me and guess who, also me!"</i></p>   <p align = "left">Date Joined: {profile.date_of_registration}</p>
        </span>
        <div className = "button_container">
        <div className = "logout_button">
            <form onSubmit={viewFriends}>
              <input type = "submit" value = "Friends" id = "view_post_button"></input>
            </form>
          </div>
          <div className = "view_post_button">
            <form action = "Feed">
              <input type = "submit" value = "View Posts" id = "view_post_button"></input>
            </form>
          </div> 
          <div className = "edit_post_button">
            <form onSubmit={viewAccounts}>
              <input type = "submit" value = "Back" class="chosenAccount_post_button"></input>
            </form>
          </div> 
        </div>
      </div>
      <hr className = "feed_separate"/>

      <div className = "feed">
      {Object.values(profileDetails).map((value, index) => // Loops through profile details
          <div className="post">
            <div className="post_wrap">
              {isImage(value.profile_post) === true ? // Checks if the post is an image
              <>
              <div className="post_content_top">
                <div className="post_top_left">
                  <img className="post_profile_dp" src={image_dp} alt="post_profile_dp" />
                  <span className="post_username">{value.first_name} {value.last_name}</span>
                  <span className="post_time">{x.date}</span>
                </div>
                <div className="post_top_right">
                  <MdMoreVert class="share_icon" alt="options" />
                </div>
              </div>
              <div className="post_content_mid">
                <img className="post_img" src={value.profile_post} alt="post_profile_dp" />
              </div>
              </>
              :
              <>
              <div className="post_content_top">
                <div className="post_top_left">
                  <img className="post_profile_dp" src={image_dp} alt="post_profile_dp" />
                  <span className="post_username">{value.first_name} {value.last_name}</span>
                  <span className="post_time">{x.date}</span>
                </div>
                <div className="post_top_right">
                  <MdMoreVert class="share_icon" alt="options" />
                </div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: value.profile_post }} />                   
          </>}
              <div className="post_content_bottom">
              {test(value.post_id) !== false ? // Checks if the user has reacted to the post
                <div className="post_bottom_left">
                 <AiFillLike className="post_like_icon_react" alt="options" onClick={() => likePostComments(value.post_id)} /> {/* Like post */}
                    <AiFillDislike className="share_heart_icon_react" alt="options" onClick={() => DislikePostComments(value.post_id)} /> {/* Dislike post */}
                    <AiFillHeart className="share_heart_icon_react" alt="options" onClick={() => HeartPostComments(value.post_id)} /> {/* Heart post */}
                    <label className="post_counter" data-testid = "Post Counter Like"> Likes: {likeCounter(value.post_id)} Dislikes: {dislikeCounter(value.post_id)} Loved: {heartCounter(value.post_id)}</label> {/* Post counter */}
                </div>
                   :
                   <div>
                   <span className="post_comments" alt="options" onClick={()=>{deleteReact(value.post_id)}} >Unreact</span> {/* Unreact to post */}
                   <label className="post_counter" data-testid = "Post Counter Like"> Likes: {likeCounter(value.post_id)} Dislikes: {dislikeCounter(value.post_id)} Loved: {heartCounter(value.post_id)}</label> {/* Post counter */}
                 </div>
               }
                <div className="post_bottom_right">
                  <span className="post_comments">
                    <form onSubmit={postReply}>
                      <input type="button" id={index} className="post_comments" value="View Comments" onClick={() => postReply(value.post_id)}/> {/* Post comment */}
                    </form>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;