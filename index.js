import express from 'express'
import * as dotenv  from 'dotenv'
import cors from 'cors'
import { createProxyMiddleware } from 'http-proxy-middleware'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 4000


app.use('/api',createProxyMiddleware({
   target:'https://api.creditregistry.com/nigeria/AutoCred/Test/v8/api',
   changeOrigin:true,
   pathRewrite: {
    '^/api': ''
   }
}))


app.get("/",async (req,res)=>{ 
    res.json({msg:`Proxy Server Live on port ${PORT}`})
    })

app.listen(PORT,()=>{
    console.log(`Proxy Server running on ${PORT} `)
})