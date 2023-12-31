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

controller.tampilListDosen = async (req, res) => {
    try {
        const dosen = await models.dosen.findAll()
        if(!dosen){
            res.status(404).json({
                message: 'Tidak terdapat akun dosen'
            })
        }
        res.status(200).json({
            dosen: dosen
        })
    } catch (error) {
        res.status(500).json({
            message: 'terdapat masalah'
        })
    }
}

controller.tambahAkunDosen = async (req, res) => {
    try {
        const {
            nip,
            namaDosen,
            password,
            jeniskelamin
        } = req.body
        const existingDosen = await models.dosen.findOne({
            where: {
                nip: nip
            }
        })
        if (existingDosen) {
            res.status(400).json({
                message: 'maaf sudah terdapat akunnya'
            })
        }
        const akunDosen = await models.dosen.create({
            nip: nip,
            nama_dosen: namaDosen,
            password: password,
            jenis_kelamin: jeniskelamin,
            kuota_dosbing: 10
        })
        res.status(200).json({
            akunDosen: akunDosen,
            message: 'Akun Dosen Telah Terbuat'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Terdapat masalah'
        })
    }
}

controller.tampilProfilAdmin = async (req,res) =>{
    try {
        const nomorinduk = req.user.nomorinduk
        console.log(nomorinduk);
        const profilAdmin= await models.admin.findOne({
            where: {
                niu: nomorinduk
            }
        })
        res.status(200).json({
            profilAdmin: profilAdmin
        })
    } catch (error) {
        console.log("terdapat error : ", error);
    }
}
module.exports = controller