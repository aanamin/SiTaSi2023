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

// controller menampilkan semua request dosbing
controller.tampilRequestDosbing = async (req, res) => {
    try {
        const nip = req.user.nomorinduk
        const bimbingan = await models.tugasAkhir.findAll({
            where: {
                id_dosbing: nip,
                status_judul : 'pengajuan'
            }
        })
        let mahasiswaData = [];
        if (bimbingan.length > 0) {
            // Iterasi melalui setiap elemen hasil
            for (const result of bimbingan) {
              const mahasiswa = await models.mahasiswa.findOne({
                where: {
                  nim: result.nim
                }
              });
        
              if (mahasiswa) {
                mahasiswaData.push({
                    nama: mahasiswa.nama_mahasiswa,
                    nim: mahasiswa.nim
                  });
                console.log(`Nama Mahasiswa: ${mahasiswa.nama_mahasiswa}, NIM: ${mahasiswa.nim}`);
              } else {
                console.log(`Mahasiswa dengan NIM ${result.nim} tidak ditemukan.`);
              }
            }
          } else {
            console.log("Tidak ada data bimbingan yang memenuhi kriteria.");
          }
          console.log("nama",mahasiswaData);
        if (!bimbingan) {
            res.status(404).json({
                message: 'tidak ada mahasiswa yang meminta request'
            })
        }
        res.status(200).json({
            bimbingan: bimbingan,
            mahasiswa:mahasiswaData
        })
    } catch (error) {
        console.error('Terdapat masalah: ', error)
        res.status(500).json({
            message: 'Terdapat masalah'
        })
    }
}

// controller menampilkan semua request dosbing
controller.tampilDetailRequest = async (req, res) => {
    try {
        const nip = req.user.nomorinduk
        const nimMahasiswa = req.params.nimMahasiswa
        const bimbingan = await models.tugasAkhir.findOne({
            where: {
                nim: nimMahasiswa
            },
            attributes: ['nim', 'judul', 'detail_ide']
        })
        if (!bimbingan) {
            res.status(404).json({
                message: 'gagal mengambil data mahasiswa tersebut'
            })
        }
        res.status(200).json({
            bimbingan: bimbingan
        })
    } catch (error) {
        console.error('Terdapat masalah: ', error)
        res.status(500).json({
            message: 'Terdapat masalah'
        })
    }
}

// acc request dosbing
controller.accRequestDosbing = async(req,res)=>{
    try {
        const nip = req.user.nomorinduk
        const nimMahasiswa = req.params.nimMahasiswa
        const request = await models.tugasAkhir.findOne({
            where:{
                nim: nimMahasiswa
            }
        })
        
        await models.tugasAkhir.update({
            status_judul: 'accept',

        },    {where:{
                nim: nimMahasiswa
            }
        })
        const dosen = await models.dosen.findOne({
            where:{
                nip: request.id_dosbing
            }
        })
        const kuota = dosen.kuota_dosbing -1
        
        await models.dosen.update({
            kuota_dosbing: kuota

        },    {where:{
                nip: request.id_dosbing
            }
        })
        if(!request){
            res.status(400).json({
                message: 'terdapat masalah dalam pengambilan'
            })
        }
        
        res.status(200).json({
            message: 'request telah disetujui'
        })
    } catch (error) {
        console.error('terdapat masalah : ', error)
        res.status(400).json({
            message: 'Terdapat masalah'
        })
    }
}

// reject request dosbing
controller.rejectRequestDosbing = async(req,res)=>{
    try {
        const nimMahasiswa = req.params.nimMahasiswa
        const request = await models.tugasAkhir.update({
            status_judul: 'reject'
        },    {where:{
                nim: nimMahasiswa
            }
        })
        if(!request){
            res.status(400).json({
                message: 'terdapat masalah dalam pengambilan'
            })
        }
        res.status(200).json({
            message: 'request telah ditolak'
        })
        
    } catch (error) {
        console.error('terdapat masalah : ', error)
        res.status(400).json({
            message: 'Terdapat masalah'
        })
    }
}

