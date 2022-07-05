const { model, Schema } = require('mongoose');

const clientSchema = new Schema({
    email: {type: String, required: true, unique: true},
    isVerified: { type: Boolean, default: false },
}, {
    versionKey: false
});

module.exports = model('Client', clientSchema);