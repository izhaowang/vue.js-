import Mock from 'mockjs'
const Random = Mock.Random // Mock.Random 是一个工具类，用于生成各种随机数据
 
// let data = [] // 用于接受生成数据的数组
// let size = [
//   '300x250', '250x250', '240x400', '336x280', 
//   '180x150', '720x300', '468x60', '234x60', 
//   '88x31', '120x90', '120x60', '120x240', 
//   '125x125', '728x90', '160x600', '120x600', 
//   '300x600'
// ] // 定义随机值
// for(let i = 0; i < 10; i ++) { // 可自定义生成的个数
//   let template = {
//     'Boolean': Random.boolean, // 可以生成基本数据类型
//     'Natural': Random.natural(1, 10), // 生成1到100之间自然数
//     'Integer': Random.integer(1, 100), // 生成1到100之间的整数
//     'Float': Random.float(0, 100, 0, 5), // 生成0到100之间的浮点数,小数点后尾数为0到5位
//     'Character': Random.character(), // 生成随机字符串,可加参数定义规则
//     'String': Random.string(2, 10), // 生成2到10个字符之间的字符串
//     'Range': Random.range(0, 10, 2), // 生成一个随机数组
//     'Date': Random.date(), // 生成一个随机日期,可加参数定义日期格式
//     'Image': Random.image(Random.size, '#02adea', 'Hello'), // Random.size表示将从size数据中任选一个数据
//     'Color': Random.color(), // 生成一个颜色随机值
//     'Paragraph':Random.paragraph(2, 5), //生成2至5个句子的文本
//     'Name': Random.name(), // 生成姓名
//     'Url': Random.url(), // 生成web地址
//     'Address': Random.province() // 生成地址
//   }
//   data.push(template)
// }
 
Mock.mock('/data/index', 'post',  {
    "ret":0,
    "others|1-10":[
        {
            "name": "@ctitle",//随机生成日期时间
            "id": "@increment", // id
            "thumbnail": "@url",//随机生成1-800的数字
            "color|1-1000":  100,//随机生成1-100的数字
            "description": "@cword(3, 10)", // 描述
        } // 根据数据模板生成模拟数据
    ]
})
Mock.mock('/theme', 'post',  { // 主题日报
    "ret":0,
    "stories|1-5":[
        {
            "type": 0,//随机生成日期时间
            "id": "@increment", // id
            "title": "@cword(3, 10)",//随机生成1-800的数字
            "images|0-1":  Random.image(Random.size, '#02adea', 'Hello'),//随机生成1-100的数字
            "description|0-1": "@cword(3, 10)", // 描述
        } // 根据数据模板生成模拟数据
    ]
})
Mock.mock('/recommend', 'post',  { // 每日推荐
    "date": Random.time('a HH:mm:ss'),
    "stories|5-20":[
        {
            "type": 0,//随机生成日期时间
            "id": "@increment", // id
            "title": "MockJS" + "@cword(3, 10)",//随机生成1-800的数字
            "images|0-1":  Random.image(Random.size, '#02adea', 'MOCK'),//随机生成1-100的数字
            "description|0-1": "@cword(3, 10)", // 描述
            "ga_prefix|5": "0054" 
        } // 根据数据模板生成模拟数据
    ]
})
Mock.mock('/article', 'post',  { // 每日推荐
    "title": "@cword(10, 20)", // 描述
    "body": "@cword(20, 40)",
    "id": "@increment",
    "images|0-1":  Random.image(Random.size, '#02adea', 'MOCK'),//随机生成1-100的数字

})