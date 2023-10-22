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
const { tugasAkhir } = require('.');


//tampil page progress TA page Mahasiswa
controller.tampilAllProgress = async (req, res) => {
    try {
        const nimMahasiswa = req.session.user.id;

        const progress = await models.tugasAkhir.findAll({
            where: {
                nim: nimMahasiswa
            }
        });

        if (!progress || progress.length === 0) {
            return res.status(404).json({
                message: 'Data progress tidak ditemukan.'
            });
        }

        res.status(200).json(progress);
    } catch (error) {
        console.error('Kesalahan:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan dalam mengambil data progress.'
        });
    }

};

// tampilin page pilih dosbing
controller.tampilPilihDosbing = async (req, res) => {
    try {
        // mengambil data dosen
        const dosenData = await models.dosen.findAll({
            where: {
                kuota_dosbing: {
                    [Op.gt]: 0
                }
            }
        });
        // menggunakan data dosen tersebut dengan mengirim dalam bentuk JSON
        res.status(200).json({
            dosenData: dosenData,
        });
    } catch (error) {
        console.error('Kesalahan:', error);
        res.status(500).json({
            message: 'Terjadi kesalahan dalam menampilkan halaman form.'
        });
    }
};

//controller untuk nyimpan hasil pemilihan dosbing
controller.saveDosbing = async (req, res) => {
    try {
        const nimMahasiswa = req.session.user.id
        const {
            idDosbing,
            judul,
            detailIde
        } = req.body
        if (!idDosbing || !judul || !detailIde) {
            return res.status(400).json({
                message: 'Harap isi semua Field'
            })
        }

        const currentDate = Sequelize.literal('CURRENT_TIMESTAMP')
        const dosbing = await models.tugasAkhir.create({
            nim: nimMahasiswa,
            id_dosbing: idDosbing,
            judul: judul,
            detail_ide: detailIde,
            tanggal_judul: currentDate,
            status_judul: 'pengajuan'
        })
        res.status(200).json({
            dosbing: dosbing
        })
    } catch (error) {
        console.error('Terdapat Error Pada: ', error)
        res.status(500).json({
            message: 'terjadi kesalahan dalam menyimpan dosbing'
        })
    }
}

//upload dokumen 
//upload proposal
controller.uploadProgress = async (req, res) => {

    try {
        const nim = req.session.user.id
        const jenisFile = req.params.jenisFile

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                message: 'Tidak ada file yang diunggah'
            });
        }

        const file = req.files.file;
        const fileExtension = file.name.split('.').pop();
        const fileName = `${jenisFile}${nim}.${fileExtension}`;

        if (fs.existsSync(`uploads/${fileName}`)) {
            // Jika ada, hapus file lama
            fs.unlinkSync(`uploads/${fileName}`);
        }
        file.mv(`uploads/${fileName}`, async (err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Terjadi kesalahan saat mengunggah file'
                });
            }

            const currentDate = Sequelize.literal('CURRENT_TIMESTAMP')
            if (jenisFile === 'proposal') {
                await models.tugasAkhir.update({

                    proposal: fileName,
                    tanggal_proposal: currentDate,
                    status_proposal: 'pengajuan'
                }, {
                    where: {
                        nim: nim,
                    }
                })
            } else if (jenisFile === 'bab1') {
                await models.tugasAkhir.update({

                    bab1: fileName,
                    tanggal_bab1: currentDate,
                    status_bab1: 'pengajuan'
                }, {
                    where: {
                        nim: nim,
                    }
                })
            } else if (jenisFile === 'bab2') {
                await models.tugasAkhir.update({

                    bab2: fileName,
                    tanggal_bab2: currentDate,
                    status_bab2: 'pengajuan'
                }, {
                    where: {
                        nim: nim,
                    }
                })
            } else if (jenisFile === 'bab3') {
                await models.tugasAkhir.update({

                    bab3: fileName,
                    tanggal_bab3: currentDate,
                    status_bab3: 'pengajuan'
                }, {
                    where: {
                        nim: nim,
                    }
                })
            } else if (jenisFile === 'bab4') {
                await models.tugasAkhir.update({

                    bab4: fileName,
                    tanggal_bab4: currentDate,
                    status_bab4: 'pengajuan'
                }, {
                    where: {
                        nim: nim,
                    }
                })
            } else if (jenisFile === 'bab5') {
                await models.tugasAkhir.update({

                    bab5: fileName,
                    tanggal_bab5: currentDate,
                    status_bab5: 'pengajuan'
                }, {
                    where: {
                        nim: nim,
                    }
                })
            } else if (jenisFile === 'bab6') {
                await models.tugasAkhir.update({

                    bab6: fileName,
                    tanggal_bab6: currentDate,
                    status_bab6: 'pengajuan'
                }, {
                    where: {
                        nim: nim,
                    }
                })
            }
        });
        res.status(200).json({
            progress: jenisFile,
            message: `${fileName} berhasil diupload`
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to save file information'
        });
    }
}


