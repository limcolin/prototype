const authJwt = require("./middleware/authJwt");
const controller = require("./controllers/user");
const express = require("express");
const router = express.Router();
const Booking = require("./booking");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.get("/test/all", controller.allAccess);

  router.get("/test/user", [authJwt.verifyToken], controller.userBoard);

  router.get(
    "/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  router.get(
    "/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  router.get(
    "/bookings",
    [authJwt.verifyToken],
    (req, res) => {
      console.log(res.locals.userId)
      Booking.find({ user: res.locals.userId }, (err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
      });
    }
  );

  app.use("/api/user", router);
};
