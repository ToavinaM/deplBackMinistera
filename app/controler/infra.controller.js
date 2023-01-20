const models = require("../models");
const InfraModel = models.Infra;

exports.getAllInfra = (req, res) => {
  InfraModel.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Infra."
      });
    });
};
