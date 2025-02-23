const mongoose = require('mongoose');


// actually that should be myiFood


const mongoURI = 'mongodb://localhost:27017/myistay';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("\t\t\n\n\nMongoDB connected successfully\n\n\n");

    const db = mongoose.connection.db;
    const fetched_data = db.collection('food_items');
    
    // Using await instead of callback
    const result = await fetched_data.find({}).toArray();
    // console.log(result);

  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = mongoDB;
