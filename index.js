import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
const app = express();

app.use(cors({
  origin: '*', // Adjust as needed to restrict allowed origins
}));

app.use(express.json())

const PORT = process.env.PORT || 4000;

app.use('/api', createProxyMiddleware({
  target: 'https://api.creditregistry.com/nigeria/AutoCred/Test/v8',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Remove '/api' prefix when forwarding
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

app.listen(PORT, () => {
  console.log(`Proxy server running on ${PORT}`);
});
