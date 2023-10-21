const express = require('express')
const server = express.Router()
const controller = require('../controllers/index.js')
const login = require('../middleware/login.js')
const upload = require('../middleware/upload.js')
const verifyToken = require('../middleware/login.js')
const authorization = require('../middleware/authorization.js')

server.post('/upload', upload.single('pdfFile'), controller.tugasAkhir.uploadproposal)

// route untk awal
server.get('/landing',  controller.user.landing)
server.post('/signup', controller.user.register)
server.get('/signup', controller.user.tampilRegister)
server.post('/login', controller.user.login)
server.get('/login', controller.user.tampilLogin)

//route untuk ta 
server.post('/editProposal', verifyToken,authorization('mahasiswa'), controller.tugasAkhir.tampilEditProposal)
server.post('/editproposal', verifyToken,authorization('mahasiswa'), controller.tugasAkhir.editProposal)
server.post('/deleteProposal', verifyToken,authorization('mahasiswa'), controller.tugasAkhir.deleteProposal)
server.get('/detailDocuments/:filename', verifyToken, controller.tugasAkhir.detailDokumen)
server.get('/detailDocuments/:document_id', verifyToken, authorization('mahasiswa'),controller.tugasAkhir.detailDokumen)
server.get('/progress',verifyToken, authorization('mahasiswa'), controller.tugasAkhir.tampilAllProgress)
server.get('/upproposal',verifyToken, authorization('mahasiswa'), controller.tugasAkhir.tampilBuatProposal)
server.post('/upproposal',verifyToken,authorization('mahasiswa'), controller.tugasAkhir.uploadproposal)
server.get('/upbab1',verifyToken, authorization('mahasiswa'), controller.tugasAkhir.tampilBuatBab1)
server.post('/upbab1',verifyToken,authorization('mahasiswa'), controller.tugasAkhir.uploadbab1)
server.get('/upbab2',verifyToken, authorization('mahasiswa'), controller.tugasAkhir.tampilBuatBab2)
server.post('/upbab2',verifyToken,authorization('mahasiswa'), controller.tugasAkhir.uploadbab2)
server.get('/upbab3',verifyToken, authorization('mahasiswa'), controller.tugasAkhir.tampilBuatBab3)
server.post('/upbab3',verifyToken,authorization('mahasiswa'), controller.tugasAkhir.uploadbab3)
server.get('/upbab4',verifyToken, authorization('mahasiswa'), controller.tugasAkhir.tampilBuatBab4)
server.post('/upbab4',verifyToken,authorization('mahasiswa'), controller.tugasAkhir.uploadbab4)
server.get('/upbab5',verifyToken, authorization('mahasiswa'), controller.tugasAkhir.tampilBuatbab5)
server.post('/upbab5',verifyToken,authorization('mahasiswa'), controller.tugasAkhir.uploadbab5)
server.get('/upbab6',verifyToken, authorization('mahasiswa'), controller.tugasAkhir.tampilBuatbab6)
server.post('/upbab6',verifyToken,authorization('mahasiswa'), controller.tugasAkhir.uploadbab6)

// route untuk dosen
server.get('/mahasiswaBimbingan', verifyToken,authorization('dosen'), controller.dosen.mahasiswaBimbingan)
server.get('/progress/:nimMahasiswa', verifyToken,authorization('dosen'), controller.dosen.progressMabing)
server.get('/progress/:nimMahasiswa/:progress', verifyToken,authorization('dosen'), controller.dosen.detailProposalMabing)
module.exports = server