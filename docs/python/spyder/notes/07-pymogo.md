# Python MongoDB

依靠**pymongo**包来对mongoDB数据库进行操作

## 一、pymongo安装

```python
pip install pymongo
```

## 二、pymongo基本操作

### 1.创建数据库

连接名["库名"]

```python
import pymongo  
client = pymongo.MongoClient("mongodb://localhost:27017/") 
#创建名字为runoob的数据库
mydb = client["runoob"]
```

### 2.获取数据库列表

连接名.list_database_names()

```python
import pymongo
myclient = pymongo.MongoClient('mongodb://localhost:27017/')
#获取数据库列表
dblist = myclient.list_database_names()
if "runoobdb" in dblist:
  print("数据库已存在！")

```

### 3.创建集合（表）

库名["集合名"]

```python
import pymongo
myclient = pymongo.MongoClient('mongodb://localhost:27017/')
mydb = myclient["runoob"]
#创建名字为sites的集合
mycol = mydb["sites"]

```

### 4.获取集合列表

库名.list_collection_names()

```python
import pymongo
myclient = pymongo.MongoClient('mongodb://localhost:27017/')
mydb = myclient['runoobdb']
#获取集合列表
collist = mydb.list_collection_names()
if "sites" in collist:   # 判断 sites 集合是否存在
  print("集合已存在！")

```

### 5.插入文档

#### 5.1 插入单个文档

**集合名.inset_one()**

该方法返回 **InsertOneResult** 对象，该对象包含 **inserted_id** 属性，它是插入文档的 **id** 值。

```python
import pymongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["runoobdb"]
mycol = mydb["sites"]

mydict = {"name":"萧兮","alexa":"10000","url":"http://www.xxoutman.com"}
x = mycol.insert_one(mydict) 
print(x)
print(x.inserted_id)

```

#### 5.2 插入多个文档

集合名.inset_many()

```python
import pymongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["runoobdb"]
mycol = mydb["sites"]

mylist = [
  { "name": "Taobao", "alexa": "100", "url": "https://www.taobao.com" },
  { "name": "QQ", "alexa": "101", "url": "https://www.qq.com" },
  { "name": "Facebook", "alexa": "10", "url": "https://www.facebook.com" },
  { "name": "知乎", "alexa": "103", "url": "https://www.zhihu.com" },
  { "name": "Github", "alexa": "109", "url": "https://www.github.com" }
]

x = mycol.insert_many(mylist)

# 输出插入的所有文档对应的 _id 值
print(x.inserted_ids)

```

#### 5.2 插入多个文档（指定_id）

```python
import pymongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["runoobdb"]
mycol = mydb["site2"]

mylist = [
  { "_id": 1, "name": "RUNOOB", "cn_name": "菜鸟教程"},
  { "_id": 2, "name": "Google", "address": "Google 搜索"},
  { "_id": 3, "name": "Facebook", "address": "脸书"},
  { "_id": 4, "name": "Taobao", "address": "淘宝"},
  { "_id": 5, "name": "Zhihu", "address": "知乎"}
]

x = mycol.insert_many(mylist)

# 输出插入的所有文档对应的 _id 值
print(x.inserted_ids)

```

### 6.查询文档

#### 6.1 查询单个文档

集合名.find_one()

```python
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["runoobdb"]
mycol = mydb["sites"]

x = mycol.find_one()#无条件，即为第一条数据

print(x)

```

#### 6.2 查询所有文档

集合名.find()

```python
import pymongo
myclient = pymongo.MongoClient("mongodb://localhost:27017")
mydb = myclient["runoob"]
mycol = mydb["sites"]

for x in mycol.find():
	print(x)
    
```

#### 6.3 查询指定条件文档

```python
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["runoobdb"]
mycol = mydb["sites"]
#查询名字为RUNOOB的文档
myquery = { "name": "RUNOOB" } 
mydoc = mycol.find(myquery)

for x in mydoc:
  print(x)

```

#### 6.4 高级查询

基本和mongoDB中写法相同。

```python
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["runoobdb"]
mycol = mydb["sites"]

myquery = { "name": { "$gt": "H" } } #首字母大于H的查询出来
 
mydoc = mycol.find(myquery)
 
for x in mydoc:
	print(x)

```

#### 6.5 使用正则表达式匹配字符串

```python
import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["runoobdb"]
mycol = mydb["sites"]
#"$regex"表示使用正则表达式，"^R"表示首字母为R
myquery = { "name": { "$regex": "^R" } }

mydoc = mycol.find(myquery)

for x in mydoc:
	print(x)

```

#### 6.6 返回指定记录数

集合名.find().limit(num)

```python
import pymongo
 
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["runoobdb"]
mycol = mydb["sites"]

myresult = mycol.find().limit(3)

# 输出结果
for x in myresult:
  print(x)

```

### 7.修改文档

#### 7.1 修改单个文档

集合名.update_one()

```python
import pymongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["runoobdb"]
mycol = mydb["sites"]

myquery = { "alexa": "10000" }
newvalues = { "$set": { "alexa": "12345" } }

mycol.update_one(myquery, newvalues)

# 输出修改后的  "sites"  集合
for x in mycol.find():
	print(x)

```

#### 7.1 修改多个文档

集合名.update_many()

```python
import pymongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["runoobdb"]
mycol = mydb["sites"]

myquery = { "alexa": {"$gt": "100"} }
newvalues = { "$set": { "alexa": "123" } }

x = mycol.update_many(myquery, newvalues)

# 输出修改匹配的数量
print(x.modified_count, "文档已修改")

```

### 8.排序文档

集合名.find().sort()

```python
import pymongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["runoobdb"]
mycol = mydb["sites"]
#"-1"为降序排列
mydoc = mycol.find().sort("alexa",-1)
for x in mydoc:
  print(x)

```

### 9.删除数据

#### 9.1 删除单个文档

集合名.delete_one()

```python
import pymongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["runoobdb"]
mycol = mydb["sites"] 
myquery = { "name": "Taobao" }

mycol.delete_one(myquery)

# 删除后输出
for x in mycol.find():
  print(x)

```

#### 9.2 删除多个文档

集合名.delete_many()

```python
import pymongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["runoobdb"]
mycol = mydb["sites"] 
myquery = { "name": {"$reget":"^F"} }

x = mycol.delete_many(myquery)

# 删除后输出
print(x.deleted_count, "个文档已删除")

```

#### 9.3 删除所有文档

集合名.delete_many()

```python
import pymongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["runoobdb"]
mycol = mydb["sites"] 
#传入空的查询对象
x = mycol.delete_many({})

# 删除后输出
print(x.deleted_count, "个文档已删除")

```

#### 9.4 删除集合

集合名.drop()

```python
import pymongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["runoobdb"]
mycol = mydb["sites"] 

mycol.drop()
```

