"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Medical_Package extends Model {
    static associate(models) {
      // Thiết lập mối quan hệ với model Clinic
      Medical_Package.belongsTo(models.Clinic, {
        foreignKey: "clinicId",
        targetKey: "id",
        as: "clinicData",
      });
      Medical_Package.belongsTo(models.Specialty, {
        foreignKey: "specialtyId",
        targetKey: "id",
        as: "specialtyData",
      });
    }
  }
  Medical_Package.init(
    {
      name: DataTypes.STRING,
      descriptionMarkdown: DataTypes.TEXT,
      descriptionHTML: DataTypes.TEXT,
      image: DataTypes.STRING,
      sapo: DataTypes.TEXT,
      address: DataTypes.TEXT,
      specialtyId: DataTypes.INTEGER,
      clinicId: DataTypes.INTEGER, // Cột clinicId trong bảng "Medical_Package"
      price: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Medical_Package",
    }
  );
  return Medical_Package;
};
