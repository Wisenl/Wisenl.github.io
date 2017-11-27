---
layout:     post
title:      "React-router 实现原理"
subtitle:   “react-router 学习”
date:       2017-11-27
author:     “Wisenl”
header-img: "img/2017-11-20.jpg"
tags:
    - 技术
    - react
---



## URL变化的监听

在单页应用中，一般路由和页面是一一对应的，url 的变化会直接反映到视图中。通常路由框架都要通过监听url的变化，从继而实现视图的相应变化。在react-router 中使用的监听手段有两个：

* 使用 `hashchange` 监测 hash 值变化。

  在window 上注册 hashchange 的回调，当url 的hash变化时触发回调函数:

  ```javascript
  window.addEventListener('hashchange', hashFun, false);
  ```

* 使用 history 上的api 进行地址更新

