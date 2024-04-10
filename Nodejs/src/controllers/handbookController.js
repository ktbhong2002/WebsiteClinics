import handbookService from "../services/handbookService";

let createHandbook = async (req, res) => {
  try {
    let infor = await handbookService.createHandbook(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error form service...",
    });
  }
};

let crawlHandbook = async (req, res) => {
  try {
    let crawler = await handbookService.crawlHandbook();
    return res.status(200).json(crawler);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error form service...",
    });
  }
};

let getAllHandbook = async (req, res) => {
  try {
    let infor = await handbookService.getAllHandbook();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error form service...",
    });
  }
};

let searchHandbook = async (req, res) => {
  try {
    let searchData = await handbookService.searchHandbook(req.query.textSearch);
    return res.status(200).json(searchData);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error form service...",
    });
  }
};

let getDetailHandbookById = async (req, res) => {
  try {
    let infor = await handbookService.getDetailHandbookById(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error form service...",
    });
  }
};

// Sử dụng phương thức .delete() trên router của Express
let handleDeleteHandbook = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.id) {
      return res.status(400).json({
        errCode: 1,
        errMessage: "Missing required parameters!",
      });
    }
    let message = await handbookService.deleteHandbook(req.body.id);
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
  createHandbook: createHandbook,
  getAllHandbook: getAllHandbook,
  getDetailHandbookById: getDetailHandbookById,
  crawlHandbook: crawlHandbook,
  handleDeleteHandbook: handleDeleteHandbook,
  searchHandbook: searchHandbook,
};
