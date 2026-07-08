const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sai@1234",      // Put your MySQL password here if you have one
    database: "pdf_converter"
});

db.connect((err) => {
    if (err) {
        console.log("❌ Database connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL Database!");
    }
});

module.exports = db;