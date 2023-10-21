const tugasAkhir = require('./tugasAkhir.js')
const user = require('./users.js')
const dosen = require('./dosen.js')

const controller = {}

controller.tugasAkhir = tugasAkhir
controller.user = user
controller.dosen = dosen

module.exports = controller