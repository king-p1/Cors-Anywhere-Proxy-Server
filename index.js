import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 4000;
// Logging middleware for debugging
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});
app.use('/api', createProxyMiddleware({
  target: 'https://api.creditregistry.com/nigeria/AutoCred/Test/v8',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  },
  onProxyReq: (proxyReq, req, res) => {
    console.log(`Proxying ${req.method} request to ${proxyReq.path}`);
  },
  onError: (err, req, res) => {
    console.error(`Proxy error: ${err.message}`);
    res.status(500).json({ error: 'Proxy error' });
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log(`Received ${proxyRes.statusCode} response from target`);
  }
}));
app.get("/", async (req, res) => {
  res.json({ msg: `Server Live on port ${PORT}` });
});
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});






