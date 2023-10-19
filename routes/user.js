const express = require('express')
const server = express.Router()
const controller = require('../controllers/index.js')
const login = require('../middleware/login.js')
const upload = require('../middleware/upload.js')
const verifyToken = require('../middleware/login.js')

server.post('/upload', upload.single('pdfFile'), controller.tugasAkhir.uploadproposal)

//route untuk ta 
server.post('/editProposal', verifyToken, controller.tugasAkhir.tampilEditProposal)
server.post('/editproposal', verifyToken, controller.tugasAkhir.editProposal)
server.post('/deleteProposal', verifyToken, controller.tugasAkhir.deleteProposal)
server.get('/detailDocuments/:filename', verifyToken, controller.tugasAkhir.detailDokumen)
server.get('/detailDocuments/:document_id', verifyToken, controller.tugasAkhir.detailDokumen)
server.get('/progress',verifyToken, controller.tugasAkhir.tampilAllProgress)
server.get('/upproposal',verifyToken, controller.tugasAkhir.tampilBuatProposal)
server.post('/upproposal',verifyToken, controller.tugasAkhir.uploadproposal)

// route untk awal
server.get('/landing',  controller.user.landing)
server.post('/signup', controller.user.register)
server.get('/signup', controller.user.tampilRegister)
server.post('/login', controller.user.login)
server.get('/login', controller.user.tampilLogin)


// route untuk dosen
server.get('/mahasiswaBimbingan', verifyToken, controller.dosen.mahasiswaBimbingan)
module.exports = server