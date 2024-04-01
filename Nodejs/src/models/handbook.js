"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Handbook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Handbook.init(
    {
      title: DataTypes.TEXT,
      category: DataTypes.TEXT,
      image: DataTypes.STRING,
      sapo: DataTypes.TEXT,
      content: DataTypes.TEXT,
      author: DataTypes.STRING,
      link: DataTypes.TEXT,
      createdAt: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Handbook",
    }
  );
  return Handbook;
};
