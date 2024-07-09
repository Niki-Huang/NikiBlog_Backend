/*
 *   描述：博文相关的路由
 *   作者：Niki
 *   日期：2024/6/26
 */
// 导入
const express = require("express");
const path = require("path");
const fs = require("fs");
const { generateFileName } = require("@/utils/nameFormat"); // 生成文件名
const { success, error, throwError } = require("@/utils/cusOperate"); // 自定义输出、弹窗
const { SERVERCONFIG, UPLOADCONFIG } = require("@/config"); // 配置信息
const {
    BlogInfoDB_FindAll,
    BlogInfoDB_InsertOne,
    BlogInfoDB_Delete,
    BlogInfoDB_Update,
    BlogInfoDB_Increment,
} = require("@/utils/blogInfoDB"); // 操作orm的函数
const {
    PicInfoDB_FindAll,
    PicInfoDB_FindOne,
    PicInfoDB_Delete_ByPicNameIn,
} = require("@/utils/picInfoDB"); // 操作orm的函数

// 创建路由实例
const router = express.Router();

// 查询所有博客的信息
router.get("/all", async (req, res) => {
    try {
        // 查询所有的博文信息
        let blogInfo_ObjArr = await BlogInfoDB_FindAll({ status: "published" });
        // 查询每个博文的封面
        for (const blogInfo_Obj of blogInfo_ObjArr) {
            // 查询封面信息
            let picInfo_Obj = await PicInfoDB_FindOne(["picName"], {
                bid: blogInfo_Obj.bid,
                isCover: "yes",
            });
            // 如果没有封面则给一张默认的封面
            if (picInfo_Obj == null) picInfo_Obj = { picName: "notfound.jpg" };
            // 追加到对象身上
            blogInfo_Obj.setDataValue(
                "coverUrl",
                `${SERVERCONFIG.URL}/${picInfo_Obj.picName}`,
            );
        }
        // 响应
        success(res, { blogsinfo: blogInfo_ObjArr }, "查询成功");
    } catch (err) {
        error(res, "查询失败", err);
    }
});

// 创建临时记录
router.post("/newRecord", async (req, res) => {
    try {
        // 插入
        const newBlogInfo_Obj = await BlogInfoDB_InsertOne({
            title: "",
        });
        // 获取插入后的自增 id
        const newID = newBlogInfo_Obj.bid;
        // 响应
        success(res, { bid: newID }, "创建临时记录成功");
    } catch (err) {
        error(res, "创建临时记录失败", err);
    }
});

// 删除临时记录
router.delete("/record/:bid", async (req, res) => {
    try {
        // 解析数据
        const bid = req.params.bid;
        // 删除记录
        await BlogInfoDB_Delete({ bid });
        // 响应
        success(res, { msg: "临时记录删除成功" }, "临时记录删除成功");
    } catch (err) {
        error(res, "临时记录删除失败", err);
    }
});

// 保存文章并更新记录
router.post("/save", async (req, res) => {
    try {
        // 解析数据
        const {
            bid,
            title,
            content,
            type,
            permission,
            status,
            tags,
            description,
        } = req.body;
        // 生成文件名
        const fileName = generateFileName(bid);
        // 生成文件的绝对路径
        const filePath = path.join(UPLOADCONFIG.BLOGSPATH, fileName);
        // 将数据写入到文件中
        fs.writeFile(filePath, content, async (err) => {
            if (err) throwError("写入失败", err);
        });
        // 更新临时记录（变成真的记录）
        await BlogInfoDB_Update(
            {
                title,
                fileName,
                type,
                permission,
                status,
                tags,
                description,
            },
            { bid },
        );
        // 查询上传了但没使用的图片
        let match;
        let usedPicNameArr = []; // 存储要删掉的照片
        let allPicNameArr = []; // 存储所有相关的照片
        const regex = /!\[\]\((.*\/(.*))\)/g; // 正则,匹配最后一个/后的图片名
        while ((match = regex.exec(content)) !== null) {
            usedPicNameArr.push(match[2]); // 第二个分组
        }
        let allPicInfoObjArr = await PicInfoDB_FindAll(["picName"], {
            bid,
            isCover: "no",
        });
        allPicInfoObjArr.forEach((item) => {
            allPicNameArr.push(item.picName);
        });
        const delPicNameArr = allPicNameArr.filter(
            (item) => !usedPicNameArr.includes(item),
        );
        // 将没有使用到的照片删除
        delPicNameArr.forEach((url) => {
            const fileName = path.basename(url); //文件名
            const filePath = path.join(UPLOADCONFIG.IMGSPATH, fileName); //路径
            // 删除文件
            fs.unlink(filePath, (err) => {
                if (err) throwError("多余的图片删除失败", err);
            });
        });
        // 再删除相关记录
        console.log(delPicNameArr);
        await PicInfoDB_Delete_ByPicNameIn(bid, delPicNameArr);
        // 响应
        success(res, { msg: "文章保存成功" }, "文章保存成功");
    } catch (err) {
        error(res, "保存失败", err);
    }
});

// 查询文章
router.get("/blog_content", async (req, res) => {
    try {
        // 解析数据
        const { bid, fileName } = req.query;
        // 拼接文章绝对路径
        const filePath = path.join(UPLOADCONFIG.BLOGSPATH, fileName);
        // 浏览量+1
        await BlogInfoDB_Increment("viewCount", 1, { bid });
        // 读取文章内容
        const content = await fs.promises.readFile(filePath, "utf8");
        // 响应
        success(res, { content }, "查询成功");
    } catch (err) {
        error(res, "查询失败", err);
    }
});

// 删除文章
router.delete("/:bid", async (req, res) => {
    try {
        // 解析
        const { bid } = req.params;
        // 先删除对应的照片
        let allPicInfoObjArr = await PicInfoDB_FindAll(["picName"], {
            bid,
        });
        allPicInfoObjArr.forEach((picInfoObj) => {
            const fileName = picInfoObj.picName; //文件名
            const filePath = path.join(UPLOADCONFIG.IMGSPATH, fileName); //路径
            fs.unlink(filePath, (err) => {
                if (err) throwError("相关的图片删除失败", err);
            });
        });
        // 删除记录
        let blogInfoObj = await BlogInfoDB_Delete({ bid });
        // 删除对应的文件
        let { fileName } = blogInfoObj;
        let filePath = path.join(UPLOADCONFIG.BLOGSPATH, fileName);
        fs.unlink(filePath, (err) => {
            if (err) throwError("文章删除失败", err);
        });
        success(res, {}, "删除成功");
    } catch (err) {
        error(res, "删除失败", err);
    }
});

// 导出
module.exports = router;
