import ConnectDB from "./database/connection/db.connection";
import expressServer from "./express.server";

(async () => {
  try {
    const dbStatus: boolean = await ConnectDB();
    !dbStatus && process.exit(1);
    expressServer.startServer();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
