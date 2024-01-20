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
const {
    tugasAkhir
} = require('.');
const { log } = require('console');


//tampil page progress TA page Mahasiswa
controller.tampilAllProgress = async (req, res) => {
    try {
        const nimMahasiswa = req.user.nomorinduk;

        const ta = await models.tugasAkhir.findOne({
            where: {
                nim: nimMahasiswa
            }
        })
        const progress = await models.detail_tugasAkhir.findAll({
            where: {
                id_ta: ta.id_ta
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
controller.kontrol_progressta = async (req, res) => {

    try {
        const nim = req.user.nomorinduk
        const {
            nama_progress,
            deskripsi_progress
        } = req.body

        const ta = await models.tugasAkhir.findOne({
            where: {
                nim: nim
            }
        })
        if(ta.status_judul != "accept"){
            return res.status(400).json({
                message: 'Maaf judul anda belum di acc'
            });
        }
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                message: 'Tidak ada file yang diunggah'
            });
        }

        const file = req.files.file;
        const fileExtension = file.name.split('.').pop();
        const currentDate = new Date();
        const currentDateStr = currentDate.toISOString().replace(/[^0-9]/g, ''); // Convert to string and remove non-numeric characters
        const fileName = `${nama_progress}${nim}${currentDateStr}.${fileExtension}`;

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

           const progress= await models.detail_tugasAkhir.create({

                id_ta: ta.id_ta,
                nama_progress: nama_progress,
                deskripsi_progress: deskripsi_progress,
                status_pengajuan: "pengajuan",
                nama_file: fileName,
                tanggal_pengajuan: currentDate

            })

            res.status(200).json({
                progress: progress,
                message: `${fileName} berhasil diupload`
            })
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to save file information'
        });
    }
}
controller.deleteProgress = async (req,res) =>{
    try {
        const nim = req.user.nomorinduk;
        const id_progress = req.params.id_progress
        console.log("id_progress", id_progress);
        const detailTA = await models.detail_tugasAkhir.findOne({
            where:{
                id_progress: id_progress
            }
        }) 
        if(detailTA.status_pengajuan!= "pengajuan"){
            res.status(400).json({
                message: "Maaf Pengajuan sudah diprogress"
            })
        }
        else {
            if(!detailTA){
                res.status(404).json({
                    message: "Maaf Progess tidak ditemukan"
                })
            }
            const filePath = path.join(__dirname, '..', 'uploads', detailTA.nama_file);
        
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Gagal menghapus file:', err);
                }
            });
            // Proses penghapusan dokumen berdasarkan ID yang diterima
            const hapusDetail = await models.detail_tugasAkhir.destroy({
                where:{
                    id_progress: id_progress
                }
            })
            if(!hapusDetail){
                res.status(400).json({
                    message: "gagal menghapus progres"
                })
            }
            res.status(200).json({
                message:"Berhasil Dihapus"
                
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "error"
        })
        console.log("error", error);
    }
}

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
        const nimMahasiswa = req.user.nomorinduk
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

        console.log("berapa :", idDosbing)
        const currentDate = new Date();
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

controller.statusdosbing = async (req, res) => {
    try {
        const nimMahasiswa = req.user.nomorinduk
        const status = await models.tugasAkhir.findOne({
            where: {
                nim: nimMahasiswa
            }
        })
        if (status) {
            const namaDosen = await models.dosen.findOne({
                where: {
                    nip: status.id_dosbing
                },
                attributes: ['nama_dosen']
            })
            res.status(200).json({
                status: status,
                namaDosen: namaDosen
            })
        }
    } catch (error) {
        console.error('Terdapat Error Pada: ', error)
        res.status(500).json({
            message: 'terjadi kesalahan dalam menampilkan status dosbing'
        })
    }
}


