
const {sequelize, DataTypes, err} = require('sequelize')
const db = require('../config/dbConfig.js')
const signature = require('./dosen.js')

var tugasAkhir = db.define('tugasAkhir',{
    nim : {
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
        allowNull   : true
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
    proposal :{
        type        : DataTypes.STRING,
        allowNull   : true
    },
    tanggal_proposal :{
        type        : DataTypes.DATEONLY,
        allowNull   : true
    },
    status_proposal :{
        type        : DataTypes.STRING,
        allowNull   : true
    },
    bab1 :{
        type        : DataTypes.STRING,
        allowNull   : true
    },
    // tanggal pengajuan
    tanggal_bab1 :{
        type        : DataTypes.DATEONLY,
        allowNull   : true
    },
    status_bab1 :{
        type        : DataTypes.STRING,
        allowNull   : true
    },
    bab2 :{
        type        : DataTypes.STRING,
        allowNull   : true
    },
    tanggal_bab2 :{
        type        : DataTypes.DATEONLY,
        allowNull   : true
    },
    status_bab2 :{
        type        : DataTypes.STRING,
        allowNull   : true
    },
    bab3 :{
        type        : DataTypes.STRING,
        allowNull   : true
    },
    tanggal_bab3 :{
        type        : DataTypes.DATEONLY,
        allowNull   : true
    },
    status_bab3 :{
        type        : DataTypes.STRING,
        allowNull   : true
    },
    bab4 :{
        type        : DataTypes.STRING,
        allowNull   : true
    },
    tanggal_bab4 :{
        type        : DataTypes.DATEONLY,
        allowNull   : true
    },
    status_bab4 :{
        type        : DataTypes.STRING,
        allowNull   : true
    },
    bab5 :{
        type        : DataTypes.STRING,
        allowNull   : true
    },
    tanggal_bab5 :{
        type        : DataTypes.DATEONLY,
        allowNull   : true
    },
    status_bab5 :{
        type        : DataTypes.STRING,
        allowNull   : true
    },
    bab6 :{
        type        : DataTypes.STRING,
        allowNull   : true
    },
    tanggal_bab6 :{
        type        : DataTypes.DATEONLY,
        allowNull   : true
    },
    status_bab6 :{
        type        : DataTypes.STRING,
        allowNull   : true
    },
    formulir_semhas :{
        type        : DataTypes.STRING,
        allowNull   : true
    },
    full :{
        type        : DataTypes.STRING,
        allowNull   : true
    },
    status :{
        type        : DataTypes.STRING,
        allowNull   : true
    },
    tanggal_semhas  :{
        type        :DataTypes.DATEONLY,
        allowNull   : true
    },
    tanggal_sidang  :{
        type        :DataTypes.DATEONLY,
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