
const controlerParametre = require("../controler/parametre.controller");
module.exports = function (app) {
    //set config
    app.get("/api/config", controlerParametre.setConfigAlerterPriority);
}