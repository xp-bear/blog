# SQLAlchemy

## SQLAlchemy介绍

### 一、安装：

`SQLAlchemy`是一个数据库的`ORM`框架，让我们操作数据库的时候不要再用`SQL`语句了，跟直接操作模型一样。安装命令为：

`pip install SQLAlchemy`。

### 二、通过`SQLAlchemy`连接数据库：

首先来看一段代码`model.py` 与flask没有关系：

```python
from sqlalchemy import create_engine

# 数据库的配置变量
HOSTNAME = '127.0.0.1'
PORT     = '3306'
DATABASE = 'xt_flask'
USERNAME = 'root'
PASSWORD = 'root'
DB_URI = 'mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8'.format(USERNAME,PASSWORD,HOSTNAME,PORT,DATABASE)

# 创建数据库引擎
engine = create_engine(DB_URI)

#创建连接
'''
with engine.connect() as con:
    rs = con.execute('SELECT 1')
    print(rs.fetchone())
'''    
with engine.connect() as con:
    rs = con.execute('SELECT * FROM users')
    print(rs.fetchall())    
```

首先从`sqlalchemy`中导入`create_engine`，用这个函数来创建引擎，然后用`engine.connect()`来连接数据库。其中一个比较重要的一点是，通过`create_engine`函数的时候，需要传递一个满足某种格式的字符串，对这个字符串的格式来进行解释：

```python
dialect+driver://username:password@host:port/database?charset=utf8
```

`dialect`是数据库的实现，比如`MySQL`、`PostgreSQL`、`SQLite`，并且转换成小写。

`driver`是`Python`对应的驱动，如果不指定，会选择默认的驱动，比如MySQL的默认驱动是`MySQLdb`。

`username`是连接数据库的用户名，

`password`是连接数据库的密码，

`host`是连接数据库的域名，

`port`是数据库监听的端口号，

`database`是连接哪个数据库的名字。

如果以上输出了`1`，说明`SQLAlchemy`能成功连接到数据库。

### 三、用SQLAlchemy执行原生SQL：

我们将上一个例子中的**数据库配置选项**单独放在一个`constants.py`的文件中，看以下例子：

在`constants.py`文件里:

```python
# 数据库的配置变量
HOSTNAME = '127.0.0.1'
PORT = '3306'
DATABASE = 'xt_flask'
USERNAME = 'root'
PASSWORD = 'root'
DB_URI = 'mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8'.format(USERNAME, PASSWORD, HOSTNAME, PORT, DATABASE)
```

在主文件`app.py`里(非flask项目):

```python
from sqlalchemy import create_engine
from constants import DB_URI

# 创建数据库引擎
engine = create_engine(DB_URI)

# 使用with语句连接数据库，如果发生异常会被捕获
with engine.connect() as con:
    # 先删除user表
    con.execute('drop table if exists user')
    # 创建一个user表，有自增长的id和username和password
    con.execute('create table user(id int primary key auto_increment,username varchar(255),password varchar(255))')
    # 插入两条数据到表中
    con.execute('insert into user(username,password) values("张三","123456")')
    con.execute('insert into user(username,password) values("萧兮","123456")')
    # 执行查询操作
    results = con.execute('select * from user')
    # 从查找的结果中遍历
    for result in results:
        print(result)
```

## SQLAlchemy基本使用

### 一、SQLAlchemy基本使用：

### 1. 创建`ORM`模型：

要使用`ORM`来操作数据库，首先需要创建一个类来与对应的表进行映射。现在以`User表`来做为例子，它有`自增长的id`、`name`、`fullname`、`password`这些字段，那么对应的类为：

```python
from sqlalchemy import Column,Integer,String
from constants import DB_URI
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base

# 如果想回显SQLAlchemy操作数据库的日志，设置echo=True
engine = create_engine(DB_URI,echo=True)

# 所有的类都要继承自declarative_base这个函数生成的基类
Base = declarative_base(engine)
class User(Base):
    # 定义表名为users
    __tablename__ = 'users'

    # 将id设置为主键，并且默认是自增长的
    id = Column(Integer,primary_key=True)
    # name字段，字符类型，最大的长度是50个字符
    name = Column(String(50))
    fullname = Column(String(50))
    password = Column(String(100))
    age = Column(Integer(), default=18) 
```

### 2. 映射到数据库中：

`SQLAlchemy`会自动的设置第一个`Integer`的主键并且没有被标记为外键的字段添加自增长的属性。因此以上例子中`id`自动的变成自增长的。以上创建完和表映射的类后，还没有真正的映射到数据库当中，执行以下代码将类映射到数据库中：

```python
Base.metadata.create_all() # 创建所有表,如果表已经存在,则不会创建
```

删除所有表: `Base.metadata.drop_all()`

### 3. 添加数据到表中：

在创建完数据表，并且做完和数据库的映射后，接下来让我们添加数据进去：

```python
one_user = User(name='张三', fullname='法外狂徒', password='666666')
# 打印名字
print (one_user.name) # 张三
# 打印密码
print (one_user.password) # 666666
# 打印id
print(one_user.id) # None
```

可以看到，name和password都能正常的打印，唯独`id`为`None`，这是因为`id`是一个自增长的主键，**还未插入到数据库中**，`id`是不存在的。接下来让我们把创建的数据插入到数据库中。和数据库打交道的，是一个叫做`Session`的对象：

