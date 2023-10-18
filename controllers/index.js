const tugasAkhir = require('./tugasAkhir.js')
const user = require('./users.js')
const signature = require('./signature.js')

const controller = {}

controller.tugasAkhir = tugasAkhir
controller.user = user
controller.signature = signature

module.exports = controller