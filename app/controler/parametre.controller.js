const models = require("../models");

const PriorityModel = models.Priority;


exports.setConfigAlerterPriority = (req, res) => {
    const config = [];

    config.push(req.body.bas);
    config.push(req.body.moyen);
    config.push(req.body.haut);

    // config.map();
    // PriorityModel.update(
    //     {
    //        config: 
    //     },
    //     { where: { id: req.params.tache } }
    // )
    //     .then(res.send({ message: "Task was update successfully!" }))
    //     .catch(err => {
    //         // console.log('------------', err)
    //         res.status(500).send({ message: err.message });
    //     });
};