```python
from sqlalchemy.orm import sessionmaker
Session = sessionmaker(bind=engine) # 创建数据库session对象
# 或者
# Session = sessionmaker()
# Session.configure(bind=engine)


session = Session() # 实例化一个数据库管理员   
one_user = User(name='张三', fullname='法外狂徒', password='666666')
session.add(one_user)
```

现在只是把数据添加到`session`中，但是并没有真正的把数据存储到数据库中。如果需要把数据存储到数据库中，还要做一次`commit`操作：

```python
session.commit()
# 打印ed_user的id
print (one_user.id) # 1
```

**一次插入多条数据:**

```python
...
session = Session()
session.add_all([
    User(name='诡术妖姬', fullname='乐芙兰', password='888888',age=30),
    User(name='影流之主', fullname='劫', password='999999',age=45),
])
session.commit()
...
```

### 4. 回滚：

这时候，`ed_user`就已经有id。 说明已经插入到数据库中了。有人肯定有疑问了，为什么添加到`session`中后还要做一次`commit`操作呢，这是因为，在`SQLAlchemy`的`ORM`实现中，在做`commit`操作之前，所有的操作都是在事务中进行的，因此如果你要将事务中的操作真正的映射到数据库中，还需要做`commit`操作。既然用到了事务，这里就并不能避免的提到一个回滚操作了，那么看以下代码展示了如何使用回滚（接着以上示例代码）：

```python
ed_user = UserInfo(name='萧兮', fullname='萧兮大大', password='123456789')
session.add(ed_user)
session.commit()

ed_user.name = 'Edwardo'
print('修改后的名字: ', ed_user.name)
session.rollback()  ## 刚刚所有的操作都是在事务中进行的，现在来做回滚操作
print('回滚到之前的名字: ', ed_user.name)
```

### 5. 查找数据：

接下来看下如何进行查找操作，查找操作是通过`session.query()`方法实现的，这个方法会返回一个`Query`对象，`Query`对象相当于一个数组，装载了查找出来的数据，并且可以进行迭代。具体里面装的什么数据，就要看向`session.query()`方法传的什么参数了，如果只是传一个`ORM`的类名作为参数，那么提取出来的数据就是都是这个类的实例，比如：

```python
#查询User表中所有的单条实例,然后按照id进行一个升序排序
for instance in session.query(User).order_by(User.id):
    print (instance)
# 输出所有的user实例
# <__main__.User object at 0x0000029AE2D10910>
# <__main__.User object at 0x0000029AE2D4DE20>

#查询User表中所有的单条实例,然后按照id进行一个降序排序
for instance in session.query(User).order_by(-User.id):
    print (instance)
```

如果传递了两个及其两个以上的对象，或者是传递的是`ORM`类的属性，那么查找出来的就是元组，例如：

```python
for instance in session.query(User.name):
    print (instance)
# 输出所有的查找结果
# ('张三',)
# ('诡术妖姬',)
# ('影流之主',)
```

以及：

```python
for instance in session.query(User.name,User.fullname):
    print (instance)
# 输出所有的查找结果
# ('张三', '法外狂徒')
# ('诡术妖姬', '乐芙兰')
# ('影流之主', '劫')
```

或者是：

```python
for instance in session.query(User,User.name):
    print instance
# 输出所有的查找结果
# (<__main__.User object at 0x000001F8BEEDDA90>, '张三')
# (<__main__.User object at 0x000001F8BEF907F0>, '诡术妖姬')
# (<__main__.User object at 0x000001F8BEF90310>, '影流之主')
```

另外，还可以对查找的结果（`Query`）做切片操作：

```python
for instance in session.query(User).order_by(User.id)[1:2]:
    print(instance.name)  # 诡术妖姬
```

如果想对结果进行过滤，可以使用`filter_by`和`filter`两个方法，这两个方法都是用来做过滤的，区别在于，`filter_by`是传入关键字参数，`filter`是传入条件判断，并且`filter`能够传入的条件更多更灵活，请看以下例子：

```python
# 第一种：使用filter_by过滤：
for name in session.query(User.name).filter_by(fullname='劫'):
    print (name)
# 输出结果：
# ('影流之主',)


# 第二种：使用filter过滤：
for name in session.query(User.name).filter(User.id > 1):
    print(name)
# 输出结果：
# ('诡术妖姬',)
# ('影流之主',)
```

### 二、Column常用数据类型：

- `Integer`：整形。
- `Float`：浮点类型。
- `Boolean`：传递`True/False`进去。
- `DECIMAL`：定点类型。
- `enum`：枚举类型。
- `Date`：传递`datetime.date()`进去。
- `DateTime`：传递`datetime.datetime()`进去。
- `Time`：传递`datetime.time()`进去。
- `String`：字符类型，使用时需要**指定长度**，区别于`Text`类型。
- `Text`：文本类型。
- `LONGTEXT`：长文本类型。

### 三、Column常用的属性参数：

- `default`：默认值。
- `nullable`：是否可空。
- `primary_key`：是否为主键。
- `unique`：是否唯一。
- `autoincrement`：是否自动增长。
- `onupdate`：更新的时候执行的函数。
- `name`：该属性在数据库中的字段映射。

## 查找操作

### 一、query可用参数：

1. 模型对象。指定查找这个模型中所有的对象。

