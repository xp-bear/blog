# 进程概述

学术的描述：
进程是 cpu 资源分配的最小单位（能够拥有资源和独立运行）。
线程是 cpu 调度的最小单位

```js
// 创建路由器
const express = require("express");
//引入连接池
const pool = require("../pool");
//定义路由器
const router = express.Router();
//抛出路由器
module.exports = router;

router.get("/", (req, res) => {
  res.send({ info: "我是数据主页,看到我,说明接口没有问题", code: 200 });
});
```

::: tip
这是一个提示
:::
