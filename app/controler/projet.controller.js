// ato za no mireceive data,
//     ato no mfind,
//         ato no mandefa json
//misy erreur ilay res.send message, milla jerena ilay izy
const models = require("../models");
const { avancement } = require("./projet.controller copy");
const ProjetModel = models.Projet;
const TacheModel = models.Tache;

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
        avancement = ((tacheTerminer * 100) / totalTache)
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
          res.send(rep);
        })
        .catch(err => { console.log(err) });
    })
    .catch(err => { console.log(err) });
}