//tampil buat progress
controller.tampilBuatProgress = async (req, res) => {
    try {
        const nim = req.session.user.id
        const jenisFile = req.params.jenisFile
        const tugasAkhir = await models.tugasAkhir.findOne({
            where: {
                nim: nim
            }
        })
       
        if(jenisFile ==='proposal'||jenisFile==='bab1'||jenisFile==='bab2'||jenisFile==='bab3'){
            if (tugasAkhir.status !== 'judul') {
                return res.status(403).json({
                    message: 'Submit judul terlebih dahulu'
                });
            }
        }else if(jenisFile === 'bab4'){
            if (tugasAkhir.status !== 'proposal') {
                return res.status(403).json({
                    message: 'Submit proposal terlebih dahulu atau tunggu proposal di acc'
                });
            }
        }else if(jenisFile ==='bab5'){
            if(tugasAkhir.status !=='bab4'){
                return res.status(403).json({
                    message: 'Submit bab4 terlebih dahulu'
                })
            }
        }else if(jenisFile ==='bab6'){
            if(tugasAkhir.status !=='bab4'){
                return res.status(403).json({
                    message: 'Submit bab4 terlebih dahulu'
                })
            }
        }
        return res.status(200).json({
            tugasAkhir: tugasAkhir
        })
    } catch (error) {
        console.log(error)
    }
}

