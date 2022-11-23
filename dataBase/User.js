const { Schema, model } = require('mongoose');

const userSchema = new Schema({
   name: { type: String, default: '' },
   email: { type: String, required: true, trim: true, lowercase: true },
   password: { type: String, required: true, trim: true},
}, {
   timestamps: true
});

module.exports = model('User', userSchema);
