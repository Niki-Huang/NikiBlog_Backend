/*
 *   描述：登录相关的路由
 *   作者：Niki
 *   日期：2024/6/26
 */
// 导入
const express = require("express");
const jwt = require("jsonwebtoken");
const { ylog, success, error } = require("@/utils/cusOperate");
const { getNowTime } = require("@/utils/time"); // 自定义输出、弹窗

// 配置
const SECRET_KEY = "niki-123-niki";
const admin = {
    username: "niki",
    password: "123",
};

// 创建路由实例
const router = express.Router();

// 登录
router.post("/", (req, res) => {
    const { username, password } = req.body;
    if (username === admin.username && password === admin.password) {
        // 用户认证成功，生成 JWT
        const token = jwt.sign({ username }, SECRET_KEY);
        success(res, { token }, "登录成功");
    } else {
        ylog("登录失败");
        res.status(500).json({
            code: 500,
            msg: "登录失败",
            time: getNowTime(),
        });
    }
});

// 验证
router.post("/verification", (req, res) => {
    const { token } = req.body;
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            ylog("身份验证失败");
            res.status(500).json({
                code: 500,
                msg: "身份验证失败",
                time: getNowTime(),
            });
            return;
        }
        success(res, {}, "身份验证成功");
    });
});

module.exports = router;
