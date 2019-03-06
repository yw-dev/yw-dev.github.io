---
path: "/post-nine"
cover: "../2018-10-23/20190225002804.jpg"
date: "2018-10-23"
title: "Post Number Nine"
published: true
subtitle: "Configuration"
type: "dev"
special: "JavaWeb开发系列"
categores: 'Java'
tags: ['JavaScript', 'Java']
---

也许应用中最常用到的组件就是Link，可见其重要性。其实Link组件几乎与<a>标签完全一样，除了一点：Link组件可以感知到被激活的路由。我们称当前在界面上显示的路由为被激活的路由。

紧接上一小节，刚打开网页我们看到的是渲染后的App组件。如果想从App页面导航到Boys页面和Girls页面，就需要在App组件中创建一些导航。代码如下：

// modules/App.js中
import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>明星特区</h1>
        <ul role="nav">
          <li><Link to="/boys">男神</Link></li>
          <li><Link to="/girls">女神</Link></li>
        </ul>
      </div>
    )
  }
})
现在再去打包运行（方法见上一节，以后不再重复说了哈），点击访问测试，你会惊奇的发现，点链接、回退、前进，都正常工作了。这就是Link组件的用法。
