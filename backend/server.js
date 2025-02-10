const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
require("dotenv").config();
const fetch = require("node-fetch");


const app = express();
app.use(cors({ origin: ["http://localhost:3000","http://127.0.0.1:5500", "http://127.0.0.1:5501"] }));
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
    password: String,
    securityQuestion: String,
    securityAnswer: String
});

const User = mongoose.model("User", UserSchema);

// Signup Route
app.post("/signup", async (req, res) => {
    const { firstName, lastName, email, password, securityQuestion, securityAnswer } = req.body;

    try {
        let userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "Email already registered. Please log in." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, email, password: hashedPassword, securityQuestion, securityAnswer });

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

// Forgot Password Route
app.post("/forgot-password", async (req, res) => {
    const { email, securityQuestion, securityAnswer } = req.body;

    try {
        const user = await User.findOne({ email, securityQuestion, securityAnswer });
        if (!user) {
            return res.status(400).json({ error: "Incorrect security question or answer." });
        }

        res.status(200).json({ message: "Verification successful! Redirecting to change password page." });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Change Password Route
app.post("/change-password", async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findOneAndUpdate({ email }, { password: hashedPassword });
        res.status(200).json({ message: "Password updated successfully! Please log in." });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Google Search API Route using SerpApi
app.post("/search", async (req, res) => {
    const { text, webOption, timeRange } = req.body;
    const apiKey = process.env.SERPAPI_API_KEY;  
    
    if (!apiKey) {
      return res.status(500).json({ error: "API key is missing" });
    }
  
    if (!text) {
      return res.status(400).json({ error: "Search text is required" });
    }
  
    let query = `inurl:${webOption}`;
    if (webOption) query += ` intext:${text}`;
  
    // Handle time range filters
    const timeFilters = {
      "24 hours": "qdr:d",
      "3 days": "qdr:w3",
      "1 week": "qdr:w",
      "1 month": "qdr:m",
    };
  
    let serpApiParams = {
      api_key: apiKey,
      engine: "google",
      q: query,
    };
  
    if (timeRange && timeFilters[timeRange]) {
      serpApiParams.tbs = timeFilters[timeRange];
    }
  
    try {
      // Send the request to SerpApi
      const response = await fetch(`https://serpapi.com/search?${new URLSearchParams(serpApiParams)}`);
      const data = await response.json();
  

      //console.log("Full SerpApi Response:", data); // for data debugging
      if (!data || !data.organic_results) {
        return res.status(400).json({ error: "No results found1" });
      }
  
      // Return the search results
      res.status(200).json({ results: data.organic_results });
    } catch (error) {
      console.error("Search error:", error);
      res.status(500).json({ error: "Failed to fetch search results" });
    }
  });

app.listen(5500, () => console.log("Server running on port 5500"));
