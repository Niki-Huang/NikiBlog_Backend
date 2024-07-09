/*
 *   描述：配置信息
 *   作者：Niki
 *   日期：2024/6/26
 */
const path = require("path");
// 数据库配置
const DATABASECONFIG = {
    HOST: "localhost", // 数据库主机
    USER: "root", // 数据库用户名
    PASSWORD: "123456", // 数据库密码
    DATABASE: "blog_data", // 数据库名称
};
// 服务器配置
const SERVERCONFIG = {
    IP: "localhost",
    PORT: 4400,
    PROTOCOL: "http",
    get URL() {
        return `${this.PROTOCOL}://${this.IP}:${this.PORT}`;
    },
};
// 文件上传配置（从根目录下开始，不要包括根目录）
const UPLOADCONFIG = {
    BLOGSPATH: path.join(__dirname, "uploads/blogs"),
    IMGSPATH: path.join(__dirname, "uploads/imgs"),
};
// 导出
module.exports = { DATABASECONFIG, SERVERCONFIG, UPLOADCONFIG };
