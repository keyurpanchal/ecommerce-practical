import mongoose from "mongoose";

export const connectDb = (connectionString: string) => {
  try {
    mongoose
      .connect(connectionString)
      .then(() => {
        console.log("Database connected!");

        mongoose.connection.on("disconnected", () => {
          console.log("Database disconnected!");
        });
      })
      .catch((err: any) => {
        throw err;
      });
  } catch (error) {
    console.log(`Unable to Connect to Database: ${error}`);
  }
};
