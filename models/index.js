const coon = require("@/utils/sequelize");
const { Sequelize } = require("sequelize");

const BlogInfo = require("./blog_info")(coon, Sequelize); //博文表
const PicInfo = require("./pic_info")(coon, Sequelize); //照片表

module.exports = { BlogInfo, PicInfo };
