const models = require("../models");
const TacheModel = models.Tache;
const Commentaire = models.Commentaire;
// const SousTache = models.SousTache;
// const { QueryTypes } = require('sequelize');
// exports.findBydept = async (req, res) => {


//   //tache by departement
//   await models.sequelize.query(`
//       select t.titre  as tache,  t.debut, t.fin, t.description, t."StatutId", t."PrioriteId", t."ProjetId", 
//       p.titre, p."DepartementId" from "Tache" as t
//       join "Projet" as p
//       on t."ProjetId" = p.id
//       where "DepartementId" = ${req.params.idDepartement};
//   `, {
//     type: QueryTypes.SELECT
//   })
//     .then(result => {


//       function convertToGantData(pj) {
//         let arrayModel = [];

//         for (const pro of pj) {
//           let modelDataGantt = {
//             name: pro.titre,
//             id: pro.id + pro.titre,
//             start: new Date(pro.debut).getTime(),
//             end: new Date(pro.fin).getTime(),
//             parent: '',
//           }
//           arrayModel.push(modelDataGantt);
//         }
//         console.log('bhbh', arrayModel)
//         return arrayModel;
//       }

//       async function affectTacheToProject(pj, tache) {
//         let arrayModel = [];
//         for (const p of pj) {
//           for (const t of tache) {
//             if (t.ProjetId === p.id) {
//               let modelDataGantt = {
//                 name: t.tache,
//                 id: t.titre,
//                 start: new Date(t.debut).getTime(),
//                 end: new Date(t.fin).getTime(),
//                 parent: p.id + p.titre
//               }
//               arrayModel.push(modelDataGantt);
//             }
//           }
//         }
//         return await arrayModel;
//       }


//       res.send(result)
//     })
//     .catch(err => {
//       res.status(500).send({ message: err.message });
//     });
// }

exports.activePrevisionalLate = (req, res) => {
  // console.log('huu', req.body.tacheRetard);
  let ids = [];
  req.body.tacheRetard.map(val => {
    ids.push(val.id);
  })
  console.log('huu', new Date());

  TacheModel.update(
    {
      StatutId: 2, ///in progress
      debut: new Date(),
    },
    { where: { id: ids } }
  ).then(rep => {
    res.status(200).send('activation reussis');
  }).catch(err => {
    res.send("Erreur lors de l'activation");
  })
};

exports.getAllTache = (req, res) => {
  // return un instance de tache
  TacheModel.findAll()
    .then(data => {
      let todo = [];
      let inProgress = [];
      let doing = [];
      data.map(tache => {
        if (tache.dataValues.StatutId === 1) { todo.push(tache.dataValues) };
        if (tache.dataValues.StatutId === 2) inProgress.push(tache.dataValues);
        if (tache.dataValues.StatutId === 3) doing.push(tache.dataValues);
      })
      let dataFormater = { todo, inProgress, doing }
      res.send(dataFormater);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tasks."
      });
    });
};

exports.AjoutTache = (req, res) => {
  TacheModel.create({
    ProjetId: req.body.ProjetId,
    PrioriteId: req.body.PrioriteId,
    StatutId: 1,

    titre: req.body.titre,
    description: req.body.description,
    output: req.body.output,

    debut: req.body.debut,
    fin: req.body.fin,
    estAlerteur: req.body.estAlerteur
  }).then(rep => res.send(rep))
    .catch(err => {
      console.log(err);
      // res.status(500).send({ message: err.message });
    });
};

exports.TacheByProjet = (req, res) => {
  console.log("================================");
  TacheModel.findAll({ where: { ProjetId: req.params.id_projet } }).then(data => {
    // res.send(data);
    let todo = [];
    let inProgress = [];
    let doing = [];
    let retard = [];
    let avancementAndNumber = [];

    data.map(tache => {
      if (tache.dataValues.StatutId === 1) {
        todo.push(tache.dataValues)
        if (tache.dataValues.debut <= new Date()) {
          retard.push(tache.dataValues);
        }
      };
      if (tache.dataValues.StatutId === 2)
        inProgress.push(tache.dataValues);
      if (tache.dataValues.StatutId === 3) doing.push(tache.dataValues);
    })

    let dataFormater = { retard, todo, inProgress, doing }
    res.send(dataFormater);


  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tasks."
      });
    });
};

exports.UpdateTache = async (req, res) => {
  // console.log(req.params);
  console.log(req.body.StatutId);
  await TacheModel.update(
    {
      StatutId: req.body.StatutId,
      debut: req.body.debut,
      fin: req.body.fin,
      description: req.body.description,
      output: req.body.output,
      estAlerteur: req.body.estAlerteur,
      ProriteId: req.body.ProriteId
    },
    { where: { id: req.params.tache } }
  )
    .then(await res.send({ message: "Task was update successfully!" }))
    .catch(err => {
      // console.log('------------', err)
      res.status(500).send({ message: err.message });
    });
};

exports.UpdateTacheWeb = (req, res) => {
  // console.log(req.params);
  // console.log('ilay nandrasan', req.body.PrioriteId);
  TacheModel.update(
    {
      StatutId: req.body.StatutId,
      debut: req.body.debut,
      fin: req.body.fin,
      description: req.body.description,
      output: req.body.output,
      estAlerteur: req.body.estAlerteur,
      PrioriteId: req.body.PrioriteId
    },
    { where: { id: req.body.id } }
  )
    .then(rep => res.send(rep))
    .catch(err => {
      // console.log('------------', err)
      console.log(err)
      // res.status(500).send({ message: err.message });
    });
};


exports.DeleteTache = (req, res) => {
  TacheModel.destroy(
    { where: { id: req.body.id } }
  )
    .then(result => {
      Commentaire.destroy(
        { where: { TacheId: req.body.id } }
      )
      res.send({ result })
    }
    )
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}

