# Restful API

## Restful API规范

`restful api`是用于在前端与后台进行通信的一套规范。使用这个规范可以让前后端开发变得更加轻松。以下将讨论这套规范的一些设计细节。

### 一、协议：

采用`http`或者`https`协议。

### 二、数据传输格式：

数据之间传输的格式应该都使用`json`，而不使用`xml`。

### 三、url链接：

url链接中，不能有动词，只能有名词。并且对于一些名词，如果出现复数，那么应该在后面加`s`。

比如：获取文章列表，应该使用`articles`，而不应该使用`get_article`

### 四、HTTP请求的方法：

1. `GET`：从服务器上获取资源。
2. `POST`：在服务器上新创建一个资源。
3. `PUT`：在服务器上更新资源。（客户端提供所有改变后的数据）
4. `PATCH`：在服务器上更新资源。（客户端只提供需要改变的属性）
5. `DELETE`：从服务器上删除资源。

#### 示例如下：

- `GET /users/`：获取所有用户。
- `POST /user/`：新建一个用户。
- `GET /user/id/`：根据id获取一个用户。
- `PUT /user/id/`：更新某个id的用户的信息（需要提供用户的所有信息）。
- `PATCH /user/id/`：更新某个id的用户信息（只需要提供需要改变的信息）。
- `DELETE /user/id/`：删除一个用户。

### 五、状态码：

| 状态码 | 原生描述              | 描述                                                         |
| :----- | :-------------------- | :----------------------------------------------------------- |
| 200    | OK                    | 服务器成功响应客户端的请求。                                 |
| 400    | INVALID REQUEST       | 用户发出的请求有错误，服务器没有进行新建或修改数据的操作     |
| 401    | Unauthorized          | 用户没有权限访问这个请求                                     |
| 403    | Forbidden             | 因为某些原因禁止访问这个请求                                 |
| 404    | NOT FOUND             | 用户发送的请求的url不存在                                    |
| 406    | NOT Acceptable        | 用户请求不被服务器接收（比如服务器期望客户端发送某个字段，但是没有发送）。 |
| 500    | Internal server error | 服务器内部错误，比如出现了bug                                |

## Flask-Restful插件

### 一、介绍：

`Flask-Restful`是一个专门用来写`restful api`的一个插件。使用他可以快速的集成`restful api`功能。在`app`的后台以及纯`api`的后台中，这个插件可以帮助我们节省很多时间。当然，如果在普通的网站中，这个插件就显得有些鸡肋了，因为在普通的网页开发中，是需要去渲染HTML代码的，而`Flask-Restful`在每个请求中都是返回`json`格式的数据。

### 二、安装：

`Flask-Restful`需要在`Flask 0.8`以上的版本，在`Python2.6`或者`Python3.3`上运行。通过`pip install flask-restful`即可安装。

### 三、定义Restful的视图：

如果使用`Flask-Restful`，那么定义视图函数的时候，就要继承自`flask_restful.Resource`类，然后再根据当前请求的`method`来定义相应的方法。比如期望客户端是使用`get`方法发送过来的请求，那么就定义一个`get`方法。类似于`MethodView`。示例代码如下：

```python
from flask import Flask, render_template, url_for
from flask_restful import Api, Resource

app = Flask(__name__)
# 用Api来绑定app
api = Api(app)


class IndexView(Resource):
    def get(self):
        return {"username": "萧兮"}


api.add_resource(IndexView, '/', endpoint='index')

```

注意事项：

1. `endpoint`是用来给`url_for`反转`url`的时候指定的。如果不写`endpoint`，那么将会使用视图的名字的小写来作为`endpoint`。
2. `add_resource`的第二个参数是访问这个视图函数的`url`，这个`url`可以跟之前的`route`一样，可以传递参数。并且还有一点不同的是，这个方法可以传递多个`url`来指定这个视图函数。

### 四、参数解析：

`Flask-Restful`插件提供了类似`WTForms`来验证提交的数据是否合法的包，叫做`reqparse`。以下是基本用法：

```python
parser = reqparse.RequestParser()
parser.add_argument('username',type=str,help='请输入用户名')
args = parser.parse_args()
```

`add_argument`可以指定这个字段的名字，这个字段的数据类型等。以下将对这个方法的一些参数做详细讲解：

1. `default`：默认值，如果这个参数没有值，那么将使用这个参数指定的值。
2. `required`：是否必须。默认为False，如果设置为`True`，那么这个参数就必须提交上来。
3. `type`：这个参数的数据类型，如果指定，那么将使用指定的数据类型来强制转换提交上来的值。
4. `choices`：选项。提交上来的值只有满足这个选项中的值才符合验证通过，否则验证不通过。
5. `help`：错误信息。如果验证失败后，将会使用这个参数指定的值作为错误信息。
6. `trim`：是否要去掉前后的空格。

### 五、restful基本使用

插件安装好后，就可以导入模块了，看下面的示例

