// Since we're still in development mode and not using Docker yet
// I created this to simulate a development proxy

const { createProxyMiddleware } = require("http-proxy-middleware");

// Add this line to confirm the file is loaded
console.log("✅ setupProxy.js is loaded and active");

module.exports = function (app) {
  console.log("✅ Setting up proxy middleware for /api");

  // Proxy API requests to the backend during development
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8000",
      pathRewrite: {
        "^/api": "", // Remove /api prefix when forwarding to backend
      },
      logLevel: "debug", // Add this to see detailed proxy logs
      onProxyReq: (proxyReq, req, res) => {
        console.log(
          `✅ Proxying request: ${req.method} ${req.path} -> http://localhost:8000${req.path.replace(/^\/api/, "")}`,
        );
      },
      changeOrigin: true,
    }),
  );
};