2. 模型中的属性。可以指定只查找某个模型的其中几个属性。

3. 聚合函数。使用聚合函数需要先导入 `from sqlalchemy import func `
  
   - `func.count`：统计行的数量。
   
     ```python
     from sqlalchemy import func
     # 注意,如果age有为空的值,则func.count() 不会统计数量, 
     age = session.query(func.count(User.age)).all()  # 4
     age = session.query(User).count()  # 5
     print('条数', age)
     ```
   
   - `func.avg`：求平均值。
   
     ```python
     nums = session.query(func.avg(User.age)).all()[0]
     print('平均年龄', nums[0]) 
     ```
   
   - `func.max`：求最大值。
   
     ```python
     nums = session.query(func.max(User.age)).all()[0]
     print('最大值', nums[0]) 
     ```
   
   - `func.min`：求最小值。
   
     ```python
     nums = session.query(func.min(User.age)).all()[0]
     print('最小值', nums[0]) 
     ```
   
   - `func.sum`：求和。
   
     ```python
     nums = session.query(func.sum(User.age)).all()[0]
     print('年龄之和', nums[0]) 
     ```

### 二、过滤条件：

过滤是数据提取的一个很重要的功能，以下对一些常用的过滤条件进行解释，并且这些过滤条件都是只能通过`filter`方法实现的：

1. `equals`：

   ```python
   result = session.query(User.name).filter(User.name == '张三').all()
   print(result)
   ```

2. `not equals`:

   ```python
   result = session.query(User.name).filter(User.name != '张三').all()
   print(result)
   ```

3. `like`：

   ```python
   result = session.query(User.name).filter(User.name.like("影流%")).all()
   print(result) #查询包含有影流这一个字符串的开头记录
   ```

4. `in`：

   ```python
   result = session.query(User.name).filter(User.name.in_(['张三', '李四', '王五'])).all()
   print(result)
   # 同时，in也可以作用于一个Query
   result=session.query(User.name).filter(User.name.in_(session.query(User.name).filter(User.name.like('%张%')))).all()
   print(result)
   ```

5. `not in`不在这一个列表里面的元素查询出来：

   ```python
   result = session.query(User.name).filter(~User.name.in_(['张三', '李四', '王五'])).all()
   print(result)
   ```

6. `is null`：

   ```python
   result = session.query(User.name).filter(User.name == None).all()
   print(result)
   # 或者是
   result = session.query(User.name).filter(User.name.is_(None)).all()
   print(result)
   ```

7. `is not null`:

   ```python
   result = session.query(User.name).filter(User.name != None).all()
   print(result)
   # 或者是
   result = session.query(User.name).filter(User.name.isnot(None)).all()
   print(result)
   ```

8. `and` 同时满足条件：

   ```python
   from sqlalchemy import and_
   result = session.query(User.name).filter(and_(User.name == '张三', User.fullname == '法外狂徒')).all()
   print(result)
   
   # 或者是传递多个参数
   
   result = session.query(User.name).filter(User.name == '张三', User.fullname == '法外狂徒').all()
   print(result)
   
   # 或者是通过多次filter操作
   result = session.query(User.name).filter(User.name == '张三').filter(User.fullname == '法外狂徒').all()
   print(result)
   ```

9. `or`：

   ```python
   from sqlalchemy import or_  
   result = session.query(User.name).filter(or_(User.name == '张三', User.name == '影流之主')).all()
   print(result)
   ```

### 三、查找方法：

介绍完过滤条件后，有一些经常用到的查找数据的方法也需要解释一下：

1. `all()`：返回一个`Python`列表（`list`）：

   ```python
   result = session.query(User).filter(User.name.like('%三%')).order_by(User.id)
   print(type(result)) # <class 'sqlalchemy.orm.query.Query'>
   
   # 调用all方法
   result=result.all()
   
   print(type(result)) # <class 'list'>
   ```
   
2. `first()`：返回`Query`中的第一个值：

   ```python
   first_data = session.query(User).first()
   print(first_data.name)
   ```
   
3. `one()`：查找所有行作为一个结果集，如果结果集中只有一条数据，则会把这条数据提取出来，如果这个结果集少于或者多于一条数据，则会抛出异常。总结一句话：==有且只有一条数据的时候才会正常的返回，否则抛出异常==：

   ```python
   # 多于一条数据
   user = session.query(User).one()
   print(user.id)
   # 抛出错误 sqlalchemy.exc.MultipleResultsFound: Multiple rows were found when exactly one was required
   
   # 少于一条数据
   user = session.query(User).filter(User.id == 99).one()
   print(user.id)
   # 抛出错误 sqlalchemy.exc.NoResultFound: No row was found when one was required
   
   # 只有一条数据
   user = session.query(User).filter(User.name == '诡术妖姬').one()
   print(user.id) #可以正常运行
   ```

4. `one_or_none()`：跟`one()`方法类似，但是在结果集中没有数据的时候也不会抛出异常。 

5. ()`：底层调用`one()`方法，并且如果`one()`方法没有抛出异常，会返回查询到的第一列的数据：

   ```python
   user = session.query(User.fullname, User.name).filter_by(age=45).scalar()
   print(user)  # 劫
   ```

6.`get()`: 

```python
print(session.query(User).get(1)) #返回id为1的数据
```

7.切片

```python
print("get[1:3]:", session.query(User.name)[:2])  #返回列表切片的结果
```

### 四、删除方法

```python
session.query(User).filter(User.id == 1).delete()
session.commit()

