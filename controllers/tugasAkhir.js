// const { now } = require('sequelize/types/utils');
const {
    or,
    where
} = require('sequelize');
const Sequelize = require('sequelize');
const tugasAkhir = require('../models/tugasAkhir');
const models = require('../models/index');
const controller = {}
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const fs = require('fs');
const {
    Op
} = require("sequelize");


//tampil page progress TA page Mahasiswa
controller.tampilAllProgress = async (req, res) => {
    try {
        const nimMahasiswa = req.session.user.id;
        console.log('NIM Mahasiswa:', nimMahasiswa);

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

//upload dokumen 
//upload proposal
controller.uploadproposal = async (req, res) => {

    try {
        const nim = req.session.user.id
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                message: 'Tidak ada file yang diunggah'
            });
        }
        const nama ='proposal'
        const file = req.files.file;
        const fileExtension = file.name.split('.').pop();
        const fileName = `${nama}${nim}.${fileExtension}`;

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
            await models.tugasAkhir.update({
                
                proposal : fileName,
                tanggal_proposal: currentDate,
                status_proposal: 'pengajuan'
            }, {
                where: {
                    nim: nim,
                }
            })
            res.redirect('resources')
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to save file information'
        });
    }
}

// upload bab1
controller.uploadbab1 = async (req, res) => {

    try {
        const nim = req.session.user.id
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                message: 'Tidak ada file yang diunggah'
            });
        }
        const nama ='bab1'
        const file = req.files.file;
        const fileExtension = file.name.split('.').pop();
        const fileName = `${nama}${nim}.${fileExtension}`;

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
            await models.tugasAkhir.update({
                
                bab1 : fileName,
                tanggal_bab1: currentDate,
                status_bab1: 'pengajuan'
            }, {
                where: {
                    nim: nim,
                }
            })
            res.redirect('resources')
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to save file information'
        });
    }
}

//  upload bab2
controller.uploadbab2 = async (req, res) => {

    try {
        const nim = req.session.user.id
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                message: 'Tidak ada file yang diunggah'
            });
        }
        const nama ='bab2'
        const file = req.files.file;
        const fileExtension = file.name.split('.').pop();
        const fileName = `${nama}${nim}.${fileExtension}`;

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
            await models.tugasAkhir.update({
                
                bab2 : fileName,
                tanggal_bab2: currentDate,
                status_bab2: 'pengajuan'
            }, {
                where: {
                    nim: nim,
                }
            })
            res.redirect('resources')
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to save file information'
        });
    }
}


controller.uploadbab3 = async (req, res) => {

    try {
        const nim = req.session.user.id
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                message: 'Tidak ada file yang diunggah'
            });
        }
        const nama ='bab3'
        const file = req.files.file;
        const fileExtension = file.name.split('.').pop();
        const fileName = `${nama}${nim}.${fileExtension}`;

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
            await models.tugasAkhir.update({
                
                bab3 : fileName,
                tanggal_bab3: currentDate,
                status_bab3: 'pengajuan'
            }, {
                where: {
                    nim: nim,
                }
            })
            res.redirect('resources')
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to save file information'
        });
    }
}

//  upload bab4
controller.uploadbab4 = async (req, res) => {

    try {
        const nim = req.session.user.id
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                message: 'Tidak ada file yang diunggah'
            });
        }
        const nama ='bab4'
        const file = req.files.file;
        const fileExtension = file.name.split('.').pop();
        const fileName = `${nama}${nim}.${fileExtension}`;

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
            await models.tugasAkhir.update({
                
                bab4 : fileName,
                tanggal_bab4: currentDate,
                status_bab4: 'pengajuan'
            }, {
                where: {
                    nim: nim,
                }
            })
            res.redirect('resources')
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to save file information'
        });
    }
}
//  upload bab5
controller.uploadbab5 = async (req, res) => {

    try {
        const nim = req.session.user.id
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                message: 'Tidak ada file yang diunggah'
            });
        }
        const nama ='bab5'
        const file = req.files.file;
        const fileExtension = file.name.split('.').pop();
        const fileName = `${nama}${nim}.${fileExtension}`;

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
            await models.tugasAkhir.update({
                
                bab5 : fileName,
                tanggal_bab5: currentDate,
                status_bab5: 'pengajuan'
            }, {
                where: {
                    nim: nim,
                }
            })
            res.redirect('resources')
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to save file information'
        });
    }
}

