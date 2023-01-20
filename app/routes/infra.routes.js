const controlerInfra = require("../controler/infra.controller");
module.exports = function (app) {
    //get All projet
    app.get("/api/infra/AllInfra", controlerInfra.getAllInfra);

}