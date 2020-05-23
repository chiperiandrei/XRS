const mongoose = require('mongoose');
const CARDmODEL = new mongoose.Schema({
    NFCID: {
        type: String,
        required: true,
        min: 2
    }
});

module.exports = mongoose.model('AccessCard', CARDmODEL);
