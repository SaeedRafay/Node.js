/**
 * Exercise 3: Create an HTTP web server
 */

const http = require("http");
const fs = require("fs");
const path = require("path");

//create a server
const server = http.createServer(function (req, res) {
  // YOUR CODE GOES IN HERE

  // Build file path
  let filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);

  // Get file extension
  let extName = path.extname(filePath);

  // Set initial content type
  let contentType = "text/html";

  // Check extension and set content type
  switch (extName) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  // Read file
  fs.readFile(filePath, (err, content) => {
    if (err) { // Error
      if (err.code == "ENOENT") {
        res.writeHead(404);
        res.end(`Page Not Found: 404`);
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else { // Success
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, 'utf8');
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
