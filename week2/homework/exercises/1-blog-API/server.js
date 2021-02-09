const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());

// YOUR CODE GOES IN HERE
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/blogs", (req, res) => {
  // How to get the title and content from the request??
  fs.writeFileSync(req.body.title, req.body.content);
  res.end("ok");
});

app.put("/posts/:title", (req, res) => {
  // How to get the title and content from the request?
  // What if the request does not have a title and/or content?
  if (fs.existsSync(req.params.title)) {
    fs.writeFileSync(req.body.title, req.body.content);
    res.status(200);
    res.end("ok");
  } else {
    // Send response with error message
    res.status(400);
    res.end("This post does not exist!");
    return;
  }
});

app.delete("/blogs/:title", (req, res) => {
  // How to get the title from the url parameters?
  if (fs.existsSync(req.params.title)) {
    // Add condition here
    fs.unlinkSync(req.params.title);
    res.status(200);
    res.end("ok");
  } else {
    // Respond with message here
    res.status(400);
    res.end("This post does not exist!");
    return;
  }
});

app.get("/blogs/:title", (req, res) => {
  // How to get the title from the url parameters?
  if (fs.existsSync(req.params.title)) {
    // Add condition here
    const post = fs.readFileSync(req.params.title);
    res.status(200);
    res.end(post);
  } else {
    // Respond with message here
    res.status(400);
    res.end("This post does not exist!");
    return;
  }
});

// GET list of all blog posts
app.get("/blogs", (req, res) => {
  const dirents = fs.readdirSync(__dirname, { withFileTypes: true });

  const readFiles = dirents
    .filter((dirent) => dirent.isFile())
    .map((dirent) => dirent.name);

  let posts = [];
  readFiles.forEach((file) => {
    if (path.extname(file) === "") {
      posts.push({"title": file});
    }
  });
  res.status(200);

  if(posts.length === 0) {
    res.end("No posts found!");
  } else {
    res.end(JSON.stringify(posts));
  }
});

app.listen(3000);
