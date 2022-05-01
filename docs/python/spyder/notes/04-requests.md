# requests

## 1.基本使用

文档：

官方文档	https://docs.python-requests.org/zh_CN/latest/

2.安装

```python
pip install requests
```

3.response的属性以及类型 (1个类型和6个属性)

```python
type(response): <class 'requests.models.Response'>
response.text 	   	  : 获取网站源码
response.encoding 	  : 访问或定制编码方式
response.url 	   	  : 获取请求的url
response.content  	  : 响应的字节类型
response.status_code : 响应的状态码
response.headers     : 响应的头信息
```

```python
import requests

url = 'http://www.baidu.com'

response = requests.get(url=url)

# 一个类型和六个属性
# Response类型
# print(type(response))

# 设置响应的编码格式
response.encoding = 'utf-8'

# 以字符串的形式来返回了网页的源码
print(response.text)

# 返回一个url地址
# print(response.url)

# 返回的是二进制的数据
# print(response.content)

# 返回响应的状态码
# print(response.status_code)

# 返回的是响应头
# print(response.headers)

```

## 2.get请求

```python
# urllib
# (1) 一个类型以及六个方法
# （2）get请求
# （3）post请求   百度翻译
# （4）ajax的get请求
# （5）ajax的post请求
# （6）cookie登陆 qq空间
# （7）代理


# requests
# (1)一个类型以及六个属性
# （2）get请求
# （3）post请求
# （4）代理
# （5）cookie  
# （6）验证码


import requests

url = 'https://www.baidu.com/s'

headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
}

data = {
    'wd': input('请输入搜索关键字: ')
}

# url  请求资源路径
# params 参数
# kwargs 字典
response = requests.get(url=url, params=data, headers=headers)

response.encoding = 'utf8'
content = response.text

print(content)

# 总结：
# （1）参数使用params传递
# （2）参数无需urlencode编码
# （3）不需要请求对象的定制
# （4）请求资源路径中的？可以加也可以不加

```

## 3.post请求

```python
import requests

url = 'https://fanyi.baidu.com/sug'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
}

data = {
    'kw': 'eye'
}

# url 请求地址
# data 请求参数
# kwargs 字典
response = requests.post(url=url, data=data, headers=headers)

content = response.text
print('源数据: ', content)

import json

obj = json.loads(content)
print('编码转字典数据: ', obj['data'])

# 总结：
# （1）post请求 是不需要编解码
# （2）post请求的参数是data
# （3）不需要请求对象的定制
```

## 4.get和post区别？

1： get请求的参数名字是params 	post请求的参数的名字是data

2： 请求资源路径后面可以不加?

3： 不需要手动编解码

4： 不需要做请求对象的定制

## 5.代理

```python
# proxy定制
# 在请求中设置proxies参数
# 参数类型是一个字典类型

import requests

url = 'http://www.baidu.com/s?'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
}

data = {
    'wd': 'ip'
}

proxy = {
    'http': 'http://117.95.199.250:4231'
}

response = requests.get(url=url, params=data, headers=headers, proxies=proxy)

content = response.text

with open('daili.html', 'w', encoding='utf-8')as fp:
    fp.write(content)

```

## 6.cookie定制

应用案例：古诗文网（需要验证）(https://so.gushiwen.cn/user/login.aspx?from=http://so.gushiwen.cn/user/collect.aspx)

![1646899071023](http://mk.xxoutman.cn/spyder/1646899071023.png)

```python
# 通过登陆  然后进入到主页面


# 通过找登陆接口我们发现 登陆的时候需要的参数很多
# _VIEWSTATE: /m1O5dxmOo7f1qlmvtnyNyhhaUrWNVTs3TMKIsm1lvpIgs0WWWUCQHl5iMrvLlwnsqLUN6Wh1aNpitc4WnOt0So3k6UYdFyqCPI6jWSvC8yBA1Q39I7uuR4NjGo=
# __VIEWSTATEGENERATOR: C93BE1AE
# from: http://so.gushiwen.cn/user/collect.aspx
# email: 595165358@qq.com
# pwd: action
# code: PId7
# denglu: 登录

# 我们观察到_VIEWSTATE   __VIEWSTATEGENERATOR  code是一个可以变化的量

# 难点:(1)_VIEWSTATE   __VIEWSTATEGENERATOR  一般情况看不到的数据 都是在页面的源码中
#     我们观察到这两个数据在页面的源码中 所以我们需要获取页面的源码 然后进行解析就可以获取了
#     (2)验证码

import requests

# 这是登陆页面的url地址
url = 'https://so.gushiwen.cn/user/login.aspx?from=http://so.gushiwen.cn/user/collect.aspx'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36'
}

# 获取页面的源码
response = requests.get(url=url, headers=headers)
content = response.text

# 解析页面源码  然后获取_VIEWSTATE   __VIEWSTATEGENERATOR
from bs4 import BeautifulSoup

soup = BeautifulSoup(content, 'lxml')

# 获取_VIEWSTATE
viewstate = soup.select('#__VIEWSTATE')[0].attrs.get('value')

# 获取__VIEWSTATEGENERATOR
viewstategenerator = soup.select('#__VIEWSTATEGENERATOR')[0].attrs.get('value')

# 获取验证码图片
code = soup.select('#imgCode')[0].attrs.get('src')
code_url = 'https://so.gushiwen.cn' + code

# 有坑
# import urllib.request
# urllib.request.urlretrieve(url=code_url,filename='code.jpg')
# requests里面有一个方法 session（）  通过session的返回值 就能使用请求变成一个对象

session = requests.session()
# 验证码的url的内容
response_code = session.get(code_url)
# 注意此时要使用二进制数据  因为我们要使用的是图片的下载
content_code = response_code.content
# wb的模式就是将二进制数据写入到文件
with open('code.jpg', 'wb')as fp:
    fp.write(content_code)

 

# 点击登陆
url_post = 'https://so.gushiwen.cn/user/login.aspx?from=http%3a%2f%2fso.gushiwen.cn%2fuser%2fcollect.aspx'

data_post = {
    '__VIEWSTATE': viewstate,
    '__VIEWSTATEGENERATOR': viewstategenerator,
    'from': 'http://so.gushiwen.cn/user/collect.aspx',
    'email': '1693889638@qq.com',
    'pwd': 'xp1693889638',
    'code': code_name,
    'denglu': '登录',
}

response_post = session.post(url=url, headers=headers, data=data_post)

content_post = response_post.text

with open('gushiwen.html', 'w', encoding=' utf-8')as fp:
    fp.write(content_post)

# 难点
# （1） 隐藏域
# （2） 验证码
```
