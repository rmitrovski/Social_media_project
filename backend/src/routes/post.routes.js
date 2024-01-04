module.exports = (express, app) => {
  const controller = require("../controllers/post.controller.js");
  const router = express.Router();

  // Select all posts.
  router.get("/", controller.all);

  // Select a single post with email.
  router.get("/select/:post_id", controller.one);

  // Create a new post.
  router.post("/", controller.create);

  
  // Delete a post with id
  router.delete("/delete/:post_id", controller.delete);

   // Update a new post.
   router.put("/", controller.update);

  // Add routes to server.
  app.use("/api/posts", router);
};
