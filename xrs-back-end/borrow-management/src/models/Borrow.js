const mongoose = require('mongoose');
const borrowModel = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
        // default:'sal'
    },
    person_id: {
        type: String,
        required: true
        // default:'true'

    },
    date_borrowed: {
        type: Date,
        default: Date.now
    },
    end: {
        type: String,
        required: true
    },
    returned: {
        type: Boolean,
        default: false
    },
    status_at_borrow: {
        type: String,
        enum: ['Not Damaged', 'Damaged'],
        default: 'Not Damaged'
    },
    status_at_return: {
        type: String,
        enum: ['Not Damaged', 'Damaged'],
        default: 'Not Damaged'
    },
    date_taken: {
        type: Date,
        default: null
    },
    date_given: {
        type: Date,
        default: null
    },
    i_will_pick: {
        type: Boolean,
        default: false
    },
    date_selected_pick: {
        type: Date,
        expires: 7200 //expires after 2 hours
    }

});
module.exports = mongoose.model('Borrow', borrowModel);
