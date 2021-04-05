const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");


module.exports = function(stellartdb) {

  stellartdb.use(function(req, res, next) {

    res.header(

      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"

    );

    next();

  });

  stellartdb.get("/api/test/all", controller.allAccess);

  stellartdb.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  stellartdb.get(

    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard

  );

  stellartdb.get(

    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard

  );
  
};