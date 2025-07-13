const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const PORT = 5001;
const dummyUser = {
  id: "1",
  name: "Taro",
  email: "1234abcd@gmail.com",
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token || token === "null" || token === "undefined") {
    return res.status(401).json({ error: "Token missing or invalid" });
  }

  next();
};

app.get("/me", authenticateToken, (req, res) => {
  res.send(dummyUser);
});

app.listen(PORT, () => {
  console.log(`Resource server listening on http://localhost:${PORT}`);
});
