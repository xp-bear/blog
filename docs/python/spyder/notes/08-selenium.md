# Selenium

## 1.Selenium基本使用

### 1.1.什么是selenium？

（1）Selenium是一个用于Web应用程序测试的工具。

（2）Selenium 测试直接运行在浏览器中，就像真正的用户在操作一样。

（3）支持通过各种driver（FirfoxDriver，IternetExplorerDriver，OperaDriver，ChromeDriver）驱动真实浏览器完成测试。

（4）selenium也是支持无界面浏览器操作的。

### 1.2.为什么使用selenium？

模拟浏览器功能，自动执行网页中的js代码，实现动态加载

### 1.3.如何安装selenium？

（1）操作谷歌浏览器驱动下载地址
	http://chromedriver.storage.googleapis.com/index.html
（2）谷歌驱动和谷歌浏览器版本之间的映射表
	http://blog.csdn.net/huilan_same/article/details/51896672
（3）查看谷歌浏览器版本
		谷歌浏览器右上角‐‐>帮助‐‐>关于
（4）`pip install selenium==3.5.*` 后面可以使用 `pip install selenium==4.1.3`

   (5) 彻底阻止google浏览器自动更新 https://blog.csdn.net/u013992330/article/details/118710651

### 1.4.selenium的使用步骤？

（1）导入：`from selenium import webdriver`
（2）创建谷歌浏览器操作对象：

```python
path = 谷歌浏览器驱动文件路径
driver = webdriver.Chrome(path)
```

（3）访问网址

```python
url = 要访问的网址
driver.get(url)
```

#### 1.4.1selenium的元素定位？

元素定位：自动化要做的就是==模拟鼠标和键盘来操作来操作这些元素，点击、输入等等==。操作这些元素前首先要找到它们，WebDriver提供很多定位元素的方法。

现在最新的写法

```python
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get('http://www.baidu.com')

button = driver.find_element(By.ID, 'su').click()
print(button)
```

方法：

1.find_element_by_id

```python
# 根据id来找到对象

button = driver.find_element_by_id('su')
```

2.find_element_by_name

![1644119411821](http://mk.xxoutman.cn/spyder/1644119411821.png)

```python
# 根据标签属性的name属性值来获取对象的

name = driver.find_element_by_name('wd')
```

3.find_elements_by_xpath 和 find_element_by_xpath

```python
#根据xpath语句来获取到对象

xpath1 = driver.find_elements_by_xpath('//input[@id="su"]')
```

4.find_elements_by_tag_name 和 find_element_by_tag_name 

```python
#根据标签的名字来获取对象

names = driver.find_elements_by_tag_name('input') 
```

5.find_elements_by_css_selector

```python
# 使用的bs4的语法来获取对象

my_input = driver.find_elements_by_css_selector('#kw')[0]
```

6.find_elements_by_link_text

```python
#获取链接文本对象

link_text = driver.find_element_by_link_text("新闻")
```

#### 1.4.2访问元素信息

1.获取元素属性  .get_attribute('class')

```python
input_class = driver.find_element_by_id('kw').get_attribute('class')
print(input_class)  # s_ipt
```

2.获取元素文本 .text

```python
user_text = driver.find_element_by_xpath('//div[@id="s-top-left"]/a[1]')
print(user_text.text)  # 新闻
```

3.获取标签名 .tag_name

```python
tag = driver.find_element_by_id('su').tag_name
print(tag)  # input
```

#### 1.4.3页面交互

- 点击:

```python
click()
```

- 输入:

```python
send_keys()
```

- 后退操作:

```python
driver.back()
```

- 前进操作:

```python
driver.forword()
```

- 模拟JS滚动:


```javascript
js='document.documentElement.scrollTop=100000'
driver.execute_script(js) //执行js代码

//或者
js='window.scrollTo(0,document.body.scrollHeight)'
driver.execute_script(js)
```

- 获取网页代码：

```python
page_source
```

- 关闭当前页面: 

```python
driver.close()
```

- 退出：

```python
driver.quit()
```

### 1.5.页面等待时间

现在的⽹⻚越来越多采⽤了 Ajax 技术，这样程序便不能确定何时某个元素完全加载出来了。如果实际⻚⾯等待时间过长导致某个dom元素还没出来，但是你的代码直接使⽤了这个WebElement，那么就会抛出NullPointer的异常。为了解决这个问题。所以 Selenium 提供了两种等待⽅式：⼀种是隐式等待、⼀种是显式等待 。

隐式等待：调⽤`driver.implicitly_wait`。那么在获取不可⽤的元素之前，会先等待10秒中的时间。

```python
driver.implicitly_wait(10)
```

显示等待:	显示等待是表明某个条件成⽴后才执⾏获取元素的操作。也可以在等待的时候指定⼀个最⼤的时间，如果超过这个时间那么就抛出⼀个异常。

By是**selenium**中内置的一个class，在这个class中有各种方法来定位元素，By所支持的定位器的分类：

```python
CLASS_NAME = 'class name'
CSS_SELECTOR = 'css selector'
ID = 'id'
LINK_TEXT = 'link text'
NAME = 'name'
PARTIAL_LINK_TEXT = 'partial link text'
TAG_NAME = 'tag name'
XPATH = 'xpath'
```

例子:

```python
 from selenium.webdriver.common.by import By
    
 # 用户名输入框
 username_Input = (By.ID, 'username')
 # 密码输入框
 pwd_Input = (By.ID, 'password')
 # 登录按钮
 login_btn = (By.TAG_NAME, 'button')
 # 首页的“新建投放计划”按钮
 new_ads_plan = (By.XPATH, "//span[text()='新建投放计划']")
```

实际案例: 

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get('https://www.baidu.com/')
driver.maximize_window()

# 显示等待,必须使用By,显示等待10s的时间 加载该元素
try:
    element = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "kw"))
    )
