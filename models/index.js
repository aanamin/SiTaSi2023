const db = require('../config/dbConfig.js')
const mahasiswa = require('./mahasiswa.js')
const tugasAkhir = require('./tugasAkhir.js')
const dosen = require('./dosen.js')

Signature.belongsTo(Documents, { foreignKey: 'document_id' });
Documents.hasMany(Signature, { foreignKey: 'document_id' });

tugasAkhir.hasMany(dosen, {as: 'dosbing', foreignKey: 'id_dosbing' });
tugasAkhir.hasMany(dosen, {as: 'dospeng', foreignKey: 'id_dospeng' });
dosen.belongsTo(tugasAkhir, {as: 'dosbing', foreignKey: 'id_dosbing' });
dosen.belongsTo(tugasAkhir, {as: 'dospeng', foreignKey: 'id_dospeng' });

mahasiswa.hasMany(Documents, { foreignKey: 'id_user' });
Documents.belongsTo(mahasiswa, { foreignKey: 'id_user' });

const models = {}
models.mahasiswa = mahasiswa
models.documents = Documents
models.signature = Signature


module.exports = models
