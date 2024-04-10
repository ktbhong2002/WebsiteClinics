import { Model } from "sequelize";
import db from "../models/index";
require("dotenv").config();
import _, { includes, reject } from "lodash";
import { raw } from "body-parser";
import clinic from "../models/clinic";

let getAllMedicalPackage = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let medicalPackage = await db.Medical_Package.findAll({
        include: [
          {
            model: db.Clinic,
            as: "clinicData",
          },
          {
            model: db.Specialty,
            as: "specialtyData",
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: medicalPackage,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailMedicalPackageById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let data = await db.Medical_Package.findOne({
          where: { id: inputId },
          include: [
            {
              model: db.Clinic,
              as: "clinicData",
            },
            {
              model: db.Specialty,
              as: "specialtyData",
            },
          ],
          raw: true,
          nest: true,
        });
        if (!data) data = {};
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let checkRequiredFields = (inputData) => {
  let arrFields = ["descriptionHTML", "descriptionMarkdown", "name", "address"];
  let isVailid = true;
  let element = "";
  for (let i = 0; i < arrFields.length; i++) {
    if (!inputData[arrFields[i]]) {
      isVailid = false;
      element = arrFields[i];
      break;
    }
  }
  return {
    isVailid: isVailid,
    element: element,
  };
};

let saveDetailInforMedicalPackage = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(inputData);
      let checkObj = checkRequiredFields(inputData);
      if (checkObj.isVailid === false) {
        resolve({
          errCode: 1,
          errMessage: `Missing parameter: ${checkObj.element}`,
        });
      } else {
        if (inputData.action === `CREATE`) {
          await db.Medical_Package.create({
            descriptionHTML: inputData.descriptionHTML,
            descriptionMarkdown: inputData.descriptionMarkdown,
            description: inputData.description,
            name: inputData.name,
            image: inputData.avatar,
            sapo: inputData.sapo,
            address: inputData.address,
            specialtyId: inputData.specialtyId,
            clinicId: inputData.clinicId,
            price: inputData.price,
          });
        }
        if (inputData.action === `EDIT`) {
          let medicalPackageMarkdown = await db.Medical_Package.findOne({
            where: { id: inputData.id },
            raw: false,
          });
          if (medicalPackageMarkdown) {
            medicalPackageMarkdown.descriptionHTML = inputData.descriptionHTML;
            medicalPackageMarkdown.descriptionMarkdown =
              inputData.descriptionMarkdown;
            medicalPackageMarkdown.description = inputData.description;
            medicalPackageMarkdown.image = inputData.image;
            (medicalPackageMarkdown.sapo = inputData.sapo),
              (medicalPackageMarkdown.address = inputData.address),
              (medicalPackageMarkdown.specialtyId = inputData.specialtyId),
              (medicalPackageMarkdown.clinicId = inputData.clinicId),
              (medicalPackageMarkdown.price = inputData.price),
              await medicalPackageMarkdown.save();
          }
        }
        resolve({
          errCode: 0,
          errMessage: "Save information medical package successfly",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteMedicalPackage = (medicalPackageId) => {
  return new Promise(async (resolve, reject) => {
    let foundMedicalPackage = await db.Medical_Package.findOne({
      where: { id: medicalPackageId },
      raw: false,
    });
    if (!foundMedicalPackage) {
      resolve({
        errCode: 2,
        errMessage: "The MedicalPackage isn't exsit",
      });
    }
    if (foundMedicalPackage) {
      await foundMedicalPackage.destroy();
    }
    resolve({
      errCode: 0,
      Message: "The MedicalPackage is delete",
    });
  });
};

module.exports = {
  getAllMedicalPackage: getAllMedicalPackage,
  getDetailMedicalPackageById: getDetailMedicalPackageById,
  saveDetailInforMedicalPackage: saveDetailInforMedicalPackage,
  deleteMedicalPackage: deleteMedicalPackage,
};
