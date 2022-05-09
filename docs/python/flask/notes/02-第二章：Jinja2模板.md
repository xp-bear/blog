# jinja2 模板

## 模板简介：

模板是一个`web`开发必备的模块。因为我们在渲染一个网页的时候，并不是只渲染一个纯文本字符串，而是需要渲染一个有富文本标签的页面。这时候我们就需要使用模板了。在`Flask`中，配套的模板是`Jinja2`，`Jinja2`的作者也是`Flask`的作者。这个模板非常的强大，并且执行效率高。以下对`Jinja2`做一个简单介绍！

### 一、Flask 渲染`Jinja`模板：

要渲染一个模板，通过`render_template`方法即可，以下将用一个简单的例子进行讲解：

```python
from flask import Flask,render_template
app = Flask(__name__)

@app.route('/about/')
def about():
    return render_template('about.html')
```

当访问`/about/`的时候，`about()`函数会在当前目录下的`templates`文件夹下寻找`about.html`模板文件。

如果想更改模板文件地址，应该在创建`app`的时候，给`Flask`传递一个关键字参数`template_folder`，指定具体的路径，再看以下例子：

```python
from flask import Flask,render_template
app = Flask(__name__,template_folder=r'C:\templates')

@app.route('/about/')
def about():
    return render_template('about.html')
```

以上例子将会在 C 盘的`templates`文件夹中寻找模板文件。

还有最后一点是，如果模板文件中有参数需要传递，应该怎么传呢，我们再来看一个例子：

```python
# -*-coding:utf-8 -*-
from flask import Flask,render_template
app = Flask(__name__)

@app.route('/about/')
#第一种方式,以参数键值对传递
def about():
    return render_template('about.html',user='萧兮')

#第二种方式,构建一个上下文
@app.route('/about/')
def about():
    context = {
        "name": "萧兮"
    }
    return render_template('about.html', **context)
```

以上例子介绍了两种传递参数的方式，因为`render_template`需要传递的是一个关键字参数，所以第一种方式是顺其自然的。但是当你的模板中要传递的参数过多的时候，把所有参数放在一个函数中显然不是一个好的选择，因此我们使用字典进行包装，并且加两个`**`号，来转换成关键字参数。

## Jinja2 模版概述

### 一、概要：

先看一个简单例子：

```python
<html lang="en">
<head>
    <title>我的页面</title>
</head>
<body>
<ul id="navigation">
    {% for item in navigation %}
        <li></li>
    {% endfor %}
</ul>

{{ a_variable } }
{{ user.name } }
{{ user['name'] } }

{# 一个注释 #}
</body>
</html>
```

以上示例有需要进行解释：

- 第 7~9 行的`{% ... %}`：用来装载一个控制语句，以上装载的是`for`循环，以后只要是要用到控制语句的，就用`{% ... %}`。

- 第 12~14 行的`{{ ... } }`：用来装载一个变量，模板渲染的时候，会把这个变量代表的值替换掉。并且可以间接访问一个变量的属性或者一个字典的`key`。具体点`.`号访问和`[]`中括号访问，没有任何区别，都可以访问属性和字典的值。
- 第 16 行的`{# ... #}`：用来装载一个注释，模板渲染的时候会忽视这中间的值。

### 二、属性访问规则(了解)：

1. 比如在模板中有一个变量这样使用：`foo.bar`，那么在`Jinja2`中是这样进行访问的：
   - 先去查找`foo`的`bar`这个属性，也即通过`getattr(foo,'bar')`。
   - 如果没有，就去通过`foo.__getitem__('bar')`的方式进行查找。
   - 如果以上两种方式都没有找到，返回一个`undefined`。
2. 在模板中有一个变量这样使用：`foo['bar']`，那么在`Jinja2`中是这样进行访问：
   - 通过`foo.__getitem__('bar')`的方式进行查找。
   - 如果没有，就通过`getattr(foo,'bar')`的方式进行查找。
   - 如果以上没有找到，则返回一个`undefined`。

## Jinja2 模版过滤器

