const express = require("express");

const app = express();

app.use(express.json());

const PORT = 5001;
const dummyUser = {
  id: "1",
  name: "Taro",
  email: "1234abcd@gmail.com",
};

app.get("/me", (req, res) => {
  res.send(dummyUser);
});

app.listen(PORT, () => {
  console.log(`Resource server listening on http://localhost:${PORT}`);
});
