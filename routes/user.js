const express = require('express')
const server = express.Router()
const controller = require('../controllers/index.js')
const login = require('../middleware/login.js')
const upload = require('../middleware/upload.js')
const verifyToken = require('../middleware/login.js')
const authorization = require('../middleware/authorization.js')

server.post('/upload', upload.single('pdfFile'), controller.tugasAkhir.uploadProgress)

// route untk awal
server.post('/signup', controller.user.register)
server.post('/login', controller.user.login)

//route untuk mahasiswa
server.get('/editprogress/:jenisFile', verifyToken,authorization('mahasiswa'), controller.tugasAkhir.tampilEditProgress)
server.post('/editprogress/:jenisFile', verifyToken,authorization('mahasiswa'), controller.tugasAkhir.editprogress)
server.post('/deleteProposal', verifyToken,authorization('mahasiswa'), controller.tugasAkhir.deleteProposal)
server.post('/deleteBab1', verifyToken,authorization('mahasiswa'), controller.tugasAkhir.deleteBab1)
server.post('/deleteBab2', verifyToken,authorization('mahasiswa'), controller.tugasAkhir.deleteBab2)
server.post('/deletebab3', verifyToken,authorization('mahasiswa'), controller.tugasAkhir.deletebab3)
server.post('/deletebab4', verifyToken,authorization('mahasiswa'), controller.tugasAkhir.deletebab4)
server.post('/deletebab5', verifyToken,authorization('mahasiswa'), controller.tugasAkhir.deletebab5)
server.post('/deletebab6', verifyToken,authorization('mahasiswa'), controller.tugasAkhir.deletebab6)
server.get('/detailDocuments/:jenisFile', verifyToken, controller.tugasAkhir.detailDokumen)
server.get('/detailDocuments/:document_id', verifyToken, authorization('mahasiswa'),controller.tugasAkhir.detailDokumen)
server.get('/progress',verifyToken, authorization('mahasiswa'), controller.tugasAkhir.tampilAllProgress)
server.post('/upprogress/:jenisFile',verifyToken,authorization('mahasiswa'), controller.tugasAkhir.uploadProgress)
server.get('/upprogress/:jenisFile',verifyToken, authorization('mahasiswa'), controller.tugasAkhir.tampilBuatProgress)
server.get('/pilihdosbing',verifyToken,authorization('mahasiswa'), controller.tugasAkhir.tampilPilihDosbing)
server.post('/pilihdosbing',verifyToken,authorization('mahasiswa'), controller.tugasAkhir.saveDosbing)
server.post('/editprofil',verifyToken,authorization('mahasiswa'), controller.user.editprofilmahasiswa)



// route untuk dosen
server.get('/mahasiswaBimbingan', verifyToken,authorization('dosen'), controller.dosen.mahasiswaBimbingan)
server.get('/progress/:nimMahasiswa', verifyToken,authorization('dosen'), controller.dosen.progressMabing)
server.get('/progress/:nimMahasiswa/:progress', verifyToken,authorization('dosen'), controller.dosen.detailProgressMabing)
server.post('/acc/:nimMahasiswa/:progress', verifyToken,authorization('dosen'), controller.dosen.accProgressMabing)
server.post('/reject/:nimMahasiswa/:progress', verifyToken,authorization('dosen'), controller.dosen.rejectProgressMabing)
server.get('/requestdosbing', verifyToken,authorization('dosen'), controller.dosen.tampilRequestDosbing)
server.get('/requestdosbing/:nimMahasiswa', verifyToken,authorization('dosen'), controller.dosen.tampilDetailRequest)
server.post('/reject/requestdosbing/:nimMahasiswa', verifyToken,authorization('dosen'), controller.dosen.rejectRequestDosbing)
server.post('/accept/requestdosbing/:nimMahasiswa', verifyToken,authorization('dosen'), controller.dosen.accRequestDosbing)
server.post('/editprofil', verifyToken,authorization('dosen'), controller.user.editprofildosen)

// route untuk admin
server.get('/listdosen', verifyToken, authorization('admin'), controller.admin.tampilListDosen)
server.post('/tambahakundosen', verifyToken, authorization('admin'), controller.admin.tambahAkunDosen)
server.post('/editprofil', verifyToken, authorization('admin'), controller.user.editprofiladmin)
module.exports = server