// updateProposal
controller.tampilEditProgress = async (req, res) => {

    try {
        const nim = req.session.user.id

        const jenisFile= req.params.jenisFile
        const ta = await models.tugasAkhir.findOne({
            where: {
                nim: nim
            }
        })
        if (!ta) {
            return res.status(404).json({
                success: false,
                message: 'Tidak ada dokumen dengan id tersebut'
            })
        }

        if(jenisFile ==='bab1'){
            // jika proposalnya sudah di acc maka tidak bisa diubah
            if (ta) {
                const status = ta.status_bab1;
                if (status === 'accept') {
                    return res.status(400).json({
                        message: 'maaf, dokumen ini sudah di acc'
                    })
                }
            }
        }else if(jenisFile ==='bab2'){
            if (ta) {
                const status = ta.status_bab2;
                if (status === 'accept') {
                    return res.status(400).json({
                        message: 'maaf, dokumen ini sudah di acc'
                    })
                }
            }
        }else if(jenisFile ==='bab3'){
            if (ta) {
                const status = ta.status_bab3;
                if (status === 'accept') {
                    return res.status(400).json({
                        message: 'maaf, dokumen ini sudah di acc'
                    })
                }
            }
        }else if(jenisFile ==='proposal'){
            if (proposal) {
                const status = ta.status_proposal;
                if (status === 'accept') {
                    return res.status(400).json({
                        message: 'maaf, dokumen ini sudah di acc'
                    })
                }
            }
        }else if(jenisFile ==='bab4'){
            if (ta) {
                const status = ta.status_bab4;
                if (status === 'accept') {
                    return res.status(400).json({
                        message: 'maaf, dokumen ini sudah di acc'
                    })
                }
            }
        }else if(jenisFile ==='bab5'){
            if (ta) {
                const status = ta.status_bab5;
                if (status === 'accept') {
                    return res.status(400).json({
                        message: 'maaf, dokumen ini sudah di acc'
                    })
                }
            }
        }else if(jenisFile ==='bab6'){
            if (ta) {
                const status = ta.status_bab6;
                if (status === 'accept') {
                    return res.status(400).json({
                        message: 'maaf, dokumen ini sudah di acc'
                    })
                }
            }
        }
        res.status(2000).json( {
            ta: ta
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({

        })
    }
}

controller.editprogress = async (req, res) => {
    try {
        const nim = req.session.user.id
        const jenisFile = req.params.jenisFile
        const tugasAkhir = await models.tugasAkhir.findOne({
            where: {
                nim:nim
            }
        })
        const filePath = path.join(__dirname, '..', 'uploads', `${jenisFile}${nim}.${fileExtension}`);

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Gagal menghapus file:', err);
            }
        });
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                message: 'Tidak ada file yang diunggah'
            });
        }
        const file = req.files.file;
        const fileExtension = file.name.split('.').pop();
        const fileName = `${jenisFile}${nim}.${fileExtension}`;

        file.mv(`uploads/${fileName}`, async (err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Terjadi kesalahan saat mengunggah file'
                });
            }

            const currentDate = Sequelize.literal('CURRENT_TIMESTAMP')
            if(jenisFile === 'proposal'){
                await models.tugasAkhir.update({
    
                    proposal: fileName,
                    tanggal_proposal: currentDate,
                    status_proposal: 'pengajuan'
                }, {
                    where: {
                        nim: nim,
                    }
                })
            }else if(jenisFile ==='bab1'){
                await models.tugasAkhir.update({
    
                    bab1: fileName,
                    tanggal_bab1: currentDate,
                    status_bab1: 'pengajuan'
                }, {
                    where: {
                        nim: nim,
                    }
                })
            }else if(jenisFile==='bab2'){
                await models.tugasAkhir.update({
    
                    bab2: fileName,
                    tanggal_bab2: currentDate,
                    status_bab2: 'pengajuan'
                }, {
                    where: {
                        nim: nim,
                    }
                })
            }else if(jenisFile ==='bab3'){
                await models.tugasAkhir.update({
    
                    bab3: fileName,
                    tanggal_bab3: currentDate,
                    status_bab3: 'pengajuan'
                }, {
                    where: {
                        nim: nim,
                    }
                })
            }else if(jenisFile ==='bab4'){
                await models.tugasAkhir.update({
    
                    bab4: fileName,
                    tanggal_bab4: currentDate,
                    status_bab4: 'pengajuan'
                }, {
                    where: {
                        nim: nim,
                    }
                })
            }else if(jenisFile==='bab5'){
                await models.tugasAkhir.update({
    
                    bab5: fileName,
                    tanggal_bab5: currentDate,
                    status_bab5: 'pengajuan'
                }, {
                    where: {
                        nim: nim,
                    }
                })
            }else if(jenisFile==='bab6'){
                await models.tugasAkhir.update({
    
                    bab6: fileName,
                    tanggal_bab6: currentDate,
                    status_bab6: 'pengajuan'
                }, {
                    where: {
                        nim: nim,
                    }
                })
            }
            res.statuss(200).json({
                tugasAkhir: tugasAkhir
            })
        });

    } catch (error) {
        console.log(error)
    }
}


// deletedokumen
controller.deleteProposal = async (req, res) => {

    try {
        const nim = req.session.user.id;

        const ta = await models.tugasAkhir.findOne({
            where: {
                nim: nim
            }
        });
        if (!ta) {
            return res.status(404).json({
                pesan: 'Dokumen tidak ditemukan.'
            });
        }

        const filePath = path.join(__dirname, '..', 'uploads', ta.proposal);
        const status = ta.status_proposal
        if(status !== 'accept'){
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Gagal menghapus file:', err);
                }
            });
            await models.tugasAkhir.update({
                proposal: null,
                status_proposal: null
            }, {
                where: {
                    nim: nim
                }
            })
        }

        return res.json({
            pesan: "berhasil menghapus data"
        })
    } catch (err) {
        console.log(err)
    }
}
controller.deleteBab1 = async (req, res) => {

    try {
        const nim = req.session.user.id;

        const ta = await models.tugasAkhir.findOne({
            where: {
                nim: nim
            }
        });
        if (!ta) {
            return res.status(404).json({
                pesan: 'Dokumen tidak ditemukan.'
            });
        }

        const filePath = path.join(__dirname, '..', 'uploads', ta.bab1);
        const status = ta.status_bab1
        if(status !== 'accept'){
            
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Gagal menghapus file:', err);
                }
            });
            await models.tugasAkhir.update({
                bab1: null,
                status_bab1: null
            }, {
                where: {
                    nim: nim
                }
            })
        }

        return res.json({
            pesan: "berhasil menghapus data"
        })
    } catch (err) {
        console.log(err)
    }
}

