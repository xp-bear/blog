# Flask-WTF插件

## Flask-WTF表单验证

`Flask-WTF`是简化了`WTForms`操作的一个第三方库。`WTForms`表单的两个主要功能是**验证用户提交数据的合法性**以及**渲染模板**。当然还包括一些其他的功能：`CSRF保护`。安装`Flask-WTF`默认也会安装`WTForms`，因此使用以下命令来安装`Flask-WTF`:

```python
pip install flask-wtf
pip install email_validator  #安装邮箱验证器
```

### 一、登录表单验证：

安装完`Flask-WTF`后。来看下第一个功能，就是用表单来做数据验证，现在有一个`forms.py`文件，然后在里面创建一个`LoginForm`的注册验证表单：

```python
import wtforms
from wtforms.validators import length, email

# 登录验证器
class LoginForm(wtforms.Form):
    email = wtforms.StringField('用户名: ', validators=[length(min=5, max=20), email()])
    password = wtforms.StringField('邮箱: ', validators=[length(min=6, max=20)])
```

在这个里面指定了需要上传的参数，并且指定了验证器，比如`email`的长度应该在`5-20`之间。`email`必须要满足邮箱的格式。`password`长度必须在`6-20`之间才能通过验证。

写完表单后，接下来就是`login.html`文件：

```python
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>登录</title>
</head>
<body>
<form action="/login" method="POST">
    <table>
        <tbody>
        <tr>
            <td>邮箱:</td>
            <td><input type="text" name="email"></td>
        </tr>
        <tr>
            <td>密码:</td>
            <td><input type="password" name="password"></td>
        </tr>
        <tr>
            <td>
                <button>登录</button>
            </td>
        </tr>
        </tbody>
    </table>
</form>
</body>
</html>
```

再来看视图函数`login`：

```python
from flask import Flask, render_template, request
from forms import LoginForm

app = Flask(__name__)


@app.route('/')
def hello_world():
    return '首页'


@app.route('/login/', methods=['GET', "POST"])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        form = LoginForm(request.form)
        print(request.form.get('email'))
        if form.validate():
            return '登录成功!'
        else:
            return '邮箱或者密码错误!'


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
```

`LoginForm`传递的是`request.form`进去进行初始化，并且判断`form.validate`会返回用户提交的数据是否满足表单的验证。

### 二、注册表单验证：

现在来看一下注册逻辑`RegistForm`表单验证`forms.py` ：

```python
import wtforms
from wtforms.validators import length, email, EqualTo


class RegistForm(wtforms.Form):
    name = wtforms.StringField('用户名：', validators=[length(min=4, max=25)])
    email = wtforms.StringField('邮箱：', validators=[email()])
    password = wtforms.StringField('密码：', validators=[length(min=6, max=10)])
    password_confirm = wtforms.StringField('确认密码：', validators=[EqualTo('password')])
```

以上增加了第一个位置参数，用来在html文件中，做标签提示作用。

在`app.py`中的视图函数中，修改为如下：

```python
from flask import Flask, render_template, request
from forms import RegistForm

app = Flask(__name__)


@app.route('/')
def hello_world():
    return '首页'


@app.route('/register/', methods=['GET', "POST"])
def register():
    if request.method == 'GET':
        return render_template('register.html')
    else:
        form = RegistForm(request.form)
        print('表单参数: ', request.form.get('email'))
        if form.validate():
            return '注册成功!'
        else:
            return '注册失败,表单验证没有通过!'



if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
```

接下来看下`register.html`文件：

```python
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<form action="/register/" method="POST">
    <table>
        <tr>
            {# 创建一个CSRF令牌的隐藏字段。这是为了防止 跨站请求伪造 攻击。#}
            <input id="csrf_token" name="csrf_token" type="hidden"/>
        </tr>
        <tr>
            <td>用户名:</td>
            <td><input type="text" name="name"></td>
        </tr>
        <tr>
            <td>邮箱：</td>
            <td><input type="text" name="email"></td>
        </tr>
        <tr>
            <td>密码：</td>
            <td><input type="text" name="password"></td>
        </tr>
        <tr>
            <td>确认密码：</td>
            <td><input type="text" name="password_confirm"></td>
        </tr>
        <tr>
            <td></td>
            <td>
                <button>提交</button>
            </td>
        </tr>
    </table>
</form>
</body>
</html>
```

