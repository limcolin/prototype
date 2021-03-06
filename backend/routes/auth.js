const verifySignup = require("../middleware/verifySignup")
const controller = require("../controllers/auth");
const express = require("express");
const router = express.Router();

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.post(
    "/signup",
    [
      verifySignup.checkDuplicateUsernameOrEmail,
      verifySignup.checkRolesExisted
    ],
    controller.signup
  );

  router.post("/signin", controller.signin);

  app.use("/api/auth", router);
};
