const { createProxyMiddleware } = require('http-proxy-middleware')

import { Application } from 'express';

export default function setupProxy(app: Application) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:3001', 
            changeOrigin: true,
        })
    );
}