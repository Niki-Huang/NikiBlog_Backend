const { BlogInfo } = require("@/models/index");

/*
 *   用途：查询一条记录
 *   参数：attrArr -- 字段
 *        condition -- 条件
 *   返回类型：对象
 */
async function BlogInfoDB_FindOne(attrArr = [], condition = {}) {
    let blogInfoObj = await BlogInfo.findOne({
        attributes: attrArr,
        where: condition,
    });
    return blogInfoObj;
}

/*
 *   用途：查询所有记录
 *   参数：attrArr -- 字段
 *        condition -- 条件
 *   返回类型：对象数组
 */
async function BlogInfoDB_FindAll(condition = {}) {
    let blogInfo_ObjArr = await BlogInfo.findAll({
        where: condition,
    });
    return blogInfo_ObjArr;
}

/*
 *   用途：插入一条记录
 *   参数：keyValue -- 字段、字段值的键值对
 *   返回类型：对象
 */
async function BlogInfoDB_InsertOne(keyValue = {}) {
    const newBlogInfo_Obj = await BlogInfo.create(keyValue);
    return newBlogInfo_Obj;
}

/*
 *   用途：删除一条记录
 *   参数：condition -- 条件
 *   返回类型：对象
 */
async function BlogInfoDB_Delete(condition) {
    // 先查询记录
    const blogInfoObj = await BlogInfoDB_FindOne(["fileName"], condition);
    // 再删除记录
    await BlogInfo.destroy({
        where: condition,
    });
    // 返回删除的记录
    return blogInfoObj;
}

/*
 *   用途：修改一条记录
 *   参数：keyValue -- 字段、字段值的键值对
 *        condition -- 条件
 *   返回类型：一维数组(只包含‘影响了多少行’)
 */
async function BlogInfoDB_Update(keyValue = {}, condition = {}) {
    const affectRowCountArr = await BlogInfo.update(keyValue, {
        where: condition,
    });
    return affectRowCountArr;
}

/*
 *   用途：自增
 *   参数：key -- 字段
 *        condition -- 条件
 *   返回类型：二维数组（别管不重要）
 */
async function BlogInfoDB_Increment(key, num = 1, condition = {}) {
    const result = await BlogInfo.increment(key, {
        by: num,
        where: condition,
    });
    return result;
}

module.exports = {
    BlogInfoDB_FindAll,
    BlogInfoDB_InsertOne,
    BlogInfoDB_Delete,
    BlogInfoDB_Update,
    BlogInfoDB_Increment,
};
