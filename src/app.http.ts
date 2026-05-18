import http from "http";
import fs from "node:fs";

const server = http.createServer((req, res) => {
  console.log(req.url);

  //res.writeHead(200, {"content-type": "text/html"})
  //res.write(`<h1>URL: ${req.url}</h1>`);
  //res.end();

  //const data = {name: "Jhon Dou", age: 30, city: "New York"}
  //res.writeHead(200, {"content-type": "application/json"});
  //res.end(JSON.stringify(data));

  if(req.url === "/"){
      const htmlFile = fs.readFileSync("./public/index.html", "utf-8");
      res.writeHead(200, {"content-type": "text/html"});
      res.end(htmlFile);
      return;
    }
  
    if(req.url?.endsWith(".js")){
      res.writeHead(200, {"content-type": "application/javascript"});
    } else if(req.url?.endsWith(".css")){
      res.writeHead(200, {"content-type": "text/css"});
    }
  
    try {
      const responseContent = fs.readFileSync(`./public${req.url}`, "utf-8");
      res.end(responseContent);
    } catch (error) {
      res.writeHead(404, {"content-type": "text/html"});
      res.end();
    }
});

server.listen(8080, () => {
  console.log('server running on port 8080');
});