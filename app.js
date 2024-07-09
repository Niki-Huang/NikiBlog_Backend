/*
 *   描述：服务器主文件
 *   作者：Niki
 *   日期：2024/6/26
 */
// 导入
require("module-alias/register"); //全局可以使用@代表根目录
const express = require("express");
const path = require("path");
const { SERVERCONFIG } = require("@/config"); //配置
const {  glog } = require("@/utils/cusOperate"); //输出时带颜色
const cors = require("cors"); //跨域
const bodyParser = require("body-parser"); // 解析请求体

// 创建路由实例
const app = express();

// 中间件
app.use(express.static(path.join(__dirname, "uploads/imgs")));

// 插件
app.use(cors()); //允许跨域
app.use(bodyParser.json()); //解析JSON格式的请求体

// 子路由
app.use("/blogs", require("@/routers/blogs"));
app.use("/imgs", require("@/routers/imgs"));
app.use("/login",require("@/routers/login"))

// 根路由
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// 启动服务器
app.listen(SERVERCONFIG.PORT, () => {
    glog(`服务器已启动：http://localhost:${SERVERCONFIG.PORT}`);
});
