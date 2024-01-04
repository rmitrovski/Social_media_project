module.exports = (express, app) => {
  const controller = require("../controllers/accountFollow.controller.js");
  const router = express.Router();

  // Select all follows.
  router.get("/", controller.all);

  // Select a single follow with email.
  router.get("/select/:email", controller.one);

   // Create a new follow.
 router.post("/", controller.create);

  // Delete a follow with id.
  router.get("/delete/:email", controller.delete);

   // Add routes to server.
   app.use("/api/accountFollows", router);

}


