module.exports = {
  apps: [
    {
      name: "test-next-app",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      instances: 1, // Force exactly one instance
      exec_mode: "fork", // Run in standard fork mode instead of cluster
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
    },
  ],
};
