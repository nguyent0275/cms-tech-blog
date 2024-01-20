const { Model, DataTypes } = require("sequelize");
const SALT_FACTOR = 10;

const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique checks the database for and make sure the value doesn't already exist
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // a minimum of 8 characters and maximum of 32
        len: [8],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        // checks email for email format ('example@gmail.com')
        isEmail: true,
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        // changing it to lowercase before the data is added to the database
        newUserData.email = await newUserData.email.toLowerCase();
        // hashing the password
        newUserData.password = await bcrypt.hash(
          newUserData.password,
          SALT_FACTOR
        );
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        // if there is an update, changes the updated email to lowercase
        // hasOwnProperty
        if (updatedUserData.email.hasOwnProperty("email")) {
          updatedUserData.email = await updatedUserData.email.toLowerCase();
        }
        // if there is an update to password, rehashes it
        if (updatedUserData.password.hasOwnProperty("password")) {
          await bcrypt.hash(updatedUserData.password, SALT_FACTOR);
        }
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
