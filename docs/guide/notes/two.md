# BFC 的理解

<span style='color:red'>块级 格式化 上下文</span>，它是指一个独立的块级渲染区域，只有 Block-level BOX 参与，该区域<span style='color:red'>拥有一套渲染规则来约束块级盒子的布局</span>，且与<span style='color:red'>区域外部无关</span>。

**从一个现象开始说起**

一个盒子不设置 height，当内容子元素都浮动时，无法撑起自身 , 这个盒子没有形成 BFC

**如何创建 BFC 方法**

1. float 的值不是 none 方法
2. position 的值不是 static 或者 relative
3. display 的值是 inline-block，flex 或者 inline-flex
4. overflow:hidden；

**BFC 的其他作用**

BFC 可以取消盒子 margin 場陷

BFC 可以可以阻止元素被浮动元素覆盖 (清除浮动)
