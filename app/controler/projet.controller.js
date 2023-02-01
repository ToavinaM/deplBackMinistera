
const { QueryTypes } = require('sequelize');
const models = require("../models");

const { avancement } = require("./projet.controller copy");
const ProjetModel = models.Projet;
const TacheModel = models.Tache;
const SousTacheModel = models.SousTache;

async function getAvancementTache(TacheId) {
  ///mandray id tache dia mireturn number soustask sy avancement     
  // console.log('PPPPPPPPPPPPPPPPPPPPPPPPPppp', req.params.TacheId);
  return await SousTacheModel.findAll(
    { where: { TacheId: TacheId } }
  ).then(async rep => {

    let terminer = 0;
    let avancement = 0;
    let total = rep.length;

    for (let i = 0; i < total; i++) {
      if (rep[i].isChecked) {
        terminer++;
      }
    }

    if (total !== 0) {
      avancement = await Math.round(terminer * 100 / total);
      return ({ total, terminer, avancement });
    }

    return ({ total, terminer, avancement });


  }).catch(er => {
    console.log('JKKJKJKJKJk', er);
    return er
  })
};

exports.getGanttByDepartement = async (req, res) => {
  //projet de tout les derpartements
  await ProjetModel.findAll({ where: { DepartementId: req.params.idDepartement } })
    .then(async pj => {

      let arrayModelProjet = [];
      let arrayModelTache = [];

      for (const pro of pj) {
        let avancement = 0;
        await caculAvancement(pro.id).then(rep => { avancement = rep.avancement }).catch(err => console.log(err));
        let modelDataGantt = {
          name: pro.titre,
          id: pro.id + pro.titre,
          completed: avancement / 100,
        }
        arrayModelProjet.push(modelDataGantt);

      }


      ////////////////////////////// tache by departement///////////////////////////////////////
      models.sequelize.query(`
          select t.id as idtache, t.titre  as tache,  t.debut, t.fin, t.description, t."StatutId", t."PrioriteId", t."ProjetId", 
          p.titre, p."DepartementId" from "Tache" as t
          join "Projet" as p
          on t."ProjetId" = p.id
          where "DepartementId" = ${req.params.idDepartement};
      `, {
        type: QueryTypes.SELECT
      })
        .then(async tache => {

          for (const p of pj) {
            for (const t of tache) {
              if (t.ProjetId === p.dataValues.id) {
                let avancement = 0;


                // console.log('KKKKKKKKKKKKKKKKK', t.idtache);

                let data = await getAvancementTache(t.idtache);
                console.log('XXXX', data);




                let modelDataGantt = {
                  name: t.tache,
                  id: t.tache + t.idtache,
                  start: new Date(t.debut).getTime(),
                  end: new Date(t.fin).getTime(),
                  completed: data.avancement / 100,
                  parent: p.dataValues.id + p.dataValues.titre
                }
                arrayModelTache.push(modelDataGantt);



              }
            }
          }
          res.json(arrayModelProjet.concat(arrayModelTache));

        })
        .catch(err => {
          console
          res.status(500).send({ message: err.message });
        });
    })
    .catch(err => { console.log(err) });
}


exports.avancement = (req, res) => {
  TacheModel.findAll().then(data => {
    // res.send(data);
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
exports.getAllProjet = (req, res) => {
  ProjetModel.findAll().then(data => {
    res.send(data);
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Poject."
      });
    });
};
// by Departement
exports.getProjetByDept = (req, res) => {
  ProjetModel.findAll().then(data => {
    res.send(data);
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Poject."
      });
    });
};
exports.AjoutProjet = (req, res) => {
  console.log("================================");
  ProjetModel.create({
    DepartementId: req.body.DepartementId,
    titre: req.body.titre,
    debut: req.body.debut,
    fin: req.body.fin,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    color: req.body.color,
    // DepartementId: req.body.id_departement,
    // RegionId: req.body.id_region,
  }).then(rep => {
    console.log('huhuNw projet', rep);
    res.send(rep)
  })
    .catch(err => {
      console.log('errorrororo projet', err);

      res.status(500).send({ message: err.message });
    });

};
exports.ProjetByRegion = (req, res) => {
  console.log("================================");
  ProjetModel.findAll({ where: { RegionId: req.params.region } }).then(data => {
    res.send(data);
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// findBy id une fois

async function caculAvancement(idProjet) {

  let tacheTerminer = 0;
  let avancement = 0;
  let totalTache = 0;

  await TacheModel.findAll({ where: { ProjetId: idProjet } })
    .then(tacheRet => {
      totalTache = tacheRet.length;
      tacheRet.map(tache => {
        if (tache.dataValues.StatutId === 3) tacheTerminer++;
        avancement = Math.round((tacheTerminer * 100) / totalTache, 2)
      })
    }).catch(err => { console.log('error', err) });
  return { totalTache, tacheTerminer, avancement }
}

async function buildCardProjet(arrayProjetNotDataValues) {
  let retour = []; //retourne un projet modifier
  for (let projet of arrayProjetNotDataValues) {
    let cardprojet = projet.dataValues;
    await caculAvancement(cardprojet.id)
      .then(rep => {
        cardprojet.totalTache = rep.totalTache; cardprojet.tacheTerminer = rep.tacheTerminer; cardprojet.avancement = rep.avancement;
        retour.push(cardprojet);
      })
      .catch(err => { console.log(err) })
  }
  return retour;
}


exports.ProjetByDepartement = (req, res) => {
  console.log("================================");
  ProjetModel.findAll({ where: { DepartementId: req.params.dept } })
    .then(data => {
      // res.send(data);
      buildCardProjet(data)
        .then(rep => {
          console.log('ito=============================', rep);
          res.send(rep);
        })
        .catch(err => { console.log(err) });
    })
    .catch(err => { console.log(err) });
}