finally:
    driver.quit()
```

强制等待:	`sleep  直接睡眠`

### 1.6.浏览器窗口切换

在浏览器操作中，通常会需要打开多个浏览器界面，如果不使用switch_to.window，程序会每次还去程序打开的最初始的那个界面寻找元素，这样就导致新界面中的元素找不到。

这个时候，就需要通过switch_to.window(windowhandles)方法来对浏览器页面进行切换，其中参数windowhandles为网页的窗口句柄。

switch_to.window()方法的使用：

```python
handles = driver.window_handles          #获取当前浏览器的所有窗口句柄
driver.switch_to.window(handles[-1])     #切换到最新打开的窗口
driver.switch_to.window(handles[-2])     #切换到倒数第二个打开的窗口
driver.switch_to.window(handles[0])      #切换到最开始打开的窗口
```

如何获取当前网页句柄？

`driver.current_window_handle`

切换window需要注意：如果前一个页面操作还没完成便切换window，会导致前一页面未完成的操作操作失败，进而程序抛错。

注意点: 当代码中有driver.execute_script时隐式等待就无效

```python
from selenium import webdriver
from time import sleep

driver = webdriver.Chrome()
driver.get("https://www.baidu.com/")
driver.maximize_window()
driver.execute_script("window.open('https://www.jd.com')")

sleep(3)  # 隐式等待3s
handles = driver.window_handles  # 获取当前浏览器的所有窗口句柄

driver.switch_to.window(handles[-1])  # 最新打开的窗口
print(driver.page_source)

driver.switch_to.window(handles[0])  # 切换到最开始打开的窗口
print(driver.page_source)
driver.close()  # 关闭当前页面

# driver.quit() #关闭浏览器
```

### 1.7.iframe框架切换

定位iframe 

注意单词的写法: 是 `frame` 不是`iframe`  

以前的定位iframe的方式: `driver.switch_to_frame('iframe')` 现在使用 `driver.switch_to.frame('iframe')`

1.有id，并且唯一，直接写id

```python
driver.switch_to.frame("xxxx") 
```

2.有name，并且唯一，直接写name

```python
driver.switch_to.frame("xxxx")
```

3.无id，无name,先定位iframe元素

```python
iframe = driver.find_elements_by_tag_name("iframe")[0]
driver.switch_to.frame(iframe)
```

4.通常采用id和name就能够解决绝大多数问题。但有时候frame并无这两项属性，则可以用index和WebElement来定位：

- index从0开始，传入整型参数即判定为用index定位，传入str参数则判定为用id/name定位
- WebElement对象，即用find_element系列方法所取得的对象，我们可以用tag_name、xpath等来定位frame对象

例如: 

```html
<iframe src="myframetest.html" />
```

用xpath定位，传入WebElement对象：

```python
driver.switch_to.frame(driver.find_element_by_xpath("//iframe[contains(@src,'myframe')]"))
```

**从frame中切回主文档**

切到frame中之后，我们便不能继续操作主文档的元素，这时如果想操作主文档内容，则需切回主文档。

```python
driver.switch_to.default_content()
```

**嵌套frame的操作**

有时候我们会遇到嵌套的frame，如下：

```xml
<html>
    <iframe id="frame1">
        <iframe id="frame2" / >
    </iframe>
