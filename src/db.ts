import mongoose from "mongoose";

type TInput = {
  db: string;
};

export default ({ db }: TInput) => {
  const connect = () => {
    // Connect to MongoDB Atlas
    mongoose
      .connect(db)
      .then(() => {
        console.log("connection sucessful");
      })
      .catch((err) => {
        console.error("Connection error", err);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on("disconnected", connect);
};