print(session.query(User.name).all())
```

### 五、修改方法

```python
# 修改数据
#第一种方法
user = session.query(User).filter_by(name='张三').first()
user.name = "萧兮"
session.commit()
print(session.query(User.name).all())

#第二种方法
session.query(User).filter(User.id == 2).update({User.name: "大魔王"})  # 使用update方法
session.commit()
print(session.query(User.name).all())

session.query(User).filter(User.id == 2).update({User.age: User.age + 1})  # 使用update方法,自增操作
session.commit()
print(session.query(User.age).all())
```

### 四、文本SQL：

`SQLAlchemy`还提供了使用**文本SQL**的方式来进行查询，这种方式更加的灵活。而文本SQL要装在一个`text()`方法中，看以下例子：

```python
from sqlalchemy import text
for user in session.query(User).filter(text("id<3")).order_by(text("id")).all():
    print (user.name)

# 张三
# 诡术妖姬   
```

如果过滤条件比如上例中的`id<9`,9存储在变量中，这时候就可以通过传递参数的形式进行构造：

```python
for item in session.query(User).filter(text("id<:value and name=:name")).params(value=3, name='张三').order_by(User.id):
    print(item.id)
```

在文本SQL中的变量前面使用了`:`来区分，然后使用`params`方法，指定需要传入进去的参数。另外，使用`from_statement`方法可以把过滤的函数和条件函数都给去掉，使用纯文本的SQL:

```python
for item in session.query(User).from_statement(text("select * from users where name=:name")).params(name='影流之主').all():
    print(item.name) 
```

使用`from_statement`方法一定要注意，`from_statement`返回的是一个`text`里面的查询语句，一定要记得调用`all()`方法来获取所有的值。

### 五、计数（Count）：

`Query`对象有一个非常方便的方法来计算里面装了多少数据：

```python
num = session.query(User).filter(User.name.like('%三%')).count()
print(num)
```

当然，有时候你想明确的计数，比如要==统计`users`表中有多少个不同的姓名==，那么简单粗暴的采用以上`count`是不行的，因为姓名有可能会重复，但是处于两条不同的数据上，如果在原生数据库中，可以使用`distinct`关键字 `select distinct name from users`，那么在`SQLAlchemy`中，可以通过`func.count()`方法来实现：

```python
one_user = User(name='张三', fullname='法外狂徒2', password='666666')
session.add(one_user)
session.commit()
from sqlalchemy import func

names = session.query(func.count(User.name), User.name).group_by(User.name).all()
print(names)
# [(2, '张三'), (1, '诡术妖姬'), (1, '影流之主')]
```

另外，如果想实现`select count(*) from users`,查询users表有多少条数据，可以通过以下方式来实现：

```python
nums = session.query(func.count('*')).select_from(User).all() #.scalar()
print(nums) # 输出数据库记录条数 

num = session.query(User).count()
print(num) # 输出数据库记录条数 
```

当然，如果指定了要查找的表的字段，可以省略`select_from()`方法：

```python
num = session.query(func.count(User.id)).scalar()
print(num) # 输出数据库记录条数
```

## 表关系：

表之间的关系存在三种：一对一、一对多、多对多。而`SQLAlchemy`中的`ORM`也可以模拟这三种关系。因为一对一其实在`SQLAlchemy`中底层是通过一对多的方式模拟的，所以先来看下一对多的关系：

### 一、外键：

在Mysql中，外键可以让表之间的关系更加紧密。而SQLAlchemy同样也支持外键。通过ForeignKey类来实现，并且可以指定表的外键约束。相关示例代码如下：

```python
class Article(Base):
    __tablename__ = 'article'
    id = Column(Integer,primary_key=True,autoincrement=True)
    title = Column(String(50),nullable=False)
    content = Column(Text,nullable=False)
    uid = Column(Integer,ForeignKey('user.id'))

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer,primary_key=True,autoincrement=True)
    username = Column(String(50),nullable=False)  
```

外键约束有以下几项：

1. `RESTRICT`：父表数据被删除，会阻止删除。默认就是这一项。
2. `NO ACTION`：在MySQL中，同`RESTRICT`。
3. `CASCADE`：级联删除。
4. `SET NULL`：父表数据被删除，子表数据会设置为NULL。

### 二、一对多： 

拿之前的`User`表为例，假如现在要添加一个功能，要保存用户的邮箱帐号，并且邮箱帐号可以有多个，这时候就必须创建一个新的表，用来存储用户的邮箱，然后通过`user.id`来作为外键进行引用，先来看下邮箱表的实现：

```python
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, ForeignKey, create_engine
from constants import DB_URI
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import func, and_, or_

# 如果想回显SQLAlchemy操作数据库的日志，设置echo=True
engine = create_engine(DB_URI, echo=True)

# 所有的类都要继承自declarative_base这个函数生成的基类
Base = declarative_base(engine)


class Address(Base):
    __tablename__ = 'address'
    id = Column(Integer, primary_key=True)
    email_address = Column(String(100), nullable=False)
    # User表的外键，指定外键的时候，是使用的是数据库表的名称，而不是类名
    user_id = Column(Integer, ForeignKey('users.id'))
    # 在ORM层面绑定两者之间的关系，第一个参数是绑定的表的类名，
    # 第二个参数back_populates是通过User反向访问时的字段名称
    user = relationship('User', back_populates="addresses")


