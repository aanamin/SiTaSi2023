const dosen = require('../models/dosen')
const models = require('../models/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
// const fs = require('fs')
const {
    v4: uuidv4
} = require('uuid');
const admin = require('../models/admin')

dotenv.config();
process.env.SECRET_TOKEN;

const controllers = {}

controllers.tampilChangepw = async (req, res) => {
    res.render('changepw')
}
controllers.tampilLogin = async (req, res) => {
    res.render('login')
}
controllers.tampilRegister = async (req, res) => {
    res.render('signup')
}

controllers.mainpage = async (req, res) => {

    res.render('mainpage')
}

controllers.landing = async (req, res) => {
    res.render('landingpage')
}

controllers.logout = async (req, res) => {
    try {
        const userId = req.user.id
        await models.user.update({
            active: 0,
        }, {
            where: {
                id: userId
            }
        })
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    success: false,
                    msg: 'Cant logout',
                });
            }

            res.clearCookie('accessToken');

            res.render('login')
        });
    } catch (error) {
        console.log(error)
    }

}

controllers.upsignature = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await models.user.findOne({
            where: {
                id: userId
            }
        });


        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                message: 'Tidak ada file yang diunggah'
            });
        }

        const file = req.files.file;
        const fileExtension = file.name.split('.').pop();
        const fileName = `${userId}.${fileExtension}`;

        // Simpan file ke direktori yang diinginkan
        file.mv(`uploads/${fileName}`, async (err) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    message: 'Terjadi kesalahan saat mengunggah file'
                });
            }

            // Simpan informasi file ke database
            const uploadedFile = await models.user.update({
                sign_img: fileName
            }, {
                where: {
                    id: userId
                }
            });

            return res.status(200).json({
                message: 'File berhasil diunggah',
                file: uploadedFile,
                success: true
            });
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Terjadi kesalahan saat mengunggah file'
        });
    }
};

controllers.changepw = async (req, res) => {
    try {
        const {
            password,
            newpassword
        } = req.body
        const userId = req.user.id
        const user = await models.user.findOne({
            where: {
                id: userId
            }
        })
        if (password != user.password) {
            return res.status(403).json({
                message: 'masukkan password yang benar'
            })
        }
        await models.user.update({
            password: newpassword,
        }, {
            where: {
                id: userId
            }
        })
        return res.status(201).json({
            msg: "Password anda telah diperbarui",
        })
    } catch (error) {
        console.log(error)
    }

}

controllers.register = async (req, res) => {
    try {
        const {
            nama,
            nim,
            jenisKelamin,
            password
        } = req.body;


        const existingMahasiswa = await models.mahasiswa.findOne({
            where: {
                nim: nim
            }
        });
        if (existingMahasiswa) {
            return res.status(400).json({
                msg: 'Anda Sudah Memiliki Akun'
            });
        }

        await models.mahasiswa.create({
            nama_mahasiswa: nama,
            nim: nim,
            jenis_kelamin: jenisKelamin,
            password: password
        });
        res.json({
            msg: "Register Berhasil"
        });
    } catch (error) {
        console.log(error);
    }
}

function generateAccessToken(nomorinduk) {
    return jwt.sign(nomorinduk, process.env.SECRET_TOKEN, {
        expiresIn: '6000S'
    });
}
controllers.login = async (req, res) => {
    try {
        const {
            nomorinduk,
            password
        } = req.body


        const mahasiswa = await models.mahasiswa.findOne({
            where: {
                nim: nomorinduk
            }
        });
        const isdosen = await dosen.findOne({
            where: {
                nip: nomorinduk
            }
        });
        const isadmin = await admin.findOne({
            where: {
                niu: nomorinduk
            }

        })

        // jika yang login mahasiswa
        if (mahasiswa) {
            if (password == mahasiswa.password) {
                // res.status(200).json({ message: 'Autentikasi mahasiswa berhasil' });
                const nim = mahasiswa.nim
                if (!req.session.user) {
                    req.session.user = {};
                }

                req.session.user.id = nim
                req.session.user.type = 'mahasiswa'
                
                const token = generateAccessToken({
                    nim
                }, process.env.SECRET_TOKEN);
                // const token = generateAccessToken({email: req.body.email})


                res.cookie("accessToken", token, {
                    httpOnly: true,
                    maxAge: 100 * 60 * 1000,
                })
                res.status(200).json({
                    token: token,
                    msg: 'Login Berhasil',
                    success: true
                });
            }
            if (password != mahasiswa.password) {

                return res.status(400).json({
                    message: 'Password Anda Salah'
                });

            }

        } else if (isdosen) {
            if (password == isdosen.password) {
                // res.status(200).json({ message: 'Autentikasi isdosen berhasil' });
                const nip = isdosen.nip
                if (!req.session.user) {
                    req.session.user = {};
                }

                req.session.user.id = nip
                req.session.user.type = 'dosen'

                const token = generateAccessToken({
                    nip
                }, process.env.SECRET_TOKEN);
                // const token = generateAccessToken({email: req.body.email})


                res.cookie("accessToken", token, {
                    httpOnly: true,
                    maxAge: 100 * 60 * 1000,
                })
                res.status(200).json({
                    token: token,
                    msg: 'Login Berhasil',
                    success: true
                });
            }
            if (password != isdosen.password) {

                return res.status(400).json({
                    message: 'Password Anda Salah'
                });

            }
        } else if (isadmin) {
            if (password == isadmin.password) {
                // res.status(200).json({ message: 'Autentikasi isadmin berhasil' });
                const niu = isadmin.niu
                if (!req.session.user) {
                    req.session.user = {};
                }

                req.session.user.id = niu
                req.session.user.type = 'admin'
                const token = generateAccessToken({
                    niu
                }, process.env.SECRET_TOKEN);
                // const token = generateAccessToken({email: req.body.email})


                res.cookie("accessToken", token, {
                    httpOnly: true,
                    maxAge: 100 * 60 * 1000,
                })
                res.status(200).json({
                    token: token,
                    msg: 'Login Berhasil',
                    success: true
                });
            }
            if (password != isadmin.password) {

                return res.status(400).json({
                    message: 'Password Anda Salah'
                });

            }
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: 'Login Tidak Berhasil'
        })
        return res.render('login')
    }
}

