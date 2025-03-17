const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model('Adminlogin', adminSchema);
module.exports = Admin;
