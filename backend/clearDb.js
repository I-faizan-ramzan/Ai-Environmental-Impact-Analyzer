const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Models
const User = require('./models/User');
const Entry = require('./models/Entry');

const clearDatabase = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        console.log('Dropping User and Entry collections...');
        await User.deleteMany();
        await Entry.deleteMany();
        console.log('Collections cleared successfully!');

        process.exit();
    } catch (error) {
        console.error('Error clearing collections:', error);
        process.exit(1);
    }
};

clearDatabase();
