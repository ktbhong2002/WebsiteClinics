import SpecialtyService from "../services/specialtyService";

let createSpecialty = async (req, res) => {
  try {
    let infor = await SpecialtyService.createSpecialty(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error form service...",
    });
  }
};

let getAllSpecialty = async (req, res) => {
  try {
    let infor = await SpecialtyService.getAllSpecialty();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error form service...",
    });
  }
};
module.exports = {
  createSpecialty: createSpecialty,
  getAllSpecialty: getAllSpecialty,
};
