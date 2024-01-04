import '../App.css';
import image_dp from '../assets/default_image.png'; // Import images
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom"; // Imports the useNavigate hook from React-Router-Dom
import { MdMoreVert,MdPermMedia } from "react-icons/md"; // Import images from md
import { AiFillLike, AiFillHeart, AiFillDislike } from "react-icons/ai"; // Import images from ai
import { getPosts, createPost } from "../components/DataRepository";
import { getProfiles,  getPostReactions, createPostReaction, deletePostReaction} from "../components/DataRepository";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

function Feed(props) {
  const navigate = useNavigate(); // Allows the navigate hook from React-Router-Dom
  const [post, setPost] = useState(""); // Creates hook for post
  const [errorMessage, setErrorMessage] = useState(null); // Creates hook for error message
  const [isLoading, setIsLoading] = useState(true); // Creates hook for loading
  const [posts, setPosts] = useState([]); // Creates hook for posts
  const [postComments] = useState({}); // Creates hook for post comments
  const [image, setImage] = useState({}); // Creates hook for image
  const [profile, setProfiles] = useState([]);  // Creates hook for profile 
  const [postReactions, setPostReactions] = useState([]); // Creates hook for post reactions

  localStorage.setItem("post_selected", 0)
  const profileDetails = function(fn, ln, ps, em, ps_id, d_posted) { // Creates function for profile details 
    const first_name = fn;
    const last_name = ln;
    const profile_post = ps;
    const email = em;
    const post_id = ps_id
    const date_posted = d_posted
    return {first_name, last_name, profile_post, email, post_id, date_posted};
  }

  // Loads all the profiles.
  useEffect(() => { 
    async function loadProfiles() {
      const currentProfiles = await getProfiles();
      setProfiles(currentProfiles);
    }
    loadProfiles();
  }, []);

  // Load all the post reactions
  useEffect(() => {
    async function loadReactions() {
      const reactions = await getPostReactions();
      setPostReactions(reactions);
      setIsLoading(false);
    }

    loadReactions();
  }, []);

  let y = 0
  let x = 0
  let z = posts.length
  while (x < posts.length) { // Loops through all the posts
    while (y < profile.length) { // Loops through all the profiles
    if (posts[x].email === profile[y].email) { // Checks if the email of the post is the same as the email of the profile
      profileDetails[z] = profileDetails(profile[y].first_name, profile[y].last_name, posts[x].text, posts[x].email, posts[x].post_id, posts[x].createdAt) // Sets the profile details 
      x++ 
      z--
      y = 0
      break;
    } else {
      y++
    }

    } 
    y = 0
  }; 

  const handleInputChange = (event) => { // Creates function for handling input change
    setImage({ ...image.image, [event.target.name]: event.target.value }); // Sets the image text
  };

  function isImage(url) { // Images uploaded need to be a image url 
    return /.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  function likePostComments(id) { // Creates function for liking post comments
    const likePost = { reaction: "Like", email: props.user.email, post_id: id};
    createPostReaction(likePost); // Creates post reaction
    window.location.reload();
  }

  function DislikePostComments(id) {  // Creates function for disliking post comments
    const likePost = { reaction: "Dislike", email: props.user.email, post_id: id}; 
    createPostReaction(likePost); // Creates post reaction
    window.location.reload();
  }

  function HeartPostComments(id) { // Creates function for hearting post comments
    const likePost = { reaction: "Heart", email: props.user.email, post_id: id};
    createPostReaction(likePost); // Creates post reaction
    window.location.reload();
  }

  // Quill Customisation -
  const  modules  = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script:  "sub" }, { script:  "super" }],
        ["blockquote", "code-block"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
    ],
  };

  // Load posts.
  useEffect(() => {
    async function loadPosts() {
      const currentPosts = await getPosts();

      setPosts(currentPosts);
      setIsLoading(false);
    }

    loadPosts();
  }, []);

  const resetPostContent = () => { // Creates function for resetting post content
    image.image = ""
    setPost("");
    postComments.postComments = "";
    setErrorMessage(null);
  }

  function postReply(id) { // Creates function for posting a reply
    localStorage.setItem("post_selected", id)
    navigate("/Post");
    
  }

  const handleSubmit = async (event) => { // Creates function for handling submit
    event.preventDefault();
    
    // As React Quill uses HTML tags within the text the empty check first removes all HTML elements using a regex.
    if(post.replace(/<(.|\n)*?>/g, "").trim() === "" && (image.image == null || image.image === "")) { // Checks if the post is empty
      setErrorMessage("A post cannot be empty."); // Sets the error message
      return;
    }


    if (post.replace(/<(.|\n)*?>/g, "").trim() !== "" && image.image !== "" && image.image != null) { // Checks if the post has text and an image
        setErrorMessage("Only one field can be set at a time."); // Sets the error message
      return;
        }

    if (!(post.replace(/<(.|\n)*?>/g, "").trim().length === 0) && (image.image === 0 || image.image == null || image.image === "")) { // Checks if the post has text
        if (post.replace(/<(.|\n)*?>/g, "").trim().length > 600) {
          setErrorMessage("Post content cannot be longer than 600 characters."); // Sets the error message
          return;
        }
    
    const newPost = { text: post, email: props.user.email }; 
    await createPost(newPost); // Creates post


    // Add post to locally stored posts.
    setPosts([...posts, newPost]);

    resetPostContent(); // Resets post content
    window.location.reload();

  }

  if ((post.replace(/<(.|\n)*?>/g, "").trim().length === 0) && (image.image.length !== 0)) { // Checks if the post has an image
    if(isImage(image.image)) {
    const newPost = { text: image.image, email: props.user.email };
    await createPost(newPost);

    // Add post to locally stored posts.
    setPosts([...posts, newPost]);

    resetPostContent();
    window.location.reload();
  
    } else {
      setErrorMessage("The image url is invalid."); // Sets the error message
    }
    } 
  };

  function test(id) { // Creates function for testing
    let i = 0
    while (i < postReactions.length) { // Loops through all the post reactions 
        if (postReactions[i].post_id === id && postReactions[i].email === props.user.email) { // Checks if the post id and email are the same
            return false // Returns false
        } else {
            i++
        }
    }
  }

  function likeCounter(id) { // Creates function for counting likes
    let i = 0
    let x = 0
    while (i < postReactions.length) { // Loops through all the post reactions
        if (postReactions[i].post_id === id && postReactions[i].reaction === "Like") { // Checks if the post id and reaction are the same
            x++
        }
        i++
    }
    return x
  }

  function dislikeCounter(id) { // Creates function for counting dislikes
    let i = 0
    let x = 0
    while (i < postReactions.length) { // Loops through all the post reactions
        if (postReactions[i].post_id === id && postReactions[i].reaction === "Dislike") { // Checks if the post id and reaction are the same
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

  function deleteReact(id)  { // Creates function for deleting a reaction
    let i = 0
    while (i < postReactions.length) { // Loops through all the post reactions
        if (postReactions[i].post_id === id && postReactions[i].email === props.user.email) { // Checks if the post id and email are the same
            deletePostReaction(postReactions[i].id) // Deletes post reaction
            window.location.reload();
            i++
        } else {
            i++
        }
    }
  }

  return (
    // Share Feed Section  //
    <div className = "feed">
      {props.user !== null ? // Checks if user is logged in
        <>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: "10px" }}> {/* Creates form group */}
            <div className = "share">
              <div className = "share_wrap">
                <div className = "share_content_top">
                  <div className = "share_content_top_right">
                    <img className = "share_profile_dp" src = {image_dp} alt = "profile_dp"/>
                    <span className="main_post_username">{props.user.first_name} {props.user.last_name}</span>
                  </div>
                  {/* Post using ReactQuill */}
                  <ReactQuill modules={modules} className = "reactQuill" theme="bubble" value={post} onChange={setPost} style = {{ height: "120px"}} placeholder = "What's on your mind?"/>
                  {/* Use of 'Bubble' theme requires ooltips accessed by highlighting text */}
                </div>
                <hr className = "share_hr"></hr>
                <div className = "share_content_bottom" id = "image_post">
                  <MdPermMedia className = "share_icon" alt = "share image"/>
                  <textarea aria-label = "Image_Post" placeholder = "Post image link with file type .jpg etc." rows = "1" value={image.image} onChange={handleInputChange}  className = "post_enter" name = "image" type = "text" ></textarea> {/* Creates text area for image post */}
                  <div class = "error" id = "postError"></div> 
                </div>
                {errorMessage !== null && // Checks if error message is not null
                  <div className="form-group">
                    <span id = "feed_error" className="text-danger">{errorMessage}</span>
                  </div>
                }
                <div className = "share_content_bottom" id = "share_options">
                  <input type="button" className="share_btn_cancel" value="Cancel" onClick={resetPostContent}/> {/* reset content */}
                  <div className = "share_options">
                    <div className = "share_options"></div>
                  </div>
                  <input type="submit" className = "share_btn" value="Post"/> {/* submit content */}
                </div>
              </div>
            </div>
          </div>
        </form> 
    {/* Posts Section */}
    <div>
      {isLoading ? // Checks if loading
      <div>Loading posts...</div> 
        :
        posts.length === 0 ? // Checks if there are no posts
        <span className="text-muted">No posts have been submitted.</span>
        :
          Object.values(profileDetails).map((value, index) => // Loops through all the profile details
          <div className="post">
            <div className="post_wrap">
              {isImage(value.profile_post) === true ? // Checks if the profile post is an image
              <>
              <div className="post_content_top">
                <div className="post_top_left">
                  <img className="post_profile_dp" src={image_dp} alt="post_profile_dp" />
                  <span className="post_username">{value.first_name} {value.last_name} </span>
                  <span className="post_time">{value.date_posted}</span>
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
                  <span className="post_time">{value.date_posted}</span>
                </div>
                <div className="post_top_right">
                  <MdMoreVert class="share_icon" alt="options" />
                </div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: value.profile_post }} />                   
          </>}

              <div className="post_content_bottom">
                {test(value.post_id) !== false ? // Checks if the post id is not false
                  <div className="post_bottom_left">
                    <AiFillLike className="post_like_icon_react" alt="options" onClick={() => likePostComments(value.post_id)} /> {/* Like post */}
                    <AiFillDislike className="share_heart_icon_react" alt="options" onClick={() => DislikePostComments(value.post_id)} /> {/* Dislike post */}
                    <AiFillHeart className="share_heart_icon_react" alt="options" onClick={() => HeartPostComments(value.post_id)} /> {/* Heart post */}
                    <label className="post_counter" data-testid = "Post Counter Like"> Likes: {likeCounter(value.post_id)} Dislikes: {dislikeCounter(value.post_id)} Loved: {heartCounter(value.post_id)}</label> {/* Post counter */}
                  </div>
                  :
                  <div>
                    <span className="post_comments" alt="options" onClick={()=>{deleteReact(value.post_id)}} >Unreact</span> {/* Unreact to post */}
                    <label className="post_counter"> Likes: {likeCounter(value.post_id)} Dislikes: {dislikeCounter(value.post_id)} Loved: {heartCounter(value.post_id)}</label> {/* Post counter */}
                  </div>
                }
                <div className="post_bottom_right">
                  <span className="post_comments">
                    <form onSubmit={postReply}>
                      <input type="button" id={index} className="post_comments" value="View Comments" onClick={() => postReply(value.post_id)}/> {/* View comments */}
                    </form>
                  </span>
                </div>
              </div>
        </div>
      </div>
        ) 
    }
    </div>
        </>
      :       
      // Checks if user is logged in
      <><div className="profile_box">
          <div classname="profile_dp"></div>
          <div classname="profile_info">
            <h3 align = "center">SIGN IN REQUIRED</h3>
            <h5 align = "center">You must sign in to be able to view and post</h5>
            <br></br>
          </div>
          <div class="container bg-light">
            <div class="col-md-12 text-center">
              <button type="button" class="btn btn-primary" >Login now</button>
            </div>
          </div>
        </div></>
      }
    </div>
  );    
} 

export default Feed;