const http=require("http"),fs=require("fs"),path=require("path");
const PORT=process.env.PORT||3000, ROOT=__dirname;
const T={".html":"text/html",".css":"text/css",".js":"text/javascript",".json":"application/json",".png":"image/png",".svg":"image/svg+xml",".ico":"image/x-icon"};
http.createServer((req,res)=>{
  let p=decodeURIComponent(req.url.split("?")[0]);
  if(p==="/") p = fs.existsSync(path.join(ROOT,"index.html")) ? "/index.html" : "/"+(fs.readdirSync(ROOT).find(f=>f.endsWith(".html"))||"index.html");
  const fp=path.join(ROOT,path.normalize(p));
  if(!fp.startsWith(ROOT)){res.writeHead(403);return res.end("Forbidden");}
  fs.readFile(fp,(e,d)=>{ if(e){res.writeHead(404);return res.end("Not found");}
    res.writeHead(200,{"Content-Type":T[path.extname(fp)]||"application/octet-stream"});res.end(d);});
}).listen(PORT,()=>console.log("Weight-loss app -> http://localhost:"+PORT));
