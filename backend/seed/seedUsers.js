const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../src/models/User');
const Employee = require('../src/models/Employee');
const Shift = require('../src/models/Shift');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for Seeding');

        // Clear existing data
        await User.deleteMany();
        await Employee.deleteMany();
        await Shift.deleteMany();

        // Hash passwords
        const salt = await bcrypt.genSalt(10);
        const adminPassword = await bcrypt.hash('HireMe@2025!', salt);
        const userPassword = await bcrypt.hash('User@123', salt);

        // Create Users
        const adminUser = await User.create({
            name: 'Admin User',
            email: 'hire-me@anshumat.org',
            password: adminPassword,
            role: 'admin'
        });

        const normalUser = await User.create({
            name: 'John Doe',
            email: 'user@test.com',
            password: userPassword,
            role: 'user'
        });

        // Create Employees
        // Important: Name matches Normal User to link logic in shiftService
        const emp1 = await Employee.create({
            name: 'John Doe',
            code: 'EMP001',
            department: 'IT'
        });

        const emp2 = await Employee.create({
            name: 'Jane Smith',
            code: 'EMP002',
            department: 'HR'
        });

        console.log('Data Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();