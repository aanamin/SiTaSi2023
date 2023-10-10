
const {sequelize, DataTypes, err} = require('sequelize')
const db = require('../config/dbConfig.js')
const signature = require('./dosen.js')

var tugasAkhir = db.define('tugasAkhir',{
    id : {
        type        : DataTypes.STRING,
        allowNull   : false,
        primaryKey  : true,
        autoIncrement: false
    },
    id_mahasiswa : {
        type        : DataTypes.STRING,
        allowNull   : false,
        primaryKey:true
    },
    id_dosbing : {
        type        : DataTypes.STRING,
        allowNull   : false,
        primaryKey:true
    },
    id_dospeng : {
        type        : DataTypes.STRING,
        allowNull   : false
    },
    judul :{
        type        : DataTypes.STRING,
        allowNull   : false
    },
    proposal :{
        type        : DataTypes.STRING,
        allowNull   : false
    },
    bab1 :{
        type        : DataTypes.STRING,
        allowNull   : false
    },
    bab2 :{
        type        : DataTypes.STRING,
        allowNull   : false
    },
    bab3 :{
        type        : DataTypes.STRING,
        allowNull   : false
    },
    bab4 :{
        type        : DataTypes.STRING,
        allowNull   : false
    },
    bab5 :{
        type        : DataTypes.STRING,
        allowNull   : false
    },
    bab6 :{
        type        : DataTypes.STRING,
        allowNull   : false
    },
    
    created_at : {
        type        : DataTypes.DATE,
        allowNull   : false
    },
    updated_at : {
        type        : DataTypes.DATE,
        allowNull   : false
    }
}, 
{
    freezeTableName : true,
    timestamps  : true,
    createdAt:'created_at',
    updatedAt: 'updated_at'
})


module.exports = tugasAkhir