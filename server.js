const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");
const moment = require('moment');
const dotenv = require('dotenv');
dotenv.config();
app.use('/uploads', express.static(path.join(__dirname, "uploads")));
app.use(express.raw());


// const config_baseUrl =
// app.use(express.static(path.join(__dirname, 'build')));
// app.use(express.static(path.join(__dirname, 'build', "static")));
// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

var corsOptions = {
    origin: "https://meah-suivi.onrender.com"
    // origin: "http://localhost:3000"
    // origin: "http://localhost:19006"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//route 
require('./app/routes/parametre.routes')(app);
require('./app/routes/dash.routes')(app);
require('./app/routes/problemeTache.routes')(app);

require('./app/routes/role.routes')(app);
require('./app/routes/departement.routes')(app);
require('./app/routes/sousTache.routes')(app);
require('./app/routes/commentaire.routes')(app);
require('./app/routes/tacheAlerte.routes')(app);

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/projet.routes')(app);
require('./app/routes/taches.routes')(app);
require('./app/routes/historique.routes')(app);
// require('./app/routes/priority.routes')(app);
// require('./app/routes/status.routes')(app);
const db = require("./app/models");

// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Synchronysation des models et insertion des donnee minimal ');
//     //////////Departement//////////
//     db.Departement.create({
//         intitule: "DSI"
//     });
//     db.Departement.create({
//         intitule: "RH"
//     });
//     db.Departement.create({
//         intitule: "Juridique"
//     });
//     ////////user
//     var bcrypt = require("bcryptjs");
//     db.User.create({
//         email: 'rh@gmail.com',
//         username: "rh",
//         password: bcrypt.hashSync('rh', 8),
//         isActive: true,
//         contact: '+261344003904',
//         DepartementId: 2,
//     });
//     db.User.create({
//         email: 'dsi@gmail.com',
//         username: "dsi",
//         password: bcrypt.hashSync('dsi', 8),
//         isActive: true,
//         contact: '+261344003904',
//         DepartementId: 1,
//     });
//     //////////Probleme///////////
//     db.Probleme.create({
//         labele: "Financiere"
//     });
//     db.Probleme.create({
//         labele: "Paperrasse"
//     });
//     db.Probleme.create({
//         labele: "Materiele"
//     });

//     db.Probleme.create({
//         labele: "Autre"
//     });
//     /////////////Priority/////////////////
//     db.Priorite.create({
//         labele: "Bas",
//         config: 1
//     });
//     db.Priorite.create({
//         labele: "   Moyenn",
//         config: 2
//     });
//     db.Priorite.create({
//         labele: "Urgent",
//         config: 3
//     });

//     /////////////Statut/////////////////
//     db.Statut.create({
//         labele: "todo"
//     });
//     db.Statut.create({
//         labele: "inProgress"
//     });
//     db.Statut.create({
//         labele: "doing"
//     });

//     /////////Role
//     db.Role.create({
//         name: "Admin"
//     });
//     db.Role.create({
//         name: "Moderator"
//     });
//     db.Role.create({
//         name: "User"
//     });

//     //////////projet///////////
//     // Create projet
//     db.Projet.create({
//         debut: new Date('12/11/22'),
//         fin: new Date('7/12/22'),
//         titre: 'Water Tracking',
//         latitude: -18.929996530637386,
//         longitude: 47.60935709791363,
//         DepartementId: 1,
//         color: "#009688"
//     });
//     db.Projet.create({
//         debut: new Date('12/11/22'),
//         fin: new Date('7/12/22'),
//         titre: 'Phare de l eau',
//         latitude: -18.929996530637386,
//         longitude: 47.60935709791363,
//         DepartementId: 1,
//         color: "#009688"
//     });
//     db.Projet.create({
//         debut: new Date('12/11/22'),
//         fin: new Date('7/12/22'),
//         titre: 'RHHUHU',
//         latitude: -18.929996530637386,
//         longitude: 47.60935709791363,
//         DepartementId: 2,
//         color: "#009688"
//     });

// })


const PORT = 8080;
// const PORT = 3001;
app.listen(PORT, () => {
    // console.log(`localhost: ${PORT}.`);
    console.log(`⚡Server is running on port ${PORT}.`);
});