# 重新修改User表，添加了addresses字段，引用了Address表的主键
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    fullname = Column(String(50))
    password = Column(String(100))
    # 在ORM层面绑定和`Address`表的关系
    addresses = relationship("Address", order_by=Address.id, back_populates="user")


Base.metadata.drop_all()
Base.metadata.create_all()

Session = sessionmaker(bind=engine)  # 创建数据库session对象
session = Session()  # 实例化一个数据库管理员
```

其中，在`User`表中添加的`addresses`字段，可以通过`User.addresses`来访问和这个user相关的所有address。在`Address`表中的`user`字段，可以通过`Address.user`来访问这个user。达到了双向绑定。表关系已经建立好以后，接下来就应该对其进行操作，先看以下代码：

```python
hero = User(name='猴子', fullname='孙悟空', password='qwerdf')
hero.addresses = [Address(email_address='huaguoshan@qq.com'),
                  Address(email_address='lingxiaobaodian@qq.com')]
session.add(hero)
session.commit()
```

首先，创建一个用户，然后对这个`hero`用户添加两个邮箱，最后再提交到数据库当中，可以看到这里操作`Address`并没有直接进行保存，而是先添加到用户里面，再保存。

完整代码

```python
from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.orm import sessionmaker, relationship
from constants import DB_URI
from sqlalchemy.ext.declarative import declarative_base

# 创建数据库引擎
engine = create_engine(DB_URI)
# 所有的类都要继承自declarative_base这个函数生成的基类
Base = declarative_base(engine)

Base.metadata.create_all()  # orm映射到数据库

Session = sessionmaker(bind=engine)  # 和数据库打交道的，是一个叫做Session的对象  #理解为数据库管家
session = Session()


class Address(Base):
    __tablename__ = 'address'
    id = Column(Integer, primary_key=True)
    email_address = Column(String(100), nullable=False)
    # User表的外键，指定外键的时候，是使用的是数据库表的名称，而不是类名
    user_id = Column(Integer, ForeignKey('users.id'))
    # 在ORM层面绑定两者之间的关系，第一个参数是绑定的表的类名，
    # 第二个参数back_populates是通过User反向访问时的字段名称
    user = relationship('User', back_populates="addresses")


# 重新修改User表，添加了addresses字段，引用了Address表的主键
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    fullname = Column(String(50))
    password = Column(String(100))
    # 在ORM层面绑定和`Address`表的关系
    addresses = relationship("Address", order_by=Address.id, back_populates="user")


jack = User(name='jack', fullname='石头人', password='123456')
jack.addresses = [Address(email_address='jack@google.com'),
                  Address(email_address='j25@yahoo.com')]
