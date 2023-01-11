
const db = require("../models");
const ProblemeTache = db.ProblemeTache;
const Probleme = db.Probleme;
const TacheModel = db.Tache;

const { QueryTypes } = require('sequelize');


exports.tracageRetard = async (req, res) => {
    await db.sequelize.query(`
        SELECT * FROM public."Tache" where "StatutId"!=3 and "fin"<now();`, {
        type: QueryTypes.SELECT
    })
        .then(retard => {
            res.send(retard);
        })
        .catch(err => {
            res.send(err);
        });
};



exports.tracageAvance = async (req, res) => {
    db.sequelize.query(`
        SELECT * FROM public."Tache" where "StatutId"=3 and "fin">now();`, {
        type: QueryTypes.SELECT
    })
        .then(avance => {
            res.send(avance);
        })
        .catch(err => {
            res.send(err);
        });
}



exports.getEffectifByStatus = async (req, res) => {
    await db.sequelize.query(`
        SELECT count(id) as effectif,"StatutId"
	    FROM public."Tache" group by "StatutId";`, {
        type: QueryTypes.SELECT
    })
        .then(rep => {
            let todo = 0;
            let progress = 0;
            let doing = 0;
            let total = 0;
            rep.map(val => {
                if (val.StatutId === 1) todo = parseInt(val.effectif);
                if (val.StatutId === 2) progress = parseInt(val.effectif);
                if (val.StatutId === 3) doing = parseInt(val.effectif);
            })
            total = parseInt(todo + progress + doing);
            res.send({ todo, progress, doing, total });
        })
        .catch(err => {
            res.send(err);
        });
};


exports.getStatTacheRetard = async (req, res) => {
    await db.sequelize.query(`
       SELECT count(id) 
	    FROM public."Tache" where "StatutId"!=3 and "fin"<now();`, {
        type: QueryTypes.SELECT
    })
        .then(retard => {
            db.sequelize.query(`
                SELECT count(id) 
	            FROM public."Tache" where "StatutId"=3 and "fin">now();`, {
                type: QueryTypes.SELECT
            })
                .then(avance => {
                    res.send({ retard, avance });
                })
                .catch(err => {
                    res.send(err);
                });
        })
        .catch(err => {
            res.send(err);
        });
};

exports.getStatProblem = async (req, res) => {

    await db.sequelize.query(`
        select count(public."ProblemeTaches".id) as nombre, labele from public."ProblemeTaches"
        join "Problemes"
        ON "ProblemeTaches"."ProblemeId" = "Problemes"."id"
        group by "Problemes".id `, {
        type: QueryTypes.SELECT
    })
        .then(rep => {
            res.send(rep);
        })
        .catch(err => {
            res.send(err);
        });
};

exports.getStatusPerMonthPerDepartement = async (req, res) => {
    let DepartementId = req.body.DepartementId;
    await db.sequelize.query(
        `
            SELECT DATE_TRUNC('month',"Tache".debut) AS  debutMois, COUNT("Tache".id) AS tache ,
            "Tache"."StatutId",
            "Projet"."DepartementId"
            FROM "Tache"
            join "Projet" 
            on "Tache"."ProjetId" = "Projet"."id"
            GROUP BY 
            "Projet"."DepartementId",
            DATE_TRUNC('month',"Tache".debut), "Tache"."StatutId"
            having date_part('year', DATE_TRUNC('month',"Tache".debut)) = date_part('year', CURRENT_DATE) and "DepartementId" =${DepartementId};
        `, {
        type: QueryTypes.SELECT
    })
        .then(rep => {

            // let rep = [];
            // let todo = [];
            // let inProgress = [];
            // let doing = [];

            // for (const r of rep) {
            //     switch (r.StatutId) {
            //         case 1:
            //             todo.data
            //             break;

            //         default:
            //             break;
            //     }
            // }

            res.send(rep);
        })
        .catch(err => {
            res.send(err);
        });
};


