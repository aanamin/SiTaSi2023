const {
    DataTypes,
} = require('sequelize')
const db = require('../config/dbConfig.js');

var admin = db.define('admin', {
    niu: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false
    },
    nama_admin: {
        type: DataTypes.STRING,
        allowNull: false,
        autoIncrement: false
    },
    jenis_kelamin: {
        type: DataTypes.STRING,
        allowNull: false,
        autoIncrement: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    updated_at: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});


module.exports = admin