import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- User ---------------------------------------------------------------------------------------
async function verifyUser(email, password) {
  const response = await axios.get(API_HOST + "/api/users/login", { params: { email, password } });
  const user = response.data;
  
  // NOTE: In this example the login is also persistent as it is stored in local storage.
  if(user !== null)
    setUser(user);

  return user;
}

async function findUser(id) {
  const response = await axios.get(API_HOST + `/api/users/select/${id}`);

  return response.data;
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);

  return response.data;
}

// --- Profile ---------------------------------------------------------------------------------------
async function getProfiles() {
  const response = await axios.get(API_HOST + "/api/users");

  return response.data;
}

async function getProfile(email) {
  const response = await axios.get(API_HOST + `/api/users/select/${email}`);
  
  return response.data;
}

async function updateProfile(profile) {
  const response = await axios.put(API_HOST + "/api/users", profile);

  return response.data;
}

// --- Post ---------------------------------------------------------------------------------------
async function getPosts() {
  const response = await axios.get(API_HOST + "/api/posts");

  return response.data;
}

async function createPost(post) {
  const response = await axios.post(API_HOST + "/api/posts", post);

  return response.data;
} 

async function findPost(id) {
  const response = await axios.get(API_HOST + `/api/posts/select/${id}`);

  return response.data;
}

async function deletePost(post) {
  const response = await axios.delete(API_HOST + `/api/posts/delete/${post}`);

  return response.data;
}

async function updatePost(post) {
  const response = await axios.put(API_HOST + "/api/posts", post);

  return response.data;
}


//--- Comment ---------------------------------------------------------------------------------------
async function getPostComments() {
  const response = await axios.get(API_HOST + "/api/postComments");

  return response.data;
}

async function findPostComment(post_id) {
  const response = await axios.get(API_HOST + `/api/postComments/select/${post_id}`);

  return response.data;
}

async function createComment(postComment) {
  const response = await axios.post(API_HOST + "/api/postComments", postComment);

  return response.data;
}

async function deletePostComment(post_id) {
  const response = await axios.delete(API_HOST + `/api/postComments/delete/${post_id}`);

  return response.data;
}

//--- AccountFollow ---------------------------------------------------------------------------------------
async function getAccountFollows() {
  const response = await axios.get(API_HOST + "/api/accountFollows");

  return response.data;

}
async function findAccountFollows(email) {
  const response = await axios.get(API_HOST + `/api/accountFollows/select/${email}`);

  return response.data;
}

async function createAccountFollows(follow) {
  const response = await axios.post(API_HOST + "/api/accountFollows", follow);

  return response.data;
}

async function deleteAccountFollow(email) {
  const response = await axios.get(API_HOST + `/api/accountFollows/delete/${email}`);

  return response.data;
}


//--- CommentReactions ---------------------------------------------------------------------------------------

async function getPostReactions() {
  const response = await axios.get(API_HOST + "/api/postReaction");

  return response.data;
}

async function findPostReaction(email) {
  const response = await axios.get(API_HOST + `/api/postReaction/select/${email}`);

  return response.data;
}

async function createPostReaction(follow) {
  const response = await axios.post(API_HOST + "/api/postReaction", follow);

  return response.data;
}

async function deletePostReaction(email) {
  const response = await axios.get(API_HOST + `/api/postReaction/delete/${email}`);

  return response.data;
}

// --- Helper functions to interact with local storage --------------------------------------------
function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  verifyUser, findUser, createUser,
  getPosts, createPost, findPost, deletePost, updatePost,
  getPostComments, findPostComment, createComment, deletePostComment,
  getAccountFollows, findAccountFollows, createAccountFollows,deleteAccountFollow,
  getUser, removeUser,  getProfiles, getProfile, updateProfile,
  getPostReactions, findPostReaction, createPostReaction, deletePostReaction
}