session.add(jack)
session.commit()
```

### 三、一对一：

一对一其实就是一对多的特殊情况，从以上的一对多例子中不难发现，一对应的是`User`表，而多对应的是`Address`，也就是说一个`User`对象有多个`Address`。因此要将一对多转换成一对一，只要设置一个`User`对象对应一个`Address`对象即可，看以下示例：

```python
class Address(Base):
  __tablename__ = 'addresses'
  id = Column(Integer,primary_key=True)
  email_address = Column(String(50))
  user_id = Column(Integer,ForeignKey('users.id') #设置外键
  user = relationship('Address',back_populates='user')

class User(Base):
  __tablename__ = 'users'
  id = Column(Integer,primary_key=True)
  name = Column(String(50))
  fullname = Column(String(50))
  password = Column(String(100))
  # 设置uselist关键字参数为False
  addresses = relationship("Address",back_populates='user',uselist=False)
```

从以上例子可以看到，只要在`User`表中的`addresses`字段上添加`uselist=False`就可以达到一对一的效果。设置了一对一的效果后，就不能添加多个邮箱到`user.addresses`字段了，只能添加一个：

```python
hero = User(name='瑞雯', fullname='放逐之刃', password='gjffdd')
hero.addresses = Address(email_address='zuan@qq.com')
session.add(jack)
session.commit()
```

### 四、多对多：

多对多需要一个**中间表**来作为连接，同理在`sqlalchemy`中的`orm`也需要一个中间表。假如现在有一个`Teacher`和一个`Classes`表，即老师和班级，一个老师可以教多个班级，一个班级有多个老师，是一种典型的多对多的关系，那么通过`sqlalchemy`的`ORM`的实现方式如下：

```python
# coding:utf8
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, ForeignKey, create_engine, Table
from constants import DB_URI
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import func, and_, or_

# 如果想回显SQLAlchemy操作数据库的日志，设置echo=True
engine = create_engine(DB_URI, echo=True)

# 所有的类都要继承自declarative_base这个函数生成的基类
Base = declarative_base(engine)

# 中间表做一个链接与关联
association_table = Table('teacher_classes', Base.metadata,
                          Column('teacher_id', Integer, ForeignKey('teacher.id')),
                          Column('classes_id', Integer, ForeignKey('classes.id'))
                          )


class Teacher(Base):
    __tablename__ = 'teacher'
    id = Column(Integer, primary_key=True)
    tno = Column(String(10))
    name = Column(String(50))
    age = Column(Integer)
    # secondary 代表连接中间表
    classes = relationship('Classes', secondary=association_table, back_populates='teachers')


class Classes(Base):
    __tablename__ = 'classes'
    id = Column(Integer, primary_key=True)
    cno = Column(String(10))
    name = Column(String(50))
    teachers = relationship('Teacher', secondary=association_table, back_populates='classes')


Base.metadata.drop_all()
Base.metadata.create_all()

Session = sessionmaker(bind=engine)  # 创建数据库session对象
session = Session()  # 实例化一个数据库管理员
```

要创建一个多对多的关系表，首先需要一个中间表，通过`Table`来创建一个==中间表==。上例中**第一个参数`teacher_classes`代表的是中间表的表名**，第二个参数是`Base`的元类，第三个和第四个参数就是要连接的两个表，其中`Column`**第一个参数**是表示的是连接表的**外键名**，第二个参数表示这个外键的类型，第三个参数表示要外键的表名和字段。
创建完中间表以后，还需要在两个表中进行绑定，比如在`Teacher`中有一个`classes`属性，来绑定`Classes`表，并且通过`secondary`参数来连接中间表。同理，`Classes`表连接`Teacher`表也是如此。定义完类后，之后就是添加数据，请看以下示例：

```python
teacher1 = Teacher(tno='t01', name='萧兮', age=18)
teacher2 = Teacher(tno='t02', name='飞', age=16)
classes1 = Classes(cno='s001', name='英语')
classes2 = Classes(cno='s002', name='数学')
teacher1.classes = [classes1, classes2]
teacher2.classes = [classes1, classes2]
classes1.teachers = [teacher1, teacher2]
classes2.teachers = [teacher1, teacher2]
session.add(teacher1)
session.add(teacher2)
session.add(classes1)
session.add(classes2)
session.commit()
```

## 查询高级

### 一、排序：

1. `order_by`：可以指定根据这个表中的某个字段进行排序，如果想要降序排序，可以调用排序的字段的`desc`方法。

   ```python
   #升序排序
   nums = session.query(User.name, User.age).order_by(User.age).all()
   print(nums)  # [('张三', 18), ('诡术妖姬', 30), ('影流之主', 45)]
   
   #降序排序
   nums = session.query(User.name, User.age).order_by(User.age.desc()).all()
   print(nums)  # [('影流之主', 45), ('诡术妖姬', 30), ('张三', 18)]
   ```

### 二、limit、offset和切片：

1. `limit`：可以限制每次查询的时候只查询几条数据。

   ```python
   # limit 取几条数据
   nums = session.query(User.name, User.age).limit(2).all()
   print(nums)  # [('张三', 18), ('诡术妖姬', 30)]
   ```

2. `offset`：可以限制查找数据的时候过滤掉前面多少条。

   ```python
   # 过滤掉前面2条数据,取出1条数据
   nums = session.query(User.name, User.age).limit(1).offset(2).all()
   print(nums)  # [('影流之主', 45)]
   ```

3. 切片：可以对`Query`对象使用切片操作，来获取想要的数据。

   ```python
   # 取出第一条和第二条数据
   nums = session.query(User.name, User.age)[1:2]
   print(nums)  # [('诡术妖姬', 30)]
   ```

### 三、其他查询方法：

#### 1. group_by：

根据某个字段进行分组。比如想要根据**性别进行分组**，来统计每个分组分别有多少人，那么可以使用以下代码来完成：

```python
# 1.先在user表添加一个字段sex
# sex = Column(String(100))

session.add_all([
    User(name='张三', fullname='哈哈', password='888888', age=12, sex='男'),
    User(name='李四', fullname='嘿嘿', password='999999', age=45, sex='女'),
    User(name='王五', fullname='呵呵', password='999999', age=45, sex='男'),
])
session.commit()

sexs = session.query(User.sex, func.count('*')).group_by(User.sex).all()
print(sexs) #[('女', 2), ('男', 3)]
```

#### 2. having：

`having`是对查找结果进一步过滤。比如只想要看成年人的数量，那么可以首先对年龄进行分组统计人数，然后再对分组进行`having`过滤。示例代码如下：

```python
result = session.query(User.age, func.count('*')).group_by(User.age).having(User.age >= 18).all()
print(result)  # [(45, 2)]
```

#### 3. join方法：

`join`查询分为两种，一种是`inner join`，另一种是`outer join`。默认的是`inner join`，如果指定`left join`或者是`right join`则为`outer join`。如果想要查询`User`及其对应的`Address`，则可以通过以下方式来实现：

```python
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker
from constants import DB_URI
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import and_, or_, text
from sqlalchemy import func

# 创建数据库引擎
engine = create_engine(DB_URI)
# 所有的类都要继承自declarative_base这个函数生成的基类
Base = declarative_base(engine)


# 创建模型
class Join_A(Base):
    # 定义表名为users
    __tablename__ = 'join_a'

    # 将id设置为主键，并且默认是自增长的
    id = Column(Integer, primary_key=True)
    # name字段，字符类型，最大的长度是50个字符
    name = Column(String(50))


class Join_B(Base):
    # 定义表名为users
    __tablename__ = 'join_b'

    # 将id设置为主键，并且默认是自增长的
    id = Column(Integer, primary_key=True)
    # name字段，字符类型，最大的长度是50个字符
    name = Column(String(50))

Base.metadata.drop_all()
Base.metadata.create_all()  # orm映射到数据库

Session = sessionmaker(bind=engine)  # 和数据库打交道的，是一个叫做Session的对象  #理解为数据库管家
session = Session()
# ----------------------------------

lists = session.query(Join_A, Join_B).filter(Join_A.id == Join_B.id).all()
print(lists)
for list in lists:
    print(list)
    for result in list:
        print(result.name)
# 输出结果：
[(<__main__.Join_A object at 0x0000017F74A79A00>, <__main__.Join_B object at 0x0000017F74A79040>), (<__main__.Join_A object at 0x0000017F74A79160>, <__main__.Join_B object at 0x0000017F74A791F0>)]
(<__main__.Join_A object at 0x0000017F74A79A00>, <__main__.Join_B object at 0x0000017F74A79040>)
a_猫
b_鸡
(<__main__.Join_A object at 0x0000017F74A79160>, <__main__.Join_B object at 0x0000017F74A791F0>)
a_狗
b_鱼
```

这是通过普通方式的实现，也可以通过`join`的方式实现，更加简单：

```python
for list in session.query(Join_A, Join_B).join(Join_A, Join_A.id == Join_B.id).all():
    print(list)
    for result in list:
        print(result.name)
        
# 输出结果：
(<__main__.Join_A object at 0x000001D270709550>, <__main__.Join_B object at 0x000001D2707090D0>)
a_猫
b_鸡
(<__main__.Join_A object at 0x000001D270709160>, <__main__.Join_B object at 0x000001D2707091F0>)
a_狗
b_鱼
```

#### 4. 别名：

当多表查询的时候，有时候同一个表要用到多次，这时候用别名就可以方便的解决命名冲突的问题了：

```python
result = session.query(User.name.label('alias_name')).all()
for item in result:
    print(item.alias_name)
# 张三
# 诡术妖姬
# 影流之主   
```

## Flask-SQLAlchemy库

另外一个库，叫做`Flask-SQLAlchemy`，`Flask-SQLAlchemy`是对`SQLAlchemy`进行了一个简单的封装，使得我们在`flask`中使用`sqlalchemy`更加的简单。可以通过`pip install flask-sqlalchemy`。使用`Flask-SQLAlchemy`的流程如下：

1. 数据库初始化：数据库初始化不再是通过`create_engine`，请看以下示例：

   ```python
   from flask import Flask
   from flask_sqlalchemy import SQLAlchemy
   from constants import DB_URI
   
   app = Flask(__name__)
   app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI
   app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
   db = SQLAlchemy(app)
   ```

2. `ORM`类：之前都是通过`Base = declarative_base()`来初始化一个基类，然后再继承，在`Flask-SQLAlchemy`中更加简单了（代码依赖以上示例）：

   ```python
   # 创建模型
   class User(db.Model):
       __tablename__ = 'users'
       id = db.Column(db.Integer, primary_key=True, autoincrement=True)
       username = db.Column(db.String(80), nullable=False)
       email = db.Column(db.String(120), nullable=False)
       password = db.Column(db.String(120), nullable=False, default='123456')
   ```
   
3. 映射模型到数据库表：使用`Flask-SQLAlchemy`所有的类都是继承自`db.Model`，并且所有的`Column`和数据类型也都成为`db`的一个属性。但是有个好处是不用写表名了，`Flask-SQLAlchemy`会自动将类名小写化，然后映射成表名。
   写完类模型后，要将模型映射到数据库的表中，使用以下代码创建所有的表：

   ```python
   db.drop_all()
   db.create_all()
   ```
4. 添加数据：这时候就可以在数据库中看到已经生成了一个`user`表了。接下来添加数据到表中：

```Python
   @app.route('/add/')
   def add():
       one_user = User('海绵宝宝', '菠萝小窝@qq.com')
       two_user = User('派大星', '地下城堡@qq.com')
       three_user = User('痞老板', '科技花园@qq.com')
       db.session.add(one_user)
       db.session.add(two_user)
       db.session.add(three_user)
       db.session.commit()
       return '添加成功!!'
```

   添加数据和之前的没有区别，只是`session`成为了一个`db`的属性。

批量添加数据的方式: 

```python
# 批量添加数据
    bodys = [{'username': '海绵宝宝', 'email': '菠萝小窝@qq.com'},
             {'username': '派大星', 'email': '地下城堡@qq.com'},
             {'username': '痞老板', 'email': '科技花园@qq.com'}]
    db.session.bulk_save_objects(
        [User(username=item['username'], email=item['email']) for item in bodys]
    )
    db.session.commit()
    return '添加成功!!'
```

5. 查询数据：查询数据不再是之前的`session.query`了，而是将`query`属性放在了`db.Model`上，所以查询就是通过`Model.query`的方式进行查询了：

   ```python
   @app.route('/search/')
   def search():
       admin = User.query.filter_by(username='海绵宝宝').first()
       print(admin.email)
       return '查询相关方法!'
   ```

6. 删除数据：删除数据跟添加数据类似，只不过`session`是`db`的一个属性而已：

   ```python
   @app.route('/delete/')
   def delete():
       try:
           admin = User.query.filter_by(username='痞老板').first()
           db.session.delete(admin)
           db.session.commit()
       except Exception as e:
           print(e)
       print(User.query.all())
       return '删除相关方法!'
   ```
   

 7.修改数据

```python
@app.route('/update/')
def update():
    admin = User.query.filter_by(username='海绵宝宝').first()
    admin.password = '999999'
    db.session.commit()
    return '修改相关方法!'
```

完整代码:

```python
# coding:utf8
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from constants import DB_URI

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)


