const express = require('express')
const server = express.Router()
const controller = require('../controllers/index.js')
const login = require('../middleware/login.js')
const upload = require('../middleware/upload.js')
const verifyToken = require('../middleware/login.js')

server.get('/dokumen', verifyToken, controller.doc.cekDokumen)
server.post('/upload', upload.single('pdfFile'), controller.doc.buatDokumen)

server.post('/editResources', verifyToken, controller.doc.tampilEditDokumen)
server.post('/editSources', verifyToken, controller.doc.editDokumen)
server.post('/deleteDocuments/:id', verifyToken, controller.doc.deleteDokumen)
server.get('/detailDocuments/:filename', verifyToken, controller.doc.detailDokumen)
server.get('/detailDocuments/:document_id', verifyToken, controller.doc.detailDokumen)
server.get('/resources',verifyToken, controller.doc.tampilAllDokumen)
server.get('/upresources',verifyToken, controller.doc.tampilBuatDokumen)
server.post('/upresources',verifyToken, controller.doc.buatDokumen)

server.get('/landing',  controller.user.landing)
server.post('/signup', controller.user.register)
server.get('/signup', controller.user.tampilRegister)
server.post('/login', controller.user.login)
server.get('/login', controller.user.tampilLogin)

module.exports = server