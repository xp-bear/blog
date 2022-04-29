# Flask-Migrate插件

在实际的开发环境中，经常会发生数据库修改的行为。一般我们修改数据库不会直接手动的去修改，而是去修改`ORM`对应的模型，然后再把模型映射到数据库中。这时候如果有一个工具能专门做这种事情，就显得非常有用了，而`flask-migrate`就是做这个事情的。`flask-migrate`是基于`Alembic`进行的一个封装，并集成到`Flask`中，而所有的迁移操作其实都是`Alembic`做的，他能跟踪模型的变化，并将变化映射到数据库中。

使用`Flask-Migrate`需要安装，命令如下：

```python
pip install flask-migrate
```

## 一、基本用法：

要让`Flask-Migrate`能够管理`app`中的数据库，需要使用`Migrate(app,db)`来绑定`app`和数据库。假如现在有以下`app`文件：

```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from constants import DB_URI
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)
# 绑定app和数据库
migrate = Migrate(app,db)

class Address(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    email_address = db.Column(db.String(50))
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'))


class User(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String(20))
    password = db.Column(db.String(20))
    addresses = db.relationship('Address',backref='user')


db.create_all()

@app.route('/')
def hello_world():
    return 'Hello World!'

if __name__ == '__main__':
    app.run()
```

之后，就可以在命令行中映射`ORM`了。首先需要初始化一个迁移文件夹：

```
flask db init
```

然后再把当前的模型添加到迁移文件中：

```
flask db migrate
```

最后再把迁移文件中对应的数据库操作，真正的映射到数据库中：

```
flask db upgrade
```

## 二、项目重构：

现在是所有代码都写在一个文件中，这样会导致文件会越来越乱。所以进行一下项目重构，设置为以下的目录结构：
![1648284035225](http://mk.xxoutman.cn/flask/1648284035225.png)
以下对各个文件的作用进行解释。

### 1. constants.py文件：

常量文件，用来存放数据库配置。

```python
HOSTNAME = '127.0.0.1'
PORT = '3306'
DATABASE = 'flask_sqlalchemy'
USERNAME = 'root'
PASSWORD = 'root'
DB_URI = 'mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8'.format(USERNAME, PASSWORD, HOSTNAME, PORT, DATABASE)
```

### 2. ext.py文件：

把`db`变量放到一个单独的文件，而不是放在主`app`文件。这样做的目的是为了在大型项目中如果`db`被多个模型文件引用的话，会造成`from your_app import db`这样的方式，但是往往也在`your_app.py`中也会引入模型文件定义的类，这就造成了循环引用。所以最好的办法是把它放在不依赖其他模块的独立文件中。

```python
# ext.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
```

### 3. models.py文件：

模型文件，用来存放所有的模型，并且注意，因为这里使用的是`flask-script`的方式进行模型和表的映射，因此不需要使用`db.create_all()`的方式创建数据库。

```python
# models.py
from exts import db


# 开始写orm模型
class Article(db.Model):
    __tablename__ = 'article'  # 映射数据库的表名
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(200), nullable=False)
    content = db.Column(db.Text, nullable=False)
    # 外键：
    # 1，外键的数据类型一定要看，所引用的字段的类型
    # 2.db.Foreignkey("表名，字段名"）
    # 3，外键是属于数据库层面的，不推荐直接在ORM中使用
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    # relationship：
    # 1，第一个参数是模型的名字，必须要和模型的名字保持一致
    # 2.backref（back reference）：代表反向引用,代表对方访问我的时候的字段名称
    author = db.relationship("User", backref="articles")


# 实现一对多
class User(db.Model):
    __tablename__ = 'user'  # 映射数据库的表名
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(200), nullable=False)
    password = db.Column(db.String(200), nullable=False)


# 实现与USer模型一对一
class UserExtension(db.Model):
    __tabLename__ = "user_extension"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    school = db.Column(db.String(100))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    # db.backref
    # 1，在反向引用的时候，如果需要传递一些其他的参数，那么就需要用到这个函数，香则不需要使用，只要在relationship的backref参放上，设置反向引用的名称就可以了
    # 2，uselist=False:代表反向引用的时候，不是一个列表，而是一个对象
    user = db.relationship("User", backref=db.backref("extension", uselist=False))
```

### 4.urls.py文件

```python
# coding:utf8
from flask import Blueprint
from models import UserExtension, Article, User
from exts import db

bp = Blueprint('index', __name__, url_prefix='/')


@bp.route('/oto/')
def oto():
    user = User(username='萧兮大大', password='123456')
    extension = UserExtension(school='清华大学')
    user.extension = extension
    db.session.add(user)
    db.session.commit()
    return 'one to one'


@bp.route('/otm/')
def otm():
    article1 = Article(title="111", content="xxx")
    article2 = Article(title="222", content="yyy")
    user = User(username="萧兮", password='123456')
    article1.author = user
    article2.author = user
    db.session.add(article1, article2)
    db.session.commit()

    # print(user.articles)
    for article in user.articles:
        print(article.title)
    print('article1的作者: ', article1.author.username)
    print('article2的作者: ', article2.author.username)
    return 'otm的关系'


@bp.route('/article/')
def article():
    # 1.添加操作
    # artile = Article(title='我是插入的数据', content='我是描述信息')
    # db.session.add(artile)
    # db.session.commit()

    # 2.查询操作
    # filter_by：返回一个类列表的对象
    # article = Article.query.filter_by(id=1)[0]
    # print(article.title)

    # 3.修改操作
    # article = Article.query.filter_by(id=1)[0]
    # article.title = '三体'
    # db.session.commit()
    # print(article.title)

    # 4.删除数据
    Article.query.filter_by(id=1).delete()
    db.session.commit()
    return '数据操作成功!'


@bp.route('/')
def hello_world():
    # 写一个测试代码来验证是否连接成功
    engine = db.get_engine()
    conn = engine.connect()  # 获取链接对象
    result = conn.execute('select 2')
    print(result.fetchone())
    conn.close()

    # with engine.connect() as conn:
    #     result = conn.execute('select 1')
    #     print(result.fetchone())
    return '项目启动成功!'
```

### 5.config.py文件

```python
from constants import DB_URI

SQLALCHEMY_DATABASE_URI = DB_URI
SQLALCHEMY_TRACK_MODIFICATIONS = True
```

### 6. app.py文件：

这个是主`app`文件，运行文件。并且因为`db`被放到另外一个文件中，所以使用`db.init_app(app)`的方式来绑定数据库。

```python
# coding:utf8
from flask import Flask
from flask_migrate import Migrate
from exts import db
import config
import urls

app = Flask(__name__)
app.config.from_object(config)
app.register_blueprint(urls.bp)
db.init_app(app)
migrate = Migrate(app, db)  # 创建一个migrate对象

if __name__ == '__main__':
    app.run()
```

## 三、迁移命令：

通过以上项目重构后，后续我们就只要通过以下三个命令即可完成迁移操作了。

1. 运行命令来初始化迁移文件：

   ```python
   flask db init
   ```

2. 运行命令来将模型的映射添加到文件中：

   ```python
   flask db migrate
   ```

3. 添加将映射文件真正的映射到数据库中：

   ```python
   flask db upgrade
   ```

