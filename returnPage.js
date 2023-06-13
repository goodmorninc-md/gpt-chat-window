const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
 // res.header('Access-Control-Allow-Credentials', true);//告诉客户端可以在HTTP请求中带上Cookie
  res.header("Access-Control-Allow-Headers", "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, " +
      "Last-Modified, Cache-Control, Expires, Content-Type, Content-Language, Cache-Control, X-E4M-With,X_FILENAME");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  next();
});
// 设置中间件
app.use(bodyParser.json());
app.use(cors());
// 设置dist目录为静态文件目录
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/login', (req, res) => {
    console.log(path.join(__dirname, 'dist'))
  res.sendFile(path.join(__dirname, 'dist', 'login.html'));
});
// 定义路由，将所有请求都返回index.html
app.get('/', (req, res) => {
    console.log(path.join(__dirname, 'dist'))
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.get("/test",(req,res)=>{
  console.log(req)
  return res.status(200).send({
    data:{
      data:"hello"
    },
    code:1
  })
})
// 启动服务器，监听指定的端口
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
