const express = require('express')
const server = express.Router()
const controller = require('../controllers/index.js')
const login = require('../middleware/login.js')
const upload = require('../middleware/upload.js')
const verifyToken = require('../middleware/login.js')
const authorization = require('../middleware/authorization.js')

server.post('/upload', upload.single('pdfFile'), controller.tugasAkhir.uploadProgress)

// route untk awal
server.get('/landing',  controller.user.landing)
server.post('/signup', controller.user.register)
server.get('/signup', controller.user.tampilRegister)
server.post('/login', controller.user.login)
server.get('/login', controller.user.tampilLogin)

//route untuk mahasiswa
server.post('/editProposal', verifyToken,authorization('mahasiswa'), controller.tugasAkhir.tampilEditProposal)
server.post('/editproposal', verifyToken,authorization('mahasiswa'), controller.tugasAkhir.editProposal)
server.post('/deleteProposal', verifyToken,authorization('mahasiswa'), controller.tugasAkhir.deleteProposal)
server.get('/detailDocuments/:filename', verifyToken, controller.tugasAkhir.detailDokumen)
server.get('/detailDocuments/:document_id', verifyToken, authorization('mahasiswa'),controller.tugasAkhir.detailDokumen)
server.get('/progress',verifyToken, authorization('mahasiswa'), controller.tugasAkhir.tampilAllProgress)
server.post('/upprogress/:jenisFile',verifyToken,authorization('mahasiswa'), controller.tugasAkhir.uploadProgress)
server.get('/upbab1',verifyToken, authorization('mahasiswa'), controller.tugasAkhir.tampilBuatProgress)
server.get('/pilihdosbing',verifyToken,authorization('mahasiswa'), controller.tugasAkhir.tampilPilihDosbing)
server.post('/pilihdosbing',verifyToken,authorization('mahasiswa'), controller.tugasAkhir.saveDosbing)


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
module.exports = server