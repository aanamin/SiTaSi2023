const db = require('../config/dbConfig.js')
const mahasiswa = require('./mahasiswa.js')
const tugasAkhir = require('./tugasAkhir.js')
const dosen = require('./dosen.js')
const admin = require('./admin.js')

tugasAkhir.belongsTo(dosen, {as: 'dosbing', foreignKey: 'id_dosbing' });
tugasAkhir.belongsTo(dosen, {as: 'dospeng', foreignKey: 'id_dospeng' });
dosen.hasMany(tugasAkhir, {as: 'dosbing', foreignKey: 'id_dosbing' });
dosen.hasMany(tugasAkhir, {as: 'dospeng', foreignKey: 'id_dospeng' });

tugasAkhir.belongsTo(mahasiswa, { foreignKey: 'nim' });
mahasiswa.belongsTo(tugasAkhir, { foreignKey: 'nim' });

const models = {}
models.mahasiswa = mahasiswa
models.dosen = dosen
models.tugasAkhir = tugasAkhir
models.admin = admin


module.exports = models
