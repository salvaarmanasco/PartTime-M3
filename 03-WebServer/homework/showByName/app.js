var fs = require("fs");
var http = require("http");

// Escribí acá tu servidor
http
  .createServer(function (req, res) {
    if (req.method === "GET") {
      if (
        req.url === "/arcoiris_doge" ||
        req.url === "/badboy_doge" ||
        req.url === "/code_doge" ||
        req.url === "/resaca_doge" ||
        req.url === "/retrato_doge" ||
        req.url === "/sexy_doge"
      ) {
        res.writeHead(200, { "Content-Type": "image/jpg" });
        let image = fs.readFileSync(`./images/${req.url}.jpg`);
        res.end(image);
      } else {
        res.writeHead(404, {
          "Content-Type": "text/html",
        });
        res.end("<h1>Not Found</h1>");
      }
      //   if (req.url === "/arcoirisdoge") {
      //  }
      //   if (req.url === "/badboydoge") {
      //     res.writeHead(200, { "Content-Type": "image/jpg" });
      //     let image = fs.readFileSync("./images/badboy_doge.jpg");
      //     res.end(image);
      //   }
      //   if (req.url === "/codedog") {
      //     res.writeHead(200, { "Content-Type": "image/jpg" });
      //     let image = fs.readFileSync("./images/code_doge.jpg");
      //     res.end(image);
      //   } else {
      //     res.writeHead(404, {
      //       "Content-Type": "text/html",
      //     });
      //     res.end("<h1>Not Found</h1>");
      //   }
      // } else {
      //   res.writeHead(404, {
      //     "Content-Type": "text/html",
      //   });
      //   res.end("<h1>Not Found</h1>");
      // }
      // if (req.method === "GET") {
      //   if (req.url === "/arcoirisdoge") {
      //     res.writeHead(200, { "Content-Type": "text/html" });
      //     let html = fs.readFileSync(__dirname + "/index.html", "utf8");
      //     html = html.replace("${image}");
      //   }
    }
  })
  .listen(3000);