过滤器是通过管道符号（`|`）进行使用的，例如：`{{ name|length } }`，将返回 name 的长度。过滤器相当于是一个函数，把当前的变量传入到过滤器中，然后过滤器根据自己的功能，再返回相应的值，之后再将结果渲染到页面中。`Jinja2`中内置了许多过滤器，在[这里](https://jinja.palletsprojects.com/en/3.0.x/templates/#list-of-builtin-filters)可以看到所有的过滤器，现对一些常用的过滤器进行讲解：

1. `abs(value)`：返回一个数值的绝对值。 例如：`{{ -1|abs } }`。

2. `default(value,default_value,boolean=false)`：如果当前变量没有值，则会使用参数中的值来代替。例如:

   `{{ name|default('萧兮') } }` —如果 name 不存在，则会使用`萧兮`来替代。

   `{{ old|default('萧兮',boolean=False) } } ` boolean=False 默认是在只有这个变量为`undefined`的时候才会使用`default`中的值，如果想使用 Boolean 的 true 或 false 进行渲染默认值，则需要使用 boolean=true。

3. `autoescape` :将 HTML 字符串转成语义化内容

   ```python
   #app.py里面
   context={"html": "<h3>我是h3</h3>"}

   #模板里面
   {% autoescape False %}
   {{ html } }
   {% endautoescape %}
   ```

4. `first(value)`：返回一个序列的第一个元素。`{{names|first} }` 列表与字典都适用。

5. `last(value)`：返回一个序列的最后一个元素。示例：`names|last`。

6. `length(value)`：返回一个序列或者字典的长度。示例：`names|length`。

7. `join(value,d=',')`：将一个序列用`d`这个参数的值拼接成字符串。例如: `{{ list|join('-') } }`

8. `int(value)`：将值转换为`int`类型。`{{ number|int } }`

9. `float(value)`：将值转换为`float`类型。` {{ number|float } }`

10. `lower(value)`：将字符串转换为小写。

11. `upper(value)`：将字符串转换为小写。

12. `replace(value,old,new)`： 替换将`old`替换为`new`的字符串。 例如: `{{ case|replace('as',"As") } }`

13. `striptags(value)`：删除字符串中所有的 HTML 标签，如果出现多个空格，将替换成一个空格。

14. `trim`(value)：截取字符串前面和后面的空白字符。

15. `string(value)`：将变量转换成字符串。

16. `wordcount(s)`：计算一个长字符串中单词的个数。

## 控制语句

所有的控制语句都是放在`{% ... %}`中，并且有一个语句`{% endxxx %}`来进行结束，`Jinja2`中常用的控制语句有`if/for..in..`，现对他们进行讲解：

测试数据:

```python
 context = {
        "xiaoxi": {"sick": False, "headache": False},
        "users": [{"username": "张三"}, {"username": "李四"}],
        "dic": {"name": 'xiaoxi', 'age': 18},
        "case": "ABCdef"
    }
```

1. `if`：if 语句和`python`中的类似，可以使用`>，<，<=，>=，==，!=`来进行判断，也可以通过`and，or，not，()`来进行逻辑合并操作，以下看例子：

```python
 context = {
        "xiaoxi": {"sick": False, "headache": False}
    }

    {% if xiaoxi.sick %}
        萧兮生病了!
    {% elif xiaoxi.headache %}
        萧兮头痛了!
    {% else %}
        萧兮一切安好!
    {% endif %}
```

2. `for...in...`：`for`循环可以遍历任何一个序列包括**列表、字典、元组**。并且可以进行反向遍历，以下将用几个例子进行解释：

   - 普通的遍历：

     ```python
     <ul>
     {% for user in users %}
     	<li>{{ user.username } }</li>
     {% endfor %}
     </ul>
     ```

   - 遍历字典：

     ```python
     <ul>
         {% for key,value in users.items() %}
             <li>{{ key } }--{{ value } }</li>
         {% endfor %}
     </ul>
     ```

- 如果序列中没有值的时候，进入`else`：

  ```python
     <ul>
     {% for user in users %}
     	<li>{{ user.username } }</li>
     {% else %}
     	<li>暂无数据</li>
     {% endfor %}
     </ul>
  ```

并且`Jinja2模板中`中的`for`循环还包含以下变量，可以用来获取当前的遍历状态：

| 变量        | 描述                                   |
| :---------- | :------------------------------------- |
| loop.index  | 当前迭代的索引（从 1 开始）            |
| loop.index0 | 当前迭代的索引（从 0 开始）            |
| loop.first  | 是否是第一次迭代，返回 True 或 False   |
| loop.last   | 是否是最后一次迭代，返回 True 或 False |
| loop.length | 序列的长度                             |

```python
{% for user in users %}
        <li>{{ loop.index } }</li>
        <li>{{ loop.index0 } }</li>
        <li>{{ loop.first } }</li>
        <li>{{ loop.last } }</li>
        <li>总长度: {{ loop.length } }</li>
{% endfor %}
```

另外，**不可以**使用`continue`和`break`表达式来控制循环的执行。

## 测试器

测试器主要用来判断一个值是否满足某种类型，并且这种类型一般通过普通的`if`判断是有很大的挑战的。语法是：`if...is...`，先来简单的看个例子：

```python
	{% if case is upper %}
        case不全是是大写
    {% else %}
        case有小写
    {% endif %}
```

以上判断`case`这个变量是否为大小写，`Jinja`中内置了许多的测试器，看以下列表：

| 测试器             | 说明                   |
| ------------------ | :--------------------- |
| `upper(object)`    | 是否全是大写。         |
| `lower(object)`    | 是否全是小写。         |
| `string(object)`   | 是否是一个字符串。     |
| `sequence(object)` | 是否是一个序列(列表)。 |
| `number(object)`   | 是否是一个数字。       |
| `odd(object)`      | 是否是奇数。           |
| `even(object)`     | 是否是偶数。           |

## 宏和 import 语句

### 一、宏：

模板中的宏跟 python 中的函数类似，可以传递参数，但是不能有返回值，可以将一些经常用到的代码片段放到宏中，然后把一些不固定的值抽取出来当成一个变量，以下将用一个例子来进行解释：

```python
{% macro input(name, value='我是默认值', type='text') %}
	<input name="{{ name } }" value="{{ value|e } }" type="{{ type } }">
{% endmacro %}
```

以上例子可以抽取出了一个 input 标签，指定了一些默认参数。那么我们以后创建`input`标签的时候，可以通过他快速的创建：

```python
<p>{{ input('username') } }</p>
<p>{{ input('password', type='password',value='') } }</p>
```

### 二、import 语句：

在真实的开发中，会将一些常用的宏单独放在一个文件中，在需要使用的时候，再从这个文件中进行导入。`import`语句的用法跟`python`中的`import`类似，可以直接`import...as...`，也可以`from...import...`或者`from...import...as...`，假设现在有一个文件，叫做`forms.html`，里面有两个宏分别为`input`和`textarea`，如下：

```python
{% macro input(name, value='', type='text') %}
    <input name="{{ name } }" value="{{ value } }" type="{{ type } }">
{% endmacro %}

{% macro textarea(name, value='', rows=10, cols=40) %}
    <textarea name="{{ name } }" rows="{{ rows } }" cols="{{ cols } }">{{ value } }</textarea>
{% endmacro %}
```

### 三、导入宏的例子：

1. `import...as...`形式：

   ```python
   {% import 'forms.html' as forms %}
   <dl>
    <dt>Username</dt>
    <dd>{{ forms.input('username') } }</dd>
    <dt>Password</dt>
    <dd>{{ forms.input('password', type='password') } }</dd>
   </dl>
   <p>{{ forms.textarea('comment') } }</p>
   ```

2. `from...import...as.../from...import...`形式：

   ```python
   {% from 'forms.html' import input as input_field, textarea %}
   <dl>
    <dt>Username</dt>
    <dd>{{ input_field('username') } }</dd>
    <dt>Password</dt>
    <dd>{{ input_field('password', type='password') } }</dd>
   </dl>
   <p>{{ textarea('comment') } }</p>
   ```

## include 和 set 语句

### 一、include 语句：

`include`语句可以把一个模板引入到另外一个模板中，类似于把一个模板的代码 copy 到另外一个模板的指定位置，看以下例子：

`header.html`

```python
<header>
    我是头部
</header>
<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
</ul>
```

```python
{% include 'header.html' %}
	主体内容
{% include 'footer.html' %}
```

### 二、赋值（set）语句：

有时候我们想在在模板中添加变量，这时候赋值语句（set）就派上用场了，先看以下例子：

```python
{% set name='萧兮' %}
```

那么以后就可以使用`name`来代替`萧兮`这个值了，同时，也可以给他赋值为列表和元组：

```python
{% set urls = [('index.html', 'Index'), ('about.html', 'About')] %}
```

赋值语句创建的变量**在其之后**都是有效的，如果不想让一个变量污染全局环境，可以使用`with`语句来创建一个内部的作用域，将`set`语句放在其中，这样创建的变量只在`with`代码块中才有效，看以下示例：

```python
{% with %}
    {% set foo = 42 %}
    {{ foo } }           #这里的foo的值是42
{% endwith %}
```

也可以在`with`的后面直接添加变量，比如以上的写法可以修改成这样：

```python
{% with foo = 42 %}
    {{ foo } }
{% endwith %}
```

这两种方式都是等价的，一旦超出`with`代码块，就不能再使用`foo`这个变量了。

## 模版继承

`Flask`中的模板可以继承，通过继承可以把模板中许多重复出现的元素抽取出来，放在父模板中，并且父模板通过定义`block`给子模板开一个口，子模板根据需要，再实现这个`block`，假设现在有一个`base.html`这个父模板，代码如下：

```python
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="base.css" />
    <title>{% block title %}{% endblock %}</title> #这里挖了一个坑,命名为title
    {% block head %}{% endblock %}
</head>
<body>
    <div id="body">{% block body %}{% endblock %}</div>
    <div id="footer">
        {% block footer %} 我是底部 {% endblock %}
    </div>
</body>
</html>
```

以上父模板中，抽取了所有模板都需要用到的元素`html`、`body`等，并且对于一些所有模板都要用到的样式文件`style.css`也进行了抽取，同时对于一些子模板需要重写的地方，比如`title`、`head`、`body`都定义成了`block`，然后子模板可以根据自己的需要，再具体的实现。以下再来看子模板的代码：

```python
{% extends "base.html" %}
{% block title %}首页{% endblock %}

{% block head %}
    {{ super() } }
    <style type="text/css">
        .detail{
            color: red;
        }
    </style>
{% endblock %}

{% block body %}
    <h1>这里是首页</h1>
    <p class="detail">
      首页的内容
    </p>
{% endblock %}
```

首先第一行就定义了子模板继承的父模板，并且可以看到子模板实现了`title`这个`block`，并填充了自己的内容，再看`head`这个`block`，里面调用了`super()`这个函数，这个函数的目的是执行父模板中的代码，把父模板中的内容添加到子模板中，如果没有这一句，则父模板中处在`head`这个`block`中的代码将会被子模板中的代码给覆盖掉。

另外，模板中不能出现重名的`block`，如果一个地方需要用到另外一个`block`中的内容，可以使用`self.blockname`的方式进行引用，比如以下示例：

```python
{% extends "base.html" %}

{% block title %}
    这是标题
{% endblock %}

{% block body %}
    <h1>{{ self.title() } }</h1>
{% endblock %}
```

以上示例中`h1`标签重用了`title`这个`block`中的内容，子模板实现了`title`这个`block`，`h1`标签也能拥有这个值。

另外，在子模板中，所有的文本标签和代码都要添加到从父模板中继承的`block`中。否则，这些文本和标签将不会被渲染。

## 数据类型和运算符

### 一、数据类型：

`Jinja2`支持许多数据类型，包括：**字符串、整型、浮点型、列表、元组、字典、True/False**。

### 二、运算符：

- `+`号运算符：可以完成数字相加，字符串相加，列表相加。但是并不推荐使用`+`运算符来操作字符串，字符串相加应该使用`~`运算符。
- `-`号运算符：只能针对两个数字相减。
- `/`号运算符：对两个数进行相除。
- `%`号运算符：取余运算。
- `*`号运算符：乘号运算符，并且可以对字符进行相乘。
- `**`号运算符：次幂运算符，比如 2\*\*3=8。
- `in`操作符：跟 python 中的`in`一样使用，比如`{{1 in [1,2,3]} }`返回`true`。
- `~`号运算符：拼接多个字符串，比如`{{"Hello" ~ "World"} }`将返回`HelloWorld`。

## 静态文件的配置

`Web`应用中会出现大量的静态文件来使得网页更加生动美观。类似于`CSS`样式文件、`JavaScript`脚本文件、图片文件、字体文件等静态资源。在`Jinja`中加载静态文件非常简单，只需要通过`url_for`全局函数就可以实现，看以下代码：

```python
<link href="{{ url_for('static',filename='about.css') } }">
```

`url_for`函数默认会在项目根目录下的`static`文件夹中寻找`about.css`文件，如果找到了，会生成一个相对于项目根目录下的`/static/about.css`路径。当然我们也可以把静态文件不放在`static`文件夹中，此时就需要具体指定了，看以下代码：

```python
app = Flask(__name__,static_folder=r'C:\static')
```

那么访问静态文件的时候，将会到`/static`这个文件夹下寻找。
