const mongoose = require('mongoose');
const productModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4
    },
    specs: {
        type: Object,
        default: null
    },
    added: {
        type: Date,
        default: Date.now
    },
    imagesPath: {
        type: String,
        default: '/public/uploads/'
    },
    category: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        default: ''
    },
});

module.exports = mongoose.model('Product', productModel);
