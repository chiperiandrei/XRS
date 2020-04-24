const mongoose = require('mongoose');
const productModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4
    },
    specs: {
        type: Object,
        default: {
            salut: 'test',
            depinde: 'test'
        }
    },
    added: {
        type: Date,
        default: Date.now
    },
    imagePath: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        default: ''
    }
});

module.exports = mongoose.model('Product', productModel);
