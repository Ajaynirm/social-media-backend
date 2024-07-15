import mongoose from "mongoose";

const port=3000;
const DB_URI = "mongodb+srv://ajaysam397:k1u11R9HIoEmQbw0@socialmediaapi.jvx2ywh.mongodb.net/Blog?retryWrites=true&w=majority&appName=socialMediaApi";
const startServer = async () => {
    try {
      await mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to database");
    } catch (error) {
      console.error("Error connecting to database:", error);
    }
  };

  export default startServer;