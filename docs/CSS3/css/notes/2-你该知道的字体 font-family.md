# 你该知道的font-family

## 1.各大网站最新 font-family

作为前端的一个习惯，浏览各个网站的时候总是喜欢打开开发者工具时不时审查元素一下。看了一下一些比较出名的网站**移动端**的 `font-family`：

- **天猫**：`font-family: "PingFang SC",miui,system-ui,-apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,sans-serif;`
- **Github**：`font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;`
- **CSS-Tricks**：`font-family: system-ui,-apple-system,BlinkMacSystemFont,segoe ui,Roboto,Helvetica,Arial,sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol;`

很有意思的是，类似 `system-ui`，`-apple-system`，`BlinkMacSystemFont` 等等早几年在 `font-family` 中几乎见不到的字体定义如今已经很普遍了。它们是什么呢？是一种特定的字体吗？

## 2.字体基础知识

在继续之前，我们先简单回顾关于字体的一些基础知识。

### 2.1.衬线字体与无衬线字体

就 Web 常用的一些字体而言，其实大体上分为**衬线字体**和**无衬线字体**。

**衬线字体** -- 关键字为 **serif**，意为有衬线的字体，衬线的意思是在字符笔画末端有叫做衬线的小细节的额外装饰，而且笔画的粗细会有所不同，这些细节在大写字母中特别明显。

