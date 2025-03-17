const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Admin = require('../models/adminloginmodel');
const MONGO_URI = 'mongodb+srv://Mehak:1234@mehak2025.nrwnh.mongodb.net/?retryWrites=true&w=majority&appName=Mehak2025'; // Replace with your actual MongoDB URI

async function seedAdmin() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        const existingAdmin = await Admin.findOne({ uid: 'admin123' });
        if (existingAdmin) {
            console.log('Admin already exists');
            return mongoose.disconnect();
        }

        const hashedPassword = await bcrypt.hash('1234567890', 10);
        const admin = new Admin({
            uid: 'admin123',
            password: hashedPassword,
        });

        await admin.save();
        console.log('Admin credentials saved successfully');
        mongoose.disconnect();
    } catch (error) {
        console.error('Error seeding admin:', error);
        mongoose.disconnect();
    }
}
seedAdmin();