/*
 *   描述：自定义操作
 *   作者：Niki
 *   日期：2024/6/26
 */
const { getNowTime } = require("@/utils/time");

// 输出红色字体
function rlog(msg) {
    console.log(`\x1b[31m${msg}\x1b[0m`);
}
// 输出绿色字体
function glog(msg) {
    console.log(`\x1b[32m${msg}\x1b[0m`);
}
// 输出黄色字体
function ylog(msg) {
    console.log(`\x1b[33m${msg}\x1b[0m`);
}
// 输出蓝色字体
function blog(msg) {
    console.log(`\x1b[35m${msg}\x1b[0m`);
}
// 输出紫色字体
function plog(msg) {
    console.log(`\x1b[35m${msg}\x1b[0m`);
}
// 输出青色字体
function ilog(msg) {
    console.log(`\x1b[36m${msg}\x1b[0m`);
}

// 成功响应
function success(res, data = {}, msg = "操作成功") {
    ilog(msg);
    res.status(200).json({ code: 200, data, msg, time: getNowTime() });
}

// 失败响应
function error(res, msg = "操作失败", err = "") {
    rlog(msg + "：" + err);
    res.status(500).json({
        code: 500,
        msg: "操作失败",
        time: getNowTime(),
    });
}

// 抛出错误
function throwError(msg = "操作失败", err = "") {
    rlog(msg + "：" + err);
    throw new Error(err);
}

module.exports = {
    rlog,
    glog,
    ylog,
    blog,
    plog,
    ilog,
    success,
    error,
    throwError,
};
