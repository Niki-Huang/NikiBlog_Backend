/*
 *   描述：文件名生成
 *   作者：Niki
 *   日期：2024/6/30
 */
const { v4: uuidv4 } = require("uuid"); // 用于生图片名

function generateFileName(id) {
    const paddedId = String(id).padStart(8, "0");
    const fileName = `blog_${paddedId}.txt`;
    return fileName;
}

function generateImgName(id) {
    const uuidv4_raw = uuidv4(); // 生成32个字符，用四个-链接
    const uuidv4_str = uuidv4_raw.replace(/-/g, ""); // 去掉反斜杆
    const result = uuidv4_str.slice(0, 10); // 截取十个字符
    return result;
}

module.exports = { generateFileName, generateImgName };
