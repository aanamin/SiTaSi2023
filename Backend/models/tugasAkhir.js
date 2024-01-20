
const {sequelize, DataTypes, err} = require('sequelize')
const db = require('../config/dbConfig.js')
const signature = require('./dosen.js')

var tugasAkhir = db.define('tugasAkhir',{
    id_ta: {
        type            :DataTypes.INTEGER,
        primaryKey      : true,
        autoIncrement   : true,
        allowNull       : false
    },
    nim : {
        type        : DataTypes.STRING,
        allowNull   : false
    },
    id_dosbing : {
        type        : DataTypes.STRING,
        allowNull   : false,
    },
    judul :{
        type        : DataTypes.STRING,
        allowNull   : false
    },
    detail_ide:{
        type        :DataTypes.STRING,
        allowNull:false
    },
    tanggal_judul :{
        type        : DataTypes.DATEONLY,
        allowNull   : true
    },
    status_judul :{
        type        : DataTypes.STRING,
        allowNull   : true
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