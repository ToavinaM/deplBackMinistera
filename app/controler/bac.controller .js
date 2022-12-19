
const { condition } = require('sequelize');
const { QueryTypes } = require('sequelize');

const models = require("../models");
const BacModel = models.Bac;
const db = require("../models");
// const TacheModel = db.Tache;
// where etat_in_back etat_debordement

// exports.getAllBac = (req, res) => {
//     BacModel.findAll()
//         .then(data => {
//             console.log(data);
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({ message: err.message });
//         });
// };

exports.getAllBac = async (req, res) => {

    
    // let condition = req.body.condition;
    let condition =  ' ';

    // and etat_in_bac >
    // and deborderment <
    // and date_signalement 
 
   await db.sequelize.query(`
        SELECT * FROM public."Bac" where 1=1 ${condition} `, {
        type: QueryTypes.SELECT
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
};