</html>
```

1.从主文档切到frame2，一层层切进去

```python
driver.switch_to.frame("frame1")
driver.switch_to.frame("frame2")
```

2.从frame2再切回frame1，这里selenium给我们提供了一个方法能够从子frame切回到父frame，而不用我们切回主文档再切进来。

```python
driver.switch_to.parent_frame()  # 如果当前已是主文档，则无效果
```

有了parent_frame()这个相当于后退的方法，我们可以随意切换不同的frame，随意的跳来跳去了。

所以只要善用以下三个方法，遇到frame分分钟搞定：

```python
driver.switch_to.frame(reference)
driver.switch_to.parent_frame()
driver.switch_to.default_content()
```

### 1.8.动作行为链

有时候在⻚⾯中的操作可能要有很多步，那么这时候可以使⽤⿏标⾏为链类ActionChains来完成。⽐如现在要将⿏标移动到某个元素上并执⾏点击事件。

```python
from selenium import webdriver
from time import sleep
from selenium.webdriver.common.action_chains import ActionChains

driver = webdriver.Chrome()

driver.get('https://www.sogou.com/')

inputTag = driver.find_element_by_id('query')
subBtn = driver.find_element_by_id('stb')

# 行为链
actions = ActionChains(driver)

actions.move_to_element(inputTag)  # 鼠标移动到输入框
actions.send_keys_to_element(inputTag, 'python')  # 在输入框输入 Python

# 最后 提交行为链的操作
actions.perform()
subBtn.click()  # 点击搜索按钮
```

常用方法汇总：

- move_to_element()
  将鼠标移动到指定element，参数为标签。
- move_by_offset(xoffset, yoffset)
  将鼠标移动到与当前鼠标位置的偏移处。参数为X轴Y轴上移动的距离。（距离单位为像素，可以通过截图的方式来把握距离。）
- send_keys_to_element()
  输入内容到标签中。
  这里不能用send_keys()方法，send_keys()是的作用对象是标签，而在send_keys_to_element()中标签是函数的参数，该方法作用对象是行为链对象。
- click()
  点击一个标签。
- perform()
  执行所有存储的操作。因为行为链是一系列的动作，上边的命令不会写一个执行一个，执行要通过perform()命令来全部执行。
- drag_and_drop(source, target)
  按住源元素上的鼠标左键，然后移动到目标元素并释放鼠标按钮。
- drag_and_drop_by_offset(source, xoffset, yoffset)
  按住源元素上的鼠标左键，然后移动到目标偏移并释放鼠标按钮。
- release(on_element=None)
  在元素上释放按住的鼠标按钮
- click_and_hold(element)：点击但不松开⿏标。
- context_click(element)：右键点击。
- double_click(element)：双击。

```python
menu = bro.find_element_by_xpath('//*[@id="headDiv"]/ul/li[5]/a/span')  # 信息查询
hidden_submenu = bro.find_element_by_xpath('//*[@id="headDiv"]/ul/li[5]/ul/li[3]')

actions = ActionChains(driver)
actions.move_to_element(menu)
actions.click(hidden_submenu)
actions.perform()
```

```python
#下拉框选中

from selenium import webdriver
from time import sleep
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("https://www.17sucai.com/pins/demo-show?id=5926&st=d7DQ51jlLNOqLkp4TIHkRA&e=1646123207")
driver.maximize_window()

# 切换iframe框架
driver.switch_to.frame('iframe')

# 行为链
actions = ActionChains(driver)
# 显示等待加载元素
selectTag = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.XPATH, '//*[@id="dk_container_country"]'))
)

