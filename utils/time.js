/*
 *   描述：时间相关操作
 *   作者：Niki
 *   日期：2024/6/27
 */
function getNowTime() {
    const now = new Date();
    const year = now.getFullYear();
    // 月份从0开始，需要加1
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
module.exports = { getNowTime };
