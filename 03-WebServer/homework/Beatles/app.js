var http = require("http");
var fs = require("fs");

var beatles = [
  {
    name: "John Lennon",
    birthdate: "09/10/1940",
    profilePic:
      "https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg",
  },
  {
    name: "Paul McCartney",
    birthdate: "18/06/1942",
    profilePic:
      "http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg",
  },
  {
    name: "George Harrison",
    birthdate: "25/02/1946",
    profilePic:
      "https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg",
  },
  {
    name: "Richard Starkey",
    birthdate: "07/08/1940",
    profilePic:
      "http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg",
  },
];

http
  .createServer(function (req, res) {
    if (req.method === "GET") {
      if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        var html = fs.readFileSync(__dirname + "/index.html");
        res.end(html);
      } else if (req.url === "/api") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(beatles));
      } else if (
        req.url === "/api/John%20Lennon" ||
        req.url === "/api/Paul%20McCartney" ||
        req.url === "/api/George%20Harrison" ||
        req.url === "/api/Richard%20Starkey"
      ) {
        res.writeHead(200, { "Content-Type": "application/json" });
        let url = req.url.replace("%20", " ").slice(5);
        res.end(JSON.stringify(beatles.filter((b) => b.name === url)));
      } else if (req.url === "/johnlennon") {
        res.writeHead(200, { "Content-Type": "text/html" });
        var html = fs.readFileSync(__dirname + "/beatle.html", "utf8");
        html = html.replace("${nombre}", beatles[0].name);
        html = html.replace("${nacimiento}", beatles[0].birthdate);
        html = html.replace("${imagen}", beatles[0].profilePic);
        res.end(html);
      } else if (req.url === "/paulmccartney") {
        res.writeHead(200, { "Content-Type": "text/html" });
        var html = fs.readFileSync(__dirname + "/beatle.html", "utf8");
        html = html.replace("${nombre}", beatles[1].name);
        html = html.replace("${nacimiento}", beatles[1].birthdate);
        html = html.replace("${imagen}", beatles[1].profilePic);
        res.end(html);
      } else if (req.url === "/georgeharrison") {
        res.writeHead(200, { "Content-Type": "text/html" });
        var html = fs.readFileSync(__dirname + "/beatle.html", "utf8");
        html = html.replace("${nombre}", beatles[2].name);
        html = html.replace("${nacimiento}", beatles[2].birthdate);
        html = html.replace("${imagen}", beatles[2].profilePic);
        res.end(html);
      } else if (req.url === "/richardstarkey") {
        res.writeHead(200, { "Content-Type": "text/html" });
        var html = fs.readFileSync(__dirname + "/beatle.html", "utf8");
        html = html.replace("${nombre}", beatles[3].name);
        html = html.replace("${nacimiento}", beatles[3].birthdate);
        html = html.replace("${imagen}", beatles[3].profilePic);
        res.end(html);
      } else {
        res.writeHead(404, {
          "Content-Type": "text/html",
        });
        res.end("<h1>Not Found</h1>");
      }
    } else {
      res.writeHead(404, {
        "Content-Type": "text/html",
      });
      res.end("<h1>Not Found</h1>");
    }
  })
  .listen(3000);