controllers.profil = async(req,res)=>{
    try {
        if(req.session.type ==='dosen'){
            const nip = req.session.id
            const profil = await models.dosen.findOne({
                where:{
                    nip: nip
                }
            })
            res.status(200).json({
                profil: profil
            })
        }else if(req.session.type === 'admin'){
            const niu = req.session.id
            const profil = await models.dosen.findOne({
                where:{
                    niu: niu
                }
            })
            res.status(200).json({
                profil: profil
            })
        }else if(req.session.type ==='mahasiswa'){
            const nim = req.session.id
            const profil = await models.mahasiswa.findOne({
                where: {
                    nim:nim
                }
            })
            res.status(200).json({
                profil: profil
            })
        }
    } catch (error) {
        console.log(error)
    }
}

// editprofil
controllers.editprofildosen = async(req,res)=>{
    try {
        const { nip, jenisKelamin, password, nama} = req.body
        const nipDosen = req.session.user.id
        const dosenlama = await models.dosen.findOne({
            where: {
                nip: nipDosen
            }
        })
        if(!dosenlama){
            res.status(404).json({
                message: 'maaf tidak ditemukan profilnya'
            })
        }

        const profilBaru = await models.dosen.update({
            nip: nip,
            jenis_kelamin: jenisKelamin,
            nama_dosen: nama,
            password: password
        }, {
            where:{
                nip:nipDosen
            }
        })
        res.status(200).json({
            message: 'profil telah diperbarui'
        })
    } catch (error) {
        console.log(error)
    }
}

// edit profil mahasiswa
controllers.editprofilmahasiswa = async(req,res)=>{
    try {
        const { nim, jenisKelamin, password, nama} = req.body
        const nimMahasiswa = req.session.user.id
        const mahasiswalama = await models.mahasiswa.findOne({
            where: {
                nim: nimMahasiswa
            }
        })
        if(!mahasiswalama){
            res.status(404).json({
                message: 'maaf tidak ditemukan profilnya'
            })
        }

        const profilBaru = await models.mahasiswa.update({
            nim: nim,
            jenis_kelamin: jenisKelamin,
            nama_mahasiswa: nama,
            password: password
        }, {
            where:{
                nim:nimMahasiswa
            }
        })
        res.status(200).json({
            profil: profilBaru,
            message: 'profil telah diperbarui'
        })
    } catch (error) {
        console.log(error)
    }
}

// edit profil admin
controllers.editprofiladmin = async(req,res)=>{
    try {
        const { niu, jenisKelamin, password, nama} = req.body
        const niuAdmin = req.session.user.id
        const adminlama = await models.admin.findOne({
            where: {
                niu: niuAdmin
            }
        })
        if(!adminlama){
            res.status(404).json({
                message: 'maaf tidak ditemukan profilnya'
            })
        }

        const profilBaru = await models.admin.update({
            nim: niu,
            jenis_kelamin: jenisKelamin,
            nama_admin: nama,
            password: password
        }, {
            where:{
                nim:niuAdmin
            }
        })
        res.status(200).json({
            profil: profilBaru,
            message: 'profil telah diperbarui'
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports = controllers