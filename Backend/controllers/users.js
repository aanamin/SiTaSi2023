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
const {
    propfind
} = require('../routes/user')

dotenv.config();
process.env.SECRET_TOKEN;

const controllers = {}

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

        });
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
        if (!nim.startsWith("211152")) {
            return res.status(400).json({
                msg: 'Anda bukan mahasiswa Sistem Informasi'
            });
        }


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
        res.status(200).json({
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
        const isdosen = await models.dosen.findOne({
            where: {
                nip: nomorinduk
            }
        });
        const isadmin = await models.admin.findOne({
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
                    nomorinduk
                }, process.env.SECRET_TOKEN);
                // const token = generateAccessToken({email: req.body.email})


                res.cookie("accessToken", token, {
                    httpOnly: true,
                    maxAge: 100 * 60 * 1000,
                })
                console.log("ini tokennya", token)
                res.status(200).json({
                    token: token,
                    msg: 'Login Berhasil',
                    user: req.session.user.type,
                    nomorinduk: req.session.user.id,
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
                    nomorinduk
                }, process.env.SECRET_TOKEN);
                // const token = generateAccessToken({email: req.body.email})


                res.cookie("accessToken", token, {
                    httpOnly: true,
                    maxAge: 100 * 60 * 1000,
                })
                res.status(200).json({
                    token: token,
                    msg: 'Login Berhasil',
                    user: req.session.user.type,
                    nomorinduk: req.session.user.id,
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
                    nomorinduk

                }, process.env.SECRET_TOKEN);
                // const token = generateAccessToken({email: req.body.email})


                res.cookie("accessToken", token, {
                    httpOnly: true,
                    maxAge: 100 * 60 * 1000,
                })
                res.status(200).json({
                    token: token,
                    msg: 'Login Berhasil',
                    user: req.session.user.type,
                    nomorinduk: req.session.user.id,
                    success: true
                });
            }
            if (password != isadmin.password) {

                return res.status(400).json({
                    message: 'Password Anda Salah'
                });

            }
        }else{
            return res.status(400).json({
                message: 'Anda salah memasukkan nomor induk'
            });
        }

    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: 'Login Tidak Berhasil'
        })
        return res.render('login')
    }
}

controllers.profil = async (req, res) => {
    try {
        if (req.headers.tipe.split(" ")[1] === 'dosen') {
            const nip = req.user.nomorinduk
            const profil = await models.dosen.findOne({
                where: {
                    nip: nip
                }
            })
            res.status(200).json({
                profil: profil
            })
        } else if (req.headers.tipe.split(" ")[1] === 'admin') {
            const niu = req.user.nomorinduk
            const profil = await models.admin.findOne({
                where: {
                    niu: niu
                }
            })
            res.status(200).json({
                profil: profil
            })
        } else if (req.headers.tipe.split(" ")[1] === 'mahasiswa') {
            const nim = req.user.nomorinduk
            const profil = await models.mahasiswa.findOne({
                where: {
                    nim: nim
                }
            })
            console.log("profilnya", profil);
            res.status(200).json({
                profil: profil
            })
        }
    } catch (error) {
        console.log(error)
    }
}

// editprofil
controllers.editprofildosen = async (req, res) => {
    try {
        const {
            jenisKelamin,
            nama,
            newPassword
        } = req.body
        console.log("pass baru: ", newPassword, "ini");
        const nipDosen = req.user.nomorinduk
        const dosenlama = await models.dosen.findOne({
            where: {
                nip: nipDosen
            }
        })
        if (!dosenlama) {
            res.status(404).json({
                message: 'maaf tidak ditemukan profilnya'
            })
        }
        if (newPassword === "") {
            const profilBaru = await models.dosen.update({
                jenis_kelamin: jenisKelamin,
                nama_dosen: nama,
            }, {
                where: {
                    nip: nipDosen
                }
            })
            return res.status(200).json({
                profilBaru: profilBaru,
                message: 'profil telah diperbarui'
            })
        } else {
            const profilBaru = await models.dosen.update({
                jenis_kelamin: jenisKelamin,
                nama_dosen: nama,
                password: newPassword
            }, {
                where: {
                    nip: nipDosen
                }
            })
            return res.status(200).json({
                profilBaru: profilBaru,
                message: 'profil telah diperbarui'
            })
        }
    } catch (error) {
        console.log(error)
    }
}

// edit profil mahasiswa
controllers.editprofilmahasiswa = async (req, res) => {
    try {
        const {
            jenisKelamin,
            nama,
            newPassword
        } = req.body
        const nimMahasiswa = req.user.nomorinduk
        const mahasiswalama = await models.mahasiswa.findOne({
            where: {
                nim: nimMahasiswa
            }
        })
        if (!mahasiswalama) {
            res.status(404).json({
                message: 'maaf tidak ditemukan profilnya'
            })
        }
        if (newPassword === "") {
            const profilBaru = await models.mahasiswa.update({
                jenis_kelamin: jenisKelamin,
                nama_mahasiswa: nama
            }, {
                where: {
                    nim: nimMahasiswa
                }
            })
            return res.status(200).json({
                profil: profilBaru,
                message: 'profil telah diperbarui'
            })
        } else {
            const profilBaru = await models.mahasiswa.update({
                jenis_kelamin: jenisKelamin,
                nama_mahasiswa: nama,
                password: newPassword
            }, {
                where: {
                    nim: nimMahasiswa
                }
            })
            return res.status(200).json({
                profil: profilBaru,
                message: 'profil telah diperbarui'
            })
        }
    } catch (error) {
        console.log(error)
    }
}

// edit profil admin
controllers.editprofiladmin = async (req, res) => {
    try {
        const {
            jenisKelamin,
            nama,
            newPassword
        } = req.body
        const niuAdmin = req.user.nomorinduk
        const adminlama = await models.admin.findOne({
            where: {
                niu: niuAdmin
            }
        })
        if (!adminlama) {
            res.status(404).json({
                message: 'maaf tidak ditemukan profilnya'
            })
        }
        if (newPassword === "") {
            const profilBaru = await models.admin.update({
                jenis_kelamin: jenisKelamin,
                nama_admin: nama
            }, {
                where: {
                    niu: niuAdmin
                }
            })
            res.status(200).json({
                profil: profilBaru,
                message: 'profil telah diperbarui'
            })
        } else {
            const profilBaru = await models.admin.update({
                jenis_kelamin: jenisKelamin,
                nama_admin: nama,
                password: newPassword
            }, {
                where: {
                    niu: niuAdmin
                }
            })
            return res.status(200).json({
                profil: profilBaru,
                message: 'profil telah diperbarui'
            })
        }
    } catch (error) {
        console.log(error)
    }
}
module.exports = controllers