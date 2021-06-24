const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://34.88.120.86:8085/root',
            pathRewrite: { '^/api': '' },
            changeOrigin: true
        })
    );
};
