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

//read dokumen
controller.cekDokumen = async (req, res) => {
    const accessToken = req.cookies.accessToken
    if (!accessToken)
        return res.status(200).json("tidak ada token")
    const payload = jwt.verify(accessToken, process.env.SECRET_TOKEN)

    const documents = await documents.findAll()
    res.render('resources', {
        documents
    });
    res.json(dokumen)
    if (!dokumen)
        return res.status(200).json("Tidak dapat ditemukan")
    // next()

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




// updatedokumen
controller.tampilEditDokumen = async (req, res) => {

    try {
        const userId = req.user.id
        const document_id = req.body.documents_id

        const dokumen = await models.documents.findOne({
            where: {
                id: document_id
            }
        })
        if (!dokumen) {
            return res.status(404).json({
                success: false,
                message: 'Tidak ada dokumen dengan id tersebut'
            })
        }
        const signature = await models.signature.findOne({
            where: {
                user_id: userId,
                document_id: document_id
            }
        })
        if (signature) {
            const status = signature.status;
            if (status === 'accept') {
                return res.status(400).json({
                    message: 'maaf, dokumen ini sudah ditanda tangani'
                })
            }
            if (status === 'reject') {
                return res.status(400).json({
                    message: 'maaf, dokumen ini sudah ditolak'
                })
            }

        }

        res.render('editUpresources', {
            dokumen: dokumen
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({

        })
    }
}

controller.editDokumen = async (req, res) => {
    try {
        const userId = req.user.id
        const idDoc = req.body.document_id
        const dokumen = await models.documents.findOne({
            where: {
                id: idDoc
            }
        })
        const filePath = path.join(__dirname, '..', 'uploads', dokumen.filename);

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
        const {
            name,
            namaFile,
            description,

        } = req.body;
        const file = req.files.file;
        const fileExtension = file.name.split('.').pop();
        const fileName = `${namaFile}${userId}.${fileExtension}`;

        file.mv(`uploads/${fileName}`, async (err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Terjadi kesalahan saat mengunggah file'
                });
            }
            const countDocs = await documents.count();
            let docId = `doc${countDocs + 1}`;
            const dokumenID = await models.documents.findOne({
                where: {
                    id: docId
                }
            })

            if (dokumenID) {
                docId = `doc${countDocs + 1}${name}`;

            }


            await models.documents.update({
                id: docId,
                name: name,
                filename: fileName,
                description: description
            }, {
                where: {
                    id: idDoc,
                    id_user: userId,
                }
            });



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
        // Proses penghapusan dokumen berdasarkan ID yang diterima
        await documents.destroy({
            where: {
                id
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