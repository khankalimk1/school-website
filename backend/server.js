const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const FILE_PATH = path.join(__dirname, "admissions.json");

// Home Route
app.get("/", (req, res) => {
    res.send("🎉 School Admission Backend is Running!");
});

// Save Admission
app.post("/admission", (req, res) => {

    const student = req.body;

    let admissions = [];

    if (fs.existsSync(FILE_PATH)) {
        admissions = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
    }

    admissions.push(student);

    fs.writeFileSync(FILE_PATH, JSON.stringify(admissions, null, 2));

    res.json({
        success: true,
        message: "Admission submitted successfully!"
    });

});

// Get All Admissions
app.get("/admissions", (req, res) => {

    let admissions = [];

    if (fs.existsSync(FILE_PATH)) {
        admissions = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
    }

    res.json(admissions);

});

// Delete Admission
app.delete("/admission/:index", (req, res) => {

    let admissions = [];

    if (fs.existsSync(FILE_PATH)) {
        admissions = JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
    }

    const index = parseInt(req.params.index);

    if (index >= 0 && index < admissions.length) {

        admissions.splice(index, 1);

        fs.writeFileSync(FILE_PATH, JSON.stringify(admissions, null, 2));

        return res.json({
            success: true,
            message: "Admission deleted successfully!"
        });

    }

    res.status(404).json({
        success: false,
        message: "Admission not found."
    });

});

// Render provides the PORT automatically.
// Locally it will use port 5000.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});