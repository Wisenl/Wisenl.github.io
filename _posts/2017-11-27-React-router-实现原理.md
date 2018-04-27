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



Web 应用里面，路由系统是将`浏览器URL`和`页面UI`关联起来的核心要素。在以往的以服务端为主的开发中，路由系统都是在后端实现，但现在随着前端技术的快速发展，基于前端框架的路由系统也在兴起。Vue技术栈提供了vue-router，React社区则出现了react-router。这篇文章将会对react-router  (v3.0.0)的使用和实现进行分析。



React 是基于组件的视图框架，那么 react-router 也自然是运用组件化思想来实现的。参考 [react-router API文档](https://github.com/ReactTraining/react-router/blob/v3/docs/API.md),可以看到文档的内容结构大都为  **Component———props**   形式。所以说，如果掌握了这些核心组件的用法那么便基本上掌握react-router 的用法。（当然也要了解非组件的 history 对象）



emmm...在有官方的使用[教程](https://github.com/reactjs/react-router-tutorial)下，自己再写一篇实在是吃力不讨好，况且！我还找到了中文翻译版（在我准备自己翻译前~）：

* [React-Router 中文简明教程（上）](http://www.mrfront.com/2016/12/11/react-router-tutorial-part1/)
* [React-Router 中文简明教程（中）](http://www.mrfront.com/2016/12/23/react-router-tutorial-part2/)
* [React-Router 中文简明教程（下）](http://www.mrfront.com/2016/12/30/react-router-tutorial-part3/)



## URL变化的监听

在单页应用中，一般路由和页面是一一对应的，url 的变化会直接反映到视图中。通常路由框架都要通过监听url的变化，从继而实现视图的相应变化。在react-router 中使用的监听手段有两个：

* 使用 `hashchange` 监测 hash 值变化。

  在window 上注册 hashchange 的回调，当url 的hash变化时触发回调函数:

  ```javascript
  window.addEventListener('hashchange', hashFun, false);
  ```

* 使用 history 上的api 进行地址更新

