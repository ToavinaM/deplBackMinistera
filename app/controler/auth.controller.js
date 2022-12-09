const models = require("../models");
const config = require("../config/auth.config");
const UserModel = models.User;
const RoleModel = models.Role;
const Op = models.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var generator = require('generate-password');
var nodemailer = require('nodemailer');

exports.updateUser = (req, res) => {
    // Save User to Database
    let password = req.body.password; let newPass = req.body.newPass; let oldUserName = req.body.oldUserName; let username = req.body.username; let email = req.body.email;
    UserModel.findOne({
        where: {
            username: oldUserName
        }
    })
        .then(user => {
            var passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) {
                throw new Exception(' Mots de passe incorrecte');
            }


            ///tsy namorona instance tsony za fa andramako aloha ra mety ito
            user.update({ password: bcrypt.hashSync(newPass, 8), username: username, email: email })
                .then(rep => {
                    res.send('Changement effectuer');
                })
                .catch(err => {
                    res.send('Erreur lors de l action update:' + err);
                })
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });



};

exports.signup = (req, res) => {
    // Save User to Database
    let generatePassword = generator.generate({ length: 20, numbers: true });
    UserModel.create({
        username: req.body.username,
        email: req.body.email,
        isActive: false,
        password: bcrypt.hashSync(generatePassword, 8)
    })
        .then(user => {
            res.send('Attendre activation de votre compte');
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });

};

exports.signin = (req, res) => {
    console.log(req.body.username, req.body.password, req.body.email);
    UserModel.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            var token = jwt.sign({ id: user.id, role: user.role }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];
            res.send({
                id: user.id,
                DepartementId: user.DepartementId,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token,
                initiation: user.initiation
            });

        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.getAllUser = (req, res) => {
    UserModel.findAll()
        .then(user => {
            res.send(user);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

//////////////configuration gmail
// https://stackoverflow.com/questions/72470777/nodemailer-response-535-5-7-8-username-and-password-not-accepted
exports.activation = (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: config.email, pass: config.password }
    });
    let generatePassword = generator.generate({ length: 20, numbers: true });

    var mailOptions = {
        from: config.email,
        to: req.body.email,
        subject: 'Activation de votre compte',
        text: `Vous etes authorise a utiliser le plateforme Suivi de projet;Votre mot de passe est: ${generatePassword}; Veuillez le changer apres activation,Cordialement, l equipe DSI`,
        html: `<!doctype html>
                <html>
                <head></head>
                <body>
                 <img src="https://www.pseau.org/gif/logo_mineau_mg.png" width="200" height="200"/>
                    <h1>Ministère de l'eau , de l'assainissement et d'hygiène</h1>
                    <h2>Vous êtes autorisé à utiliser la plateforme de gestion de Suivi de projet</h2>
                    <p>Votre mot de passe est: ${generatePassword}</p>
                    <p>Veuillez le changer aprés activation,</p>
                    <p>Ceci, est un mail généré automatiquement, veuiller à ne pas y répondre</p>
                    <p>Cordialement, l'equipe DSI</p>
                </body>
                </html>`
    };

    transporter.sendMail(mailOptions)
        .then(info => {
            UserModel.update({ isActive: true, password: bcrypt.hashSync(generatePassword, 8) }, { where: { email: req.body.email } })
                .then(rep => {
                    console.log('success send mail:' + info);
                    res.send('activation reussis');
                })
                .catch(err => {
                    res.send('Erreur activation user:' + err);
                })
        })
        .catch(err => {
            res.send('Erreur mail Sender:' + err);
            console.log('Erreur mail Sender: ' + err);
        })

};