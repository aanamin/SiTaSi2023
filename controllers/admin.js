// const { now } = require('sequelize/types/utils');
const {
    or,
    where
} = require('sequelize');
const Sequelize = require('sequelize');
const models = require('../models/index');
const controller = {}
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const fs = require('fs');
const {
    Op
} = require("sequelize");

controller.tampilListDosen = async(req,res)=>{
    const dosen = await models.dosen.findAll()
    res.status(200).json({
        dosen:dosen
    })
}

module.exports = controller