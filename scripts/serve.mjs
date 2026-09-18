import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../dist");
export function serve(port = Number(process.env.PORT || 4173)) {
  const server = http.createServer(async (request,response)=>{
    try {
      const pathname = decodeURIComponent(new URL(request.url || "/", "http://localhost").pathname);
      let file = pathname === "/" || pathname === "/account" ? path.join(root,"index.html") : path.resolve(root, "."+pathname);
      if(file !== root && !file.startsWith(root+path.sep)){response.writeHead(403);response.end("Forbidden");return;}
      let contents;
      try {contents=await fs.readFile(file);} catch {file=path.join(root,"index.html");contents=await fs.readFile(file);}
      response.writeHead(200, {"Content-Type": file.endsWith(".css") ? "text/css; charset=utf-8" : "text/html; charset=utf-8", "Cache-Control":"no-store"});
      response.end(contents);
    } catch(error) {response.writeHead(500);response.end("Build the project before starting the preview.");console.error(error);}
  });
  server.on("error", error=>{console.error(error);process.exitCode=1;});
  server.listen(port,"127.0.0.1",()=>console.log(`IntoSquare: http://localhost:${port}`));
  return server;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) serve();
