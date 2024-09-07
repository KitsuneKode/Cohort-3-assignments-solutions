const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

const JWT_SECRET = "USER_APP";

app.use(express.json());

const users = [];

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username: username,
    password: password,
  });
  console.log(users);
  res.send({
    username,
    message: "You have signed up",
  });
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    const token = jwt.sign({ username: username }, JWT_SECRET);

    console.log(users);
    res.send({
      message: "You have signed in",
      token: token,
    });
  } else {
    res.status(403).send({
      message: "Invalid username or password",
    });
  }
});

app.get("/me", (req, res) => {
  const token = req.headers.token;
  if (users.length === 0) {
    res.status(401).send({
      message: "Unauthorized",
    });
  }

  const decoded = jwt.verify(token, JWT_SECRET);
  if (decoded) {
    res.send({
      username: decoded.username,
    });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
});

app.listen(3000);
