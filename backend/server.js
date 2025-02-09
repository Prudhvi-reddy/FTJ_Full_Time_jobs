const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String
});

const User = mongoose.model("User", UserSchema);

// Signup Route
app.post("/signup", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        let userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "Email already registered. Please log in." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, email, password: hashedPassword });

        await newUser.save();
        res.status(201).json({ message: "Signup successful! Please log in." });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Login Route
app.post("/login", async (req, res) => {
    console.log("Login route hit");
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        res.status(200).json({ message: "Login successful!" });
    } catch (error) {
        console.log("Login error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(5500, () => console.log("Server running on port 5500"));
