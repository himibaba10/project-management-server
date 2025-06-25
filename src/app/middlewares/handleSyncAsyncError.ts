const handleSyncAsyncError = () => {
  // Syncronous errors
  process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1); // exit the app with failure
  });

  // Asyncronous errors
  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    process.exit(1);
  });
};

export default handleSyncAsyncError;
