import medicalPackageService from "../services/medicalPackageService";

let getAllMedicalPackage = async (req, res) => {
  try {
    let data = await medicalPackageService.getAllMedicalPackage();
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error form service...",
    });
  }
};

let getDetailMedicalPackageById = async (req, res) => {
  try {
    let infor = await medicalPackageService.getDetailMedicalPackageById(
      req.query.id
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error form service...",
    });
  }
};

let postInforMedicalPackage = async (req, res) => {
  try {
    let response = await medicalPackageService.saveDetailInforMedicalPackage(
      req.body
    );
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error form service...",
    });
  }
};

let handleDeleteMedicalPackage = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.id) {
      return res.status(400).json({
        errCode: 1,
        errMessage: "Missing required parameters!",
      });
    }
    let message = await medicalPackageService.deleteMedicalPackage(req.body.id);
    return res.status(200).json(message);
  } catch (error) {
    console.error("Error handling DELETE request:", error);
    return res.status(500).json({
      errCode: 500,
      errMessage: "Internal server error",
    });
  }
};

module.exports = {
  getAllMedicalPackage: getAllMedicalPackage,
  getDetailMedicalPackageById: getDetailMedicalPackageById,
  postInforMedicalPackage: postInforMedicalPackage,
  handleDeleteMedicalPackage: handleDeleteMedicalPackage,
};