# 创建模型
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(120), nullable=False, default='123456')


# 映射数据库
db.drop_all()
db.create_all()


@app.route('/')
def hello_world():
    return '项目启动成功!'


@app.route('/add/')
def add():
    # 单条数据添加
    # one_user = User(username='海绵宝宝', email='菠萝小窝@qq.com')
    # two_user = User(username='派大星', email='地下城堡@qq.com')
    # three_user = User(username='痞老板', email='科技花园@qq.com')
    # db.session.add(one_user)
    # db.session.add(two_user)
    # db.session.add(three_user)
    # db.session.add_all([one_user, two_user, three_user])  # 上面三步可以用这一句代替

    # 批量添加数据
    bodys = [{'username': '海绵宝宝', 'email': '菠萝小窝@qq.com'},
             {'username': '派大星', 'email': '地下城堡@qq.com'},
             {'username': '痞老板', 'email': '科技花园@qq.com'}]
    db.session.bulk_save_objects(
        [User(username=item['username'], email=item['email']) for item in bodys]
    )
    db.session.commit()
    return '添加成功!!'


@app.route('/search/')
def search():
    admin = User.query.filter_by(username='海绵宝宝').first()
    print(admin.email)
    return '查询相关方法!'


@app.route('/update/')
def update():
    admin = User.query.filter_by(username='海绵宝宝').first()
    admin.password = '999999'
    db.session.commit()
    return '修改相关方法!'


