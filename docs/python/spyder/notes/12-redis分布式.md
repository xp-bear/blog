## Redis介绍

### Redis内存数据库

背景: 	

随着互联⽹+⼤数据时代的来临，传统的关系型数据库已经不能满⾜中⼤型⽹站 ⽇益增⻓的访问量和数据量。这个时候就需要⼀种能够快速存取数据的组件来 缓解数据库服务I/O的压⼒，来解决系统性能上的瓶颈。

数据库的发展历史:	

1.在互联⽹+⼤数据时代来临之前，企业的⼀些内部信息管理系统，⼀个单个数 据库实例就能满⾜系统的需求 单数据库实例 

2.随着系统访问⽤户的增多，数据量的增⼤，单个数据库实例已经满⾜不了系统 的读取需求 缓存（memcache）+单数据库实例 

3.缓存可以缓解系统的读取压⼒，但是数据量的写⼊压⼒持续增⼤， 缓存+主从数据库+读写分离 

4.数据量再次增⼤，读写分离以后，主数据库的写库压⼒出现瓶颈、 缓存+主从数据库集群+读写分离+分库分表

5.互联⽹+⼤数据时代来临，关系型数据库不能很好的存取⼀些并发性⾼，实时性⾼的，并且数据格式不固定的数据。 nosql+主从数据库集群+读写分离+分库分表

### Redis是什么？

- Redis是⼀个⾼性能的，开源的，C语⾔开发的，键值对存储数据的nosql数据库。 
- NoSQL：not only sql，泛指⾮关系型数据库 Redis/MongoDB/Hbase Hadoop 
- 关系型数据库：MySQL、oracle、SqlServer

**Redis特性**

- Redis⽀持数据的持久化，可以将内存中的数据保存在磁盘中，重启的时 候可以再次加载进⾏使⽤ 
- Redis不仅仅⽀持简单的key-value类型的数据，同时还提供List，set等 数据类型 
- Redis⽀持数据的备份

### Redis有什么用？

Redis的主要作⽤：快速存取

### Redis应⽤场景

点赞/秒杀/直播平台的在线好友列表/商品排⾏榜/单点登录

### Redis怎么⽤？

官⽹地址：https://redis.io/

命令地址：http://doc.redisfans.com/

Redis的五⼤数据类型以及应⽤场景

```python
string/list/set/hash/zset
```

### Redis的安装及启动

```python
查看帮助命令
redis-server --help

启动
redis-server

redis-cli
```

Redis的配置⽂件

```python
 /etc/redis/redis.conf
    
当redis作为守护进程运⾏的时候，它会写⼀个 pid 到 /var/run/redis.pid ⽂件⾥⾯。
daemonize no

设置数据库的数⽬。
databases 16

根据给定的时间间隔和写⼊次数将数据保存到磁盘
下⾯的例⼦的意思是：
900 秒内如果⾄少有 1 个 key 的值变化，则保存
300 秒内如果⾄少有 10 个 key 的值变化，则保存
60 秒内如果⾄少有 10000 个 key 的值变化，则保存

save 900 1
save 300 10
save 60 10000

监听端⼝号，默认为 6379，如果你设为 0 ，redis 将不在 socket 上监听任何客户端连接。
port 6379

Redis默认只允许本地连接，不允许其他机器连接
bind 127.0.0.1
```

### Redis数据库简单使⽤

```python
DBSIZE 查看当前数据库的key数量
keys * 查看key的内容
FLUSHDB 清空当前数据库的key的数量
FLUSHALL 清空所有库的key(慎⽤)
exists key 判断key是否存在
```

## redis常⽤五⼤数据类型

```python
#常用命令

keys *  #查看所有的key
type  name #查看key的类型
```

### 1.redis-string