// menampilkan semua mahasiswa bimbingan
controller.mahasiswaBimbingan = async (req, res) => {
    try {
        const nip = req.user.nomorinduk
        const ta = await models.tugasAkhir.findAll({
            where: {
               id_dosbing: nip,
               status_judul: "accept"
            }
        });

        
            let mahasiswaData = [];
            if(ta.length >0){

                for (const result of ta) {
                    const mahasiswa = await models.mahasiswa.findOne({
                        where: {
                            nim: result.nim
                        }
                    });
    
                    if (mahasiswa) {
                        mahasiswaData.push({
                            nama: mahasiswa.nama_mahasiswa,
                            nim: mahasiswa.nim
                        })
                    }else{
                        console.log("data tidak ditemukan");
                    }
                }
            }else{
                console.log("tidak ada data yang memenuhi kriteria");
            }
            console.log("nama", mahasiswaData);
            res.status(200).json({
                mahasiswa:mahasiswaData,
                ta:ta
            })
    } catch (error) {
        console.error('Kesalahan:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan dalam mengambil data mahasiswa bimbingan.'
        });
    }
}

// progress mahasiswa bimbingan
controller.progressMabing = async (req, res) => {
    try {
        const id_ta = req.params.id_ta 
        console.log("pacah", id_ta);// Konversi ke angka dengan basis 10


        const ta = await models.detail_tugasAkhir.findAll({
            where: {
                id_ta: id_ta
            }
        })
        if(!ta){
            res.status(404).json({
                message: "error"
            })
        }

        res.status(200).json({
            progress: ta
        })
    } catch (error) {
        console.error('Kesalahan:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan dalam mengambil data progress mahasiswa bimbingan.'
        });
    }
}

// detail proposal mahasiswa bimbingan
controller.detailProgressMabing = async (req, res) => {
    try {
        const id_progress = req.params.id_progress
        const ta = await models.detail_tugasAkhir.findOne({
            where: {
                id_progress: id_progress
            }
        })
        if (ta) {
            const filePath = path.join(__dirname, '../uploads', ta.nama_file)
            res.sendFile(filePath)

        } else {
            res.status(404).json({
                message: 'tidak ditemukan'
            })
        }
    } catch (error) {
        console.error('Kesalahan:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan dalam mengambil data progress mahasiswa bimbingan.'
        });
    }
}

// controller untuk dosennya acc progress dari mahasiswa
controller.accProgressMabing = async (req, res) => {
    try {
        const id_progress = req.params.id_progress
        const {saran_masukan} = req.body
        const ta = await models.detail_tugasAkhir.findOne({
            where: {
                id_progress: id_progress
            }
        })
        console.log("saran", saran_masukan);
        if(!ta)  {
            res.status(404).json({
                message: 'tidak ditemukan'
            })
        }
        const acc = await models.detail_tugasAkhir.update({
            saran_masukan : saran_masukan,
            status_pengajuan: "accept"
        },{
            where:{
                id_progress: id_progress
            }
            
        })
        
    } catch (error) {
        console.error('Kesalahan:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan dalam mengambil data progress mahasiswa bimbingan.'
        });
    }
}



// controller untuk reject progress mahasiswa bimbingannya
controller.rejectProgressMabing = async (req, res) => {
    try {
        const id_progress = req.params.id_progress
        const {saran_masukan} = req.body
        const ta = await models.detail_tugasAkhir.findOne({
            where: {
                id_progress: id_progress
            }
        })
        console.log("saran", saran_masukan);
        if(!ta)  {
            res.status(404).json({
                message: 'tidak ditemukan'
            })
        }
        const acc = await models.detail_tugasAkhir.update({
            saran_masukan : saran_masukan,
            status_pengajuan: "reject"
        },{
            where:{
                id_progress: id_progress
            }
            
        })
    } catch (error) {
        console.error('Kesalahan:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan dalam mengambil data progress mahasiswa bimbingan.'
        });
    }
}

module.exports = controller