注意: EqualTo 字段 可能会导致 表单验证不通过

### 三、常用的验证器：

数据发送过来，经过表单验证，因此需要验证器来进行验证，以下对一些常用的内置验证器进行讲解：

- Email：验证上传的数据是否为邮箱。
- EqualTo：验证上传的数据是否和另外一个字段相等，常用的就是密码和确认密码两个字段是否相等。
- InputRequired：原始数据的需要验证。如果不是特殊情况，应该使用`InputRequired`。
- DataRequired: 数据是否是必填项。
- Length：长度限制，有min和max两个值进行限制。
- NumberRange：数字的区间，有min和max两个值限制，如果处在这两个数字之间则满足。
- Regexp：自定义正则表达式。
- URL：必须要是`URL`的形式。
- UUID：验证`UUID`。

```python
import wtforms
from wtforms.validators import length, email, EqualTo, DataRequired, Regexp


# 个人用户验证器
class PersonalForm(wtforms.Form):
    name = wtforms.StringField('用户名：', validators=[length(min=4, max=25), DataRequired()])
    email = wtforms.StringField('邮箱：', validators=[email()])
    password = wtforms.StringField('密码：', validators=[length(min=6, max=10)])
    captche = wtforms.StringField('手机号：', validators=[Regexp('^1[35789]\d{9}$')])
    # 主要注意一下 正则的使用
```

`personal.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<form action="/personal/" method="POST">
    <table>
        <tr>
            {# 创建一个CSRF令牌的隐藏字段。这是为了防止 跨站请求伪造 攻击。#}
            <input id="csrf_token" name="csrf_token" type="hidden"/>
        </tr>
        <tr>
            <td>用户名:</td>
            <td><input type="text" name="name"></td>
        </tr>
        <tr>
            <td>邮箱：</td>
            <td><input type="text" name="email"></td>
        </tr>
        <tr>
            <td>密码：</td>
            <td><input type="text" name="password"></td>
        </tr>
        <tr>
            <td>手机号：</td>
            <td><input type="text" name="captche"></td>
        </tr>
        <tr>
            <td></td>
            <td>
                <button>提交</button>
            </td>
        </tr>
    </table>
</form>
</body>
</html>
```

### 四、完整代码:

```python
# coding:utf8
from flask import Flask, render_template, request
from forms import LoginForm, RegistForm, PersonalForm

app = Flask(__name__)


@app.route('/')
def hello_world():
    return '首页'


@app.route('/login/', methods=['GET', "POST"])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        form = LoginForm(request.form)
        print(request.form.get('email'))
        if form.validate():
            return '登录成功!'
        else:
            return '邮箱或者密码错误!'


@app.route('/register/', methods=['GET', "POST"])
def register():
    if request.method == 'GET':
        return render_template('register.html')
    else:
        form = RegistForm(request.form)
        print('表单参数: ', request.form.get('email'), request.form.get('name'))
        if form.validate():
            return '注册成功!'
        else:
            return '注册失败,表单验证没有通过!'


@app.route('/personal/', methods=['GET', "POST"])
def personal():
    if request.method == 'GET':
        return render_template('personal.html')
    else:
        form = PersonalForm(request.form)
        print('个人用户参数: ', request.form.get('email'), request.form.get('name'))
        if form.validate():
            return '个人用户校验通过!'
        else:
            return '个人用户表单验证没有通过!'


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
```

## 表单参数传递

主要通过 `request.values.get('name')` 来获取ajax传过来的值

`app.py`

```python
# coding:utf8
from flask import Flask, request, render_template, jsonify

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/index/', methods=["GET", "POST"])
def index():
    if request.method == "GET":
        return render_template('index.html')
    else:
        print(request.values.get('name'))
        name = request.values.get('name')
        password = request.values.get('password')
        return jsonify({
            'code': 200,
            "msg": "登录成功!",
            'name': name,
            'password': password
        })


if __name__ == '__main__':
    app.run()
```

