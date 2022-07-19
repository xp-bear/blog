# httpx 的基本学习

httpx 是新一代的网络请求库，它有如下的特点:

- 基于 python3 的功能齐全的 http 请求模块
- 既能发送**同步请求**，也能发送**异步请求**
- 支持 http1.1 和 http2.0
- 能直接向 WSGI、ASGI 等应用程序发送请求

- 查看请求所用的协议是 HTTP/1.1，还是 HTTP/2.0 的方法(打开浏览器的开发者模式中查看)：
  ![请求所用的协议是HTTP/1.1，还是HTTP/2.0](http://mk.xxoutman.cn/httpx/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAMTAyNOeggeWtl-eMvw==,size_16,color_FFFFFF,t_70,g_se,x_16.png)

## 一、快速入门

httpx 需要使用 python3.6+,使用异步请求则需要 python3.8+

```python
pip install httpx
```

要使用 http/2,则需要安装 http2 的相关依赖

```python
pip install httpx[http2]
```

### 1、get 请求

```python
import httpx

response = httpx.get('https://www.example.org/')
print(response.status_code) # 200
print(response.headers['content-type']) # text/html; charset=UTF-8
print(response.text) #打印网页数据源码
```

### 2、post 请求

```python
import httpx
import json

data = {
    'kw': 'spider'
}

response = httpx.post('https://fanyi.baidu.com/sug', data=data)
obj = json.loads(response.text)

print(obj)
```

### 3、put、delete、head、options 请求

```python
import httpx

httpx.put('https://httpbin.org/put', data={'key': 'value'})
httpx.delete('https://httpbin.org/delete')
httpx.head('https://httpbin.org/get')
httpx.options('https://httpbin.org/get')
```

### 4、在 url 链接中传递参数

#### A、使用 params 关键字传递参数

```python
import httpx

url = 'https://httpbin.org/get'
params = {
    'name': '萧兮',
    'age': '18'
}
r = httpx.get('https://httpbin.org/get', params=params)
print(r.status_code)  # 200
print(r.url)  # https://httpbin.org/get?name=%E8%90%A7%E5%85%AE&age=18
```

#### B、列表数据类型

```python
import httpx

params = {
    'name': '萧兮',
    'age': '18',
    "hobby": ['sing', 'dance', 'rap']
}
r = httpx.get('https://httpbin.org/get', params=params)
print(r.status_code)  # 200
print(r.url)  # https://httpbin.org/get?name=%E8%90%A7%E5%85%AE&age=18&hobby=sing&hobby=dance&hobby=rap
```

### 5、响应文本内容

```python
import httpx

r = httpx.get('https://www.example.org/')
print(r.text)
```

### 6、查看或设置网页的编码

#### A、查看网页的编码

```python
import httpx

r = httpx.get('https://httpbin.org/get')
# 查看网页的编码
print(r.encoding) # utf-8
```

#### B、设置编码方式，一旦设置就会覆盖原来的编码

```python
import httpx

r = httpx.get('https://httpbin.org/get')
r.encoding = 'gbk'
print(r.encoding) # gbk
print(r.text)
```

### 7、二进制响应内容

```python
import httpx

r = httpx.get('https://httpbin.org/get')
print(r.content)
```

### 8、JSON 响应内容

```python
import httpx

r = httpx.get('http://150.158.21.251:3300/search?key=周杰伦')
print(r.json())
```

### 10、传入 headers 请求头

```python
import httpx

url = 'https://httpbin.org/headers'
headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36'
}
r = httpx.get(url, headers=headers)
print(r.status_code)  # 200
print(r.headers)
```

### 11、cookies 的处理

```python
import httpx

url = 'http://httpbin.org/cookies'
cookies = {'color': 'green'}
r = httpx.get(url, cookies=cookies)
print(r.json())   # {'cookies': {'color': 'green'}}
```

### 12、设置 cookies 按域访问

```python
import httpx

url = 'http://httpbin.org/cookies'

cookies = httpx.Cookies()
cookies.set('cookie_on_domain', 'start', domain='httpbin.org')
cookies.set('cookie_off_domain', 'end', domain='example.org')
r = httpx.get(url, cookies=cookies)
print(r.json())
```

### 14、状态码

```python
import httpx

r = httpx.get('https://httpbin.org/get')
print(r.status_code) # 200

print(r.status_code == httpx.codes.OK) # True
```

- 其它状态码：比如 404

```python
import httpx

not_found = httpx.get('https://httpbin.org/status/404')
print(not_found.status_code) # 404
# 捕获异常
# print(not_found.raise_for_status())
```

### 18、访问指定的 Cookie

```python
import httpx

r = httpx.get('https://httpbin.org/cookies/set?chocolate=chip')
print(r.cookies['chocolate']) # chip
```

### 19、Cookies 参数

```python
import httpx

cookies = {'key':'value'}
# 发出请求时，传入cookies参数
res = httpx.get('https://httpbin.org/cookies',cookies=cookies)
print(res.json())

```

### 22、超时设置

- timeout 参数值太小，会报错

```python
import httpx

r = httpx.get('https://github.com/',timeout=0.001) # 报错

```

- 完全禁用超时行为

```python
import httpx

r = httpx.get('http://github.com',timeout=None)
print(r.url) # http://github.com
print(r.status_code) # 301

```

### 23、HTTP 身份验证

- 没有进行 http 身份验证时

```python
import httpx

r = httpx.get('https://ssr3.scrape.center/')
print(r.url) # https://ssr3.scrape.center/
print(r.status_code) # 401
```

- 进行 http 身份验证

```python
import httpx

r = httpx.get('https://ssr3.scrape.center/',auth=("admin", "admin"))
print(r.url) # https://ssr3.scrape.center/
print(r.status_code) # 200
```

## 二、高级用法

基本用法中，httpx 每发送一次请求都要建立一个新的连接，请求数量很大时，效率就会变得很差，也会造成资源的浪费

httpx 中提供了 client 来解决这个问题，它是基于 http 连接池来实现的。如果对同一个网站发送多次请求，client 会继续保持原有的 tcp 连接来提高效率。

### 4.1 使用 client 对象来发送请求

```python
import httpx

with httpx.Client() as client:
    headers = {'User-Agent': 'test'}
    r = client.get('https://example.com', headers=headers)
    print(r.text)
```

### 4.2 跨请求共享配置

可以将 headers、cookies、params 等参数放在 httpx.Client()中，在 client 下的请求共享这些配置参数

```python
import httpx

headers1 = {'x-auth': 'from-client'}
params1 = {'client_id': '1234'}
url = 'https://example.com'
with httpx.Client(headers=headers1, params=params1) as client:
    headers2 = {'x-custom': 'from-request'}
    params2 = {'request_id': '4321'}
    r1 = client.get(url)
    print(r1.request.headers)
    print(r1.url)

    r2 = client.get(url, headers=headers2, params=params2)
    print(r2.request.headers)
    print(r2.url)
```

result:

```python
Headers({'host': 'example.com', 'accept': '*/*', 'accept-encoding': 'gzip, deflate', 'connection': 'keep-alive', 'user-agent': 'python-httpx/0.23.0', 'x-auth': 'from-client'})
https://example.com?client_id=1234

Headers({'host': 'example.com', 'accept': '*/*', 'accept-encoding': 'gzip, deflate', 'connection': 'keep-alive', 'user-agent': 'python-httpx/0.23.0', 'x-auth': 'from-client', 'x-custom': 'from-request'})
https://example.com?client_id=1234&request_id=4321
```

可以看到，r1 的请求头包含 from-client，r2 的请求头不仅包含 headers2 的内容，也包含了 headers1 的内容，最后的请求头相当于 headers1 和 headers2 做了合并作为最终的请求头

### 4.3 http 代理

httpx 可以通过 proxies 参数来使用 htttp 代理，也可以使用不同的代理分别来处理 http 和 https 协议的请求

```python
import httpx

proxies = {
    'http://': 'http://localhost:8080',  # 代理1
    'https://': 'http://localhost:8081',  # 代理2
}
url = 'https://example.com'
with httpx.Client(proxies=proxies) as client:
    r1 = client.get(url)
    print(r1)
```

httpx 的代理参数 proxies 只能在 httpx.Client()里面添加，不能在 client.get()里面添加

```python
import httpx

proxies = {
    'http://': 'http://localhost:7890',  # 代理1
    'https://': 'http://localhost:7890',  # 代理2
}
url = 'https://www.youtube.com/'
with httpx.Client(proxies=proxies) as client:
    r1 = client.get(url)
    print(r1.text)
# 这里可以打印youtube的代码
```

### 4.4 超时问题

默认情形下，httpx 做了严格的超时处理，超过 5 秒无响应则超时

#### 4.4.1 设置请求时间

普通请求:

```python
httpx.get('http://example.com/api/v1/example', timeout=10.0)
```

client 实例：

```python
with httpx.Client() as client:
    client.get("http://example.com/api/v1/example", timeout=10.0)
```

#### 4.4.2 关闭超时处理

普通请求:

```python
httpx.get('http://example.com/api/v1/example', timeout=None)
```

client 实例：

```python
with httpx.Client() as client:
    client.get("http://example.com/api/v1/example", timeout=None)
```

### 4.5 SSL 认证

当请求 https 的协议的链接时，发出的请求需要对主机身份进行认证，因此需要 SSL 证书来进行认证。如果要自定义 CA 证书，则可以使用 verify 参数

```python
r = httpx.get("https://example.org", verify="path/to/client.pem")
```

或者禁用 SSL 认证

```python
r = httpx.get("https://example.org", verify=False)
```

## 三、异步请求

默认情况下，httpx 采用标准的同步请求方式。如果要使用异步请求，也可以用起提供的异步 client 来处理异步请求

使用异步 client 比使用多线程发送请求更加高效，更能体现明显的性能优势，并且还支持 websocket 等长连接

### 5.1 发送异步请求

使用 async/await 来进行异步请求的相关处理.

asyncio.gather 和 asyncio.wait 的区别: wait 执行顺序是随机的，gather 执行顺序是有序的.

```python
import httpx
import asyncio

async def main():
    async with httpx.AsyncClient() as client:
        r = await client.get('https://www.example.com/')
        print(r)


if __name__ == '__main__':
    asyncio.run(main())
```

result:

```python
<Response [200 OK]>
```

### 5.2 异步请求与同步请求的比较

#### 5.2.1 同步请求

```python
import httpx
import time


def main():
    with httpx.Client() as client:
        for i in range(300):
            res = client.get('https://www.example.com/')
            print(f'第{i}次请求， status_code = {res.status_code}')


if __name__ == '__main__':
    tiem1 = time.time()
    main()
    tiem2 = time.time()
    print(f'同步发送300次请求，耗时:{tiem2 - tiem1}')
```

result:

```python
第0次请求， status_code = 200
第1次请求， status_code = 200
第2次请求， status_code = 200
......
第298次请求， status_code = 200
第299次请求， status_code = 200
同步发送300次请求，耗时:71.6340000629425
```

#### 5.2.2 异步请求

```python
# 普通请求:
import httpx
import time
import asyncio

async def req(client, i):
    res = await client.get('https://www.example.com/')
    print(f'第{i}次请求， status_code = {res.status_code}')
    return res

async def main():
    async with httpx.AsyncClient() as client:
        task_list = []
        for i in range(300):
            res = req(client, i)
            task = asyncio.create_task(res)
            task_list.append(task)
        await asyncio.gather(*task_list)


if __name__ == '__main__':
    tiem1 = time.time()
    asyncio.run(main())
    tiem2 = time.time()
    print(f'同步发送300次请求，耗时:{tiem2 - tiem1}')
```

result:

```python
第6次请求， status_code = 200
第10次请求， status_code = 200
第4次请求， status_code = 200
......
第297次请求， status_code = 200
第298次请求， status_code = 200
第299次请求， status_code = 200
同步发送300次请求，耗时:3.936000108718872
```

由于异步执行，所以打印出来的 i 是无序的

#### 抓取房屋信息案例

```python
from fake_useragent import UserAgent
import csv
import re
import time
from parsel import Selector
import httpx
import asyncio
import openpyxl


class HomeLinkSpider(object):
    def __init__(self):
        self.ua = UserAgent()
        self.headers = {"User-Agent": self.ua.random}
        self.data = list()
        self.path = "浦东_三房_500_800万.csv"
        self.url = "https://sh.lianjia.com/ershoufang/pudong/a3p5/"

    # 同步获取页码
    def get_max_page(self):
        response = httpx.get(self.url, headers=self.headers)
        if response.status_code == 200:
            # 创建Selector类实例
            selector = Selector(response.text)
            # 采用css选择器获取最大页码div Boxl
            a = selector.css('div[class="page-box house-lst-page-box"]')
            # 使用eval将page-data的json字符串转化为字典格式
            max_page = eval(a[0].xpath('//@page-data').get())["totalPage"]
            print("最大页码数:{}".format(max_page))
            return max_page
        else:
            print("请求失败 status:{}".format(response.status_code))
            return None

    # 异步 - 使用协程函数解析单页面，需传入单页面url地址
    async def parse_single_page(self, url):
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=self.headers)
            selector = Selector(response.text)
            ul = selector.css('ul.sellListContent')[0]
            li_list = ul.css('li')
            for li in li_list:
                detail = dict()
                detail['title'] = li.css('div.title a::text').get()

                #  2室1厅 | 74.14平米 | 南 | 精装 | 高楼层(共6层) | 1999年建 | 板楼
                house_info = li.css('div.houseInfo::text').get()
                house_info_list = house_info.split(" | ")

                detail['bedroom'] = house_info_list[0]
                detail['area'] = house_info_list[1]
                detail['direction'] = house_info_list[2]

                floor_pattern = re.compile(r'\d{1,2}')
                match1 = re.search(floor_pattern, house_info_list[4])  # 从字符串任意位置匹配
                if match1:
                    detail['floor'] = match1.group()
                else:
                    detail['floor'] = "未知"

                # 匹配年份
                year_pattern = re.compile(r'\d{4}')
                match2 = re.search(year_pattern, house_info_list[5])
                if match2:
                    detail['year'] = match2.group()
                else:
                    detail['year'] = "未知"

                # 文兰小区 - 塘桥    提取小区名和哈快
                position_info = li.css('div.positionInfo a::text').getall()
                detail['house'] = position_info[0]
                detail['location'] = position_info[1]

                # 650万，匹配650
                price_pattern = re.compile(r'\d+')
                total_price = li.css('div.totalPrice span::text').get()
                detail['total_price'] = re.search(price_pattern, total_price).group()

                # 单价64182元/平米， 匹配64182
                unit_price = li.css('div.unitPrice span::text').get()
                detail['unit_price'] = re.search(price_pattern, unit_price).group()

                self.data.append(detail)

    # 页面解析
    def parse_page(self):
        max_page = self.get_max_page()
        loop = asyncio.get_event_loop()  # 我们想使用协程 首先要生成一个loop对象

        tasks = []  # 协程任务列表
        for i in range(1, max_page + 1):
            url = 'https://sh.lianjia.com/ershoufang/pudong/pg{}a3p5/'.format(i)
            tasks.append(self.parse_single_page(url))

        # asyncio.wait 把所有 Task 任务结果收集起来。
        loop.run_until_complete(asyncio.wait(tasks))
        loop.close()

    def write_csv_file(self):
        head = ["标题", "小区", "房厅", "面积", "朝向", "楼层",
                "年份", "位置", "总价(万)", "单价(元/平方米)"]
        keys = ["title", "house", "bedroom", "area", "direction",
                "floor", "year", "location",
                "total_price", "unit_price"]

        try:
            wb = openpyxl.Workbook()
            ws = wb.active
            ws.append(head)
            for item in self.data:
                ws.append(
                    [item['title'], item['house'], item['bedroom'], item['area'], item['direction'],
                     item['floor'],
                     item['year'], item['location'], item['total_price'], item['unit_price']])
            wb.save('./房屋信息.xlsx')
            print('数据保存成功!')
        except Exception as e:
            print("保存失败!", e)


if __name__ == '__main__':
    start = time.time()
    home_link_spider = HomeLinkSpider()
    home_link_spider.parse_page()
    home_link_spider.write_csv_file()
    end = time.time()
    print("耗时：{}秒".format(end - start))
```

#### 风车动漫抓取

```python
import httpx
from fake_useragent import UserAgent
from parsel import Selector
import asyncio


class Cartoon:
    def __init__(self):
        self.ua = UserAgent()
        self.headers = {
            "User-Agent": self.ua.random
        }
        self.data = []  # 存放抓取到的数据容器
        self.url = "https://fengchedm.tv/dm/2-1.html"  # 最大页数是:

    # 获取最大的页码数
    def max_page(self):
        response = httpx.get(self.url, headers=self.headers)
        if response.status_code == 200:
            selector = Selector(response.text)
            a = selector.xpath('/html/body/div[1]/div/ul/li[10]/a/@href').get()
            return a  # /dm/2-112.html
        else:
            print('请求失败,状态码:', response.status_code)
            return None

    # 异步页面解析函数
    async def parse_page(self, url):
        async with httpx.AsyncClient(headers=self.headers, timeout=None) as client:
            response = await client.get(url)
            selector = Selector(response.text)
            # 解析ul中的数据
            ul = selector.css('ul.myui-vodlist ')[0]
            li_list = ul.css('li')
            # print(li_list)  # 获取到每一个li

            for li in li_list:
                detail = {}
                detail['img_url'] = 'https://fengchedm.tv' + li.xpath('./div/a/@data-original').get()  # 图片链接
                detail['title'] = li.xpath('./div/a/@title').get()  # 动漫标题
                detail['statue'] = li.xpath('./div/a/span[3]/text()').get().strip()  # 动漫完结状态
                detail['grade'] = li.xpath('./div/a/span[2]/text()').get().strip()  # 动漫评分
                detail['actors'] = li.xpath('./div/div/p/text()').get().strip()  # 动漫演员
                self.data.append(detail)
            print('数据源: ', len(self.data))

    # 构建协程
    def pool(self):
        max_num = self.max_page().split('-')[1].split('.')[0]  # 最大的页码
        # 创建一个loop对象
        loop = asyncio.get_event_loop()
        tasks = []  # 携程任务列表

        for i in range(1, int(max_num) + 1):  # max_num + 1
            url = f'https://fengchedm.tv/dm/2-{str(i)}.html'
            tasks.append(self.parse_page(url))

        loop.run_until_complete(asyncio.wait(tasks))
        loop.close()

    # 保存数据
    def save_data(self):
        with open('./cartoon.json', 'w', encoding='utf-8') as f:
            f.write(str(self.data))


if __name__ == '__main__':
    cartoon = Cartoon()
    cartoon.pool()
    cartoon.save_data()
```
