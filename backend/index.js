const express=require("express")
const app=express()
const mainRouter=require("./routes/index");
const cors=require("cors")

app.use(cors({
  origin: 'https://pay-tm-frontend-taupe.vercel.app', // Allow only this origin
  methods: 'GET,POST,PUT,DELETE', // Allowed methods
  allowedHeaders: 'Content-Type,Authorization', // Allowed headers
}));
app.options('*', cors()); // Enable preflight across all routes

app.use(express.json());

app.use("/api/v1",mainRouter)



app.listen(3000,()=>{
  console.log("the server is running at port 3000")
})

module.exports=app
