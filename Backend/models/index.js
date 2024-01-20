const db = require('../config/dbConfig.js')
const mahasiswa = require('./mahasiswa.js')
const tugasAkhir = require('./tugasAkhir.js')
const dosen = require('./dosen.js')
const admin = require('./admin.js')
const detail_tugasAkhir = require('./detail_tugasAkhir.js')

tugasAkhir.belongsTo(dosen, {as: 'dosbing', foreignKey: 'id_dosbing' });
dosen.hasMany(tugasAkhir, {as: 'dosbing', foreignKey: 'id_dosbing' });

tugasAkhir.belongsTo(mahasiswa, { foreignKey: 'nim' });
mahasiswa.hasMany(tugasAkhir, { foreignKey: 'nim' });

tugasAkhir.hasMany(detail_tugasAkhir, { foreignKey: 'id_ta' });
detail_tugasAkhir.belongsTo(tugasAkhir, { foreignKey: 'id_ta' });

const models = {}
models.mahasiswa = mahasiswa
models.dosen = dosen
models.tugasAkhir = tugasAkhir
models.detail_tugasAkhir = detail_tugasAkhir
models.admin = admin


module.exports = models
