const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const cors = require('cors');

// 允许所有源访问服务器
app.use(cors());

const port = 8080;
// 使用 body-parser 中间件解析请求体
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GET请求处理程序
app.get('/api/getData', (req, res) => {
  // 在这里编写获取数据的逻辑
  // 例如，从数据库中查询数据或从其他服务获取数据
  // 然后将数据发送回客户端
  fs.readFile('data_file/table_list.json', (err, fileData) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading data file');
    } else {
      // 解析 JSON 文件内容
      const jsonData = JSON.parse(fileData);

      // 发送 JSON 数据作为响应给前端
      res.json(
        {
          code: 200,
          data: jsonData
        }
      );
    }
  })
});

// POST 请求处理程序
app.post('/api/saveData', (req, res) => {
  // 从请求体中获取数据
  const data = req.body;
  // 保存数据到 JSON 文件
  fs.readFile('data_file/table_list.json', (err, fileData) => {
    console.log(data, 'saveData data');
    if (err) {
      // 如果文件不存在，则创建一个新的空数据数组
      const newData = [data];
      fs.writeFile('data_file/table_list.json', JSON.stringify(newData, null, 2), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error saving data');
        } else {
          res.status(200).send('Data saved successfully');
        }
      });
    } else {
      // 如果文件已存在，则将数据添加到现有数组中
      fs.writeFile('data_file/table_list.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error saving data');
        } else {
          res.json({
            code: 200,
            msg: 'success!'
          })
        }
      });
    }
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
