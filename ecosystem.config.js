module.exports = {
  apps: [
    {
      name: "chat-app-4000",
      script: "server.js",
      env: {
        PORT: 4000,
        NODE_ENV: "production",
      },
    },
    {
      name: "chat-app-4001",
      script: "server.js",
      env: {
        PORT: 4001,
        NODE_ENV: "production",
      },
    },
  ],
};
