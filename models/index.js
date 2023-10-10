const db = require('../config/dbConfig.js')
const mahasiswa = require('./mahasiswa.js')
const tugasAkhir = require('./tugasAkhir.js')
const dosen = require('./dosen.js')

Signature.belongsTo(Documents, { foreignKey: 'document_id' });
Documents.hasMany(Signature, { foreignKey: 'document_id' });

Signature.belongsTo(mahasiswa, {as: 'Sender', foreignKey: 'user_id' });
Signature.belongsTo(mahasiswa, {as: 'Receiver', foreignKey: 'id_tujuan' });
mahasiswa.hasMany(Signature, {as: 'Sender', foreignKey: 'user_id' });
mahasiswa.hasMany(Signature, {as: 'Receiver', foreignKey: 'ied_tujuan' });

mahasiswa.hasMany(Documents, { foreignKey: 'id_user' });
Documents.belongsTo(mahasiswa, { foreignKey: 'id_user' });

const models = {}
models.mahasiswa = mahasiswa
models.documents = Documents
models.signature = Signature


module.exports = models
