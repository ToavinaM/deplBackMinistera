const models = require("../models");
const SousTacheModel = models.SousTache;

exports.getSousTacheByTache = (req, res) => {
    // console.log('----------------------_>>>>>', req.params.TacheId);
    SousTacheModel.findAll({ where: { TacheId: req.params.TacheId } })
        .then(data => {
            // console.log(data);
            res.send(data);
        })
        .catch(err => {
            console.log(err);
            res.send(err);
        })
};
exports.saveSousTache = (req, res) => {
    // console.log('HHHHHHHHHHHHHHHHHh', req.body.labele);
    SousTacheModel.create({
        labele: req.body.labele,
        TacheId: req.body.TacheId,
        isChecked: false,
    }).then(rep => {
        // console.log(rep);
        res.status(200).send(rep);
    }).catch(er => {
        console.log(er);
        res.send(er);
    })
};
exports.updateSousTache = (req, res) => {
    SousTacheModel.update(
        { isChecked: req.body.isChecked },
        { where: { id: req.body.id } }
    ).then(rep => {
        res.status(200).send(rep);
    }).catch(er => {
        res.send(er);
    })
};
exports.delete = (req, res) => {
    SousTacheModel.destroy(
        { where: { id: req.body.id } }
    ).then(rep => {
        res.status(200).send(rep);
    }).catch(er => {
        res.send(er);
    })
};


///getavancement tokny atao any am base
exports.getAvancement = (req, res) => {
    ///mandray id tache dia mireturn number soustask sy avancement     
    // console.log('PPPPPPPPPPPPPPPPPPPPPPPPPppp', req.params.TacheId);
    SousTacheModel.findAll(
        { where: { TacheId: req.params.TacheId } }
    ).then(rep => {
        let terminer = 0;
        let avancement = 0;
        let total = rep.length;
        for (let i = 0; i < total; i++) {
            if (rep[i].isChecked) {
                terminer++;
            }
        }
        // avancement = null ? Math.round(terminer * 100 / total) : 0;
        avancement = Math.round(terminer * 100 / total);
        res.send({ total, terminer, avancement });
    }).catch(er => {
        console.log('JKKJKJKJKJk', er);
        res.send(er);
    })
};

exports.endAllChecklist = (req, res) => {
    SousTacheModel.update(
        { isChecked: true },
        { where: { TacheId: req.params.TacheId } }
    ).then(rep => {
        // let terminer = 0;
        // let avancement = 0;
        // let total = rep.length;
        // for (let i = 0; i < total; i++) {
        //     if (rep[i].isChecked) {
        //         terminer++;
        //     }
        // }

        // avancement = null ? Math.round(terminer * 100 / total) : 0;
        res.send(rep);
    }).catch(er => {
        console.log('JKKJKJKJKJk', er);
        res.send(er);
    })
};

