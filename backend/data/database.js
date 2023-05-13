import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "music_data_base",
    })
    .then((c) => console.log(`connected with ${c.connection.host}`))
    .catch((e) => console.log(e));
};
