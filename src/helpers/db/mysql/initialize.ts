import sequelize from "./mysql";
import User from "../../../models/users";

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate().then(() => {
      console.log("Connection Successfull");
    });

    await sequelize.sync();
  } catch (err) {
    console.error(
      "Unable to connect to the database or synchronize models:",
      err
    );
  }
};

export default initializeDatabase;
