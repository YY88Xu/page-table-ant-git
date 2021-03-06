const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();


const baseData = [{
  id: 1,
  name: 'William',
  age: 12,
  gender: 'male',
  address: '韩国',
  hobbies: ['轮滑', '跳舞']
},
{
  id: 2,
  name: '天海祐希',
  age: 54,
  gender: 'female',
  address: '日本',
  hobbies: ['搞笑', '看电影']
},
{
  id: 3,
  name: 'Ben',
  age: 5,
  gender: 'male',
  address: '韩国',
  hobbies: ['搞笑', '看电影']
},
{
  id: 4,
  name: '蕾雅',
  age: 32,
  gender: 'female',
  address: '法国',
  hobbies: ['轮滑', '跳舞']
},
{
  id: 5,
  name: '梁朝伟',
  age: 59,
  gender: 'male',
  address: '中国',
  hobbies: ['喂鸽子', '看电影']
},
{
  id: 6,
  name: '贾玲',
  age: 35,
  gender: 'female',
  address: '中国',
  hobbies: ['搞笑', '看电影']
},
{
  id: 7,
  name: '李敏镐',
  age: 42,
  gender: 'male',
  address: '韩国',
  hobbies: ['轮滑', '跳舞']
},
{
  id: 8,
  name: '长泽雅美',
  age: 30,
  gender: 'female',
  address: '日本',
  hobbies: ['搞笑', '看电影']
},
{
  id: 9,
  name: '全智贤',
  age: 35,
  gender: 'female',
  address: '韩国',
  hobbies: ['搞笑', '看电影']
},
{
  id: 10,
  name: '全智贤',
  age: 35,
  gender: 'female',
  address: '韩国',
  hobbies: ['搞笑', '看电影']
},
{
  id: 11,
  name: '秋瓷炫',
  age: 35,
  gender: 'female',
  address: '韩国',
  hobbies: ['手工', '看电影']
},
{
  id: 12,
  name: '宋慧乔',
  age: 35,
  gender: 'female',
  address: '韩国',
  hobbies: ['看书', '看电影']
},
{
  id: 13,
  name: '宋仲基',
  age: 35,
  gender: 'male',
  address: '韩国',
  hobbies: ['搞笑', '看电影']
}
]


function getData(current, pageSize, address){
  let result = baseData;
  if(address){
    result = result.filter(item=>item.address===address); 
  }
  const start = (current-1)*pageSize;
  const last = current*pageSize;
  const end = last > result.length ? result.length : last;

  return  {
    pageNum: current,
    pageSize: pageSize,
    total: result.length,
    pages: Math.ceil(result.length/pageSize),
    list: result.slice(start, end)
  }
}

router.post('/famousInfoPost', (req, res) => {
  setTimeout(()=>{
    const {current, pageSize, address} = req.body;
    console.log(current, pageSize);
    const result = {};
    result.success = true;
    result.code = 200;
    result.msg = "处理成功";
    result.data = getData(current, pageSize, address);
    res.json(result);
  }, 3000)
});

router.get('/famousInfo', (req, res) => {
  setTimeout(()=>{
    const {current, pageSize, address} = req.query;
    const result = {};
    result.success = true;
    result.code = 200;
    result.msg = "处理成功";
    result.data = getData(current, pageSize, address);
    res.json(result);
  }, 1000)
});

router.get("/getCount", (req, res)=>{
  setTimeout(()=>{
    res.json({
      success: true,
      code: 200,
      data: 100
    })
  }, 1000)
})

// 设置跨域访问
app.all("*", function (request, response, next) {
  // 设置跨域的域名，* 代表允许任意域名跨域；http://localhost:3000 表示前端请求的 Origin 地址
  response.header("Access-Control-Allow-Origin", "http://localhost:3000");
  //设置请求头 header 可以加那些属性
  response.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  // 设置跨域可以携带 Cookie 信息
  response.header('Access-Control-Allow-Credentials', "true");
  //设置请求头哪些方法是合法的
  response.header(
    "Access-Control-Allow-Methods",
    "PUT,POST,GET,DELETE,OPTIONS"
  );
  response.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// 接口数据解析
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use('/pageTable/v1', router) // 路由注册


app.listen(8081, () => {
  console.log("服务器启动成功！")
});