const express = require("express");

const app = express();

app.use(express.json());

const PORT = 5001;
const dummyUser = {
  id: "1",
  name: "Taro",
  email: "1234abcd@gmail.com",
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ error: "Invalid authorization code" });
  }

  next();
};

app.get("/me", authenticateToken, (req, res) => {
  res.send(dummyUser);
});

app.listen(PORT, () => {
  console.log(`Resource server listening on http://localhost:${PORT}`);
});
