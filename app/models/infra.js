'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Infra extends Model {

        static associate(models) {
          
        }
    }
    Infra.init({
        region: { type: DataTypes.TEXT, allowNull: true },
        district: { type: DataTypes.TEXT, allowNull: true },
        communes: { type: DataTypes.TEXT, allowNull: true },
        localite: { type: DataTypes.TEXT, allowNull: true },
        milieu: { type: DataTypes.TEXT, allowNull: true },
        nb_point_eau: { type: DataTypes.TEXT, allowNull: true },
        nb_benef: { type: DataTypes.TEXT, allowNull: true },
        type_infra: { type: DataTypes.TEXT, allowNull: true },
        type_travaux: { type: DataTypes.TEXT, allowNull: true },
        type_gestion: { type: DataTypes.TEXT, allowNull: true },
        montant_reel: { type: DataTypes.TEXT, allowNull: true },
        financement: { type: DataTypes.TEXT, allowNull: true },
        date_prevue: { type: DataTypes.TEXT, allowNull: true },
        longitude: { type: DataTypes.TEXT, allowNull: true },
        latitude: { type: DataTypes.TEXT, allowNull: true }




    }, {
        createdAt: false,
        updatedAt: false,
        sequelize,
        modelName: 'Infra',
        freezeTableName: true
    });
    return Infra;
};