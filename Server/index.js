const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "bhanu"
});

// Middleware
app.use(cors());
app.use(express.json()); // Replaces body-parser
app.use(express.urlencoded({ extended: true })); // Handles form data

// Route to get all data
app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * FROM gracy";
    db.query(sqlGet, (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Failed to retrieve data" });
        }
        res.status(200).send(result);
    });
});

// Route to insert data
app.post("/api/post", (req, res) => {
    const { name, email, contact } = req.body;
    const sqlInsert = "INSERT INTO gracy(name, email, contact) VALUES (?,?,?)";
    db.query(sqlInsert, [name, email, contact], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Failed to insert contact" });
        }
        res.status(201).json({ message: "Contact added successfully", result });
    });
});

// Route to delete a contact
app.delete("/api/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM gracy WHERE id = ?";
    db.query(sqlRemove, id, (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Failed to delete contact" });
        }
        res.status(200).json({ message: "Contact deleted successfully" });
    });
});

// Route to get a specific contact by id
app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT * FROM gracy WHERE id = ?";
    db.query(sqlGet, id, (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Failed to retrieve contact" });
        }
        res.status(200).send(result);
    });
});

// Route to update a contact
app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, contact } = req.body;
    const sqlUpdate = "UPDATE gracy SET name = ?, email = ?, contact = ? WHERE id = ?";
    db.query(sqlUpdate, [name, email, contact, id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Failed to update contact" });
        }
        res.status(200).json({ message: "Contact updated successfully" });
    });
});

// Test route to verify server is running
app.get("/", (req, res) => {
    res.send("Server is running successfully");
});

// Start server on port 5000
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
