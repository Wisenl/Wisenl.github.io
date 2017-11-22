---
layout:     post
title:      "Babel, just make sence of it!"
subtitle:   “Babel学习之弄懂就行”
date:       2017-11-20
author:     “Wisenl”
header-img: "img/2017-11-20.png"
tags:
    - 技术
    - 工具
---

> Use next generation JavaScript, today.			—— Babel

Babel，用于编写下一代的 JavaScript 的编译器。据说，它承担着推动 JavaScript 发展的历史重任。它实在太出色了，我们现在就来了解吧！

## 历史

2015年10月底，Babel 6 正式发布，整个版本被彻底的重构和重新定位，Babel开始从一个单一的JavaScript 转换器进化为一个JavaScript 工具平台。

新版本的最大改进，应该是引入了模块化的概念。较之上一个版本Babel 5的一键安装全家桶模式，新版本将Babel的各个功能模块拆分出来，让开发者自行配置以达到更贴合项目需求的目的。但同时为了向下兼容我们这些犯懒开发者， Babel 6 也提供了preset（预设） 这个功能来统一安装一组配置好的包，我们只要选择使用哪个preset 就好了。再者就是提供了一个 .babelrc 文件以供我们对Babel 进行统一配置。

不过以上都不重要，我们要时刻牢记自己的目标——弄懂就行。只是有一点需要明确：知之，用之！知道它是什么，才能用的更顺手。

## 项目

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

* **Babel-preset-es20xx**

这些插件集里面组装好了相应ES版本中需要的功能。但是需要注意，ES2016 和 ES2017 的preset 只负责编译该ES版本所新增的特性，即便你安装了es2017，还是要安装es2015。es20xx的preset即将被官方deprecated!

* **babel-preset-env**

相较于babel-preset-es20xx, 官方更推荐我们使用babel-preset-env, 它可以根据当前配置的运行环境来添加需要用到的plugins（以及polyfill）。俗话说，一代版本一代神。不同的浏览器版本所实现的ES特性是不同的，设想这样一个场景：

我有一个老版本的浏览器需要作为兼容目标，它可能不支持 async 功能，但是支持 let const 等功能，那我只要使用babel-preset-env 这个preset 同时指定一下我这个目标浏览器的版本，babel就会根据该浏览器的ES标准自动补上 async 语法的plugin 垫片而不是一股脑把所有不需要的plugin装上。"Babel preset that automatically determines the Babel plugins you need based on your supported environments. Uses compat-table."  这是官方描述

这么厉害，它是怎么实现的呢？

首先获取到第三方统计的浏览器兼容数据 [compat-table](https://kangax.github.io/compat-table/es6/) ，然后在ES特性和Babel插件间建立一种映射关系，最后使用 [browserslist](https://github.com/ai/browserslist) 来指定所需支持的环境 （如 >1%, last 2 versions），如果不指定的话，默认包含所有带年份的preset ( es20xx)。当然，在node环境中使用也可以指定node版本。

* **Babel-preset-react** 和 **babel-preset-flow**

Babel-preset-flow ,只包含了一个 transform-flow-strip-types 插件，用来转译flow.js的语法功能。

babel-preset-react 包含了babel-preset-flow 和 转译jsx语法的相关插件。它用来抽取flow类型并转化JSX使其通过createElement 调用。

* **babel-preset-state-x**

提议阶段的新特性需要使用到的插件集，用的不多~



### 其它packages

* **babel-cli**

  安装了它，我们就能在终端使用命令行来运行babel：

  ```shell
  babel es6File.js --out-file newEs5File.js
  ```

  给你文档 —> [如何使用CLI工具](https://babeljs.cn/docs/usage/cli)

* **babel-node**

  babel-node 是 babel 提供给 node 环境使用的工具，主要用来在开发时方便执行一些脚本，用它就能执行一些node下不支持的ES6语法。如：

  ```shell
  node_modules/.bin/babel-node --presets env
  >3**3
  27
  ```

  node（我测试的是6.11.3版本） 环境是不支持这样的幂运算的，但是用babel-node 就可以执行了~

  安装babel-cli就能使用该babel-node命令，不需要单独安装，相当于是个内部包，生产环境下也用不到。


* **babel-runtime**

  首先我们要知道Babel实现编译的功能主要分为两种（常称为babel 和 polyfill）：一种是通过babel-core 实现的语法编译功能，如箭头函数；另一种是内建的新对象及其API，如Set，Map，object.asign() ，generator等，这些都是通过babel-runtime中的core-js和 regenerator 来实现的。而babel-runtime 只是对这两个库进行了引入导出。

  core-js 和 regenerator 把polyfill都集合起来，可是用的时候未必会全都用到，不利于优化。于是就有了babel-plugin-transform-runtime，它会分析AST中是否引用到babel-runtime 中的polyfill，引用了就在此模块中插入需要的功能代码。

* **babel-polyfill**

  babel-runtime 固然好，可是它的作用域受到了限制。官方是推荐在生产环境中引入 babel-polyfill 来模拟一个完整的 ES6+ 的环境，它在项目中一次引入所有需要的polyfill来满足生产环境需求

  这里引用下 [sunyongjian](https://github.com/sunyongjian/blog) 对这两者的总结

  > * babel-polyfill 是当前环境注入这些 es6+ 标准的垫片，好处是引用一次，不再担心兼容，而且它就是全局下的包，代码的任何地方都可以使用。缺点也很明显，它可能会污染原生的一些方法而把原生的方法重写。如果当前项目已经有一个 polyfill 的包了，那你只能保留其一。而且一次性引入这么一个包，会大大增加体积。如果你只是用几个特性，就没必要了，如果你是开发较大的应用，而且会频繁使用新特性并考虑兼容，那就直接引入吧。
  > * transform-runtime 是利用 plugin 自动识别并替换代码中的新特性，你不需要再引入，只需要装好 babel-runtime 和 配好 plugin 就可以了。好处是按需替换，检测到你需要哪个，就引入哪个 polyfill，如果只用了一部分，打包完的文件体积对比 babel-polyfill 会小很多。而且 transform-runtime 不会污染原生的对象，方法，也不会对其他 polyfill 产生影响。所以 transform-runtime 的方式更适合开发工具包，库，一方面是体积够小，另一方面是用户（开发者）不会因为引用了我们的工具，包而污染了全局的原生方法，产生副作用，还是应该留给用户自己去选择。缺点是随着应用的增大，相同的 polyfill 每个模块都要做重复的工作（检测，替换），虽然 polyfill 只是引用，编译效率不够高效。


* **babel-register**

  这个就是babel-node 实现它脚本编译功能的包。babel-node 在执行脚本文件的时候，同时也会用babel编译它所require的文件，而且不需要输出文件就能实时编译。

## .babelrc 配置文件

```js
{
  "presets": [
    ["env",{
      "target":{    // 支持的环境
        "browers":["last 2 versions", "IE >= 9"]	// ie9以上，以及主流浏览器的最近两个版本
      	"node": "current"     // 当前版本node环境
      },
      "modules": false,     // 设置ES6模块转译的格式
      "loose":true
    }]
  ],
  "plugins": [
    ["transform-runtime", {  // 启用插件
      "helpers": true,
      "polyfill": true,
      "regenerator": true,
      "moduleName": "babel-runtime"
    }]
  ]
}
```
