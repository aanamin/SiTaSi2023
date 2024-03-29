const express = require('express')
const server = express.Router()
const controller = require('../controllers/index.js')
const login = require('../middleware/login.js')
const upload = require('../middleware/upload.js')
const verifyToken = require('../middleware/login.js')
const authorization = require('../middleware/authorization.js')

server.post('/upload', upload.single('pdfFile'), controller.tugasAkhir.kontrol_progressta)

// route untk awal
server.post('/signup', controller.user.register)
server.post('/login', controller.user.login)

//route untuk mahasiswa
server.get('/detailDocuments/:jenisFile', verifyToken, controller.tugasAkhir.detailDokumen)
server.get('/detailDocuments/:document_id', verifyToken, authorization('mahasiswa'),controller.tugasAkhir.detailDokumen)
server.get('/progress',verifyToken, authorization('mahasiswa'), controller.tugasAkhir.tampilAllProgress)
server.post('/upprogress',verifyToken,authorization('mahasiswa'), controller.tugasAkhir.kontrol_progressta)
server.get('/upprogress',verifyToken, authorization('mahasiswa'), controller.tugasAkhir.tampilBuatProgress)
server.get('/pilihdosbing',verifyToken,authorization('mahasiswa'), controller.tugasAkhir.tampilPilihDosbing)
// server.get('/pilihdosbing',authorization('mahasiswa'), controller.tugasAkhir.tampilPilihDosbing)
server.post('/pilihdosbing',verifyToken,authorization('mahasiswa'),controller.tugasAkhir.saveDosbing)
server.get('/tampilstatus',verifyToken,authorization('mahasiswa'),controller.tugasAkhir.statusdosbing)
server.post('/editprofilmahasiswa',verifyToken,authorization('mahasiswa'), controller.user.editprofilmahasiswa)
server.get('/profil',verifyToken,authorization('mahasiswa'), controller.user.profil)
server.delete('/deleteprogress/:id_progress',verifyToken,authorization('mahasiswa'), controller.tugasAkhir.deleteProgress)



// route untuk dosen
server.get('/mahasiswaBimbingan', verifyToken,authorization('dosen'), controller.dosen.mahasiswaBimbingan)
server.get('/progressMabing/:id_ta', verifyToken,authorization('dosen'), controller.dosen.progressMabing)
server.get('/progressFile/:id_progress', verifyToken,authorization('dosen'), controller.dosen.detailProgressMabing)
server.post('/accProgressMabing/:id_progress', verifyToken,authorization('dosen'), controller.dosen.accProgressMabing)
server.post('/rejectProgressMabing/:id_progress', verifyToken,authorization('dosen'), controller.dosen.rejectProgressMabing)
server.get('/requestdosbing', verifyToken,authorization('dosen'), controller.dosen.tampilRequestDosbing)
server.get('/requestdosbing/:nimMahasiswa', verifyToken,authorization('dosen'), controller.dosen.tampilDetailRequest)
server.post('/reject/requestdosbing/:nimMahasiswa', verifyToken,authorization('dosen'), controller.dosen.rejectRequestDosbing)
server.post('/accept/requestdosbing/:nimMahasiswa', verifyToken,authorization('dosen'), controller.dosen.accRequestDosbing)
server.post('/editprofildosen', verifyToken,authorization('dosen'), controller.user.editprofildosen)
server.get('/profildosen',verifyToken,authorization('dosen'), controller.user.profil)

// route untuk admin
server.get('/listdosen', verifyToken, authorization('admin'), controller.admin.tampilListDosen)
server.get('/tampilprofiladmin', verifyToken, authorization('admin'), controller.admin.tampilProfilAdmin)
server.post('/tambahakundosen', verifyToken, authorization('admin'), controller.admin.tambahAkunDosen)
server.post('/editprofiladmin', verifyToken, authorization('admin'), controller.user.editprofiladmin)
server.get('/profiladmin', verifyToken, authorization('admin'), controller.user.profil)
module.exports = server