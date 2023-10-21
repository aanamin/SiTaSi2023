const express = require('express')
const server = express.Router()
const controller = require('../controllers/index.js')
const login = require('../middleware/login.js')
const upload = require('../middleware/upload.js')
const verifyToken = require('../middleware/login.js')
const authorization = require('../middleware/authorization.js')

server.post('/upload', upload.single('pdfFile'), controller.tugasAkhir.uploadproposal)

//route untuk ta 
server.post('/editProposal', verifyToken,authorization('mahasiswa'), controller.tugasAkhir.tampilEditProposal)
server.post('/editproposal', verifyToken,authorization('mahasiswa'), controller.tugasAkhir.editProposal)
server.post('/deleteProposal', verifyToken,authorization('mahasiswa'), controller.tugasAkhir.deleteProposal)
server.get('/detailDocuments/:filename', verifyToken, controller.tugasAkhir.detailDokumen)
server.get('/detailDocuments/:document_id', verifyToken, authorization('mahasiswa'),controller.tugasAkhir.detailDokumen)
server.get('/progress',verifyToken, authorization('mahasiswa'), controller.tugasAkhir.tampilAllProgress)
server.get('/upproposal',verifyToken, authorization('mahasiswa'), controller.tugasAkhir.tampilBuatProposal)
server.post('/upproposal',verifyToken,authorization('mahasiswa'), controller.tugasAkhir.uploadproposal)

// route untk awal
server.get('/landing',  controller.user.landing)
server.post('/signup', controller.user.register)
server.get('/signup', controller.user.tampilRegister)
server.post('/login', controller.user.login)
server.get('/login', controller.user.tampilLogin)


// route untuk dosen
server.get('/mahasiswaBimbingan', verifyToken,authorization('dosen'), controller.dosen.mahasiswaBimbingan)
server.get('/progress/:nimMahasiswa', verifyToken,authorization('dosen'), controller.dosen.progressMabing)
server.get('/progress/:nimMahasiswa/:progress', verifyToken,authorization('dosen'), controller.dosen.detailProposalMabing)
module.exports = server