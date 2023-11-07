import mongoose from "mongoose";
const { connect } = mongoose;

const connectionToDB = () => {
  connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Connection to db successful");
    })
    .catch((err) => {
      console.log(err.message);
      process.exit(1);
    });
};

export default connectionToDB;
