const sqlite3 = require("sqlite3").verbose();
const filepath = "./mdm_database.db";
// Initialize the SQLite database connection
const db = new sqlite3.Database('mdm_database.db'); // Replace with your database file path

// Add an error event handler to handle database connection errors
db.on('error', (err) => {
  console.error('SQLite error:', err.message);
  // Reject any pending promises with the error
  if (db.pendingPromises) {
    db.pendingPromises.forEach((promise) => {
      promise.reject(err);
    });
    db.pendingPromises = [];
  }
});
// Export the database connection
module.exports=db;
