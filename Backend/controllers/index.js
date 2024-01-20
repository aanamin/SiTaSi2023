const tugasAkhir = require('./tugasAkhir.js')
const user = require('./users.js')
const dosen = require('./dosen.js')
const admin = require('./admin.js')

const controller = {}

controller.tugasAkhir = tugasAkhir
controller.user = user
controller.dosen = dosen
controller.admin = admin

module.exports = controller