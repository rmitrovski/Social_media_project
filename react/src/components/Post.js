import '../App.css'; // Imports CSS
import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom"; // Imports the useNavigate hook from React-Router-Dom
import { MdMoreVert, MdClear } from "react-icons/md"; // Import images from md
import { AiFillLike, AiFillHeart, AiFillDislike } from "react-icons/ai"; // Import images from ai
import { getPosts, createPost } from "../components/DataRepository";
import { getProfiles, updatePost, deletePost, deletePostComment } from "../components/DataRepository";
import { getPostComments, createComment, getPostReactions, findPostReaction, createPostReaction, deletePostReaction } from "../components/DataRepository";
import image_dp from '../assets/default_image.png'; // Import images
import ReactQuill from "react-quill";

function Post(props) {
  const navigate = useNavigate(); // Allows the navigate hook from React-Router-Dom
  const [post, setPost] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [editUserPost, setEditUserPost] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postComments, setPostComments] = useState("");
  const [image, setImage] = useState({});
  const [profile, setProfiles] = useState([]);
  const [comments, setComments] = useState("");
  const [postReactions, setPostReactions] = useState([]);
  
  
  // Load profiles.
  useEffect(() => {
  async function loadProfiles() {
    const currentProfiles = await getProfiles();

    setProfiles(currentProfiles);
  }

  loadProfiles();
  }, []);

  // Load comments.
  useEffect(() => {
    async function loadComments() {
      const currentComments = await getPostComments();
      setComments(currentComments);
    }

    loadComments();
  }, []);

  // Load posts.
  useEffect(() => {
    async function loadPosts() {
      const currentPosts = await getPosts();

      setPosts(currentPosts);
      setIsLoading(false);
    }

    loadPosts();
  }, []);

  // Load reactions.
  useEffect(() => {
    async function loadReactions() {
      const currentPosts = await getPostReactions();
      setPostReactions(currentPosts);
      setIsLoading(false);
    }

    loadReactions();
  }, []);

  const selected = localStorage.getItem('post_selected')
  let commentList = [];
  let y = 0
  let x = 0
  let z = 0
  while ( y < comments.length) { // Loop through comments
    if (comments[y].post_id == selected) { // If the comment's post_id matches the selected post_id
      while (z < profile.length) { // Loop through profiles
        if (comments[y].email === profile[z].email) { // If the comment's email matches the profile's email
          commentList[x] = [comments[y].id, profile[z].first_name, profile[z].last_name, comments[y].email, comments[y].text] // Add the comment to the commentList
        }  
        z++
      } 
      z =0
      x++ 
    }
    y++
  }
  let current_selected = []
  y = 0
  x = 0

  while (x < posts.length) { // Loop through posts
    while (y < profile.length) { // Loop through profiles
    if (posts[x].email === profile[y].email) { // If the post's email matches the profile's email
        // eslint-disable-next-line eqeqeq
        if (posts[x].post_id == selected) { // If the post's post_id matches the selected post_id
            current_selected = [profile[y].first_name, profile[y].last_name, posts[x].text, posts[x].email, posts[x].post_id]; // Add the post to the current_selected variable
        }
      x++
      y = 0
      break;
    } else {
      y++
    }
    } 
    y = 0
  } 


  function isImage(url) { // Images uploaded need to be the image url
    return /.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  }

  const editPost = async (event) => { // Edit post function
    const update = { post_id: selected, text: editUserPost, email: props.user.email};
    await updatePost(update);
    window.location.reload();

  }

  function likePostComments(id) { // Like post comments function
    console.log(id)
    const likePost = { reaction: "Like", email: props.user.email, post_id: id};
    createPostReaction(likePost);
    window.location.reload();
  }

  function DislikePostComments(id) { // Dislike post comments function
    console.log(id)
    const likePost = { reaction: "Dislike", email: props.user.email, post_id: id};
    createPostReaction(likePost);
    window.location.reload()
  }

  function HeartPostComments(id) { // Creates function for hearting post comments
    const likePost = { reaction: "Heart", email: props.user.email, post_id: id};
    createPostReaction(likePost); // Creates post reaction
    window.location.reload();
  }

  const deletePosts = async (event) => { // Delete post function
    navigate("/Feed");
    window.location.reload();
    const deletes = selected;

    await deletePost(deletes)
  }

  function deleteReact(id)  { // Delete post reaction function
    let i = 0
    while (i < postReactions.length) {
        if (postReactions[i].post_id === id && postReactions[i].email === props.user.email) {
            deletePostReaction(postReactions[i].id)
            window.location.reload();
            i++
        } else {
            i++
        }
    }

  }

  function deletePostComments(comment_id) { // Delete post comments function
    const deleted = comment_id;
    deletePostComment(deleted);
    window.location.reload();
  }

  const submission = (event) => { // Create comment function
    const commentPost = { text: postComments, email: props.user.email, post_id: selected};
    createComment(commentPost);
    window.location.reload();
  }

  // Post Dropdown Menu Functionality -
  let postDropDown = useRef();

  const [openPostOptions, setOpenPostOptions] = useState(false);

  useEffect(() => {
    let handler = (e)=>{
      if(!postDropDown.current.contains(e.target)){
        setOpenPostOptions(false);
      }      
    };
    document.addEventListener("mousedown", handler);
    
    return() =>{
      document.removeEventListener("mousedown", handler);
    }
  });

    function test(id) { //Checks to see if the user has reacted
    let i = 0
    while (i < postReactions.length) {
        console.log(postReactions[i].post_id + " = " + id)
        if (postReactions[i].post_id === id && postReactions[i].email === props.user.email) {
            return false
        } else {
            i++
        }
    }
  }

  function likeCounter(id) { // Counts the number of likes
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

  function dislikeCounter(id) { // Counts the number of dislikes
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
  

  // Edit Post Appear On Click -
  const [openEditPost, setOpenEditPost] = useState(false);

  // Comment on Post Appear On Click -
  const [openComments, setOpenComments] = useState(false);

  return (
  // LAN Landing Page //
  <div className = "feed">
    <div className="post">
      <div className="post_wrap">
        <div className="post_content_top">
          <div className="post_top_left">
            <img className="post_profile_dp" src={image_dp} alt="post_profile_dp" />
            <span className="post_username">{current_selected[0]} {current_selected[1]}</span>
            <span className="post_time">{x.date}</span>
          </div>
          <div className= "post_top_right" ref={postDropDown}>
            <div className = "post_options" onClick={()=>{setOpenPostOptions(!openPostOptions)}}> {/* Post Dropdown Menu */}
              <MdMoreVert class="share_icon" alt="options" />
            </div>
            <div className = {`post_Drop_Options ${openPostOptions? 'active' : 'inactive'}`}>
              <h3 className="postOptionsName">Post Options</h3>
              <ul>
                {props.user.email === current_selected[3] ?
                <div>
                  <li>
                    {props.user.email === current_selected[3] ?
                      <div class = "hidden">
                        <input type="button" className="btn btn-primary" value="Edit Post" onClick={()=>{setOpenEditPost(!openEditPost)}} /> {/* Edit Post Button */}
                      </div>
                      :
                      <></>
                    }
                  </li>
                  <li>
                    {commentList.length === 0 && props.user.email === current_selected[3] ?
                      <input type="button" className="btn btn-primary" value="Delete Post" onClick={deletePosts} /> /* Delete Post Button */
                      :
                      <></>
                    }
                  </li>
                  <li>
                    {props.user.email === current_selected[3] ?
                        <input type="button" className="btn btn-primary" value="Reply" onClick={()=>{setOpenComments(!openComments)}}/> /* Comment on Post Button */
                        :
                        <></>
                    }
                  </li>
                </div>
                :
                <div>
                  <li>
                    <input type="button" className="btn btn-primary" value="Reply" onClick={()=>{setOpenComments(!openComments)}}/> {/* Comment on Post Button */}
                  </li>
                </div>
                }
                <li></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="post_content_mid">
          { (isImage(current_selected[2])) ? // Checks if the post is an image
              <img className="post_image" src={current_selected[2]} alt="post_image" />
          :
          <><div dangerouslySetInnerHTML={{ __html: current_selected[2] }} /><></></>
          }
        </div>
        <div className="post_content_bottom">
          {test(current_selected[4]) !== false  ?
          <div className="post_bottom_left">
            <AiFillLike className="post_like_icon_react" alt="options" data-testid = "Post Counter Like" onClick={() => likePostComments(current_selected[4])} /> {/* Like Post Button */}
            <span className="post_counter_commentView">Like</span>
            <AiFillDislike className="share_heart_icon_react" alt="options" onClick={() => DislikePostComments(current_selected[4])} /> {/* Dislike Post Button */}
            <span className="post_counter_commentView">Dislike</span>
            <AiFillHeart className="share_heart_icon_react" alt="options" onClick={() => HeartPostComments(current_selected[4])} /> {/* Heart post */}
            <span className="post_counter_commentView">Loved</span>
            <label className="post_counter_Comment" data-testid = "counterLike" id = "likes"> Likes: {likeCounter(current_selected[4])}</label> {/* Like Counter */}
            <label className="post_counter_Comment"> Dislikes: {dislikeCounter(current_selected[4])}</label> {/* Dislike Counter */}
            <label className="post_counter_Comment"> Loved: {heartCounter(current_selected[4])}</label> {/* Heart Counter */}
          </div>
          :
          <div>
            <span className="post_comments" alt="options" onClick={()=>{deleteReact(current_selected[4])} }>Unreact</span> 
            <label className="post_counter"> Likes: {likeCounter(current_selected[4])} Dislikes: {dislikeCounter(current_selected[4])} Loved: {heartCounter(current_selected[4])}</label> {/* Like/Dislike/Heart Counter */}
          </div>

          }
          <div className="post_bottom_right">
            <span className="post_comments">
              {commentList.length == 1 ? // Check if user is not logged in then show the login button
              <span className="post_comments" onClick={()=>{setOpenComments(!openComments)}}>{commentList.length} Comment</span>
              :
              <span className="post_comments" onClick={()=>{setOpenComments(!openComments)}}>{commentList.length} Comments</span>
              }
            </span>
          </div>
        </div>
      </div>  
    </div>
    <div class = {`edit_post ${openEditPost? 'active' : 'inactive'}`}>
      <div className="post">
        <div className="post_wrap">
          <div className = "share_content_top">
            <p className="post_username">Edit Post</p>
            {props.user.email === current_selected[3] ? // Checks if the user is the owner of the post
            <form>
              <ReactQuill theme="bubble" value={editUserPost} onChange={setEditUserPost} style={{ height: "150px" }} name="postComments" placeholder = "What's on your mind?"/>
              <div className = "share_content_bottom" id = "share_options">
                <input type="button" className="edit_btn" value="Post" onClick={editPost}/>
              </div>
            </form>
            :
            <></>
            }
          </div>
        </div>
      </div>
    </div>
    {/* Comment Section */}
    <div class = {`comment_post ${openComments? 'active' : 'inactive'}`}>
      <div className="post">
        <div className="post_wrap">
          <div className = "share_content_top">
            <p className="post_username">Comments</p>
            <form>
              <ReactQuill theme="bubble" value={postComments} onChange={setPostComments} style={{ height: "150px" }} name="postComments" placeholder = "What's on your mind?"/>
            </form>
          </div>
          <div className = "share_content_bottom" id = "share_options">
            <input type="button"  className="edit_btn" value="Reply" onClick={submission} />
          </div>
        </div>
      </div>
      {/* Comment Feed */}
      <div className="comment_container">
        {Object.values(commentList).map((value, index) => // Maps the comments to the comment feed
          <>
          <div className="post_comment">
            <div className="post_comment_wrap"> 
              <div className="post_content_top">
                <div className="post_top_left">
                  <img className="post_profile_dp" src={image_dp} alt="post_profile_dp" />
                  <span className="post_username">{value[1]} {value[2]}</span>
                  <span className="post_time"></span>
                </div>
                <div className="post_top_right">
                  <form onSubmit={deletePostComments}> {/* Delete Comment Button */}
                    {props.user.email === current_selected[3] || props.user.email === value[3] ? // Checks if the user is the owner of the post or the comment
                      <MdClear class="delete_icon_comment" alt="options" id={index} value="Delete" onClick={() => deletePostComments(value[0])} />
                      // <input type="button" id={index} value="Delete" onClick={() => deletePostComments(value[0])} />
                    :
                      <></>
                    }
                  </form>
                </div>
              </div> 
              <div class = "image_comment_container" dangerouslySetInnerHTML={{ __html: value[4] }}></div>
              {/* <span className="post_username">{value[0] + " " + value[1] + " " + value[3]}</span> */}
            </div>
          </div>
          </>
        )}
      </div>
    </div>
    
  </div>
  );
}

export default Post;
