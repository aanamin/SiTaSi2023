const tugasAkhir = require('./tugasAkhir.js')
const user = require('./users.js')
const signature = require('./signature.js')
const dosen = require('./dosen.js')

const controller = {}

controller.tugasAkhir = tugasAkhir
controller.user = user
controller.signature = signature
controller.dosen = dosen

module.exports = controller