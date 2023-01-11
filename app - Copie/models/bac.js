'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Bac extends Model {

        static associate(models) {
            // define association here
            // this.belongsTo(models.Tache);
        }
    }
    Bac.init({
        numero_signalement: { type: DataTypes.TEXT, allowNull: true },
        date_signalement: { type: DataTypes.TEXT, allowNull: true },
        heure_signalement: { type: DataTypes.TEXT, allowNull: true },
        etat_in_bac: { type: DataTypes.INTEGER, allowNull: true },
        etat_debordement: { type: DataTypes.INTEGER, allowNull: true },
        code_bac: { type: DataTypes.TEXT, allowNull: true },
        nom_pc: { type: DataTypes.TEXT, allowNull: false },
        localisation: { type: DataTypes.TEXT, allowNull: true },
        longitude: { type: DataTypes.TEXT, allowNull: false },
        latitude: { type: DataTypes.TEXT, allowNull: false }
    }, {
        createdAt: false,
        updatedAt: false,
        sequelize,
        modelName: 'Bac',
        freezeTableName: true
    });
    return Bac;
};