controller.tampilSemuaProgress = async (req, res) => {
    try {
        const nim = req.user.nomorinduk
        const progress = await models.tugasAkhir.findOne({
            where:{
                nim: nim
            }
        })
        const ta = await models.detail_tugasAkhir.findAll({
            where: {
                id_ta: progress.id_ta
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

//tampil buat progress
controller.tampilBuatProgress = async (req, res) => {
    try {
        const nim = req.user.nomorinduk
        const jenisFile = req.params.jenisFile
        const tugasAkhir = await models.tugasAkhir.findOne({
            where: {
                nim: nim
            }
        })

        if (jenisFile === 'proposal' || jenisFile === 'bab1' || jenisFile === 'bab2' || jenisFile === 'bab3') {
            if (tugasAkhir.status !== 'judul') {
                return res.status(403).json({
                    message: 'Submit judul terlebih dahulu'
                });
            }
        } else if (jenisFile === 'bab4') {
            if (tugasAkhir.status !== 'proposal') {
                return res.status(403).json({
                    message: 'Submit proposal terlebih dahulu atau tunggu proposal di acc'
                });
            }
        } else if (jenisFile === 'bab5') {
            if (tugasAkhir.status !== 'bab4') {
                return res.status(403).json({
                    message: 'Submit bab4 terlebih dahulu'
                })
            }
        } else if (jenisFile === 'bab6') {
            if (tugasAkhir.status !== 'bab4') {
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






// view dokumen
controller.detailDokumen = async (req, res) => {
    const {
        jenisFile
    } = req.params;
    const nim = req.user.nomorinduk
    const tugasAkhir = await models.tugasAkhir.findOne({
        where: {
            nim: nim
        }
    })
    const filePath = path.join(__dirname, '../uploads', tugasAkhir[jenisFile]);

    res.sendFile(filePath);
}


// controller.tampilSemhas = async (req, res) => {
//     try {
//         const nimMahasiswa = req.user.nomorinduk
//         const semhas = await models.tugasAkhir.findOne({
//             where: {
//                 nim: nimMahasiswa
//             }
//         })
//         if (!semhas) {
//             res.status(404).json({
//                 message: 'maaf, silahkan upload progress terlebih dahulu'
//             })
//         }
//         res.status(200).json({
//             semhas: semhas
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: 'terjadi masalah'
//         })
//     }
// }

// // untuk menampilkan pengajuan semhas
// controller.tampilPengajuanSemhas = async (req, res) => {
//     try {
//         const nimMahasiswa = req.user.nomorinduk
//         const semhas = await models.tugasAkhir.findOne({
//             where: {
//                 nim: nimMahasiswa
//             }
//         })
//         if (!semhas) {
//             res.status(404).json({
//                 message: 'maaf, silahkan upload progress terlebih dahulu'
//             })
//         }
//         if (semhas.status_bab6 !== 'accept') {
//             res.status(401).json({
//                 message: 'Maaf silahkan selesaikan TA anda terlebih dahulu'
//             })
//         }
//         res.status(200).json({
//             semhas: semhas
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: 'terjadi masalah'
//         })
//     }
// }

// // menyimpan hasil pengajuan semhas
// controller.pengajuanSemhas = async (req, res) => {
//     try {
//         const nim = req.user.nomorinduk

//         if (!req.files.formulir || Object.keys(req.files.formulir).length === 0) {
//             return res.status(400).json({
//                 message: 'Tidak ada file yang diunggah'
//             });
//         }
//         if (!req.files.fullta || Object.keys(req.files.fullta).length === 0) {
//             return res.status(400).json({
//                 message: 'Tidak ada file yang diunggah'
//             });
//         }

//         const formulir = req.files.formulir;
//         const fileExtension = formulir.name.split('.').pop();
//         const fileName = `formulirSemhas${nim}.${fileExtension}`;

//         if (fs.existsSync(`uploads/${fileName}`)) {
//             // Jika ada, hapus file lama
//             fs.unlinkSync(`uploads/${fileName}`);
//         }

//         const fullta = req.files.fullta
//         const formatFile = fullta.name.split('.').pop();
//         const namaFile = `fullta${nim}.${formatFile}`;

//         if (fs.existsSync(`uploads/${namaFile}`)) {
//             // Jika ada, hapus file lama
//             fs.unlinkSync(`uploads/${namaFile}`);
//         }

//         formulir.mv(`uploads/${fileName}`, async (err) => {
//             if (err) {
//                 console.log(err)
//                 return res.status(500).json({
//                     message: 'Terjadi kesalahan saat mengunggah file'
//                 });
//             }


//         });

//         fullta.mv(`uploads/${namaFile}`, async (err) => {
//             if (err) {
//                 console.log(err)
//                 return res.status(500).json({
//                     message: 'Terjadi kesalahan saat mengunggah file'
//                 });
//             }

//         });
//         await models.tugasAkhir.update({
//             formulir_semhas: fileName,
//             full: namaFile
//         }, {
//             where: {
//                 nim: nim
//             }
//         })
//         res.status(200).json({
//             message: `${fileName} & ${namaFile} berhasil diupload`
//         })
//     } catch (error) {
//         console.log(error)
//         res.status.json({
//             message: error
//         })
//     }
// }

//tampil pengajuan sidang

module.exports = controller