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

// menampilkan semua mahasiswa bimbingan
controller.mahasiswaBimbingan = async (req,res) => {
    try {
        const nip = req.session.user.id
        const ta = await models.tugasAkhir.findAll({
            where: {
                id_dosbing: nip
            }
        });
        
        if (ta.length === 0) {
            res.status(404).json({
                message: 'maaf, belum terdapat mahasiswa bimbingan'
            })
        } else {
            for (const tugasAkhir of ta) {
                const mahasiswa = await models.mahasiswa.findOne({
                    where: {
                        nim: tugasAkhir.nim
                    }
                });
        
                if (mahasiswa) {
                    res.status(200).json(mahasiswa)
                } 
            }
        }
    } catch (error) {
        console.error('Kesalahan:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan dalam mengambil data mahasiswa bimbingan.'
        });
    }
}

// progress mahasiswa bimbingan
controller.progressMabing = async (req,res) =>{
    try {
        const nimMahasiswa = req.params.nimMahasiswa

        const mahasiswa = await models.mahasiswa.findOne({
            where: {
                nim: nimMahasiswa
            }
        })
        const ta = await models.tugasAkhir.findOne({
            where:{
                nim:nimMahasiswa
            }
        })

        res.status(200).json({
            progress: ta,
            mahasiswa: mahasiswa
        })
    } catch (error) {
        console.error('Kesalahan:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan dalam mengambil data progress mahasiswa bimbingan.'
        });
    }
}

// detail proposal mahasiswa bimbingan
controller.detailProposalMabing = async (req,res) =>{
    try {
        const nimMahasiswa = req.params.nimMahasiswa
        const progress = req.params.progress
        const ta = await models.tugasAkhir.findOne({
            where:{
                nim:nimMahasiswa
            }
        })
        if (ta) {
            const filePath= path.join(__dirname, '../uploads', ta[progress])
            res.sendFile(filePath)
            
        } else {
            res.status(404).json({
                message: 'tidak ditemukan'
            })
        }
        // res.status(200).json({
        //     file: ta.proposal
        // })
    } catch (error) {
        console.error('Kesalahan:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan dalam mengambil data progress mahasiswa bimbingan.'
        });
    }
}

module.exports = controller