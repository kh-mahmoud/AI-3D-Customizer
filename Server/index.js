

import express from 'express';
import cors from "cors"
import dalleRoute from "./Routes/dalle.routes.js";




const app=express()


app.use(express.json({limit:"50mb"}))
app.use(cors())


app.use("/api/v1/dalle",dalleRoute)


const port = 3000 || process.env.PORT;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})