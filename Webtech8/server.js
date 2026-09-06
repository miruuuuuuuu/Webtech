const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}

function send404(res) {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`<!DOCTYPE html>
<html>
<head>
    <title>404 - Page Not Found</title>
    <link rel="stylesheet" href="/style.css">
</head>
<body>
    <main class="container">
        <div class="status">404</div>
        <h1>Page not found</h1>
        <p>The route you requested does not exist.</p>
        <a href="/">Return to Home</a>
    </main>
</body>
</html>`);
}

function handleRequest(req, res) {
    logger(req, res, () => {
        let fileName;

        if (req.url === "/" || req.url === "/index.html") {
            fileName = "index.html";
        } else if (req.url === "/about.html") {
            fileName = "about.html";
        } else if (req.url === "/style.css") {
            fileName = "style.css";
        } else {
            send404(res);
            return;
        }

        const filePath = path.join(__dirname, "public", fileName);

        fs.readFile(filePath, (err, data) => {
            if (err) {
                send404(res);
                return;
            }

            const ext = path.extname(filePath);
            const contentTypes = {
                ".html": "text/html; charset=utf-8",
                ".css": "text/css; charset=utf-8"
            };

            res.writeHead(200, {
                "Content-Type": contentTypes[ext] || "application/octet-stream"
            });
            res.end(data);
        });
    });
}

const server = http.createServer(handleRequest);

server.on("error", (err) => {
    console.error("Server error:", err.message);
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
