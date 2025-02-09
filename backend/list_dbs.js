const { MongoClient } = require('mongodb');

const url = "<//mongodb url >";

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connection to MongoDB was successful!");

    // Optional: List databases to ensure connectivity
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases available: ");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Run the function to test the connection
connectToDatabase();
