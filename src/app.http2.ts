import http2 from "http2";
import fs from "node:fs";

const server = http2.createSecureServer({
  key: fs.readFileSync("./keys/server.key"),
  cert: fs.readFileSync("./keys/server.crt")  
},(req, res) => {
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