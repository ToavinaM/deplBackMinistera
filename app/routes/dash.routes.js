
const controlerDash = require("../controler/dash.controller");
module.exports = function (app) {

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/api/dash/probleme", controlerDash.getStatProblem);
    app.get("/api/dash/retardavance", controlerDash.getStatTacheRetard);
    app.get("/api/dash/effectif", controlerDash.getEffectifByStatus);
    ///////////////////////
    app.get("/api/dash/tracageAvance", controlerDash.tracageAvance);
    app.get("/api/dash/tracageRetard", controlerDash.tracageRetard);
    app.get("/api/dash/statutMonth", controlerDash.getStatusPerMonthPerDepartement);

    // app.post("/api/auth/signin", controlerAuth.signin);
}