//  upload bab6
controller.uploadbab6 = async (req, res) => {

    try {
        const nim = req.session.user.id
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                message: 'Tidak ada file yang diunggah'
            });
        }
        const nama ='bab6'
        const file = req.files.file;
        const fileExtension = file.name.split('.').pop();
        const fileName = `${nama}${nim}.${fileExtension}`;

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
            await models.tugasAkhir.update({
                
                bab6 : fileName,
                tanggal_bab6: currentDate,
                status_bab6: 'pengajuan'
            }, {
                where: {
                    nim: nim,
                }
            })
            res.redirect('resources')
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to save file information'
        });
    }
}



//tampil buat dokumen
controller.tampilBuatDokumen = async (req, res) => {
    try {

        const userId = req.user.id
        const userProfile = await user.findOne({
            where: {
                id: userId
            }
        })
        if (!userProfile) {
            return res.status(404).json({
                message: 'Profil pengguna tidak ditemukan.'
            });
        }

        res.render('upresources', {
            user: userProfile
        });
    } catch (error) {
        console.log(error)
    }
}


// updateProposal
controller.tampilEditProposal = async (req, res) => {

    try {
        const nim = req.session.user.id

        const proposal = await models.tugasAkhir.findOne({
            where: {
                nim: nim
            }
        })
        if (!proposal) {
            return res.status(404).json({
                success: false,
                message: 'Tidak ada dokumen dengan id tersebut'
            })
        }

        // jika proposalnya sudah di acc maka tidak bisa diubah
        if (proposal) {
            const status = proposal.status_proposal;
            if (status === 'accept') {
                return res.status(400).json({
                    message: 'maaf, dokumen ini sudah di acc'
                })
            }
        }
        res.render('editUpresources', {
            proposal: proposal
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({

        })
    }
}

controller.editProposal = async (req, res) => {
    try {
        const nim = req.session.user.id
        const proposal = req.params.document_id
        const tugasAkhir = await models.tugasAkhir.findOne({
            where: {
                proposal: proposal
            }
        })
        const filePath = path.join(__dirname, '..', 'uploads', tugasAkhir.proposal);

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
        const nama = 'proposal'
        const file = req.files.file;
        const fileExtension = file.name.split('.').pop();
        const fileName = `${nama}${nim}.${fileExtension}`;

        file.mv(`uploads/${fileName}`, async (err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Terjadi kesalahan saat mengunggah file'
                });
            }

            const currentDate = Sequelize.literal('CURRENT_TIMESTAMP')
            await models.tugasAkhir.update({
                
                proposal : fileName,
                tanggal_proposal: currentDate,
                status_proposal: 'pengajuan'
            }, {
                where: {
                    nim: nim,
                }
            })
            res.redirect('resources')
        });

    } catch (error) {
        console.log(error)
    }
}


// updateBAB1
controller.tampilEditBab1 = async (req, res) => {

    try {
        const nim = req.session.user.id

        const bab1 = await models.tugasAkhir.findOne({
            where: {
                nim: nim
            }
        })
        if (!bab1) {
            return res.status(404).json({
                success: false,
                message: 'Tidak ada dokumen dengan id tersebut'
            })
        }

        // jika bab1nya sudah di acc maka tidak bisa diubah
        if (bab1) {
            const status = bab1.status_bab1;
            if (status === 'accept') {
                return res.status(400).json({
                    message: 'maaf, dokumen ini sudah di acc'
                })
            }
        }
        res.render('editUpresources', {
            bab1: bab1
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({

        })
    }
}

controller.editbab1 = async (req, res) => {
    try {
        const nim = req.session.user.id
        const tugasAkhir = await models.tugasAkhir.findOne({
            where: {
                nim: nim
            }
        })
        const filePath = path.join(__dirname, '..', 'uploads', tugasAkhir.bab1);

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
        const nama = 'bab1'
        const file = req.files.file;
        const fileExtension = file.name.split('.').pop();
        const fileName = `${nama}${nim}.${fileExtension}`;

        file.mv(`uploads/${fileName}`, async (err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Terjadi kesalahan saat mengunggah file'
                });
            }

            const currentDate = Sequelize.literal('CURRENT_TIMESTAMP')
            await models.tugasAkhir.update({
                bab1 : fileName,
                tanggal_bab1: currentDate,
                status_bab1: 'pengajuan'
            }, {
                where: {
                    nim: nim,
                }
            })
            res.redirect('resources')
        });

    } catch (error) {
        console.log(error)
    }
}

