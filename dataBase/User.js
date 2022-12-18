const { Schema, model } = require('mongoose');
const { oAuthHelper } = require("../helper");

const userSchema = new Schema({
   name: { type: String, default: '' },
   email: { type: String, required: true, trim: true, lowercase: true },
   password: { type: String, required: true},
   phone: { type: String }, // middleware if phone unique
}, {
   timestamps: true,
   toJSON: { virtuals: true },
   toObject: { virtuals: true }
});

userSchema.virtual('fullName').get(function () {
   return `${this.name} Poroshenko`;
});


userSchema.statics = { // for schema // this = model
   async createWithHashPassword(userObject = {}) {
      const hashPassword = await oAuthHelper.hashPassword(userObject.password);

      return this.create({ ...userObject, password: hashPassword });
   }
};

userSchema.methods = { // for single record
   async comparePassword(password) {
      await oAuthHelper.comparePasswords(this.password, password);
   }

};

module.exports = model('User', userSchema);
