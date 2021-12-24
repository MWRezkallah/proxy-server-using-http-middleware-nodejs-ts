import express, {Request, Response, Application} from "express";


const app:Application = express();

app.set("trust proxy","127.0.0.1");
app.use((req, res, next)=>{
    res.removeHeader("X-Powered-By");
    next();
})
app.get("/test", (req:Request, res:Response)=>{
    console.log("yaay from /test server2");
    console.log(req.headers.host)
    res.status(200).json({"server2":"is running on port 5050","host":req.headers.host, "headers":req.headers});
});


app.listen(5050, ()=>{ console.log(`server2 is running on localhost:5050 `)});