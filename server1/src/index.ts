import express, {Request, Response, Application, NextFunction} from "express";
import {createProxyMiddleware} from "http-proxy-middleware";
import {createServer} from "http"
import { hostname } from "os";

const app:Application = express();

const proxyMiddleware = createProxyMiddleware( 
    {   target:"http://localhost:5050",
        changeOrigin:true,
        pathRewrite:{["/api"]:"/test"},
        xfwd:true
    });

app.disable("x-powered-by");

app.use((req:Request, res:Response, next:NextFunction)=>{
    console.log("yaay from server1")
    res.setHeader("x-proxy-server", "Server1 on port 5000");
    next();
})
app.use("/api",proxyMiddleware);
    
app.get("/test", (req:Request, res:Response)=>{
    console.log("yaay from /test server1")
    console.log(req.ip)

    res.status(200).json({"server1":"is running on port 5000","host":req.headers.host, "body":req.body, "qs":req.query});
});


const server = createServer(app).listen(5000,"localhost", ()=>{
    console.log(`server1 is running on localhost:5000 `)
})

// app.listen(5000, ()=>{ });