![图片](http://mk.xxoutman.cn/css3_advance/640-16524251029156.png)

**无衬线字体** -- 关键字为 **sans-serif**，也就是无衬线的意思。专指西文中没有衬线的字体，与汉字字体中的黑体相对应。与衬线字体相反，该类字体通常是机械的和统一线条的，它们往往拥有相同的曲率，笔直的线条，锐利的转角。

中文下，无衬线字体就是黑体，黑体字也就是又称方体或等线体，没有衬线装饰，字形端庄，笔画横平竖直，笔迹全部一样粗细。

![图片](http://mk.xxoutman.cn/css3_advance/640-16524228647161.png)

对比着来看：

![图片](http://mk.xxoutman.cn/css3_advance/640-16524228647172.png)

## 3.font-family 关键字

对于 CSS 中的 `font-family` 而言，它有两类取值。

1. 一类是类似这样的具体的**字体族名**定义：`font-family: Arial` 这里定义了一个具体的字体样式，字体族名为 `Arial`;
2. 一类是**通用字体族名**，它表示一大类字体（并非单个），类似这样：`font-family: sans-serif` 。

其中，`sans-serif` 表无衬线字体族，例如， "Open Sans", "Arial" "微软雅黑" 等等。

关于**通用字体族名**，在 **CSS Fonts Module Level 3 -- Basic Font Properties** 中，定义了 5 个，也就是我们熟知的几个通用字体族名：

1. `serif` 衬线字体族
2. `sans-serif` 非衬线字体族
3. `monospace` 等宽字体，即字体中每个字宽度相同
4. `cursive` 草书字体
5. `fantasy` 主要是那些具有特殊艺术效果的字体

### 3.1.新增通用字体族关键字

而在  **CSS Fonts Module Level 4 -- Generic font families** 中，新增了几个关键字：

- `system-ui` 系统默认字体
- `emoji` 用于兼容 emoji 表情符号字符
- `math` 适用于数学表达式
- `fangsong` 此字体系列用于中文的（仿宋）字体。

我们看看用的最多的 `system-ui`。

### 3.2.system-ui

简单而言，`font-family: system-ui` 的目的就是在不同的操作系统的 Web 页面下，自动选择本操作系统下的默认系统字体。

默认使用特定操作系统的系统字体可以提高性能，因为浏览器或者 webview 不必去下载任何字体文件，而是使用已有的字体文件。`font-family: system-ui` 字体设置的优势之处在于它与当前操作系统使用的字体相匹配，对于文本内容而言，它可以得到最恰当的展示。

### 3.3.San Francisco Fonts

OK，简单了解了 `system-ui` 字体族。但是像 `-apple-system`、`BlinkMacSystemFont` 没有在最新的标准里出现。它们又代表什么意思呢？

在此之前，先了解下 `San Francisco Fonts` 。

`San Francisco Fonts` 又叫旧金山字体，是一款西文字体。随着 iOS 9 更新面世，在 WatchOS 中随 Apple Watch 一起悄然发售，并且还将在 Apple TV 上的新 tvOS 中使用。

`San Francisco Fonts` 在 iOS 系统上用于替代升级另外一款西文字体 `Helvetica Neue`。Apple 做了一些重要的改变，使其成为平台上更好的， 甚至是完美的西文字体。

![图片](http://mk.xxoutman.cn/css3_advance/1652426631669.png)

### 3.4.-apple-system/BlinkMacSystemFont 

话说回来。正如每个前端开发人员都知道的那样，将一个功能纳入规范是一回事，将其纳入浏览器又是另一回事。

幸运的是，`system-ui` 的普及很快。Chrome 和 Safari 都可以在各种平台上完全支持它。只有 Mozilla 和 Windows 相对落后。

看看 `system-ui` 的兼容性，**Can i Use -- system-ui**：

![图片](http://mk.xxoutman.cn/css3_advance/640-16524250765743.png)

仔细看上图的最后两行：

- Supported as the -apple-system value (only on macOS and iOS)
- Supported as the BlinkMacSystemFont value (only on macOS)

考虑到不同平台及向后兼容，在 macOS 和 iOS 上，我们需要使用 `-apple-system` 及 `BlinkMacSystemFont` 来兼容适配 `system-ui` 标准。

### 3.5.Segoe UI

Segoe UI 是 Windows 从 Vista 开始的默认西文字体族，只有西文，不支持汉字，属于无衬线体。

它也表示一个系列而不是某一款单一字体。使用 `font-family: Segoe UI` 可以在 Windows 平台及 Windows Phone 上选取最佳的西文字体展示。

### 3.6.Roboto

Roboto 是为 Android 操作系统设计的一个无衬线字体家族。Google 描述该字体为“现代的、但平易近人”和“有感情”的。

这个字体家族包含Thin、Light、Regular、Medium、Bold、Black六种粗细及相配的斜体。

## 4.网站字体定义推荐写法

到此，我们可以总结一下了。以 **CSS-Tricks**网站的 font-family 定义为例子：

```css
{
  font-family: 
    system-ui,-apple-system,BlinkMacSystemFont,segoe ui,Roboto,
    Helvetica,Arial,
    sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol;
}
```

1. `system-ui`，使用各个支持平台上的默认系统字体
2. `-apple-system`， 在一些稍低版本 Mac OS X 和 iOS 上，它针对旧版上的 Neue Helvetica 和 Lucida Grande 字体，升级使用更为合适的 San Francisco Fonts
3. `BlinkMacSystemFont`，针对一些 Mac OS X 上的 Chrome 浏览器，使用系统默认字体
4. `segoe ui`，在 Windows 及 Windows Phone 上选取系统默认字体
5. `Roboto`，面向 Android 和一些新版的的 Chrome OS
6. `Helvetica,Arial`，在针对不同操作系统不同平台设定采用默认系统字体后，针对一些低版本浏览器的降级方案
7. `sans-serif`，兜底方案，保证字体风格统一，至少也得是无衬线字体

上述 5 个字体族定义，优先级由高到底，可以看到，它们 5 个都并非某个特定字体，基本的核心思想都是选择对应平台上的默认系统字体。

涵盖了 iOS、MAC OS X、Android、Windows、Windows Phone 基本所有用户经常使用的主流操作系统。

使用系统默认字体的主要原因是性能。字体通常是网站上加载的最大/最重的资源之一。如果我们可以使用用户机器上已有的字体，我们就完全不需要再去获取字体资源，从而使加载时间明显加快。

并且系统字体的优点在于它与当前操作系统使用的相匹配，因此它的文本展示必然也是一个让人舒适展示效果。

当然，上述 `font-family` 的定义不一定是最佳的。譬如天猫在最前面添加了 `"PingFang SC",miui,..`必定也有他们的业务上的考虑。但是一些 fallback 方案向后兼容的思想都是一致的，值得参考学习。

## 5.字体定义规则建议

结合 **你该知道的字体 font-family**最后给出的规则建议，加上本文对各系统默认字体的介绍及最新的字体定义推荐，给出现阶段字体定义规则的建议如下：

### 1、尽量使用系统默认字体

使用系统默认字体的主要原因是性能，并且系统字体的优点在于它与当前操作系统使用的相匹配，因此它的文本展示必然也是一个让人舒适展示效果。

### 2、兼顾中西，西文在前，中文在后

中文或者西文（英文）都要考虑到。由于大部分中文字体也是带有英文部分的，但是英文部分又不怎么好看，但是英文字体中大多不包含中文。通常会先进行英文字体的声明，选择最优的英文字体，这样不会影响到中文字体的选择，中文字体声明则紧随其次。

### 3、兼顾多操作系统

选择字体的时候要考虑多操作系统。例如 MAC OS 下的很多中文字体在 Windows 都没有预装，为了保证 MAC 用户的体验，在定义中文字体的时候，先定义 MAC 用户的中文字体，再定义 Windows 用户的中文字体；

### 4、兼顾旧操作系统，以字体族系列 serif 和 sans-serif 结尾

当使用一些非常新的字体时，要考虑向下兼容，兼顾到一些极旧的操作系统，使用字体族系列 serif 和 sans-serif 结尾总归是不错的选择。
