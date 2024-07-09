/*
 *   描述：图片相关的路由
 *   作者：Niki
 *   日期：2024/6/26
 */
// 导入
const express = require("express");
const path = require("path");
const fs = require("fs");
const formidable = require("formidable"); // 处理表单数据
const { generateImgName } = require("@/utils/nameFormat"); // 生成图片名
const { UPLOADCONFIG, SERVERCONFIG } = require("@/config"); // 配置
const { PicInfo } = require("@/models"); //
const { success, error, throwError } = require("@/utils/cusOperate"); // 自定义输出、弹窗
const {
    PicInfoDB_InsertOne,
    PicInfoDB_Delete,
} = require("@/utils/picInfoDB");

// 创建路由实例
const router = express.Router();

// 保存图片
router.post("/pic/:bid", async (req, res) => {
    // 解析数据
    const bid = req.params.bid;
    // 创建 form 对象
    const form = new formidable.IncomingForm();
    // 声明 form 对象的配置
    form.uploadDir = UPLOADCONFIG.IMGSPATH; //保存位置
    form.keepExtensions = true; //保留图片的后缀
    // 解析请求报文
    form.parse(req, (err, fields, files) => {
        if (err) {
            error(res, "解析数据失败", err);
            return;
        }
        // 解析数据
        const imgFile = files.file[0]; // 图片文件
        const isCover = fields.isCover[0]; // 用于区分图片是否作为封面
        const fileExt = path.extname(imgFile.originalFilename); // 获取文件扩展名
        // 对已经存储的图片进行重命名
        const imgName = generateImgName(); // 生成10个字符的UUID
        const newFilePath = path.join(
            UPLOADCONFIG.IMGSPATH,
            `${imgName}${fileExt}`,
        );
        fs.rename(imgFile.filepath, newFilePath, async (err) => {
            if (err) {
                error(res, "重命名失败", err);
                return;
            }
            try {
                // 封面保留一张即可，所以可以先把之前的清除掉
                if (isCover == "yes") {
                    // 获取到删除的记录
                    let delPicInfoObj = await PicInfoDB_Delete({
                        bid,
                        isCover: "yes",
                    });
                    if (delPicInfoObj) {
                        // 获取图片文件名
                        let fileName = delPicInfoObj.picName;
                        // 绝对路径
                        let filePath = path.join(
                            UPLOADCONFIG.IMGSPATH,
                            fileName,
                        );
                        // 删除图片
                        fs.unlink(filePath, (err) => {
                            if (err) throwError("封面删除失败", err);
                        });
                    }
                }
                // 插入记录
                await PicInfoDB_InsertOne({
                    picName: `${imgName}${fileExt}`,
                    isCover,
                    bid,
                });
                // 返回图片的URL
                const fileUrl = `${SERVERCONFIG.URL}/${imgName}${fileExt}`;
                // 响应
                success(res, { url: fileUrl }, "图片上传成功");
            } catch (err) {
                error(res, "图片插入记录失败", err);
            }
        });
    });
});

// 删除多张图片
router.post("/picsDel", (req, res) => {
    try {
        // 解析数据
        const { picArr } = req.body;
        // 删除
        picArr.forEach((url) => {
            const fileName = path.basename(url); //文件名
            const filePath = path.join(UPLOADCONFIG.IMGSPATH, fileName); //路径
            // 删除文件
            fs.unlink(filePath, (err) => {
                if (err) throwError("图片删除失败", err);
            });
        });
        // 响应
        success(res, {}, "图片删除成功");
    } catch (err) {
        error(res, "图片删除失败", err);
    }
});

module.exports = router;
