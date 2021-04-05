const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");


module.exports = function(stellartdb) {

  stellartdb.use(function(req, res, next) {

    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();

  });

  stellartdb.post(

    "/api/auth/signup",

    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],

    controller.signup

  );

  stellartdb.post("/api/auth/signin", controller.signin);
  
};