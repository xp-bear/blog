# PyMySQL的基本使用

## 一、PyMySQL介绍

PyMySQL是在 Python3.x 版本中用于连接 MySQL 服务器的一个库，Python2中是使用mysqldb。

PyMySQL安装

```
pip install pymysql
```

创建链接的基本使用　

```python
# 导入pymysql模块
import pymysql

# 连接database
conn = pymysql.connect(host="127.0.0.1",
                       user="root",
                       password="root",
                       database="mysite",
                       charset="utf8")
# 得到一个可以执行SQL语句的光标对象
cursor = conn.cursor()  # 执行完毕返回的结果集默认以元组显示
# cursor = conn.cursor(cursor=pymysql.cursors.DictCursor) # 得到一个可以执行SQL语句并且将结果作为字典返回的游标

# 定义要执行的SQL语句
sql = """CREATE TABLE userinfo (id INT auto_increment PRIMARY KEY ,
                                user VARCHAR(50) NOT NULL UNIQUE,
                                pwd VARCHAR(50) NOT NULL)"""
#注意：charset='utf8' 不能写成utf-8

# 执行SQL语句
cursor.execute(sql)
# 关闭光标对象
cursor.close()
# 关闭数据库连接
conn.close()
```

在建链接之前，我们需要做好一些前期工作：创建数据库

## 二、增删改查操作

### 添加多条数据

```python
import pymysql
 
conn = pymysql.connect(
    host='127.0.0.1',
    port=3306,
    user='root',
    password='root',
    database='mysite',
    charset='utf8'
)
# 获取一个光标
cursor = conn.cursor()
 
# 定义要执行的sql语句
sql = 'insert into userinfo(user,pwd) values(%s,%s);'
data = [
    ('张三', '123456'),
    ('李四', '666666'),
    ('王五', '999999')
]
# 拼接并执行sql语句
cursor.executemany(sql, data)
 
# 涉及写操作要注意提交
conn.commit()
 
# 关闭连接
cursor.close()
conn.close()
```

输出结果：

![image-20220421151514396](http://mk.xxoutman.cn/spyder/image-20220421151514396.png)

### 插入单条数据

```python
import pymysql
conn =pymysql.connect(
    host ='127.0.0.1',
    port = 3306,
    user = 'root',
    password ='root',
    database ='mysite',
    charset ='utf8'
)
cursor =conn.cursor()  #获取一个光标
sql ='insert into userinfo (user,pwd) values (%s,%s);'
 
name = '陈独秀'
pwd = '123456789'
cursor.execute(sql, [name, pwd])
conn.commit()
cursor.close()
conn.close()
```

　输出结果：

![image-20220421151651684](http://mk.xxoutman.cn/spyder/image-20220421151651684.png)

### 获取最新插入数据 （最后一条）

```python
import pymysql
 
# 建立连接
conn = pymysql.connect(
    host="127.0.0.1",
    port=3306,
    user="root",
    password="root",
    database="mysite",
    charset="utf8"
)
# 获取一个光标
cursor = conn.cursor()
# 定义将要执行的SQL语句
sql = "insert into userinfo (user, pwd) values (%s, %s);"
name = "鲁迅"
pwd = "666666"
# 并执行SQL语句
cursor.execute(sql, [name, pwd])
# 涉及写操作注意要提交
conn.commit()
# 关闭连接
 
# 获取最新的那一条数据的ID
last_id = cursor.lastrowid
print("最后一条数据的ID是:", last_id)
 
cursor.close()
conn.close()
```

###   删除操作

```python
import pymysql
 
# 建立连接
conn = pymysql.connect(
    host="127.0.0.1",
    port=3306,
    user="root",
    password="root",
    database="mysite",
    charset="utf8"
)
# 获取一个光标
cursor = conn.cursor()
# 定义将要执行的SQL语句
sql = "delete from userinfo where user=%s;"
name = "张三"
# 拼接并执行SQL语句
cursor.execute(sql, [name])
# 涉及写操作注意要提交
conn.commit()
# 关闭连接
 
cursor.close()
conn.close()
```

### 更改数据

```python
import pymysql
 
# 建立连接
conn = pymysql.connect(
    host="127.0.0.1",
    port=3306,
    user="root",
    password="root",
    database="mysite",
    charset="utf8"
)
# 获取一个光标
cursor = conn.cursor()
# 定义将要执行的SQL语句
sql = "update userinfo set pwd=%s where user=%s;"
# 拼接并执行SQL语句
cursor.execute(sql, ["888888", "李四"])
 
# 涉及写操作注意要提交
conn.commit()
 
# 关闭连接
cursor.close ()
conn.close ()
```

### 查询数据

fetch数据

```python
import pymysql

conn = pymysql.connect(
    host='127.0.0.1',
    port=3306,
    user='root',
    password='root',
    database='mysite',
    charset='utf8'
)
# 获取一个光标
cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)  # 返回字典数据类型
# cursor = conn.cursor() #返回元组类型数据
# 定义将要执行的sql语句
sql = 'select user,pwd from userinfo;'
# 拼接并执行sql语句
cursor.execute(sql)

# 取到查询结果
# 取一条
ret1 = cursor.fetchone()
print(ret1)

# 取二条
ret2 = cursor.fetchmany(2)
print(ret2)

# 返回所有的结果
result = cursor.fetchall()
print(result)

cursor.close()
conn.close()
```

![image-20220421152343279](http://mk.xxoutman.cn/spyder/image-20220421152343279.png)

```python
# 光标按绝对位置移动1
cursor.scroll(1, mode="absolute")
# 光标按照相对位置(当前位置)移动1
cursor.scroll(1, mode="relative")
```