```python
from flask import Flask, jsonify
from flask_restful import Api, Resource, reqparse

# 模拟的用户信息
USERS = [
    {"name": "zhangsan"},
    {"name": "lisi"},
    {"name": "wangwu"},
    {"name": "zhaoliu"}
]


class Users(Resource):
    def get(self):
        return jsonify(USERS)

    def post(self):
        # reqparse 过滤一些无用信息
        args = reqparse.RequestParser().add_argument('name',
                                                     type=str,
                                                     location='json',
                                                     required=True,
                                                     help="名字不能为空"
                                                     ).parse_args()

        if args['name'] not in USERS:
            USERS.append({"name": args['name']})

        return jsonify(USERS)

    def delete(self):
        USERS = []
        return jsonify(USERS)


app = Flask(__name__)
# 默认数据类型
api = Api(app, default_mediatype="application/json")
# 类视图 绑定url
api.add_resource(Users, '/users')


@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
```

`flask-restful`扩展通过`api.add_resource()`方法来添加路由，方法的第一个参数是一个类名，该类继承`Resource`基类，其成员方法定义了不同的`HTTP`请求方法的逻辑；第二个参数定义了`URL`路径。在`Users`类中，我们分别实现了`get`、`post`、`delete`方法，分别对应`HTTP`的`GET`、`POST`、`DELETE`请求。

另外，`flask-restful`还提供了`reqparse`，它可以方便地实现对`http`请求中客户端发送过来的数据进行校验处理，这有点像表单中的验证方法，在实际项目中非常实用。

程序启动以后，我们访问 `http://127.0.0.1:5001/users`，`GET`请求时会给出`USERS`的内容、`POST`请求时会在`USERS`中添加一项(如果不存在)并返回`USERS`更新后的内容。`DELETE`请求则清空`USERS`并返回空。

客户端部分，我们使用`postman`来模拟请求



![flask-restful-post](http://mk.xxoutman.cn/flask/59a37ac144fbbd22.png)

![flask-restful-delete](http://mk.xxoutman.cn/flask/3f32ddabdba3ba9e.png)

#### GET方法中如何获取参数

针对每个用户名，我们写个类，同样继承自`Resource`，在`get`方法中，接收参数`userid`，简单起见，`userid`定义为该用户名在`USERS`列表中的索引

```python
class UserId(Resource):
    def get(self, userid):
        return jsonify(
            {"name": USERS[int(userid)].get("name")}
        )

api.add_resource(UserId, '/user/<userid>',endpoint='userid')
```

在`api.add_resource()`方法中，第二个参数`/user/<userid>`中的`<userid>`，就是用户传递过来的参数，这点写法上跟`flask`路由的写法是一模一样的。程序启动后，访问 `http://127.0.0.1:5001/user/0` 获取的就是`USERS`列表中第一个用户的信息。

![flask-restful-get-param](http://mk.xxoutman.cn/flask/67654e4fb6e58040.png)

在flask-restful中添加日志,先来看一下示例

```python
import logging.config
from flask import Flask, jsonify
from flask_restful import Api, Resource, reqparse

logging.config.dictConfig(
    {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "simple": {"format": "%(asctime)s - %(name)s - %(levelname)s - %(message)s"}
        },
        "handlers": {
            "console": {
                "class": "logging.StreamHandler",
                "level": "DEBUG",
                "formatter": "simple",
                "stream": "ext://sys.stdout",
            },
            "info_file_handler": {
                "class": "logging.handlers.RotatingFileHandler",
                "level": "INFO",
                "formatter": "simple",
                "filename": "info.log",
                "maxBytes": 10485760,
                "backupCount": 50,
                "encoding": "utf8",
            },
            "error_file_handler": {
                "class": "logging.handlers.RotatingFileHandler",
                "level": "ERROR",
                "formatter": "simple",
                "filename": "errors.log",
                "maxBytes": 10485760,
                "backupCount": 20,
                "encoding": "utf8",
            },
            "debug_file_handler": {
                "class": "logging.handlers.RotatingFileHandler",
                "level": "DEBUG",
                "formatter": "simple",
                "filename": "debug.log",
                "maxBytes": 10485760,
                "backupCount": 50,
                "encoding": "utf8",
            },
        },
        "loggers": {
            "my_module": {"level": "ERROR", "handlers": ["console"], "propagate": "no"}
        },
        "root": {
            "level": "DEBUG",
            "handlers": ["error_file_handler", "debug_file_handler"],
        },
    }
)

USERS = [
    {"name": "zhangsan"},
    {"name": "lisi"},
    {"name": "wangwu"},
    {"name": "zhaoliu"}
]

class Users(Resource):
    def __init__(self, **kargs):
        self.logger = kargs.get('logger')

    def get(self):
        return jsonify(USERS)

    def post(self):
        args = reqparse.RequestParser() \
            .add_argument('name', type=str, location='json', required=True, help="名字不能为空") \
            .parse_args()

        self.logger.debug(args)

        if args['name'] not in USERS:
            USERS.append({"name": args['name']})

        return jsonify(USERS)

    def delete(self):
        USERS = []
        return jsonify(USERS)

app = Flask(__name__)
api = Api(app, default_mediatype="application/json")

api.add_resource(Users, '/users', resource_class_kwargs={
    "logger": logging.getLogger('/Users')
})

app.run(host='0.0.0.0', port=5001, use_reloader=True)
```

我们使用上次用到的`dictConfig`，主要的区别在于`api.add_resource()`方法中，使用了参数`resource_class_kwargs`，然后在`Resource`子类中的构造函数`__init__`，将日志记录器获取到，后面就可以在各个处理方法中使用了。再次使用`postman`发起`POST`请求，可以看到`debug.log`是这个样子的

![flask-restful-logging](http://mk.xxoutman.cn/flask/807c773888c3a3ac.png)