![image-20220418190918049](http://mk.xxoutman.cn/spyder/image-20220418190918049.png)

string是redis最基本的类型，⼀个key对应⼀个value。string可以包含任何数据，最⼤不能超过512M

**1.set/get/del/append/strlen**

```python
set ---- 设置值
	set name cat

get ---- 获取值
	get name

mset ---- 设置多个值 
	set name cat age 18 sex male

mget ---- 获取多个值
	mget name sex
    
append ---- 添加字段
	append name 666  #cat666  相当于字符串的拼接

del ---- 删除
	del age
    
strlen ---- 返回字符串⻓度
	strlen name
```

**2.incr/decr/incrby/decrby**

```python
incr ---- 增加
	set num 1
    incr num #num值为2
    
decr ---- 减少
	set num 1
    decr num #num值为0 (可以为负数)
    
incrby ----- 制定增加多少
	set num 5
    incrby num 5 #num值为10
    
decrby ----- 制定减少多少
	set num 5
    decrby num 5 #num值为0
```

**3.getrange/setrange**

```python
getrange ---- 获取指定区间范围内的值,类似between....and的关系
	getrange name 1 3 #at6  注意:包头包尾(支持负数)

setrange ---- 代表从第⼏位开始替换,下脚本从零开始,从0 -1表示全部
	setrange name 0 dog #dog666
```

### 2.redis-list(单值多value)

List(列表) 列表是简单的字符串列表，按照插⼊顺序排序，可以添加⼀个元素列表的头部 （左边）或者尾部（右边） 

它的底层实际是个链表 

**1.lpush/rpush/lrange**

```python
lpush/rpush/lrange ---- 从左/从右/获取指定⻓度

lpush list01 1 2 3 4 5  # 倒序排列 
lrange list01 0 -1 # 获取list01 中的所有值(倒序获取) 5 4 3 2 1  

rpush list02 1 2 3 4 5 # 正序排列
lrange list02 0 -1 #输出的结果是: 1 2 3 4 5 
```

**2.lpop/rpop**

```python
lpop/rpop 移除最左/最右

lpop list01 # 删除元素5

rpop list01 # 删除元素1
```

**3.lindex，按照索引下标获得元素（从上到下）**

```python
lrange list01 0 -1 # 查询所有的list01的所有数据

lindex list01 1  # 拿到索引为1的那个元素
```

**4.llen,求列表⻓度**

```python
llen list01 #获取列表的长度
```

**5.lrem key**

```python
删N个value

lrem list01 2 1 # 在list01中删除2个1
```

**6.ltrim key**

```python
ltrim ---- 开始index结束index,截取指定范围的值后在赋值给key

ltrim list01 0 2 # 截取list01 从0到2的数据在赋值给list01
```

**7.rpoplpush list1 list2 将list1中最后⼀个压⼊list2中第⼀位**

```python
lrange list01 0 -1
lrange list02 0 -1
rpoplpush list01 list02 # 把list01右边元素删除,添加到list02的左边第一个
```

**8.lset key index value**

```python
lset list01 0 x # 将list02中第⼀位换成x
```

**9.linsert key before/after**

```python
linsert list01 before x python # 在x之前加字段python
 linsert list01 after x js	# 在x之前加字段js
```

### 3.redis-Hash

hash是⼀个键值对集合 hash是⼀个string类型的field和value的映射表，hash特别适合存储对象 

**1.hset/hget/hmset/hmget/hgetall/hdel**

```python
设值/取值/设值多个值/取多个值/取全部值/删除值
hset user id 11 # 给user键值对集合 设置 单个key-value
hget user id # 获取单个key对应的值

hmset customer id 11 name juran age 26 # 给这个键值对集合设置多个key-value
hmget customer id name age # 只返回多个字段相对应的值
hgetall customer # 返回这个键值对全部的key-value

hdel user id # 删除user键值对集合中的id字段
del user #删除uer这个键值对集合
```

**2.hlen**

```python
求哈希⻓度

hlen customer
```

**3.hexists key**

```python
hexists	----在key里面的某个值

hexists user name
存在返回1,不存在返回0
```

**4.hkeys/hvals**

```python
hkeys user # 列出user集合所有的key

hvals user # 列出user集合所有的value
```

**5.hstrlen**

```python
 hstrlen customer name #获取键值对集合某个字段的长度
```

### 4.redis-set(不重复的)

Set(集合) set是string类型的⽆序集合 

**1.sadd/smembers/sismember**

```python
sadd/smembers/sismember ---- 添加/查看集合/查看是否存在

sadd set01 1 2 2 3 3 # 去掉重复添加
smembers set01 # 得到set01
sismember set01 1 # 如果存在返回1 不存在返回0
```

**2.scard**

```python
scard ---- 获取集合⾥⾯的元素个数

scard set01 # 获取集合中元素的个数
```

**3.srem key value**

```python
srem ---- 删除集合中元素

srem set01 3 # 删除该集合中的3
SMEMBERS set01 # 3已经被删除掉
```

**4.srandmember key**

```python
srandmembe ---- 随机出⼏个数

sadd set02 1 2 3 4 5 6 7 8
srandmember set02 2 # 随机在set102集合中获取2个元素
```

**5.spop key**

```python
spop ---- 随机出栈

spop set01 # 随机出栈一个元素
```

**6.smove key1 key2**

```python
sadd set03 x y z
smove set01 set03 2 将set01中的2 移动到set03中
```

**7.数学集合类**

```python
sadd set01 1 2 3 4 5
sadd set02 1 2 3 a b
差集
SDIFF set01 set02 返回 4 5 在第⼀个set中不在第⼆个set中
交集
SINTER set01 set02 返回 1 2 3
并集
SUNION set01 set02 返回set01 set02 中的值 去掉重复
```

### 5.redis-Zset(有序集合) 

**1.zadd/zrange**

```python
zadd zset01 60 v1 70 v2 150 v3 90 v4 100 v5 # 给zset01集合设置键值对

zrange zset01 0 -1 # 按照值的大小升序做一个排序输出

zrange zset01 0 -1  withscores # 带分数返回排序
```

**2.zrangebyscore key start end**

```python
zrangebyscore key start end ----根据开始结束来取值

zrangebyscore zset01 60 70 # 根据范围值来取key

zrangebyscore zset01 60 (90 # 根据范围值来取key,表示不包含90

zrangebyscore zset01 60 90 limit 1 2   # 根据范围值来取key,表示不包含90。偏移1条,开始截取2条
```

**3.zrem key**

```python
zrem key value ---- 某score下对应的value值,作⽤是删除元素
zrem zset01 v1  # 删除键为v1的值
```

**4.zcard/zcount key score 区间/zrank key values**

```python
zcard zset01 # 求出zset01集合的总条数
  
zcount zset01 60 90 # 求60-90个数

zrank zset01 v2 # 返回1 返回对应下⻆标，从0开始
```

## Redis与Python交互

### Python操作Redis

**redispy安装及连接**

安装

```python
pip install redis
```

连接

```python
r = redis.StrictRedis(host='localhost',port=6379,db=0)
```

字符串相关操作

```python
# @ Time    : 2020/3/17 21:19
# @ Author  : JuRan

import redis

"""
python -> redis
1.通过Python连接Redis
"""

class RedisString(object):

    def __init__(self):
        # self.r = redis.StrictRedis()
        self.r = redis.Redis(host='127.0.0.1', port=6379)

    def string_set(self, skey, svalue):
        """
        redis 字符串设置值
        :param skey: Redis字符串的key
        :param svalue: Redis字符串的value
        :return: None
        """
        res = self.r.set(skey, svalue)
        print(res)

    def string_get(self, skey):
        """
        redis 字符串取值
        :param skey:
        :return: result
        """
        result = self.r.get(skey)
        return result


def main():
    r = RedisString()
    # r.string_set("user", "juran666")
    print(r.string_get("user"))



if __name__ == '__main__':
    main()
```

## Scrapy-分布式

### 什么是scrapy_redis

scrapy-redis是一个基于redis的scrapy组件，用于快速实现scrapy项目的分布式部署和数据爬取，其运行原理如下图所示。

回顾scrapy⼯作流程

![image-20220420160701840](http://mk.xxoutman.cn/spyder/image-20220420160701840.png)

scrapy_redis下载

![image-20220420160739639](http://mk.xxoutman.cn/spyder/image-20220420160739639.png)

### Scrapy-Redis特性

**分布式爬取**

​	你可以启动多个共享同一redis队列的爬虫实例，多个爬虫实例将各自提取到或者已请求的Requests在队列中统一进行登记，使得Scheduler在请求调度时能够对重复Requests进行过滤，即保证已经由某一个爬虫实例请求过的Request将不会再被其他的爬虫实例重复请求。

**分布式数据处理**

​	将scrapy爬取到的items汇聚到同一个redis队列中，意味着你可以根据你的需要启动尽可能多的共享这个items队列的后处理程序。

**Scrapy即插即用组件**

​	Scheduler调度器 + Duplication重复过滤器、Item Pipeline、基础Spider爬虫

### 京东案例

- 需求：抓取京东图书的信息 
- ⽬标：抓取京东图书包含图书的名字、封⾯图⽚地址、图书url地址、作者、出版社、出版时间、价格、图书所属⼤分类、图书所属⼩的分类、分 类的url地址 
- URL地址:https://book.jd.com/booksort.html 

xpath兄弟节点的寻找 https://blog.csdn.net/qq_37059367/article/details/83819828











