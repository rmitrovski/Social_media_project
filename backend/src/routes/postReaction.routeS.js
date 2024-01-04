module.exports = (express, app) => {
    const controller = require("../controllers/postReaction.controller.js");
    const router = express.Router();
  
    // Select all reactions.
    router.get("/", controller.all);

      // Select a single reaction with id.
  router.get("/select/:id", controller.one);

      // Select a single reaction with id and delete.
      router.get("/delete/:id", controller.delete);
  
    // Create a new reaction.
    router.post("/", controller.create);
  
    // Add routes to server.
    app.use("/api/postReaction", router);
  };
  