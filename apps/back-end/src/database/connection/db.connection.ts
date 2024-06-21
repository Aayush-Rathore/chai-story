import mongoose from "mongoose";

export default async function ConnectDB() {
  try {
    const databaseConnection = await mongoose.connect(
      `${process.env.MONGO_URI}/${process.env.DATABASE_NAME}`
    );
    if (databaseConnection.STATES.connected) {
      console.log(
        `Database successfully connect | ${databaseConnection.connection.host}`
      );
      return true;
    } else {
      throw Error("Uable to connect to the Database!");
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}
