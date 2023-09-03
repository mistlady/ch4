const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const db = fs.readFileSync(path.resolve(__dirname, "db.json"));
const data = JSON.parse(db);

app.get("/api", (req, res) => {
  return res.status(200).json({ data: "hello world" });
});

app.get("/api/posts", (req, res) => {
  return res.status(200).json({ data: data.posts });
});

app.post("/api/posts", async (req, res) => {
  const id = Math.floor(Math.random() * 100000);
  const { img, comment } = req.body;

  data.posts.push({ id, img, comment });
  await fs.writeFileSync(
    path.resolve(__dirname, "db.json"),
    JSON.stringify(data)
  );

  return res.status(200).json({ data: data.posts });
});

app.delete("/api/posts/all", async (req, res) => {
  data.posts = [];
  await fs.writeFileSync(
    path.resolve(__dirname, "db.json"),
    JSON.stringify(data)
  );

  return res.status(200).json({ data: data });
});

app.listen(3003, () => {
  console.log("listening on http://localhost:3003");
});
