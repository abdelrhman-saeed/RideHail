import { createProxyMiddleware } from 'http-proxy-middleware';
import { Agent } from 'http';

export const createServiceProxy = (serviceURL, routePrefix = '') => {
  return createProxyMiddleware({
    target: serviceURL,
    changeOrigin: true,
    pathRewrite: { [`^/${routePrefix}`]: '' },
    timeout: 5000,
    proxyTimeout: 5000,
    agent: new Agent({ keepAlive: true, maxSockets: 50 }),
    onProxyReq: (proxyReq, req) => {
      console.log(`[${new Date().toISOString()}] ${routePrefix}: ${req.method} ${req.url} Body:`, req.body);
      console.log(`[${new Date().toISOString()}] ${routePrefix}: Headers:`, req.headers);
      if (req.body && Object.keys(req.body).length > 0) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
      }
    },
    onProxyRes: (proxyRes, req) => {
      console.log(`[${new Date().toISOString()}] ${routePrefix}: Response for ${req.method} ${req.url} Status: ${proxyRes.statusCode}`);
    },
    onError: (err, req, res) => {
      console.error(`[${new Date().toISOString()}] ${routePrefix} Error:`, err.message);
      res.status(502).json({ error: `${routePrefix} Service unavailable`, details: err.message });
    },
  });
};