# selectTag = driver.find_element_by_xpath('//*[@id="dk_container_country"]')
actions.move_to_element(selectTag)  # 鼠标移动到输入框
actions.click(selectTag)
son_li = driver.find_element_by_xpath('//*[@id="dk_container_country"]/div/ul/li[3]')
actions.click(son_li)
actions.perform()  # 最后 提交行为链的操作

sleep(5)
driver.close()  # 关闭当前页面
```

```python
# 滑动验证码雏形

from selenium import webdriver
# 导入动作链对应的类
from selenium.webdriver import ActionChains
from time import sleep

bro = webdriver.Chrome()
bro.get('https://www.runoob.com/try/try.php?filename=jqueryui-api-droppable')
# 如果定位的标签是存在于iframe标签之中的，则必须通过如下操作在进行标签的定位
bro.switch_to.frame('iframeResult')  # 切换浏览器标签定位的作用域
div = bro.find_element_by_id('draggable')
# 动作链
action = ActionChains(bro)
# 点击长按指定的标签
action.click_and_hold(div)
for i in range(5):
    # perform()立即执行动作链操作
    # move_by_offset(x,y);x水平方向,y竖直方向
    action.move_by_offset(17, 0).perform()
    sleep(0.3)
# 释放动作链
action.release()
div.click()
# 关闭浏览器
# bro.quit()
```

### 1.9.cookie操作

获取所有的cookie : `cookies = driver.get_cookies()`

根据cookie的name获取cookie: `value = driver.get_cookie(key)`

删除某个cookie: `driver.delete_cookie('key')`

| 参数     | 描述                                               |
| :------- | :------------------------------------------------- |
| name     | 必需。规定 Cookie的名称。                          |
| value    | 必需。规定 Cookie的值。                            |
| expire   | 可选。规定 Cookie的有效期。                        |
| domain   | 可选。规定 Cookie的域名。                          |
| path     | 可选。规定 Cookie的服务器路径。                    |
| secure   | 可选。规定是否通过安全的 HTTPS 连接来传输 Cookie。 |
| httpOnly | 可选。防止XSS攻击（跨站脚本攻击）                  |

```python
from selenium import webdriver
from time import sleep

driver = webdriver.Chrome()
driver.get('https://www.baidu.com/')
driver.maximize_window()

#获取页面cookie
cookies = driver.get_cookies()

for cookie in cookies:
    print(cookie)

# 1.打印单条cookie
print('*' * 30)
print(driver.get_cookie('BD_HOME'))

# 2.删除cookie,根据name值 进行一个删除
print('*' * 30)
print(driver.delete_cookie('BD_UPN'))
```

### 1.10.selenium翻页操作

```python
while True:
    # 翻页,点击下一页
    next_btn=driver.find_element_by_class_name('pager_next ') #注意这一个空格必须写
    # 判断当前页面有没有最后一页的class pager_next pager_next_disabled
    if "pager_next pager_next_disabled" in next_btn.get_attribute('class'):
        break
    else:
        # 模糊定位
        next_btn.click()
```

## 2.无界面浏览器

```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
chrome_options.add_argument('--headless')

driver = webdriver.Chrome(chrome_options=chrome_options)
```

## 3.不显示自动测试

```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# 不再让Chorme浏览器显示'正受到自动测试软件的控制'
chrome_options = Options()
chrome_options.add_experimental_option('useAutomationExtension', False)
chrome_options.add_experimental_option('excludeSwitches', ['enable-automation'])

browser = webdriver.Chrome(chrome_options=chrome_options)
```

## 4.selenium防止检测

selenium做爬虫能解决很多反爬问题，但是selenium也有很多特征可以被识别，比如用selenium驱动浏览器后window.navigator.webdriver值是true，而正常运行浏览器该值是未定义的(undefined)

```python
import time

from selenium import webdriver


def get_browser():
    options = webdriver.ChromeOptions()
    options.add_experimental_option('excludeSwitches', ['enable-automation'])
    options.add_argument("--disable-blink-features=AutomationControlled")
    driver = webdriver.Chrome(options=options)

    driver.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
        "source": """
                        Object.defineProperty(navigator, 'webdriver', {
                          get: () => undefined
                        })
                      """
    })
    return driver


if __name__ == '__main__':
    url = 'https://login.taobao.com/member/login.jhtml'
    driver = get_browser()
    driver.get(url)
    driver.maximize_window()
    time.sleep(60 * 60)

```









