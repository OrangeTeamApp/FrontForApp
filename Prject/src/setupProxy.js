const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://moonlit-byway-317410.appspot.com/',
            pathRewrite: { '^/api': '' },
            changeOrigin: true
        })
    );
};