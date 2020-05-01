const mongoose = require('mongoose');
const borrowModel = new mongoose.Schema({
    product_id: {
        type: String,
        required: true
    },
    person_id: {
        type: String,
        required: true

    },
    date_borrowed: {
        type: Date,
        default: Date.now
    },
    period: {
        type: Object
    },
    returned: {
        type: Boolean,
        default: false
    },
    status_at_borrow: {
        type: String,
        default: 'Not Damaged'
    },
    status_at_return: {
        type: String,
        default: 'Not Damaged'
    }

});

module.exports = mongoose.model('Borrow', borrowModel);