@app.route('/delete/')
def delete():
    try:
        admin = User.query.filter_by(username='痞老板').first()
        db.session.delete(admin)
        db.session.commit()
    except Exception as e:
        print(e)
    print(User.query.all())
    return '删除相关方法!'


if __name__ == '__main__':
    app.run()
```

先将数据库迁移,然后在讲综合flask-sqlalchemy,然后做一个项目重构

**Flask-SQLAlchemy的表关系**

```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)

HOSTNAME = '127.0.0.1'
PORT = '3306'
DATABASE = 'flask_demo'
USERNAME = 'root'
PASSWORD = 'root'
DB_URI = 'mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8'.format(USERNAME, PASSWORD, HOSTNAME, PORT, DATABASE)

app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

db = SQLAlchemy(app)

# 在这里,我们使用orm迁移的方式
# 创建一个migrate对象
migrate = Migrate(app, db)


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





@app.route('/oto/')
def oto():
    user = User(username='卡萨丁', password='123456')
    extension = UserExtension(school='战争学院')
    user.extension = extension
    db.session.add(user)
    db.session.commit()
    return 'one to one'


@app.route('/otm/')
def otm():
    article1 = Article(title="堕落天使", content="莫甘娜")
    article2 = Article(title="审判天使", content="天使彦")
    user = User(username="凯尔", password='888888')
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


@app.route('/base/')
def base():
    pass
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
    # Article.query.filter_by(id=1).delete()
    # db.session.commit()
    # return '数据操作成功!'


@app.route('/')
def hello_world():
    # 写一个测试代码来验证是否连接成功
    engine = db.get_engine()

    with engine.connect() as conn:
        result = conn.execute('select 1')
        print(result.fetchone())
    return '项目启动成功!'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
```

## flask-sqlalchemy实现表关系多对多

```python
# coding:utf8
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from constants import DB_URI

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)

tb_student_course = db.Table('tb_student_course',
                             db.Column('student_id', db.Integer, db.ForeignKey('students.id')),
                             db.Column('course_id', db.Integer, db.ForeignKey('courses.id'))
                             )

#学生
class Student(db.Model):
    __tablename__ = "students"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    # 关联属性，多对多的情况，可以写在任意一个模型类中
    relate_courses = db.relationship('Course', secondary=tb_student_course,
                                     backref='relate_student')


class Course(db.Model):
    __tablename__ = "courses"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)


# 映射数据库
db.drop_all()
db.create_all()


@app.route('/')
def hello_world():
    return 'Hello World!!!!!'


@app.route('/mtm/')
def mtm():
    stu1 = Student(name='张三')
    stu2 = Student(name='李四')
    stu3 = Student(name='王五')

    cou1 = Course(name='物理')
    cou2 = Course(name='化学')
    cou3 = Course(name='生物')

    stu1.relate_courses = [cou2, cou3]  # 记得要添加关系
    stu2.relate_courses = [cou2]
    stu3.relate_courses = [cou1, cou2, cou3]

    db.session.add_all([stu1, stu2, stu3])
    db.session.add_all([cou1, cou2, cou3])

    db.session.commit()

    for course in stu1.relate_courses:
        print('stu1的选课: ', course.name)

    for student in cou3.relate_student:
        print('选生物的学生: ', student.name)

    return 'mtm的关系'


if __name__ == '__main__':
    app.run()
```

```python
# 数据库的配置变量
HOSTNAME = '127.0.0.1'
PORT = '3306'
DATABASE = 'many_flask'
USERNAME = 'root'
PASSWORD = 'root'
DB_URI = 'mysql+pymysql://{}:{}@{}:{}/{}?charset=utf8'.format(USERNAME, PASSWORD, HOSTNAME, PORT, DATABASE)
```