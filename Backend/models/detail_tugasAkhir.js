const {sequelize, DataTypes,err} = require('sequelize')
const db = require('../config/dbConfig.js')

var detail_tugasAkhir = db.define('detail_tugasAkhir',{
    id_progress: {
        type            : DataTypes.INTEGER,
        primaryKey      : true,
        autoIncrement   : true,
        allowNull       : false
      },
    id_ta:{
        type        : DataTypes.INTEGER,
        allowNull   : false
    },
    nama_progress:{
        type        : DataTypes.STRING,
        allowNull   : false 
    },
    nama_file:{
        type        : DataTypes.STRING,
        allowNull   : false
    },
    saran_masukan:{
        type        : DataTypes.STRING,
        allowNull   : true
    },
    deskripsi_progress:{
        type        : DataTypes.STRING,
        allowNull   : false
    },
    tanggal_pengajuan:{
        type        : DataTypes.DATEONLY,
        allowNull   : false
    },
    status_pengajuan:{
        type        :DataTypes.STRING,
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

module.exports = detail_tugasAkhir