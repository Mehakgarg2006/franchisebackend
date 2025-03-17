// Backend: adminController.js
const bcrypt = require('bcrypt');
const Admin = require('../models/adminloginmodel');

async function adminLogin(req, res) {
  const { uid, password } = req.body;
  try {
    const admin = await Admin.findOne({ uid });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });
    
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { adminLogin };