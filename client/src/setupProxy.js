// create proxy to redirect request to localhost:3000 to localhost:5000
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:8000",
    })
  );
};