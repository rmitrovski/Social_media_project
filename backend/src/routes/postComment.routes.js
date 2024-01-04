module.exports = (express, app) => {
    const controller = require("../controllers/postComment.controller.js");
    const router = express.Router();
  
    // Select all comments.
    router.get("/", controller.all);

      // Select a single comment with id.
  router.get("/select/:id", controller.one);

      // Select a single comment with id and delete.
      router.delete("/delete/:id", controller.delete);
  
    // Create a new comment.
    router.post("/", controller.create);
  
    // Add routes to server.
    app.use("/api/postComments", router);
  };
  