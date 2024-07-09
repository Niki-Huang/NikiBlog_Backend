/*
 *   描述：ORM生成文件
 *   作者：Niki
 *   日期：2024/6/27
 */
const Sequelize = require("sequelize");
const { DATABASECONFIG } = require("@/config");
const sequelize = new Sequelize(
    DATABASECONFIG.DATABASE,
    DATABASECONFIG.USER,
    DATABASECONFIG.PASSWORD,
    {
        host: DATABASECONFIG.HOST,
        dialect: "mysql",
        timeZone: "+08:00", //不然会慢八个小时
    },
);
module.exports = sequelize;