// updateBAB2
controller.tampilEditbab2 = async (req, res) => {

    try {
        const nim = req.session.user.id

        const bab2 = await models.tugasAkhir.findOne({
            where: {
                nim: nim
            }
        })
        if (!bab2) {
            return res.status(404).json({
                success: false,
                message: 'Tidak ada dokumen dengan id tersebut'
            })
        }

        // jika bab2nya sudah di acc maka tidak bisa diubah
        if (bab2) {
            const status = bab2.status_bab2;
            if (status === 'accept') {
                return res.status(400).json({
                    message: 'maaf, dokumen ini sudah di acc'
                })
            }
        }
        res.render('editUpresources', {
            bab2: bab2
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({

        })
    }
}

controller.editbab2 = async (req, res) => {
    try {
        const nim = req.session.user.id
        const tugasAkhir = await models.tugasAkhir.findOne({
            where: {
                nim: nim
            }
        })
        const filePath = path.join(__dirname, '..', 'uploads', tugasAkhir.bab2);

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
        const nama = 'bab2'
        const file = req.files.file;
        const fileExtension = file.name.split('.').pop();
        const fileName = `${nama}${nim}.${fileExtension}`;

        file.mv(`uploads/${fileName}`, async (err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Terjadi kesalahan saat mengunggah file'
                });
            }

            const currentDate = Sequelize.literal('CURRENT_TIMESTAMP')
            await models.tugasAkhir.update({
                
                bab2 : fileName,
                tanggal_bab2: currentDate,
                status_bab2: 'pengajuan'
            }, {
                where: {
                    nim: nim,
                }
            })
            res.redirect('resources')
        });

    } catch (error) {
        console.log(error)
    }
}

// updatebab3
controller.tampilEditbab3 = async (req, res) => {

    try {
        const nim = req.session.user.id

        const bab3 = await models.tugasAkhir.findOne({
            where: {
                nim: nim
            }
        })
        if (!bab3) {
            return res.status(404).json({
                success: false,
                message: 'Tidak ada dokumen dengan id tersebut'
            })
        }

        // jika bab3nya sudah di acc maka tidak bisa diubah
        if (bab3) {
            const status = bab3.status_bab3;
            if (status === 'accept') {
                return res.status(400).json({
                    message: 'maaf, dokumen ini sudah di acc'
                })
            }
        }
        res.render('editUpresources', {
            bab3: bab3
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({

        })
    }
}

controller.editbab3 = async (req, res) => {
    try {
        const nim = req.session.user.id
        const tugasAkhir = await models.tugasAkhir.findOne({
            where: {
                nim: nim
            }
        })
        const filePath = path.join(__dirname, '..', 'uploads', tugasAkhir.bab3);

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
        const nama = 'bab3'
        const file = req.files.file;
        const fileExtension = file.name.split('.').pop();
        const fileName = `${nama}${nim}.${fileExtension}`;

        file.mv(`uploads/${fileName}`, async (err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Terjadi kesalahan saat mengunggah file'
                });
            }

            const currentDate = Sequelize.literal('CURRENT_TIMESTAMP')
            await models.tugasAkhir.update({
                
                bab3 : fileName,
                tanggal_bab3: currentDate,
                status_bab3: 'pengajuan'
            }, {
                where: {
                    nim: nim,
                }
            })
            res.redirect('resources')
        });

    } catch (error) {
        console.log(error)
    }
}

// updatebab4
controller.tampilEditbab4 = async (req, res) => {

    try {
        const nim = req.session.user.id

        const bab4 = await models.tugasAkhir.findOne({
            where: {
                nim: nim
            }
        })
        if (!bab4) {
            return res.status(404).json({
                success: false,
                message: 'Tidak ada dokumen dengan id tersebut'
            })
        }

        // jika bab4nya sudah di acc maka tidak bisa diubah
        if (bab4) {
            const status = bab4.status_bab4;
            if (status === 'accept') {
                return res.status(400).json({
                    message: 'maaf, dokumen ini sudah di acc'
                })
            }
        }
        res.render('editUpresources', {
            bab4: bab4
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({

        })
    }
}

controller.editbab4 = async (req, res) => {
    try {
        const nim = req.session.user.id
        const tugasAkhir = await models.tugasAkhir.findOne({
            where: {
                nim: nim
            }
        })
        const filePath = path.join(__dirname, '..', 'uploads', tugasAkhir.bab4);

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
        const nama = 'bab4'
        const file = req.files.file;
        const fileExtension = file.name.split('.').pop();
        const fileName = `${nama}${nim}.${fileExtension}`;

        file.mv(`uploads/${fileName}`, async (err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Terjadi kesalahan saat mengunggah file'
                });
            }

            const currentDate = Sequelize.literal('CURRENT_TIMESTAMP')
            await models.tugasAkhir.update({
                
                bab4 : fileName,
                tanggal_bab4: currentDate,
                status_bab4: 'pengajuan'
            }, {
                where: {
                    nim: nim,
                }
            })
            res.redirect('resources')
        });

    } catch (error) {
        console.log(error)
    }
}