`index.html`

```python
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>index页面</title>
    <script src="https://lib.baomitu.com/jquery/3.6.0/jquery.js"></script>
</head>
<body>
<div>
    <div>姓&emsp;名: <input type="text"></div>
    <div>密&emsp;码: <input type="password"></div>

    <div>验证码: <input type="text">
        <button>发送验证码</button>
    </div>
    <button class="btn">登录</button>
</div>
<script>
    $(function () {
        $('.btn').on('click', function () {
            {# 获取表单的值 #}
            let name = $('[type="text"]').val()
            let password = $('[type="password"]').val()
            console.log(name, password)

            {#  发送请求  #}
            $.ajax({
                url: "/index/",
                data: {name, password},
                method: "POST",
                success(res) {
                    console.log(res)
                }
            })

        })


    })
</script>
</body>
</html>
```

## CSRF保护：

### 1.什么是csrf

CSRF（Cross-site request forgery），也被称为：one click attack/session riding，中文名称：跨站请求伪造，缩写为：CSRF/XSRF。

一般来说，攻击者通过伪造用户的浏览器的请求，向访问一个用户自己曾经认证访问过的网站发送出去，使目标网站接收并误以为是用户的真实操作而去执行命令。常用于盗取账号、转账、发送虚假消息等。攻击者利用网站对请求的验证漏洞而实现这样的攻击行为，网站能够确认请求来源于用户的浏览器，却不能验证请求是否源于用户的真实意愿下的操作行为。

如下：

​        <a data-fancybox title="img" href="assets/31690c9f894def1d03290185d242125d.png">![img](assets/31690c9f894def1d03290185d242125d.png)</a>

其中Web A为存在CSRF漏洞的网站，Web B为攻击者构建的恶意网站，User C为Web A网站的合法用户。
CSRF攻击攻击原理及过程如下：

1. 用户C打开浏览器，访问受信任网站A，输入用户名和密码请求登录网站A；
2. 在用户信息通过验证后，网站A产生Cookie信息并返回给浏览器，此时用户登录网站A成功，可以正常发送请求到网站A；
3. 用户未退出网站A之前，在同一浏览器中，打开一个TAB页访问网站B；
4. 网站B接收到用户请求后，返回一些攻击性代码，并发出一个请求要求访问第三方站点A；
5. 浏览器在接收到这些攻击性代码后，根据网站B的请求，在用户不知情的情况下携带Cookie信息，向网站A发出请求。网站A并不知道该请求其实是由B发起的，所以会根据用户C的Cookie信息以C的权限处理该请求，导致来自网站B的恶意代码被执行。

### 2、防御CSRF攻击

目前防御 CSRF 攻击主要有三种策略：

- 验证 HTTP Referer 字段；
- 在请求地址中添加 token 并验证；
- 在 HTTP 头中自定义属性并验证。

### 3、flask中使用csrf

在flask的表单中，默认是开启了`csrf`保护功能的，如果你想关闭表单的`csrf`保护，可以在初始化表单的时候传递`csrf_enabled=False`进去来关闭`csrf`保护。如果你想关闭这种默认的行为。如果你想在没有表单存在的请求视图函数中也添加`csrf`保护，可以开启全局的`csrf`保护功能：

```python
from flask_wtf.csrf import CSRFProtect
csrf = CSRFProtect(app) 
app.config['SECRET_KEY'] = '123'  #设置一个加密的字符串
```

或者是针对某一个视图函数，使用`csrf.protect`装饰器来开启`csrf`保护功能。并且如果已经开启了全局的`csrf`保护，想要关闭某个视图函数的`csrf`保护功能，可以使用`csrf.exempt`装饰器来取消本视图函数的保护功能。

```python
@csrf.exempt
@app.route('/index/', methods=['GET', "POST"])
def index():
    return 'inedx页面'
```

表单使用csrf_token,在表单里面创建一个输入框隐藏域,创建一个CSRF令牌的隐藏字段。这是为了防止 跨站请求伪造 攻击。

```python
<input type="hidden" name="csrf_token" value="{{ csrf_token() }}"/>
```



