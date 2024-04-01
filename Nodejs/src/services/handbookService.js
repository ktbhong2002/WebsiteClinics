import request from "request";
import fs from "fs";
import axios from "axios";

const db = require("../models");
const cheerio = require("cheerio");

let checkTitleHandbook = (titleHandbook) => {
  return new Promise(async (resolve, reject) => {
    try {
      let title = await db.Handbook.findOne({
        where: { title: titleHandbook },
      });
      if (title) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let checkCategoryHandbook = (categoryHandbook) => {
  return new Promise(async (resolve, reject) => {
    try {
      let category = await db.Handbook.findOne({
        where: { category: categoryHandbook },
      });
      if (category) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

const crawlHandbook = () => {
  axios
    .get("http://suckhoedoisong.vn")
    .then(async (response) => {
      const $ = cheerio.load(response.data);
      const articles = [];
      $(".box-category-item").each((index, element) => {
        const element_query = $(element);
        const newArticle = {
          title: element_query.find('a[data-type="title"]').text().trim(),
          link:
            "https://suckhoedoisong.vn" +
            element_query.find('a[data-type="title"]').attr("href"),
          image: element_query.find('img[data-type="avatar"]').attr("src"),
          sapo: element_query.find("p.box-category-sapo").text().trim(),
          category: element_query.find(".box-category-category").attr("title"),
          source: "suckhoedoisong.vn",
          dateCreate: element_query.find(".box-category-time.time-ago").text(),
        };
        articles.push(newArticle);
      });
      console.log(articles[1]);
      // lưu vào cơ sở dữ liệu)
      for (let article of articles) {
        try {
          let checkTitle = await checkTitleHandbook(article.title);
          let checkCategory = await checkCategoryHandbook(article.category);
          if (checkTitle === true) {
          } else if (checkCategory === false) {
          } else {
            await db.Handbook.create({
              title: article.title,
              link: article.link,
              image: article.image,
              sapo: article.sapo,
              category: article.category,
              source: article.source,
              createdAt: article.dateCreate,
              content: "test",
              author: "admin",
            });
            console.log("Thêm thành công bài báo:", article.title);
          }
        } catch (e) {
          console.error("An error occurred:", e);
        }
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
};

let getAllHandbook = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Handbook.findAll({
        order: [["createdAt", "DESC"]],
      });
      if (data && data.length > 0) {
        data.map((item) => {
          return item;
        });
      }
      resolve({
        errCode: 0,
        errMessage: "OK",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let deleteHandbook = (handbookId) => {
  return new Promise(async (resolve, reject) => {
    let foundHandbook = await db.Handbook.findOne({
      where: { id: handbookId },
      raw: false,
    });
    if (!foundHandbook) {
      resolve({
        errCode: 2,
        errMessage: "The handbook isn't exsit",
      });
    }
    if (foundHandbook) {
      await foundHandbook.destroy();
    }
    resolve({
      errCode: 0,
      errMessage: "The handbook is delete",
    });
  });
};

let getDetailHandbookById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let data = await db.Handbook.findOne({
          where: {
            id: id,
          },
          attributes: [
            "title",
            "category",
            "image",
            "sapo",
            "content",
            "author",
            "link",
            "createdAt",
          ],
        });
        resolve({
          errCode: 0,
          errMessage: "OK",
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllHandbook: getAllHandbook,
  getDetailHandbookById: getDetailHandbookById,
  crawlHandbook: crawlHandbook,
  deleteHandbook: deleteHandbook,
};
