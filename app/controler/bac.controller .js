
const { condition } = require('sequelize');
const { QueryTypes } = require('sequelize');
const { verifyToken } = require('../middleware/authJwt');
const moment = require('moment');
const models = require("../models");
const BacModel = models.Bac;
const db = require("../models");
// const TacheModel = db.Tache;
// where etat_in_back etat_debordement

function sendLabel() {
    let labelStatusBac = [
        { labele: 'Etat Bac', id: 0 },
        { labele: 'Quart', id: 1 },
        { labele: 'Demi', id: 2 },
        { labele: 'trois quart', id: 3 },
        { labele: 'Plein', id: 4 },
        { labele: 'Trop Plein', id: 5 },
        { labele: 'Debordement', id: 6 }
    ];
    let labelDebordement = [
        { labele: 'Etat Debordement', id: 0 },
        { labele: 'Quart', id: 1 },
        { labele: 'Demi', id: 2 },
        { labele: 'trois quart', id: 3 },
        { labele: 'Plein', id: 4 },
        { labele: 'Trop Plein', id: 5 },
        { labele: 'Debordement', id: 6 }
    ]
    return { labelStatusBac, labelDebordement };
};

exports.getAllBac = async (req, res) => {
    // let labele = sendLabel();
    // console.log('REQREQ', req.body);
console.log('JKHFKJFGJHGFJHFJHfgg',moment(req.body.date).format('DD/MM/YYYY'));
    conditionEtatBac = req.body.etatBac == 0 ? ' ' : `and etat_in_bac = ${req.body.etatBac}`;
    conditionEtatDebordement = req.body.etatDebordement == 0 ? ' ' : `and etat_debordement =${req.body.etatDebordement}`;
    conditionDate = `and date_signalement='${moment(req.body.date).format('DD/MM/YYYY')}'`;

    // conditionEtatDebordement = req.body.etatDebordement == 0 ? ' ' : `and etat_debordement =${req.body.etatDebordement}`;
    let condition = conditionEtatBac+ ' '+ conditionEtatDebordement+ ' '+conditionDate ;

    await db.sequelize.query(
        `SELECT * FROM public."Bac" where 1=1 ${condition}`, {
        type: QueryTypes.SELECT
    })
        .then(data => {
            // let retour = { data, labele }
            res.send(data);
        })
        .catch(err => {
            res.send(err);
        });
};
