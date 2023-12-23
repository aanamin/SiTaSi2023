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


//tampil page progress TA page Mahasiswa
controller.tampilAllProgress = async (req, res) => {
    try {
        const nimMahasiswa = req.user.nomorinduk;

        const ta = await models.tugasAkhir.findAll({
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
controller.uploadProgress = async (req, res) => {

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
        console.log("ta dari ", ta.id_ta);
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
controller.tampilEditProgress = async (req, res) => {

    try {
        const nim = req.user.nomorinduk

        const jenisFile = req.params.jenisFile
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

        if (jenisFile === 'bab1') {
            // jika proposalnya sudah di acc maka tidak bisa diubah
            if (ta) {
                const status = ta.status_bab1;
                if (status === 'accept') {
                    return res.status(400).json({
                        message: 'maaf, dokumen ini sudah di acc'
                    })
                }
            }
        } else if (jenisFile === 'bab2') {
            if (ta) {
                const status = ta.status_bab2;
                if (status === 'accept') {
                    return res.status(400).json({
                        message: 'maaf, dokumen ini sudah di acc'
                    })
                }
            }
        } else if (jenisFile === 'bab3') {
            if (ta) {
                const status = ta.status_bab3;
                if (status === 'accept') {
                    return res.status(400).json({
                        message: 'maaf, dokumen ini sudah di acc'
                    })
                }
            }
        } else if (jenisFile === 'proposal') {
            if (proposal) {
                const status = ta.status_proposal;
                if (status === 'accept') {
                    return res.status(400).json({
                        message: 'maaf, dokumen ini sudah di acc'
                    })
                }
            }
        } else if (jenisFile === 'bab4') {
            if (ta) {
                const status = ta.status_bab4;
                if (status === 'accept') {
                    return res.status(400).json({
                        message: 'maaf, dokumen ini sudah di acc'
                    })
                }
            }
        } else if (jenisFile === 'bab5') {
            if (ta) {
                const status = ta.status_bab5;
                if (status === 'accept') {
                    return res.status(400).json({
                        message: 'maaf, dokumen ini sudah di acc'
                    })
                }
            }
        } else if (jenisFile === 'bab6') {
            if (ta) {
                const status = ta.status_bab6;
                if (status === 'accept') {
                    return res.status(400).json({
                        message: 'maaf, dokumen ini sudah di acc'
                    })
                }
            }
        }
        res.status(2000).json({
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
        const nim = req.user.nomorinduk
        const jenisFile = req.params.jenisFile
        const tugasAkhir = await models.tugasAkhir.findOne({
            where: {
                nim: nim
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
        const nim = req.user.nomorinduk;

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
        if (status !== 'accept') {
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
controller.tampilPengajuanSidang = async (req, res) => {

}
module.exports = controller