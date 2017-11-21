---
layout:     post
title:      "Babel, just make sence of it!"
subtitle:   “Babel学习之弄懂就行”
date:       2017-11-20
author:     “Wisenl”
header-img: "img/2017-11-20.jpg"
tags:
    - 技术
    - 工具
---

> Use next generation JavaScript, today.			—— Babel

Babel，用于编写下一代的 JavaScript 的编译器。据说，它承担着推动 JavaScript 发展的历史重任。它实在太出色了，我们现在就来了解吧！

2015年10月底，Babel 6 正式发布，整个版本被彻底的重构和重新定位，Babel开始从一个单一的JavaScript 转换器进化为一个JavaScript 工具平台。

新版本的最大改进，应该是引入了模块化的概念。较之上一个版本Babel 5的一键安装全家桶模式，新版本将Babel的各个功能模块拆分出来，让开发者自行配置以达到更贴合项目需求的目的。但同时为了向下兼容我们这些犯懒开发者， Babel 6 也提供了preset（预设） 这个功能来统一安装一组配置好的包，我们只要选择使用哪个preset 就好了。再者就是提供了一个 .babelrc 文件以供我们对Babel 进行统一配置。

不过以上都不重要，我们要时刻牢记自己的目标——弄懂就行。只是有一点需要明确：知之，用之！知道它是什么，才能用的更顺手。



打开 GitHub 上的 Babel 项目进入 packages 文件，你会发现一串要下翻好一会才到底的列表，这些差不多就是Babel 所有的功能和插件包，也是我们需要关心的所有内容。

我们可以把这串列表划分成不同的类型来了解。

1. babel-cli 
2. babel-core
3. babel-generator
4. babel-helper-xxxx ( babel-helpers )
5. babel-node 
6. babel-plugin-xxxx
7. babel-polyfill
8. babel-preset-xxxx
9. babel-register
10. babel-runtime
11. babel-standalone
12. babel-template
13. babel-traverse
14. babel-types
15. babylon



有点多，再分类一次，顺便重新排下序 ( 官方README )：

* Core：babel-core, babylon, babel-traverse, generator
* Plugins : babel-plugin-xxxx
* Preset： babel-preset 
* Other：babel-cli, Babel-types, babel-polyfill, babel-runtime, babel-register, babel-template, babel-helpers



OK，逐项介绍

### Core

babel-core 就是Babel编译器。

首先我们需要知道编译过程：第一步，语法解析，生成AST（abstract syntax tree，抽象语法树）。第二步，遍历AST同时转译。第三步，反转AST，生成代码。

流程如下：

需要编译的代码 -> 通过 babylon 解析 -> 得到AST  -> plugin 使用 traverse的 遍历功能进行转译 -> 更改后AST -> 通过generator反转 -> 得到编译后代码

Babel-core 自己并没有去做具体的编译工作，而是通过引用babel-babylon、babel-traverse、babel-generator这三个包来完成（当然还有各种 plugin）。babel-core 集成这些功能，向外提供相关接口从而完成编译任务。



### Plugin

像这种 babel-plugin-xxx-xxx 类型的包，都统称为 Plugin，他们的作用就是提供给babel 不同的转译功能，如果不使用这些插件，那么在第二阶段AST树就不会发生变化，回头还是给你生成原有的代码。对于这些 plugin ，我们根据它们的命名就能猜到他们的用途。比如：

Babel-plugin-check-constants 包就是用来实现  const 语法的插件。原理很简单，就是如果你为一个 通过const 声明的变量再次声明，它就会报错。

Babel-plugin-proposal-async-generator-functions , 实现 async generator 的转译功能。这种proposal 前缀的是还在提议阶段的语法功能，等待加入标准中。

babel-plugin-syntax-jsx，让JSX语法能够正确的解析。

Babel-plugin-transform-arrow-functions, 将ES6的箭头函数便以为ES5 的普通 function

有一个值得一提的包 babel-plugin-transform-runtime, 具体功能后面再谈。



### Presets

如上，plugin 插件好几十个难道我用的时候去一个一个配置安装？别怕，便捷不够，Presets来凑！

官方提供了 env、 es2015、es2016、es2017、flow、react、stage-x、typescript 等豪华套餐供我们享用，只需安装相应的 preset ， 就能使用其中包含的插件集。

**Babel-preset-es20xx**

这些插件集里面组装好了相应ES版本中需要的功能。但是需要注意，ES2016 和 ES2017 的preset 只负责编译该ES版本所新增的特性，即便你安装了es2017，还是要安装es2015。es20xx的preset即将被官方deprecated!

**babel-preset-env**

相较于babel-preset-es20xx, 官方更推荐我们使用babel-preset-env, 它可以根据当前配置的运行环境来添加需要用到的plugins（以及polyfill）。俗话说，一代版本一代神。不同的浏览器版本所实现的ES特性是不同的，设想这样一个场景：

我有一个老版本的浏览器需要作为兼容目标，它可能不支持 async 功能，但是支持 let const 等功能，那我只要使用babel-preset-env 这个preset 同时指定一下我这个目标浏览器的版本，babel就会根据该浏览器的ES标准自动补上 async 语法的plugin 垫片而不是一股脑把所有不需要的plugin装上。"Babel preset that automatically determines the Babel plugins you need based on your supported environments. Uses compat-table."  这是官方描述

这么厉害，它是怎么实现的呢？

首先获取到第三方统计的浏览器兼容数据 [compat-table](https://kangax.github.io/compat-table/es6/) ，然后在ES特性和Babel插件间建立一种映射关系，最后使用 [browserslist](https://github.com/ai/browserslist) 来指定所需支持的环境 （如 >1%, last 2 versions），如果不指定的话，默认包含所有带年份的preset ( es20xx)。当然，在node环境中使用也可以指定node版本。

**Babel-preset-react** 和 **babel-preset-flow**

Babel-preset-flow ,只包含了一个 transform-flow-strip-types 插件，用来转译flow.js的语法功能。

babel-preset-react 包含了babel-preset-flow 和 转译jsx语法的相关插件。它用来抽取flow类型并转化JSX使其通过createElement 调用。

**babel-preset-state-x**

提议阶段的新特性需要使用到的插件集，用的不多~



### 其它插件











Babel-preset-env 使用：使用到了 **browserslist** 工具进行浏览器过滤

