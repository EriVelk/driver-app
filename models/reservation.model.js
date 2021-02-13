const { Schema, model } = require('mongoose');

const ReservationSchema = new Schema({
    hour: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        default: {}
    }
});

module.exports = model('Reservation', ReservationSchema);