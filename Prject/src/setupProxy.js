const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://192.168.8.126:8080',
            pathRewrite: { '^/api': '' },
            changeOrigin: true
        })
    );
};