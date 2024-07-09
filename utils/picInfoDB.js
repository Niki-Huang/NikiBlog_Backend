const { PicInfo } = require("@/models/index");
const { Op } = require("sequelize");

/*
 *   用途：查询所有记录
 *   参数：attrArr -- 字段
 *        condition -- 条件
 *   返回类型：对象数组
 */
async function PicInfoDB_FindAll(attrArr = [], condition = {}) {
    let picInfoObjArr = await PicInfo.findAll({
        attributes: attrArr,
        where: condition,
    });
    return picInfoObjArr;
}

/*
 *   用途：查询特定记录
 *   参数：attrArr -- 字段
 *        condition -- 条件
 *   返回类型：对象
 */
async function PicInfoDB_FindOne(attrArr = [], condition = {}) {
    let picInfoObj = await PicInfo.findOne({
        attributes: attrArr,
        where: condition,
    });
    return picInfoObj;
}

/*
 *   用途：插入一条记录
 *   参数：keyValue -- 字段、字段值的键值对
 *   返回类型：对象
 */
async function PicInfoDB_InsertOne(keyValue = {}) {
    const newPicInfo_Obj = await PicInfo.create(keyValue);
    return newPicInfo_Obj;
}

/*
 *   用途：删除一条记录
 *   参数：condition -- 条件
 *   返回类型：对象
 */
async function PicInfoDB_Delete(condition) {
    // 先查询该记录
    let picInfoObj = await PicInfoDB_FindOne(["picName"], condition);
    // 再删除记录
    await PicInfo.destroy({
        where: condition,
    });
    // 将删除的记录返回
    return picInfoObj;
}

/*
 *   用途：删除多条记录
 *   参数：condition -- 条件
 *   返回类型：对象
 */
async function PicInfoDB_Delete_ByPicNameIn(bid, picNameArr) {
    await PicInfo.destroy({
        where: {
            bid,
            picName: { [Op.in]: picNameArr },
        },
    });
    // 将删除的记录返回
    return;
}

module.exports = {
    PicInfoDB_FindAll,
    PicInfoDB_FindOne,
    PicInfoDB_InsertOne,
    PicInfoDB_Delete,
    PicInfoDB_Delete_ByPicNameIn,
};