// updatebab5
controller.tampilEditbab5 = async (req, res) => {

    try {
        const nim = req.session.user.id

        const bab5 = await models.tugasAkhir.findOne({
            where: {
                nim: nim
            }
        })
        if (!bab5) {
            return res.status(404).json({
                success: false,
                message: 'Tidak ada dokumen dengan id tersebut'
            })
        }

        // jika bab5nya sudah di acc maka tidak bisa diubah
        if (bab5) {
            const status = bab5.status_bab5;
            if (status === 'accept') {
                return res.status(400).json({
                    message: 'maaf, dokumen ini sudah di acc'
                })
            }
        }
        res.render('editUpresources', {
            bab5: bab5
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({

        })
    }
}

controller.editbab5 = async (req, res) => {
    try {
        const nim = req.session.user.id
        const tugasAkhir = await models.tugasAkhir.findOne({
            where: {
                nim: nim
            }
        })
        const filePath = path.join(__dirname, '..', 'uploads', tugasAkhir.bab5);

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
        const nama = 'bab5'
        const file = req.files.file;
        const fileExtension = file.name.split('.').pop();
        const fileName = `${nama}${nim}.${fileExtension}`;

        file.mv(`uploads/${fileName}`, async (err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Terjadi kesalahan saat mengunggah file'
                });
            }

            const currentDate = Sequelize.literal('CURRENT_TIMESTAMP')
            await models.tugasAkhir.update({
                
                bab5 : fileName,
                tanggal_bab5: currentDate,
                status_bab5: 'pengajuan'
            }, {
                where: {
                    nim: nim,
                }
            })
            res.redirect('resources')
        });

    } catch (error) {
        console.log(error)
    }
}

// updatebab6
controller.tampilEditbab6 = async (req, res) => {

    try {
        const nim = req.session.user.id

        const bab6 = await models.tugasAkhir.findOne({
            where: {
                nim: nim
            }
        })
        if (!bab6) {
            return res.status(404).json({
                success: false,
                message: 'Tidak ada dokumen dengan id tersebut'
            })
        }

        // jika bab6nya sudah di acc maka tidak bisa diubah
        if (bab6) {
            const status = bab6.status_bab6;
            if (status === 'accept') {
                return res.status(400).json({
                    message: 'maaf, dokumen ini sudah di acc'
                })
            }
        }
        res.render('editUpresources', {
            bab6: bab6
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({

        })
    }
}

controller.editbab6 = async (req, res) => {
    try {
        const nim = req.session.user.id
        const tugasAkhir = await models.tugasAkhir.findOne({
            where: {
                nim: nim
            }
        })
        const filePath = path.join(__dirname, '..', 'uploads', tugasAkhir.bab6);

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
        const nama = 'bab6'
        const file = req.files.file;
        const fileExtension = file.name.split('.').pop();
        const fileName = `${nama}${nim}.${fileExtension}`;

        file.mv(`uploads/${fileName}`, async (err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Terjadi kesalahan saat mengunggah file'
                });
            }

            const currentDate = Sequelize.literal('CURRENT_TIMESTAMP')
            await models.tugasAkhir.update({
                
                bab6 : fileName,
                tanggal_bab6: currentDate,
                status_bab6: 'pengajuan'
            }, {
                where: {
                    nim: nim,
                }
            })
            res.redirect('resources')
        });

    } catch (error) {
        console.log(error)
    }
}

// deletedokumen
controller.deleteDokumen = async (req, res) => {

    try {
        const id = req.params.id;

        const dokumen = await documents.findOne({
            where: {
                id
            }
        });
        if (!dokumen) {
            return res.status(404).json({
                pesan: 'Dokumen tidak ditemukan.'
            });
        }

        const filePath = path.join(__dirname, '..', 'uploads', dokumen.filename);

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Gagal menghapus file:', err);
            }
        });
      

        res.redirect('/resources');


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
        filename
    } = req.params;
    const filePath = path.join(__dirname, '../uploads', filename);

    res.sendFile(filePath);
}

// mencari dokumen
controller.findDokumen = async (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let filename = req.body.filename;
    let description = req.body.description;

    try {
        const dokumen = await documents.findAll({
            where: {
                [Op.or]: [{
                    id: {
                        [Op.substring]: id
                    }
                }, {
                    name: {
                        [Op.substring]: name
                    }
                }, {
                    filename: {
                        [Op.substring]: filename
                    }
                }, {
                    description: {
                        [Op.substring]: description
                    }
                }]
            }
        })
        return res.status(200).json(
            dokumen
        )
    } catch (err) {

    }
}

module.exports = controller