# Urllib

## 1.什么是互联网爬虫？

如果我们把互联网比作一张大的蜘蛛网，那一台计算机上的数据便是蜘蛛网上的一个猎物，而爬虫程序就是一只小
蜘蛛，沿着蜘蛛网抓取自己想要的数据

```python
解释1：通过一个程序，根据Url(http://www.taobao.com)进行爬取网页，获取有用信息
解释2：使用程序模拟浏览器，去向服务器发送请求，获取响应信息
```

## 2.爬虫核心?

```python
1.爬取网页：爬取整个网页 包含了网页中所有得内容
2.解析数据：将网页中你得到的数据 进行解析
3.难点：爬虫和反爬虫之间的博弈
```

## 3.爬虫的用途？

- 数据分析/人工数据集
- 社交软件冷启动
- 舆情监控
- 竞争对手监控

![1642351956496](http://mk.xxoutman.cn/spyder/1642351956496.png)

## 4.爬虫分类？

```python
1.通用爬虫：
实例
	百度、360、google、sougou等搜索引擎‐‐‐伯乐在线
功能
	访问网页‐>抓取数据‐>数据存储‐>数据处理‐>提供检索服务
robots协议
	一个约定俗成的协议，添加robots.txt文件，来说明本网站哪些内容不可以被抓取，对我们来说起不到限制作用
	自己写的爬虫无需遵守
网站排名(SEO)
	1. 根据pagerank算法值进行排名（参考个网站流量、点击率等指标）
	2. 百度竞价排名
缺点
	1. 抓取的数据大多是无用的
	2.不能根据用户的需求来精准获取数据
```

```python
2.聚焦爬虫
功能
	根据需求，实现爬虫程序，抓取需要的数据
设计思路
	1.确定要爬取的url
	如何获取Url
	2.模拟浏览器通过http协议访问url，获取服务器返回的html代码
	如何访问
	3.解析html字符串（根据一定规则提取需要的数据）
	如何解析
```

## 5.反爬手段？

### 1.User‐Agent

​	User Agent中文名为用户代理，简称 UA，它是一个特殊字符串头，使得服务器能够识别客户使用的操作系统及版本、CPU 类型、浏览器及版本、浏览器渲染引擎、浏览器语言、浏览器插件等。

### 2.代理IP

​	西次代理。
​	快代理。
​	什么是高匿名、匿名和透明代理？它们有什么区别？

​		1.使用透明代理，对方服务器可以知道你使用了代理，并且也知道你的真实IP。

​		2.使用匿名代理，对方服务器可以知道你使用了代理，但不知道你的真实IP。

​		3.使用高匿名代理，对方服务器不知道你使用了代理，更不知道你的真实IP。

### 3.验证码访问

​	打码平台
​		图鉴
​		超级鹰🦅

### 4.动态加载网页 

​	网站返回的是js数据 并不是网页的真实数据。
​    解决方案: selenium驱动真实的浏览器发送请求。

### 5.数据加密

​	分析js代码(js逆向)

## 6.urllib库使用

`urllib.request.urlopen()` 模拟浏览器向服务器发送请求。
`response` 服务器返回的数据，response的数据类型是`HttpResponse`。

字节‐‐>字符串:
		解码`decode`
字符串‐‐>字节:
		编码`encode`

- `read() `	字节形式读取二进制 扩展：read(5)返回前5个字节

- `readline()`  读取一行

- `readlines()`  一行一行读取 直至结束

- `getcode()`  获取状态码

- `geturl()`  获取url

- `getheaders()`  获取headers

  ```python
    import urllib.request
    url = 'http://www.baidu.com'
  # 模拟浏览器向服务器发送请求
    response = urllib.request.urlopen(url)
  
  # 一个类型和六个方法
  
  # response是HTTPResponse的类型
  # print(type(response))
  
  # 按照一个字节一个字节的去读
  # content = response.read()
  # print(content)
  
  # 返回多少个字节
  # content = response.read(5)
  # print(content)
  
  # 读取一行
  # content = response.readline()
  # print(content)
  # content = response.readlines()
  # print(content)
  
  # 返回状态码  如果是200了 那么就证明我们的逻辑没有错
  # print(response.getcode())
  
  # 返回的是url地址
  # print(response.geturl())
  
  # 获取是一个响应头的状态信息
    print(response.getheaders())
  
  # 一个类型 HTTPResponse
  
  # 六个方法 read  readline  readlines  getcode  geturl getheaders
  ```

- `urllib.request.urlretrieve()` 
    请求网页
    请求图片
    请求视频
```python
    import urllib.request
    
    # 下载网页
    url_page = 'http://www.baidu.com'
    
    # url代表的是下载的路径  filename文件的名字
    # 在python中 可以写变量的名字  也可以直接写值
    urllib.request.urlretrieve(url_page,'baidu.html')
    
    # 下载图片
    # url_img = 'https://img1.baidu.com/it/u=3004965690,4089234593&fm=26&fmt=auto&gp=0.jpg'
    #
    # urllib.request.urlretrieve(url= url_img,filename='lisa.jpg')
    
    # 下载视频
    # url_video = 'https://vd3.bdstatic.com/mda-mhkku4ndaka5etk3/1080p/cae_h264/1629557146541497769/mda-mhkku4ndaka5etk3.mp4?v_from_s=hkapp-haokan-tucheng&auth_key=1629687514-0-0-7ed57ed7d1168bb1f06d18a4ea214300&bcevod_channel=searchbox_feed&pd=1&pt=3&abtest='
    #
    # urllib.request.urlretrieve(url_video, 'hxekyyds.mp4')
    
```

## 7.请求对象的定制

UA介绍：User Agent中文名为用户代理，简称 UA，它是一个特殊字符串头，使得服务器能够识别客户使用的操作系统及版本、CPU 类型、浏览器及版本。浏览器内核、浏览器渲染引擎、浏览器语言、浏览器插件等。

```python
语法：request = urllib.request.Request()
```

扩展：编码的由来

> 编码集的演变
> 由于计算机是美国人发明的，因此，最早只有127个字符被编码到计算机里，也就是大小写英文字母、数字和一些符号，这个编码表被称为ASCII编码，比如大写字母A的编码是65，小写字母z的编码是122。
> 但是要处理中文显然一个字节是不够的，至少需要两个字节，而且还不能和ASCII编码冲突，所以，中国制定了GB2312编码，用来把中文编进去。
> 你可以想得到的是，全世界有上百种语言，日本把日文编到Shift_JIS里，韩国把韩文编到Euc‐kr里，各国有各国的标准，就会不可避免地出现冲突，结果就是，在多语言混合的文本中，显示出来会有乱码。
> 因此，Unicode应运而生。Unicode把所有语言都统一到一套编码里，这样就不会再有乱码问题了。
> Unicode标准也在不断发展，但最常用的是用两个字节表示一个字符（如果要用到非常偏僻的字符，就需要4个字节）。
> 现代操作系统和大多数编程语言都直接支持Unicode。

```python
import urllib.request

url = 'https://www.baidu.com'

# url的组成
# https://www.baidu.com/s?wd=周杰伦

# http/https    www.baidu.com   80/443        s      wd = 周杰伦     #
#    协议             主机        端口号     路径     参数           锚点
# http   80
# https  443
# mysql  3306
# oracle 1521
# redis  6379
# mongodb 27017

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
}

# 因为urlopen方法中不能存储字典 所以headers不能传递进去
# 请求对象的定制
# 注意因为参数顺序的问题 不能直接写url和headers 中间还有data所以我们需要关键字传参
request = urllib.request.Request(url=url, headers=headers)

response = urllib.request.urlopen(request)

content = response.read().decode('utf8')

print(content)
```

## 8.编解码

### 1.get请求方式：urllib.parse.quote（）

```python
# https://www.baidu.com/s?wd=%E5%91%A8%E6%9D%B0%E4%BC%A6

# 需求 获取 https://www.baidu.com/s?wd=周杰伦的网页源码

import urllib.request
import urllib.parse

url = 'https://www.baidu.com/s?wd='

# 请求对象的定制为了解决反爬的第一种手段
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
}

# 将周杰伦三个字变成unicode编码的格式
# 我们需要依赖于urllib.parse
name = urllib.parse.quote('周杰伦')
print(name)
url = url + name

# 请求对象的定制
request = urllib.request.Request(url=url, headers=headers)

# 模拟浏览器向服务器发送请求
response = urllib.request.urlopen(request)

# 获取响应的内容
content = response.read().decode('utf-8')

# 打印数据
print(content)
```

### 2.get请求方式：urllib.parse.urlencode（）

```python
# urlencode应用场景：多个参数的时候


# https://www.baidu.com/s?wd=周杰伦&sex=男

# import urllib.parse

#
# data = {
#     'wd': '周杰伦',
#     'sex': '男',
#     'location': '中国台湾省'
# }
# #
# a = urllib.parse.urlencode(data)
# print(a) 
#输出参数的拼接 wd=%E5%91%A8%E6%9D%B0%E4%BC%A6&sex=%E7%94%B7&location=%E4%B8%AD%E5%9B%BD%E5%8F%B0%E6%B9%BE%E7%9C%81

# https://www.baidu.com/s?wd=周杰伦&sex=男 的网页源码
# 获取https://www.baidu.com/s?wd=%E5%91%A8%E6%9D%B0%E4%BC%A6&sex=%E7%94%B7

import urllib.request
import urllib.parse

base_url = 'https://www.baidu.com/s?'

data = {
    'wd': '周杰伦',
    'sex': '男',
    'location': '中国台湾省'
}

new_data = urllib.parse.urlencode(data)

# 请求资源路径
url = base_url + new_data

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
}

# 请求对象的定制
request = urllib.request.Request(url=url, headers=headers)

# 模拟浏览器向服务器发送请求
response = urllib.request.urlopen(request)

# 获取网页源码的数据
content = response.read().decode('utf-8')

# 打印数据
print(content)
```

### 3.post请求方式

```python
# post请求

import urllib.request
import urllib.parse

url = 'https://fanyi.baidu.com/sug'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
}

data = {
    'kw': 'spider'
}

# post请求的参数 必须要进行编码
data = urllib.parse.urlencode(data).encode('utf-8')

# post的请求的参数 是不会拼接在url的后面的  而是需要放在请求对象定制的参数中
# post请求的参数 必须要进行编码
request = urllib.request.Request(url=url, data=data, headers=headers)

# 模拟浏览器向服务器发送请求
response = urllib.request.urlopen(request)

# 获取响应的数据
content = response.read().decode('utf-8')
print(content)  # [{"k":"spider","v":"n. \u8718\u86db; \u661f\u5f62\u8f6e\uff0c\u5341\u5b57\u53c9;...
print(type(content))  # <class 'str'>
# 字符串 --> json对象

import json

obj = json.loads(content)
print(obj)

# post请求方式的参数 必须编码   data = urllib.parse.urlencode(data)
# 编码之后 必须调用encode方法 data = urllib.parse.urlencode(data).encode('utf-8')
# 参数是放在请求对象定制的方法中  request = urllib.request.Request(url=url,data=data,headers=headers)
```

总结：post和get区别？

1：get请求方式的参数必须编码，参数是拼接到url后面，编码之后不需要调用encode方法
2：post请求方式的参数必须编码 ，参数是放在请求对象定制的方法中，编码之后需要调用encode方法

案例练习：百度翻译之详细翻译

```python
import urllib.request
import urllib.parse

url = 'https://fanyi.baidu.com/v2transapi?from=en&to=zh'

headers = {
    # 'Accept': '*/*',
    # 'Accept-Encoding': 'gzip, deflate, br',
    # 'Accept-Language': 'zh-CN,zh;q=0.9',
    # 'Connection': 'keep-alive',
    # 'Content-Length': '135',
    # 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Cookie': 'BIDUPSID=DAA8F9F0BD801A2929D96D69CF7EBF50; PSTM=1597202227; BAIDUID=DAA8F9F0BD801A29B2813502000BF8E9:SL=0:NR=10:FG=1; __yjs_duid=1_c19765bd685fa6fa12c2853fc392f8db1618999058029; REALTIME_TRANS_SWITCH=1; FANYI_WORD_SWITCH=1; HISTORY_SWITCH=1; SOUND_SPD_SWITCH=1; SOUND_PREFER_SWITCH=1; BDUSS=R2bEZvTjFCNHQxdUV-cTZ-MzZrSGxhbUYwSkRkUWk2SkxxS3E2M2lqaFRLUlJoRVFBQUFBJCQAAAAAAAAAAAEAAAA3e~BTveK-9sHLZGF5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFOc7GBTnOxgaW; BDUSS_BFESS=R2bEZvTjFCNHQxdUV-cTZ-MzZrSGxhbUYwSkRkUWk2SkxxS3E2M2lqaFRLUlJoRVFBQUFBJCQAAAAAAAAAAAEAAAA3e~BTveK-9sHLZGF5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFOc7GBTnOxgaW; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; BAIDUID_BFESS=DAA8F9F0BD801A29B2813502000BF8E9:SL=0:NR=10:FG=1; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; PSINO=2; H_PS_PSSID=34435_31660_34405_34004_34073_34092_26350_34426_34323_22158_34390; delPer=1; BA_HECTOR=8185a12020018421b61gi6ka20q; BCLID=10943521300863382545; BDSFRCVID=boDOJexroG0YyvRHKn7hh7zlD_weG7bTDYLEOwXPsp3LGJLVJeC6EG0Pts1-dEu-EHtdogKK0mOTHv8F_2uxOjjg8UtVJeC6EG0Ptf8g0M5; H_BDCLCKID_SF=tR3aQ5rtKRTffjrnhPF3-44vXP6-hnjy3bRkX4Q4Wpv_Mnndjn6SQh4Wbttf5q3RymJ42-39LPO2hpRjyxv4y4Ldj4oxJpOJ-bCL0p5aHl51fbbvbURvD-ug3-7qqU5dtjTO2bc_5KnlfMQ_bf--QfbQ0hOhqP-jBRIE3-oJqC8hMIt43f; BCLID_BFESS=10943521300863382545; BDSFRCVID_BFESS=boDOJexroG0YyvRHKn7hh7zlD_weG7bTDYLEOwXPsp3LGJLVJeC6EG0Pts1-dEu-EHtdogKK0mOTHv8F_2uxOjjg8UtVJeC6EG0Ptf8g0M5; H_BDCLCKID_SF_BFESS=tR3aQ5rtKRTffjrnhPF3-44vXP6-hnjy3bRkX4Q4Wpv_Mnndjn6SQh4Wbttf5q3RymJ42-39LPO2hpRjyxv4y4Ldj4oxJpOJ-bCL0p5aHl51fbbvbURvD-ug3-7qqU5dtjTO2bc_5KnlfMQ_bf--QfbQ0hOhqP-jBRIE3-oJqC8hMIt43f; Hm_lvt_64ecd82404c51e03dc91cb9e8c025574=1629701482,1629702031,1629702343,1629704515; Hm_lpvt_64ecd82404c51e03dc91cb9e8c025574=1629704515; __yjs_st=2_MDBkZDdkNzg4YzYyZGU2NTM5NzBjZmQ0OTZiMWRmZGUxM2QwYzkwZTc2NTZmMmIxNDJkYzk4NzU1ZDUzN2U3Yjc4ZTJmYjE1YTUzMTljYWFkMWUwYmVmZGEzNmZjN2FlY2M3NDAzOThhZTY5NzI0MjVkMmQ0NWU3MWE1YTJmNGE5NDBhYjVlOWY3MTFiMWNjYTVhYWI0YThlMDVjODBkNWU2NjMwMzY2MjFhZDNkMzVhNGMzMGZkMWY2NjU5YzkxMDk3NTEzODJiZWUyMjEyYTk5YzY4ODUyYzNjZTJjMGM5MzhhMWE5YjU3NTM3NWZiOWQxNmU3MDVkODExYzFjN183XzliY2RhYjgz; ab_sr=1.0.1_ZTc2ZDFkMTU5ZTM0ZTM4MWVlNDU2MGEzYTM4MzZiY2I2MDIxNzY1Nzc1OWZjZGNiZWRhYjU5ZjYwZmNjMTE2ZjIzNmQxMTdiMzIzYTgzZjVjMTY0ZjM1YjMwZTdjMjhiNDRmN2QzMjMwNWRhZmUxYTJjZjZhNTViMGM2ODFlYjE5YTlmMWRjZDAwZGFmMDY4ZTFlNGJiZjU5YzE1MGIxN2FiYTU3NDgzZmI4MDdhMDM5NTQ0MjQxNDBiNzdhMDdl',
    # 'Host': 'fanyi.baidu.com',
    # 'Origin': 'https://fanyi.baidu.com',
    # 'Referer': 'https://fanyi.baidu.com/?aldtype=16047',
    # 'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
    # 'sec-ch-ua-mobile': '?0',
    # 'Sec-Fetch-Dest': 'empty',
    # 'Sec-Fetch-Mode': 'cors',
    # 'Sec-Fetch-Site': 'same-origin',
    # 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
    # 'X-Requested-With': 'XMLHttpRequest',
}

data = {
    'from': 'en',
    'to': 'zh',
    'query': 'love',
    'transtype': 'realtime',
    'simple_means_flag': '3',
    'sign': '198772.518981',
    'token': '5483bfa652979b41f9c90d91f3de875d',
    'domain': 'common',
}

# post请求的参数  必须进行编码 并且要调用encode方法
data = urllib.parse.urlencode(data).encode('utf-8')

# 请求对象的定制
request = urllib.request.Request(url=url, data=data, headers=headers)

# 模拟浏览器向服务器发送请求
response = urllib.request.urlopen(request)

# 获取响应的数据
content = response.read().decode('utf-8')

import json

obj = json.loads(content)
print(obj) #{'trans_result': {'data': [{'dst': '爱', 'prefixWrap': 0, 'result': [[0, '爱', ['0|4'], [], ['0|4'], ['0|3']]], 'src': 'love'}],...
```

## 9.ajax的get请求

案例：豆瓣电影(https://movie.douban.com/typerank?type_name=%E5%8A%A8%E4%BD%9C&type=5&interval_id=100:90&action=)

ajax的get请求豆瓣电影第一页

```python
# get请求
# 获取豆瓣电影的第一页的数据 并且保存起来

import urllib.request

url = 'https://movie.douban.com/j/chart/top_list?type=5&interval_id=100%3A90&action=&start=0&limit=20'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
}

# (1) 请求对象的定制
request = urllib.request.Request(url=url, headers=headers)

# （2）获取响应的数据
response = urllib.request.urlopen(request)
content = response.read().decode('utf-8')

# (3) 数据下载到本地
# open方法默认情况下使用的是gbk的编码  如果我们要想保存汉字 那么需要在open方法中指定编码格式为utf-8
# encoding = 'utf-8'
# fp = open('douban.json','w',encoding='utf-8')
# fp.write(content)

with open('./douban.json', 'w', encoding='utf-8') as fp:
    fp.write(content)
```

ajax的get请求爬取豆瓣电影前10页数据

```python
# 爬取豆瓣电影前10页数据
# https://movie.douban.com/j/chart/top_list?type=20&interval_id=100%3A90&action=&start=0&limit=20
# https://movie.douban.com/j/chart/top_list?type=20&interval_id=100%3A90&action=&start=20&limit=20
# https://movie.douban.com/j/chart/top_list?type=20&interval_id=100%3A90&action=&start=40&limit=20
import urllib.request
import urllib.parse
# 下载前10页数据
# 下载的步骤：1.请求对象的定制 2.获取响应的数据 3.下载
# 每执行一次返回一个request对象
def create_request(page):
    base_url = 'https://movie.douban.com/j/chart/top_list?type=20&interval_id=100%3A90&action=&'
    headers = {
        'User‐Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,like Gecko) Chrome/76.0.3809.100 Safari/537.36'
    }
    data={
        # 1 2 3 4
        # 0 20 40 60
        'start':(page‐1)*20,
        'limit':20
    }
    # data编码
    data = urllib.parse.urlencode(data)
    url = base_url + data
    request = urllib.request.Request(url=url,headers=headers)
    return request

# 获取网页源码
def get_content(request):
    response = urllib.request.urlopen(request)
    content = response.read().decode('utf‐8')
    return content

def down_load(page,content):
    # with open（文件的名字，模式，编码）as fp:
    # fp.write(内容)
    with open('douban_'+str(page)+'.json','w',encoding='utf‐8')as fp:
    fp.write(content)
    
if __name__ == '__main__':
    start_page = int(input('请输入起始页码'))
    end_page = int(input('请输入结束页码'))
    for page in range(start_page,end_page+1):
        request = create_request(page)
        content = get_content(request)
        down_load(page,content)
```

## 10.ajax的post请求

案例：KFC官网(http://www.kfc.com.cn/kfccda/storelist/index.aspx)

```python
# 1页
# http://www.kfc.com.cn/kfccda/ashx/GetStoreList.ashx?op=cname
# post
# cname: 北京
# pid:
# pageIndex: 1
# pageSize: 10


# 2页
# http://www.kfc.com.cn/kfccda/ashx/GetStoreList.ashx?op=cname
# post
# cname: 北京
# pid:
# pageIndex: 2
# pageSize: 10

import urllib.request
import urllib.parse


def create_request(page):
    base_url = 'http://www.kfc.com.cn/kfccda/ashx/GetStoreList.ashx?op=cname'

    data = {
        'cname': '武汉',
        'pid': '',
        'pageIndex': page,
        'pageSize': '10'
    }

    data = urllib.parse.urlencode(data).encode('utf-8')

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
    }

    request = urllib.request.Request(url=base_url, headers=headers, data=data)

    return request


def get_content(request):
    response = urllib.request.urlopen(request)
    content = response.read().decode('utf-8')
    return content


def down_load(page, content):
    with open('kfc_' + str(page) + '.json', 'w', encoding='utf-8')as fp:
        fp.write(content)


if __name__ == '__main__':
    start_page = int(input('请输入起始页码'))
    end_page = int(input('请输入结束页码'))

    for page in range(start_page, end_page + 1):
        # 请求对象的定制
        request = create_request(page)
        # 获取网页源码
        content = get_content(request)
        # 下载
        down_load(page, content)
```

## 11.URLError\HTTPError

简介: 

1.HTTPError类是URLError类的子类。

2.导入的包 `urllib.error.HTTPError`   `urllib.error.URLError`。

3.http错误：http错误是针对浏览器无法连接到服务器而增加出来的错误提示。引导并告诉浏览者该页面是哪里出了问题。

4.通过urllib发送请求的时候，有可能会发送失败，这个时候如果想让你的代码更加的健壮，可以通过try‐except进行捕获异常，
  异常有两类，URLError\HTTPError。

HTTPError是URLError的子类，他的异常有3个属性：

- code:返回状态码404表示不存在，500表示服务器错误
- reason:返回错误原因
- headers:返回请求头

```python
import urllib.request
import urllib.error

url = 'http://www.doudan1111.com'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
}

try:
    request = urllib.request.Request(url=url, headers=headers)

    response = urllib.request.urlopen(request)

    content = response.read().decode('utf-8')

    print(content)
except urllib.error.HTTPError:
    print('系统正在升级。。。')
except urllib.error.URLError:
    print('我都说了 系统正在升级。。。')
```

## 12.cookie登录

qq空间登录:

```python
# 适用的场景：数据采集的时候 需要绕过登陆 然后进入到某个页面
# 个人信息页面是utf-8  但是还报错了编码错误  因为并没有进入到个人信息页面 而是跳转到了登陆页面
# 那么登陆页面不是utf-8  所以报错

# 什么情况下访问不成功？
# 因为请求头的信息不够  所以访问不成功

import urllib.request

# qq空间页面
url = 'https://user.qzone.qq.com/1693889638'

headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    "cookie": "pac_uid=0_67071cf6d5611; iip=0; pgv_pvid=5394955464; ptui_loginuin=1693889638; RK=Jt+Z402AcZ; ptcz=24bb59a9d3448d849c597db3037ea41238a9a5d9c0fd1fd6e92d50d024ffa172; luin=o1218357610; eas_sid=q1t6e435E562A1n8o208B6P7U5; o_cookie=1218357610; tvfe_boss_uuid=5dd513e15648495d; lskey=000100009c2ef57bef9a8e73b426deae7e7d71dbb646a64cc1578a84f1610a34c3159cf935eb483a0398fcf2; Loading=Yes; pgv_info=ssid=s865660864; _qpsvr_localtk=0.5880324295983725; uin=o1693889638; skey=@MGHOV73Dx; p_uin=o1693889638; pt4_token=cdjl8W4h4-7fShM-j9LhWcY4hv9Aq1EBrR4t7SmOpIU_; p_skey=5*qTgOdzljMhVH3EZjo20LLv6zOHfSwPPL1-KMmMJy8_",
    "referer": "https://user.qzone.qq.com"
}
# 请求对象的定制
request = urllib.request.Request(url=url, headers=headers)
# 模拟浏览器向服务器发送请求
response = urllib.request.urlopen(request)
# 获取响应的数据
content = response.read().decode('utf-8')

# 将数据保存到本地
with open('qq.html', 'w', encoding='utf-8')as fp:
    fp.write(content)
```

## 13.Handler处理器

为什么要学习handler？

- ​    `urllib.request.urlopen(url) `不能定制请求头
- ​    `urllib.request.Request(url,headers,data) `可以定制请求头
- ​    `Handler` 定制更高级的请求头
- ​    随着业务逻辑的复杂 请求对象的定制已经满足不了我们的需求，主要是用来做代理服务器

```python
#例子: 
# 需求 使用handler来访问百度  获取网页源码

import urllib.request

url = 'http://www.baidu.com/s?wd=ip'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
}

request = urllib.request.Request(url=url, headers=headers)

# handler   build_opener  open

# （1）获取hanlder对象
handler = urllib.request.HTTPHandler()

# （2）获取opener对象
opener = urllib.request.build_opener(handler)

# (3) 调用open方法
response = opener.open(request)

content = response.read().decode('utf-8')

print(content)
with open('handle.html', 'w', encoding='utf-8') as f:
    f.write(content)
```

## 14.代理服务器

### 1.代理的常用功能?

- 1.突破自身IP访问限制，访问国外站点。
- 2.访问一些单位或团体内部资源。扩展：某大学FTP(前提是该代理地址在该资源的允许访问范围之内)，使用教育网内地址段免费代理服务器，就可以用于对教育网开放的各类FTP下载上传，以及各类资料查询共享等服务。
- 3.提高访问速度。扩展：通常代理服务器都设置一个较大的硬盘缓冲区，当有外界的信息通过时，同时也将其保存到缓冲区中，当其他用户再访问相同的信息时， 则直接由缓冲区中取出信息，传给用户，以提高访问速度。
- 4.隐藏真实IP。扩展：上网者也可以通过这种方法隐藏自己的IP，免受攻击。

### 2.代码配置代理

- 创建Reuqest对象
- 创建ProxyHandler对象
- 用handler对象创建opener对象
- 使用opener.open函数发送请求

```python
# 需求 使用handler来访问百度  获取网页源码

import urllib.request

url = 'http://www.baidu.com/s?wd=ip'

headers = {
    #  cookie你先自己登录百度帐号就有了
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Cookie': 'BD_UPN=12314753; PSTM=1645619138; BAIDUID=6C26F1D768187F46FEF333F9BF4FD5BE:FG=1; BIDUPSID=9A17F4A46C16A4AC52CBC27ACA53A0DF; BDUSS=Wt0QWlrMkZVeXN2VW1pSGU4QWhHMklrUWNRWHdKUzV4UFd1S0Zucm9xc1REejlpRVFBQUFBJCQAAAAAAAAAAAEAAABwGEfp19-5~dHH1t61xNDcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABOCF2ITghdiV; BDUSS_BFESS=Wt0QWlrMkZVeXN2VW1pSGU4QWhHMklrUWNRWHdKUzV4UFd1S0Zucm9xc1REejlpRVFBQUFBJCQAAAAAAAAAAAEAAABwGEfp19-5~dHH1t61xNDcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABOCF2ITghdiV; __yjs_duid=1_0d031367a111e1984cadc96761213f231645776147631; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; channel=baidusearch; BAIDUID_BFESS=6C26F1D768187F46FEF333F9BF4FD5BE:FG=1; delPer=0; BD_CK_SAM=1; PSINO=6; sug=3; sugstore=1; ORIGIN=2; bdime=0; baikeVisitId=b3660019-7abe-4bc8-bdda-8d22d956f633; H_PS_PSSID=35839_35105_31660_35832_34813_34584_35949_35955_35319_26350_35881_35878_35940; H_PS_645EC=6a75zgMPRmCjweLYDZjpzIfPXqtZP7eeKGjlxKz5Z7LtYBCmVpsNAef78MY; shifen[6847014_97197]=1646897210; BCLID=10772530509546581620; BCLID_BFESS=10772530509546581620; BA_HECTOR=2l250h802kak25a4kn1h2ja1q0r; COOKIE_SESSION=30_2_3_5_8_4_0_0_3_2_1_1_4001_0_0_0_1646895328_1646826219_1646897209%7C9%2315449_39_1646826217%7C9; BD_HOME=1; BDSFRCVID=xzDsJeCCxG3_WP5D2sLYyb9ZsMIRY2CFAFHL3J; H_BDCLCKID_SF=tJ4toCPMJI_3fP36q45HMt00qxby26nKanR9aJ5nQI5nhU7505oUDRtTbb8J0UAJ5m3i2DTvQUbmjRO206oay6O3LlO83h5wW57KKl0MLPbcep68LxODy6DI0xnMBMnr52OnaU513fAKftnOM46JehL3346-35543bRTLnLy5KJYMDF4D5_ae5O3DGRf-b-X25TKBRbq2RREKROvhjRW2x0yyxom3bvxtaOUbI5gttOdotTPeq65XfFwWH5m0folWgteaDcJ-J8XhD-4j6rP; BDSFRCVID_BFESS=xzDsJeCCxG3_WP5D2sLYyb9ZsMIRY2CFAFHL3J; H_BDCLCKID_SF_BFESS=tJ4toCPMJI_3fP36q45HMt00qxby26nKanR9aJ5nQI5nhU7505oUDRtTbb8J0UAJ5m3i2DTvQUbmjRO206oay6O3LlO83h5wW57KKl0MLPbcep68LxODy6DI0xnMBMnr52OnaU513fAKftnOM46JehL3346-35543bRTLnLy5KJYMDF4D5_ae5O3DGRf-b-X25TKBRbq2RREKROvhjRW2x0yyxom3bvxtaOUbI5gttOdotTPeq65XfFwWH5m0folWgteaDcJ-J8XhD-4j6rP; BDSVRTM=74',
}

request = urllib.request.Request(url=url, headers=headers)

# handler   build_opener  open

# 代理
proxy = {
    'http': "123.180.209.48:4231"
}
# 获取hanlder对象
handler = urllib.request.ProxyHandler(proxies=proxy)
# （2）获取opener对象
opener = urllib.request.build_opener(handler)

# (3) 调用open方法
response = opener.open(request)

content = response.read().decode('utf-8')

print(content)
with open('daili.html', 'w', encoding='utf-8') as f:
    f.write(content)
```

扩展：

- 快代理
- 芝麻HTTP代理
- 青果网

### 3.代理池

```python
import random

pools = [
    {"http": "150.158.21.251:8080"},
    {"http": "150.158.21.251:8090"},
    {"http": "150.158.21.251:90"},
    {"http": "150.158.21.251:80"},
    {"http": "150.158.21.251:00"},
]
result = random.choice(pools)

print(result)
```

