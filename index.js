const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

const SECRET_KEY = "supersecretadmin";
const JWT_SECRET = "your_jet_secret";

app.use(express.json());

const verifyJWT = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token was found." });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(402).json({ message: "Invalif Token" });
  }
};

app.post("/admin/login", (req, res) => {
  const { secret } = req.body;

  if (secret === SECRET_KEY) {
    const token = jwt.sign({ role: "admin" }, JWT_SECRET, { expiresIn: "24h" });
    res.json({ token });
  } else {
    res.json({ message: "Invalid Secret" });
  }
});

app.get("/admin/api/data", verifyJWT, (rreq, res) => {
  res.json({ message: "Protected route accessible." });
});

app.listen(3000, () => console.log("Server is running on 3000."));
