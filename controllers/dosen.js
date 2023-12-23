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
                status_judul: 'accept'
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
controller.progressMabing = async (req, res) => {
    try {
        const nimMahasiswa = req.params.nimMahasiswa

        const mahasiswa = await models.mahasiswa.findOne({
            where: {
                nim: nimMahasiswa
            }
        })
        const ta = await models.tugasAkhir.findOne({
            where: {
                nim: nimMahasiswa
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
controller.detailProgressMabing = async (req, res) => {
    try {
        const nimMahasiswa = req.params.nimMahasiswa
        const progress = req.params.progress
        const ta = await models.tugasAkhir.findOne({
            where: {
                nim: nimMahasiswa
            }
        })
        if (ta) {
            const filePath = path.join(__dirname, '../uploads', ta[progress])
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
        const nimMahasiswa = req.params.nimMahasiswa
        const progress = req.params.progress
        const ta = await models.tugasAkhir.findOne({
            where: {
                nim: nimMahasiswa
            }
        })
        if (ta) {
            if (progress === 'proposal') {
                if (ta.status_proposal === 'pengajuan') {
                    await models.tugasAkhir.update({
                        status_proposal: 'accept'
                    }, {
                        where: {
                            nim: nimMahasiswa
                        }
                    })
                    res.status(200).json({
                        message: 'proposal telah di acc'
                    })
                } else {
                    res.status(400).json({
                        message: 'maaf, ajukan ulang proposalnya'
                    })
                }
            } else if (progress === 'bab1') {
                if (ta.status_bab1 === 'pengajuan') {
                    await models.tugasAkhir.update({
                        status_bab1: 'accept'
                    }, {
                        where: {
                            nim: nimMahasiswa
                        }
                    })
                } else {
                    res.status(400).json({
                        message: 'maaf, ajukan ulang bab1nya'
                    })
                }
            } else if (progress === 'bab2') {
                if (ta.status_bab2 === 'pengajuan') {
                    await models.tugasAkhir.update({
                        status_bab2: 'accept'
                    }, {
                        where: {
                            nim: nimMahasiswa
                        }
                    })
                } else {
                    res.status(400).json({
                        message: 'maaf, ajukan ulang bab2nya'
                    })
                }
            } else if (progress === 'bab3') {
                if (ta.status_bab3 === 'pengajuan') {
                    await models.tugasAkhir.update({
                        status_bab3: 'accept'
                    }, {
                        where: {
                            nim: nimMahasiswa
                        }
                    })
                } else {
                    res.status(400).json({
                        message: 'maaf, ajukan ulang bab3nya'
                    })
                }
            } else if (progress === 'bab4') {
                if (ta.status_bab4 === 'pengajuan') {
                    await models.tugasAkhir.update({
                        status_bab4: 'accept'
                    }, {
                        where: {
                            nim: nimMahasiswa
                        }
                    })
                } else {
                    res.status(400).json({
                        message: 'maaf, ajukan ulang bab4nya'
                    })
                }
            } else if (progress === 'bab5') {
                if (ta.status_bab5 === 'pengajuan') {
                    await models.tugasAkhir.update({
                        status_bab5: 'accept'
                    }, {
                        where: {
                            nim: nimMahasiswa
                        }
                    })
                } else {
                    res.status(400).json({
                        message: 'maaf, ajukan ulang bab5nya'
                    })
                }
            } else if (progress === 'bab6') {
                if (ta.status_bab6 === 'pengajuan') {
                    await models.tugasAkhir.update({
                        status_bab6: 'accept'
                    }, {
                        where: {
                            nim: nimMahasiswa
                        }
                    })
                } else {
                    res.status(400).json({
                        message: 'maaf, ajukan ulang bab6nya'
                    })
                }
            }
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
        const nimMahasiswa = req.params.nimMahasiswa
        const progress = req.params.progress
        const ta = await models.tugasAkhir.findOne({
            where: {
                nim: nimMahasiswa
            }
        })
        if (ta) {
            if (progress === 'proposal') {
                if (ta.status_proposal === 'pengajuan') {
                    await models.tugasAkhir.update({
                        status_proposal: 'accept'
                    }, {
                        where: {
                            nim: nimMahasiswa
                        }
                    })
                    res.status(200).json({
                        message: 'proposal telah di acc'
                    })
                } else {
                    res.status(400).json({
                        message: 'maaf, ajukan ulang proposalnya'
                    })
                }
            } else if (progress === 'bab1') {
                if (ta.status_bab1 === 'pengajuan') {
                    await models.tugasAkhir.update({
                        status_bab1: 'accept'
                    }, {
                        where: {
                            nim: nimMahasiswa
                        }
                    })
                    res.status(200).json({
                        message: 'bab1 telah di acc'
                    })
                } else {
                    res.status(400).json({
                        message: 'maaf, ajukan ulang bab1nya'
                    })
                }
            } else if (progress === 'bab2') {
                if (ta.status_bab2 === 'pengajuan') {
                    await models.tugasAkhir.update({
                        status_bab2: 'accept'
                    }, {
                        where: {
                            nim: nimMahasiswa
                        }
                    })
                    res.status(200).json({
                        message: 'bab2 telah di acc'
                    })
                } else {
                    res.status(400).json({
                        message: 'maaf, ajukan ulang bab2nya'
                    })
                }
            } else if (progress === 'bab3') {
                if (ta.status_bab3 === 'pengajuan') {
                    await models.tugasAkhir.update({
                        status_bab3: 'accept'
                    }, {
                        where: {
                            nim: nimMahasiswa
                        }
                    })
                    res.status(200).json({
                        message: 'bab3 telah di acc'
                    })
                } else {
                    res.status(400).json({
                        message: 'maaf, ajukan ulang bab3nya'
                    })
                }
            } else if (progress === 'bab4') {
                if (ta.status_bab4 === 'pengajuan') {
                    await models.tugasAkhir.update({
                        status_bab4: 'accept'
                    }, {
                        where: {
                            nim: nimMahasiswa
                        }
                    })
                    res.status(200).json({
                        message: 'bab4 telah di acc'
                    })
                } else {
                    res.status(400).json({
                        message: 'maaf, ajukan ulang bab4nya'
                    })
                }
            } else if (progress === 'bab5') {
                if (ta.status_bab5 === 'pengajuan') {
                    await models.tugasAkhir.update({
                        status_bab5: 'accept'
                    }, {
                        where: {
                            nim: nimMahasiswa
                        }
                    })
                    res.status(200).json({
                        message: 'bab5 telah di acc'
                    })
                } else {
                    res.status(400).json({
                        message: 'maaf, ajukan ulang bab5nya'
                    })
                }
            } else if (progress === 'bab6') {
                if (ta.status_bab6 === 'pengajuan') {
                    await models.tugasAkhir.update({
                        status_bab6: 'accept'
                    }, {
                        where: {
                            nim: nimMahasiswa
                        }
                    })
                    res.status(200).json({
                        message: 'bab6 telah di acc'
                    })
                } else {
                    res.status(400).json({
                        message: 'maaf, ajukan ulang bab6nya'
                    })
                }
            }
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

// controller untuk reject progress mahasiswa bimbingannya
controller.rejectProgressMabing = async (req, res) => {
    try {
        const nimMahasiswa = req.params.nimMahasiswa
        const progress = req.params.progress
        const ta = await models.tugasAkhir.findOne({
            where: {
                nim: nimMahasiswa
            }
        })
        if (ta) {
            if (progress === 'proposal') {
                if (ta.status_proposal === 'pengajuan') {
                    await models.tugasAkhir.update({
                        status_proposal: 'reject'
                    }, {
                        where: {
                            nim: nimMahasiswa
                        }
                    })
                    res.status(200).json({
                        message: 'proposal telah di reject'
                    })
                } else {
                    res.status(400).json({
                        message: 'maaf, ajukan ulang proposalnya'
                    })
                }
            } else if (progress === 'bab1') {
                if (ta.status_bab1 === 'pengajuan') {
                    await models.tugasAkhir.update({
                        status_bab1: 'reject'
                    }, {
                        where: {
                            nim: nimMahasiswa
                        }
                    })
                    res.status(200).json({
                        message: 'bab1 telah di reject'
                    })
                } else {
                    res.status(400).json({
                        message: 'maaf, ajukan ulang bab1nya'
                    })
                }
            } else if (progress === 'bab2') {
                if (ta.status_bab2 === 'pengajuan') {
                    await models.tugasAkhir.update({
                        status_bab2: 'reject'
                    }, {
                        where: {
                            nim: nimMahasiswa
                        }
                    })
                    res.status(200).json({
                        message: 'bab2 telah di reject'
                    })
                } else {
                    res.status(400).json({
                        message: 'maaf, ajukan ulang bab2nya'
                    })
                }
            } else if (progress === 'bab3') {
                if (ta.status_bab3 === 'pengajuan') {
                    await models.tugasAkhir.update({
                        status_bab3: 'reject'
                    }, {
                        where: {
                            nim: nimMahasiswa
                        }
                    })
                    res.status(200).json({
                        message: 'bab3 telah di reject'
                    })
                } else {
                    res.status(400).json({
                        message: 'maaf, ajukan ulang bab3nya'
                    })
                }
            } else if (progress === 'bab4') {
                if (ta.status_bab4 === 'pengajuan') {
                    await models.tugasAkhir.update({
                        status_bab4: 'reject'
                    }, {
                        where: {
                            nim: nimMahasiswa
                        }
                    })
                    res.status(200).json({
                        message: 'bab4 telah di reject'
                    })
                } else {
                    res.status(400).json({
                        message: 'maaf, ajukan ulang bab4nya'
                    })
                }
            } else if (progress === 'bab5') {
                if (ta.status_bab5 === 'pengajuan') {
                    await models.tugasAkhir.update({
                        status_bab5: 'reject'
                    }, {
                        where: {
                            nim: nimMahasiswa
                        }
                    })
                    res.status(200).json({
                        message: 'bab5 telah di reject'
                    })
                } else {
                    res.status(400).json({
                        message: 'maaf, ajukan ulang bab5nya'
                    })
                }
            } else if (progress === 'bab6') {
                if (ta.status_bab6 === 'pengajuan') {
                    await models.tugasAkhir.update({
                        status_bab6: 'reject'
                    }, {
                        where: {
                            nim: nimMahasiswa
                        }
                    })
                    res.status(200).json({
                        message: 'bab6 telah di reject'
                    })
                } else {
                    res.status(400).json({
                        message: 'maaf, ajukan ulang bab6nya'
                    })
                }
            }
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

module.exports = controller