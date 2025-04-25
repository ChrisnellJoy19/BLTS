const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  municipalityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Municipality', required: true },
  barangayId: { type: mongoose.Schema.Types.ObjectId, ref: 'Barangay', required: true },
  role: { type: String, required: true, enum: ['Secretary', 'Barangay_Captain'] },
  profile: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('User', userSchema);