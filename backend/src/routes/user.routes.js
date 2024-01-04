module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // Select all users.
  router.get("/", controller.all);

  // Select a single user with email.
  router.get("/select/:email", controller.one);

  // Select one user from the database if username and password are a match.
  router.get("/login", controller.login);

  // Create a new user.
  router.post("/", controller.create);

  
   // Update a user.
   router.put("/", controller.update);

  // Add routes to server.
  app.use("/api/users", router);

};
