const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const PORT = 5001;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token || token === "null" || token === "undefined") {
    return res.status(401).json({ error: "Token missing or invalid" });
  }

  jwt.verify(token, "secretkey", (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });

    req.user = user;
    next();
  });
};

app.get("/me", authenticateToken, (req, res) => {
  const user = req.user;
  return res.status(200).json({ message: "User Profile", user });
});

app.listen(PORT, () => {
  console.log(`Resource server listening on http://localhost:${PORT}`);
});
