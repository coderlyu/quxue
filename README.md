# 趣学移动端项目

## 项目说明

- `vue`全家桶、`vant`、`mongodb`、`socket.io` 实现了即时聊天、文章发表、购物商城等功能
- 项目有点大，又不懂的地方可以在`issue`上给我留言

## 项目文件说明

- `backEnd`: 后台管理界面
- `frontEnd`：前端界面
- `server`：`express` 服务器

## 项目运行

- 首先运行 `server` express 服务器
  1、需要你安装 mongodb 数据库、node 等
  2、`cd server`
  3、`npm install`
  4、`npm run serve`
- 运行前端页面
  1、`cd frontEnd`
  2、`npm install`
  3、`npm run serve`
- 后台管理界面
  步骤同前端界面，不同的是，无法注册用户，只能通过自己手动修改`mongodb`数据库的用户字段，将`type` 设置为 `2`就是管理员用户