controller.deleteBab2 = async (req, res) => {

    try {
        const nim = req.session.user.id;

        const ta = await models.tugasAkhir.findOne({
            where: {
                nim: nim
            }
        });
        if (!ta) {
            return res.status(404).json({
                pesan: 'Dokumen tidak ditemukan.'
            });
        }

        const filePath = path.join(__dirname, '..', 'uploads', ta.bab2);
        const status = ta.status_bab2
        if(status !== 'accept'){
            
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Gagal menghapus file:', err);
                }
            });
            await models.tugasAkhir.update({
                bab2: null,
                status_bab2: null
            }, {
                where: {
                    nim: nim
                }
            })
        }

        return res.json({
            pesan: "berhasil menghapus data"
        })
    } catch (err) {
        console.log(err)
    }
}
controller.deletebab3 = async (req, res) => {

    try {
        const nim = req.session.user.id;

        const ta = await models.tugasAkhir.findOne({
            where: {
                nim: nim
            }
        });
        if (!ta) {
            return res.status(404).json({
                pesan: 'Dokumen tidak ditemukan.'
            });
        }

        const filePath = path.join(__dirname, '..', 'uploads', ta.bab3);
        const status = ta.status_bab3
        if(status !== 'accept'){
            
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Gagal menghapus file:', err);
                }
            });
            await models.tugasAkhir.update({
                bab3: null,
                status_bab3: null
            }, {
                where: {
                    nim: nim
                }
            })
        }

        return res.json({
            pesan: "berhasil menghapus data"
        })
    } catch (err) {
        console.log(err)
    }
}
controller.deletebab4 = async (req, res) => {

    try {
        const nim = req.session.user.id;

        const ta = await models.tugasAkhir.findOne({
            where: {
                nim: nim
            }
        });
        if (!ta) {
            return res.status(404).json({
                pesan: 'Dokumen tidak ditemukan.'
            });
        }

        const filePath = path.join(__dirname, '..', 'uploads', ta.bab4);
        const status = ta.status_bab4
        if(status !== 'accept'){
            
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Gagal menghapus file:', err);
                }
            });
            await models.tugasAkhir.update({
                bab4: null,
                status_bab4: null
            }, {
                where: {
                    nim: nim
                }
            })
        }

        return res.json({
            pesan: "berhasil menghapus data"
        })
    } catch (err) {
        console.log(err)
    }
}
controller.deletebab5 = async (req, res) => {

    try {
        const nim = req.session.user.id;

        const ta = await models.tugasAkhir.findOne({
            where: {
                nim: nim
            }
        });
        if (!ta) {
            return res.status(404).json({
                pesan: 'Dokumen tidak ditemukan.'
            });
        }

        const filePath = path.join(__dirname, '..', 'uploads', ta.bab5);
        const status = ta.status_bab5
        if(status !== 'accept'){
            
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Gagal menghapus file:', err);
                }
            });
            await models.tugasAkhir.update({
                bab5: null,
                status_bab5: null
            }, {
                where: {
                    nim: nim
                }
            })
        }

        return res.json({
            pesan: "berhasil menghapus data"
        })
    } catch (err) {
        console.log(err)
    }
}
controller.deletebab6 = async (req, res) => {

    try {
        const nim = req.session.user.id;

        const ta = await models.tugasAkhir.findOne({
            where: {
                nim: nim
            }
        });
        if (!ta) {
            return res.status(404).json({
                pesan: 'Dokumen tidak ditemukan.'
            });
        }

        const filePath = path.join(__dirname, '..', 'uploads', ta.bab6);
        const status = ta.status_bab6
        if(status !== 'accept'){
            
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Gagal menghapus file:', err);
                }
            });
            await models.tugasAkhir.update({
                bab6: null,
                status_bab6: null
            }, {
                where: {
                    nim: nim
                }
            })
        }

        return res.json({
            pesan: "berhasil menghapus data"
        })
    } catch (err) {
        console.log(err)
    }
}

// view dokumen
controller.detailDokumen = async (req, res) => {
    const {
        jenisFile
    } = req.params.jenisFile;
    const nim = req.session.user.id
    const tugasAkhir = await models.tugasAkhir.findOne({
        where:{
            nim:nim
        }
    })
    const filePath = path.join(__dirname, '../uploads', tugasAkhir[jenisFile] );

    res.sendFile(filePath);
}


module.exports = controller