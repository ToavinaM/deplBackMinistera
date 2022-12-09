const { verifySignUp } = require("../middleware");
const controlerAuth = require("../controler/auth.controller");
module.exports = function (app) {

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        controlerAuth.signup
    );

    app.post("/api/auth/signin", controlerAuth.signin);


    app.get("/api/auth/allUser", controlerAuth.getAllUser);

    ///activation user mailsender
    app.post("/api/auth/activation", controlerAuth.activation);
    //update user
    app.post("/api/auth/updateUser", controlerAuth.updateUser);

}