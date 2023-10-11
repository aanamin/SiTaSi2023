
const {sequelize, DataTypes, err} = require('sequelize')
const db = require('../config/dbConfig.js')
const signature = require('./dosen.js')
const { mahasiswa } = require('./index.js')

var mahasiswa = db.define('mahasiswa',{
    nim : {
        type        : DataTypes.STRING,
        allowNull   : false,
        primaryKey  : true,
        autoIncrement: false
    },
    nama_mahasiswa : {
        type        : DataTypes.STRING,
        allowNull   : false
    },
    
    password :{
        type        : DataTypes.STRING,
        allowNull   : false
    },
    created_at : {
        type        : DataTypes.DATEONLY,
        allowNull   : false
    },
    updated_at : {
        type        : DataTypes.DATEONLY,
        allowNull   : false
    }
}, {
    freezeTableName : true,
    timestamps  : true,
    createdAt:'created_at',
    updatedAt: 'updated_at'
})

// user.hasMany(signature);
module.exports = mahasiswa