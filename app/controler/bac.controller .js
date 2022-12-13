const models = require("../models");
const BacModel = models.Bac;



exports.getAllBac = (req, res) => {
    BacModel.findAll()
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
