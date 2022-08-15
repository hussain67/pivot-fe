const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      // target: "http://localhost:9090",
      target: "https://pivot-be.herokuapp.com",
      changeOrigin: true
    })
  );
};
