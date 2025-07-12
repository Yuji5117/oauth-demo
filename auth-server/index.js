const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 4000;

const authCodes = new Map();
const accessTokens = new Map();

const dummyUser = {
  id: "user123",
  name: "Test User",
};

app.get("/authorize", (req, res) => {
  const { client_id, redirect_uri, state } = req.query;

  const code = uuidv4();
  authCodes.set(code, client_id);
  const redirectUrl = `${redirect_uri}?code=${code}&state=${state}`;

  return res.redirect(redirectUrl);
});

app.post("/token", (req, res) => {
  const { code, client_id, client_secret, redirect_uri } = req.body;

  if (
    client_id !== process.env.CLIENT_ID ||
    client_secret !== process.env.CLIENT_SECRET ||
    redirect_uri !== process.env.REDIRECT_URI
  ) {
    return res.status(400).json({ error: "Invalid client credentials" });
  }

  if (!authCodes.has(code)) {
    return res.status(400).json({ error: "Invalid authorization code" });
  }

  const accessToken = jwt.sign(dummyUser, "secretkey", { expiresIn: "10m" });
  accessTokens.set(accessToken, dummyUser);
  authCodes.delete(code);

  return res.json({
    access_token: accessToken,
    token_type: "Bearer",
    expires_in: 600,
  });
});

app.listen(PORT, () => {
  console.log(`Authorization server listening on http://localhost:${PORT}`);
});
