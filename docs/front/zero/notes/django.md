# 2.1 Django框架介绍与安装

## (1). Web开发介绍：

- 目前Web开发属于Browser/Server模式，简称B/S架构，开发语言有（Python、PHP、Java 、node.js ...）。
- 基于Python的Web工作原理如下：
- ![img](http://pic.xxoutman.cn/img/webjg.png)

## (2). 框架介绍：

#### ①. 什么是框架?

- 软件框架就是为实现或完成某种软件开发时,提供了一些基础的软件产品,
- 框架的功能类似于`基础设施`,提供并实现最为`基础的软件架构和体系`
- 通常情况下我们依据框架来实现更为复杂的业务程序开发
- 二个字,框架就是程序的`骨架`

#### ②. 框架的优缺点

- 可重用
- 成熟,稳健
- 易扩展、易维护

#### ③. Python中常见的框架

- 大包大揽 Django 被官方称之为完美主义者的Web框架。
- 力求精简 web.py和Tornado
- 新生代微框架 Flask和Bottle

#### ④. Web框架中的一些概念

- MVC
  - 大部分开发语言中都有MVC框架
  - MVC框架的核心思想是：解耦
  - 降低各功能模块之间的耦合性，方便变更，更容易重构代码，最大程度上实现代码的重用
  - m表示model，主要用于对数据库层的封装
  - v表示view，用于向用户展示结果
  - c表示controller，是核心，用于处理请求、获取数据、返回结果
- MVT
  - Django是一款python的web开发框架
  - 与MVC有所不同，属于MVT框架
  - m表示model，负责与数据库交互
  - v表示view，是核心，负责接收请求、获取数据、返回结果
  - t表示template，负责呈现内容到浏览器

## (3). Django框架介绍

- Django是一个高级的Python Web框架，它鼓励快速开发和清洁，务实的设计。

- 由经验丰富的开发人员构建，它负责Web开发的许多麻烦，因此您可以专注于编写应用程序，而无需重新创建轮子。

- 它是免费的和开源的。

- 被官方称之为完美主义者的Web框架。

- Django可以更快地构建更好的Web应用程序并减少代码。

  官方网址：https://www.djangoproject.com/

#### ① Django框架的特点：

- 快速开发：Django的宗旨在于帮助开发人员快速从概念到完成应用程序。
- 安全可靠：Django认真对待安全性，帮助开发人员避免许多常见的安全错误。
- 超可伸缩性：Web上的一些最繁忙的网站利用了Django快速灵活扩展的能力。

#### ② Django可以使用什么Python版本？

| Django版本    | Python版本                          |
| :------------ | :---------------------------------- |
| 2.2           | 3.5、3.6、3.7、3.8（在2.2.8中添加） |
| 3.0、3.1、3.2 | 3.6、3.7、3.8                       |

- Django的开发版本

![img](http://pic.xxoutman.cn/img/release-roadmap.e844db08610e.png)

![img](http://pic.xxoutman.cn/img/22.png)

## (4). Django的安装

- 作为Python Web框架，Django需要Python，在安装Python同时需要安装pip。

```python
在线安装Django,指定版本安装，目前2.2的最新版为2.2.24

pip install django==2.2.*  

# 默认会安装：Django==2.2.24、sqlparse==0.3.1 和 pytz==2020.1  

检测当前是否安装Django及版本

python -m django --version

# 输出结果 2.2.24

# 我们也可以先下载安装包：pip download django=2.2.13 -d ./
# 指定安装包安装：pip install Django-2.2.13-py2.py3-none-any.whl
```

# 2.2 Django的快速入门

## 第一部分：创建与使用

### (1). 创建项目

如果这是你第一次使用Django，那么你必须要照顾一些初始设置。也就是说，您需要自动生成一些建立Django 项目的代码

从命令行cd到您要存储代码的目录，然后运行以下命令：

```python
#创建一个django项目
$ django-admin startproject mysite  
```

我们来看看startproject创建的内容：

```python
# 文件视图 
├── manage.py
└── mysite
    ├── __init__.py
    ├── settings.py
    ├── urls.py
    └── wsgi.py
```

关于上面自动生成的目录与文件解释如下：

- 外部mysite/根目录只是一个项目的容器。它的名字与Django无关; 您可以将其重命名为您喜欢的任何内容。
- manage.py：一个命令行实用程序，可以让您以各种方式与此Django项目进行交互。你可以阅读所有的细节 manage.py在Django的管理和manage.py。
- 内部mysite/目录是您的项目的实际Python包。==它的名字是您需要用来导入其中的任何内容的Python包名称==（例如mysite.urls）。
- mysite/**init**.py：一个空的文件，告诉Python这个目录应该被认为是一个Python包。
- mysite/settings.py：此Django项目的设置/配置。 Django设置会告诉你所有关于设置的工作原理。
- mysite/urls.py：该Django项目的URL声明; 您的Django动力网站的“目录” (根路由)。
- mysite/wsgi.py：WSGI兼容的Web服务器为您的项目提供服务的入口点(部署项目的文件)。

### (2). 运行开发服务器

我们来验证您的Django项目的作品。启动我们自己的django项目

```python
$ python manage.py runserver
```

这是一个纯粹以Python编写的轻量级Web服务器。 我们将其与Django结合在一起，因此您可以快速开发，而无需处理配置生产服务器（如Apache），直到您准备好生产。

默认情况下，该runserver命令在端口8000的内部IP上启动开发服务器。当然也可以指定端口开启服务,如8080端口：

```python
$ python manage.py runserver 8080
```

如果要更改服务器的IP，请将其与端口一起传递。例如：

```python
$ python manage.py runserver 0.0.0.0:8000
```

注意：通过IP访问后报如下错误：

```python
DisallowedHost at /polls
Invalid HTTP_HOST header: '192.168.*.*:8000'. You may need to add '192.168.*.*' to ALLOWED_HOSTS.

HTTP_HOST标头无效：'192.168.*.*:8000'。您可能需要将“192.168.*.*”添加到ALLOWED_HOSTS
如：ALLOWED_HOSTS = ['192.168.104.240'] 或：ALLOWED_HOSTS = ['*']
```
### (3). 创建一个应用程序

Django自带一个实用程序，可以自动生成应用程序的基本目录结构，因此您可以专注于编写代码而不是创建目录。

要==创建您的应用程序==，请确保您与目录位于同一目录，manage.py 并键入以下命令：

```python
$ python manage.py startapp polls
```

这将创建一个目录polls，其目录如下：此目录结构将容纳轮询应用程序。

```python
# 文件视图
mysite/
├── manage.py
├── mysite
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── polls
    ├── admin.py
    ├── apps.py
    ├── __init__.py
    ├── migrations
    │   └── __init__.py
    ├── models.py
    ├── tests.py
    └── views.py
```

### (4). 定义我们的第一个视图

我们来写第一个视图。打开文件`polls/views.py` 并放入以下Python代码：

```python
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")
```

这是Django中最简单的视图。要调用视图，我们需要将其映射到一个URL为此，我们需要一个URLconf。

要在polls目录中创建一个URLconf，创建一个名为`urls.py`。您的应用目录应该如下所示：

```python
└── polls
    ├── admin.py
    ├── apps.py
    ├── __init__.py
    ├── migrations
    │   └── __init__.py
    ├── models.py
    ├── tests.py
    ├── urls.py  #创建一个路由文件
    └── views.py
```

在`polls/urls.py`文件中包含以下代码：

```python
from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
]
```

下一步是将根URLconf指向polls.urls模块。 在 `mysite/urls.py`跟路由文件导入子路由文件,添加一条import用于django.urls.include和插入include()的urlpatterns列表，所以你必须：

```python
from django.contrib import admin
from django.urls import include,path 

urlpatterns = [
    #path('admin/', admin.site.urls),
    path('polls/', include('polls.urls')),
]
```

其中include()函数允许引用其他URLconfs。请注意，该==include()函数的正则表达式 没有$（字符串匹配字符），而是尾部的斜杠/==。 每当Django遇到时 include()，它会排除与该点匹配的任何部分，并将剩余的字符串发送到随附的URLconf进行进一步处理。

### 附录：path() 函数介绍

Django path() 可以接收四个参数，分别是两个必选参数：`route`、`view` 和两个可选参数：`kwargs`、`name`，接下来详细介绍这四个参数。

- `route` : 是包含URL模式的字符串。在处理请求时，会在urlpatterns 这个列表中依次向下寻找， 沿列表向下移动，将请求的URL与每个模式进行比较，直到找到匹配的URL。
- `view`: 用于执行与正则表达式匹配的 URL 请求。
- `kwargs`: 视图使用的字典类型的参数。
- `name`: 用来反向获取 URL。

## 第二部分：django完整项目体验

### 第一步：项目的创建与运行

#### (1). 创建项目

如果这是你第一次使用Django，那么你必须要照顾一些初始设置。也就是说，您需要自动生成一些建立Django 项目的代码

从命令行cd到您要存储代码的目录，然后运行以下命令：

```python
$ django-admin startproject myweb
```

我们来看看startproject创建的内容：

```python
# 文件视图
├── manage.py
└── myweb
    ├── __init__.py
    ├── settings.py
    ├── urls.py
    └── wsgi.py
```

#### (2). 运行开发服务器

我们来验证您的Django项目的作品。更改为外部myweb目录，如果您还没有，并运行以下命令：

```python
$ python manage.py runserver
```

### 第二步：应用的创建

#### (1). 创建一个应用程序

Django自带一个实用程序，可以自动生成应用程序的基本目录结构，因此您可以专注于编写代码而不是创建目录。

要创建您的应用程序，请确保您与目录位于同一目录，manage.py 并键入以下命令：

```python
$ python manage.py startapp myapp
```

这将创建一个目录myapp，其目录如下：此目录结构将容纳轮询应用程序。

```python
# 文件视图
myweb/
├── manage.py
├── myweb
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── myapp
    ├── admin.py
    ├── apps.py
    ├── __init__.py
    ├── migrations
    │   └── __init__.py
    ├── models.py
    ├── tests.py
    └── views.py
```

#### (2). 编写我们的第一个视图

我们来写第一个视图。打开文件`myapp/views.py` 并放入以下Python代码：

```python
from django.http import HttpResponse

def index(request):
    return HttpResponse("Hello, world.")
```

在`myapp/urls.py`文件中包含以下代码：

```python
#创建子路由文件
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
]
```

下一步是在**根路由**`myweb/urls.py`里面加载我们**应用程序的子路由**`myapp/urls.py`文件

```python
from django.contrib import admin
from django.urls import include,path

urlpatterns = [
    #path('admin/', admin.site.urls),
    path('myapp/', include('myapp.urls')),
]
```

### 第三步：项目的模型

#### (1). 连接MySQL数据库设置

默认情况下，配置使用SQLite。若不使用SQLite作为数据库，则需要额外的设置，例如 USER，PASSWORD和HOST必须加入。

其中ENGINE设置为数据库后端使用。内置数据库后端有：

> - 'django.db.backends.postgresql'
> - 'django.db.backends.mysql'
> - 'django.db.backends.sqlite3'
> - 'django.db.backends.oracle'

在`myweb/settings.py`文件中，通过DATABASES项进行数据库设置

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'mydemo', #数据库名称
        'USER': 'root',	#用户名
        'PASSWORD': 'root',	#密码
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

注意：Django使用MySQL数据库需要加载 MySQLdb模块，需要安装 mysqlclient

```python
$ pip install  mysqlclient
```

#### (2). 创建模型

我们先在数据库里面创建stu这一个表

```mysql
CREATE TABLE `stu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(16) COLLATE utf8_unicode_ci DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `sex` enum('男','女') COLLATE utf8_unicode_ci DEFAULT NULL,
  `classid` int(8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
```

然后在我们的简单的应用程序中，去创建一个stu表信息操作的Model类。编辑 `myapp/models.py`文件

```python
from django.db import models

class Stu(models.Model):
    '''自定义Stu表对应的Model类'''
    id = models.AutoField(primary_key=True)   #定义属性: 默认主键自增id字段可不写
    name = models.CharField(max_length=16)
    age = models.SmallIntegerField()
    sex = models.CharField(max_length=1)
    classid=models.CharField(max_length=8)

    # 定义默认输出格式
    def __str__(self):
        return "%d:%s:%d:%s:%s"%(self.id,self.name,self.age,self.sex,self.classid)

    # 自定义对应的表名，默认表名: myapp_stu
    class Meta:
        db_table="stu"
```

#### (3). 激活模型

要将该应用程序包括在我们的项目中，我们需要在设置中添加对其配置类的引用INSTALLED_APPS。

编辑`myweb/settings.py`文件

```python
INSTALLED_APPS  =  [ 
    'django.contrib.admin' ，
    'django.contrib.auth' ，
    'django.contrib.contenttypes' ，
    'django.contrib.sessions' ，
    'django.contrib.messages' ，
    'django.contrib.staticfiles' ，
    'myapp.apps.MyappConfig',  #或者直接写 myapp
]
```

#### (4). 使用（两种）

#### ① 进入交互式的Python shell

```python
$ python manage.py shell

>>> from myapp.models import Stu  #导入这一个Stu继承的Model类

>>> mod = Stu.objects	# 获取所有信息

>>> lists = mod.all()
>>> for v in lists:
...     print(v)
...
1:zhangsan:22:m:python03  #下面这些是输出的结果
2:lisi:25:w:python04
3:wangwu:20:m:python03
```

#### ② 在myapp应用的视图中使用

在`myapp/views.py` 文件中

```python
from django.shortcuts import render
from django.http  import HttpResponse
from myapp.models import Stu
# Create your views here.

def index(request):
    return HttpResponse("Hello Django!")

def stu(request):
    #获取所有stu表信息
    lists = Stu.objects.all()
    print(lists)
    #获取单条学生信息
    print(Stu.objects.get(id=1))

    return HttpResponse("ok")
```

配置stu函数的访问路由，在`myapp/urls.py`文件中配置。

```python
path('stu/', views.stu),
```

启动服务后，在浏览器中访问,在命令行终端中查看输出效果: http://localhost:8000/myapp/stu

### 第四步：启用网站Admin管理

#### (1). 数据迁移

Django框架中有一个非常强大的应用功能--自动管理界面，常被Web平台管理者使用，去管理整个Web平台。

默认情况下，在settings.py配置文件中INSTALLED_APPS包含以下应用程序，这些应用程序都是由Django提供：

```python
django.contrib.admin - 管理网站。你会很快使用它。
django.contrib.auth - 认证系统。
django.contrib.contenttypes - 内容类型的框架。
django.contrib.sessions - 会话框架
django.contrib.messages - 消息框架。
django.contrib.staticfiles - 管理静态文件的框架。
```

为了后续的开发，默认这些应用程序都是包含在里面的。

使用这些Django自带的应用程序，需要我们==在数据库中创建一些数据表==对应，然后才能使用它们。为此，请运行以下命令（数据结构迁移）：

```python
$ python manage.py migrate
```

其中该`migrate`命令查看该`INSTALLED_APPS`设置，并根据`myweb/settings.py`文件中的`数据库设置和应用程序随附的数据库迁移创建任何必需的数据库表`您会看到适用于每个迁移的消息。

```python
执行上面命令后的输出结果
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, sessions
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  Applying admin.0001_initial... OK
  Applying admin.0002_logentry_remove_auto_add... OK
  Applying contenttypes.0002_remove_content_type_name... OK
  Applying auth.0002_alter_permission_name_max_length... OK
  Applying auth.0003_alter_user_email_max_length... OK
  Applying auth.0004_alter_user_username_opts... OK
  Applying auth.0005_alter_user_last_login_null... OK
  Applying auth.0006_require_contenttypes_0002... OK
  Applying auth.0007_alter_validators_add_error_messages... OK
  Applying auth.0008_alter_user_username_max_length... OK
  Applying sessions.0001_initial... OK
  # 默认情况下自动在我们的数据库中创建了10张表
| auth_group                 |
| auth_group_permissions     |
| auth_permission            |
| auth_user                  |
| auth_user_groups           |
| auth_user_user_permissions |
| django_admin_log           |
| django_content_type        |
| django_migrations          |
| django_session             |
| stu     
```

#### (2). 创建管理员用户

首先，我们需要创建一个可以登录管理站点的用户。运行以下命令：

```python
$ python manage.py createsuperuser

# 输入您所需的用户名，然后按Enter键。
Username: admin

# 然后将提示您输入所需的电子邮件地址：
Email address: admin@qq.com

# 最后一步是输入你的密码（>=8位）。您将被要求输入密码两次，第二次作为第一次的确认
Password: **********
Password (again): *********
Superuser created successfully.
```

#### (3). 启动开发服务器

默认情况下，Django管理员站点被激活。让我们开始开发服务器并探索它。启动开发服务器命令如下：

```python
$ python manage.py runserver
```

现在，打开一个Web浏览器，访问地址： http://127.0.0.1:8000/admin/

#### (4). 设置时区和语言：

编辑`myweb/settings.py`配置文件：

```python
...
LANGUAGE_CODE = 'zh-hans'
TIME_ZONE = 'Asia/Shanghai'
...
```

#### (5). 将我们自定义的应用程序的加入到后台管理

但我们的自定义应用程序在哪里？并没有显示在后台管理索引页面上。

要做到这一点，打开`myapp/admin.py `文件，并编辑代码如下：

```python
#添加应用程序到后台索引

from django.contrib import admin
from myapp.models import Stu

admin.site.register(Stu)
```

#### (6). 更深入设计后台管理

编辑`myapp/models.py`文件，在Stu类中添加如下信息，让后台管理显示中文字段。

```python
class Stu(models.Model):
    '''自定义Stu表对应的Model类'''
    #定义属性：默认主键自增id字段可不写
    id = models.AutoField("学号",primary_key=True)
    name = models.CharField("姓名",max_length=16)
    age = models.SmallIntegerField("年龄")
    sex = models.CharField("性别",max_length=1)
    classid=models.CharField("班级",max_length=8)

    # 定义默认输出格式
    def __str__(self):
        return "%d:%s:%d:%s:%s"%(self.id,self.name,self.age,self.sex,self.classid)

    # 自定义对应的表名，默认表名：myapp_stu
    class Meta:
        db_table="stu"
        verbose_name = '浏览学生信息'  
        verbose_name_plural = '学生信息管理'
```

编辑`myapp/admin.py `文件，实现信息管理的个性化定制

```python
from django.contrib import admin

# Register your models here.
from myapp.models import Stu

#Stu模型的管理器(装饰器写法)
@admin.register(Stu)
class StuAdmin(admin.ModelAdmin):
    #listdisplay设置要显示在列表中的字段（id字段是Django模型的默认主键）
    list_display = ('id','name','age','sex','classid')

    #设置哪些字段可以点击进入编辑界面
    list_display_links = ('id','name')

    #list_per_page设置每页显示多少条记录，默认是100条
    list_per_page = 10

    #ordering设置默认排序字段，负号表示降序排序
    ordering = ('id',)  #id降序

    #list_editable 设置默认可编辑字段
    #list_editable = ['age','sex','classid']
```

# 2.3 Django的URL路由（URL配置）

> 一个`干净优雅`的`URL方案`是`高质量Web应用`程序中的一个`重要细节`。
>
> Django可以让你`自己设计URL`，无论你想要什么，没有框架限制。
>
> 为了给一个应用设计URL，你需要创建一个Python 模块，通常被称为`**URLconf**(URL configuration)`。
>
> 这个模块是纯Python代码，是一个简单的`Python模式`（简单的正则表达式）到`Python函数`（您的视图）之间的`映射`。

## (1). Django是如何处理一个请求?

当用户从Django的站点请求页面时，Django系统遵循以下步骤来执行的Python代码：

1. 首先Django确定要使用的根URLconf模块，通过`ROOT_URLCONF`来设置，具体在`settings.py`配置文件中。但是如果传入 `HttpRequest`对象具有`urlconf` 属性（由中间件设置），则其值将用于替换`ROOT\_URLCONF`设置。
2. Django加载该Python模块并查找该变量 `urlpatterns`。它是`django.urls.path()` 或 `django.urls.re_path()`实例的序列(sequence)。
3. **Django按顺序运行每个URL模式，并在匹配所请求的URL的第一个URL中停止**。
4. 一旦正则表达式匹配，Django将导入并调用给定的视图，这是一个简单的Python函数（或基于类的视图）。该视图会获得如下参数：
   - 一个`HttpRequest`实例。
   - 如果匹配的正则表达式没有返回任何命名组，那么来自正则表达式的匹配将作为位置参数提供。
   - 关键字参数由正则表达式匹配的任何命名组组成，由可选kwargs参数中指定的任何参数覆盖。`django.urls.path\(\)`、`django.urls.re_path\(\)`。
5. **如果没有正则表达式匹配，或者在此过程中的任何一点出现异常，Django将调用适当的错误处理视图。**

#### 示例

以下是一个URLconf示例: `urls.py`如下: 

```python
from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("articles/2003/", views.special_case_2003, name="special_case_2003"),
    path("articles/<int:year>/", views.year_archive, name="year_archive"),
    path("articles/<int:year>/<int:month>/", views.month_archive, name="month_archive"),
    path("articles/<int:year>/<int:month>/<slug:slug>/", views.article_detail, name="article_detail"),
]
```

对应的`views.py`文件

```python
from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return HttpResponse("你好")


def special_case_2003(request):
    return HttpResponse("special_case_2003")


def year_archive(request, year=0):
    return HttpResponse("year_archive 年份:%s" % year)


def month_archive(request, year=0, month=0):
    return HttpResponse("year_archive 年份:%s,月份:%s" % (year, month))


def article_detail(request, year=0, month=0, slug=""):
    return HttpResponse("article_detail 年份:%s,月份:%s,后缀%s" % (year, month, slug))
```

说明：

> - **要从URL捕获一个值，请使用尖括号括起来**。
> - 捕获的值可以选择包括转换器类型。例如，用于 `<int:name>`捕获整数参数。如果不包括转换器`/`，则匹配除字符以外的任何字符串。
> - 无需添加斜杠，因为每个URL都有该斜杠。例如`articles`，不是/`articles`。

#### 路径转换器

- 默认情况下，以下路径转换器可用：
  - `str`-匹配任何非空字符串，但路径分隔符除外'/'。如果表达式中不包含转换器，则为默认设置。
  - `int`-匹配零或任何正整数。返回一个int。
  - `slug`-匹配由ASCII字母或数字以及连字符和下划线字符组成的任何条形字符串。例如， `building-your-1st-django-site`。
  - `uuid`-匹配格式化的UUID。为防止多个URL映射到同一页面，必须包含破折号并且字母必须小写。例如，075194d3-6885-417e-a8a8-6c931e272f00。返回一个 UUID实例。
  - `path`-匹配任何非空字符串，包括路径分隔符 '/'。这样，您就可以匹配完整的URL路径，而不是像一样匹配URL路径的一部分str。

#### 通过浏览器访问服务

> 注意：url路由，由上而下 进行匹配，如果在上面就匹配成功，则不会向下匹配

```python
# 通过浏览器访问服务的基本过程:   
    127.0.0.1:8000/abc 
        ==>  root url(根路由) 
        ==> 加载子路由（myweb/urls.py）
    	==> 正则匹配访问的路径(path) =-=> 视图函数(views.index)
    	==> views.py index() 响应内容
```

#### 使用正则表达式:

- 如果路径和转换器语法不足以定义URL模式，则还可以使用正则表达式。为此，请使用`re_path()`代替`path()`。
- 在Python正则表达式中，命名正则表达式组的语法为`(?P<name>pattern)`,其中`name`是组的名称，并且 pattern是匹配的某种模式。
- 这是前面的示例URLconf，使用正则表达式重写`urls.py`：

```python
from django.urls import path, re_path

from . import views

urlpatterns = [
    path("articles/2003/", views.special_case_2003, name="special_case_2003"),
    re_path(r"^articles/(?P<year>[0-9]{4})/$", views.year_archive, name="year_archive"),
    re_path(r"^articles/(?P<year>[0-9]{4})/(?P<month>[0-9]{2})/$", views.month_archive, name="month_archive"),
    re_path(r"^articles/(?P<year>[0-9]{4})/(?P<month>[0-9]{2})/(?P<slug>[\w-]+)/$", views.article_detail, name="article_detail"),
]

'''
[]	匹配括号中的任意一个字符
+	紧跟在它前面的单元,应匹配一次或多次
\w	==	[a-zA-Z0-9] 数字字母下划线  
'''
```

- 这可以完成与上一个示例大致相同的操作，除了：
  - 将要匹配的确切URL受到更多限制。例如，年份10000将不再匹配，因为年份整数被限制为正好是四位数长。
  - 无论正则表达式进行哪种匹配，每个捕获的参数都将作为`字符串`发送到视图。
- 当从使用切换为使用path()，re_path()反之亦然时，特别重要的是要注意视图参数的类型可能会更改，因此您可能需要调整视图。

#### 使用未命名的正则表达式组(不推荐)

- 除了命名组语法（例如）之外`(?P<year>[0-9]{4})`，您还可以使用较短的未命名组（例如）`([0-9]{4})`。
- `不建议特别使用此用法`，因为这样可以更轻松地在匹配的预期含义和视图的参数之间意外引入错误。
- 无论哪种情况，建议在给定的正则表达式中仅使用一种样式。当两种样式混合使用时，任何未命名的组都会被忽略，只有命名的组才会传递到视图函数。

#### 为视图参数指定默认值

- 一个方便的技巧是为视图的参数指定默认参数。这是一个示例URLconf和视图：

```python
# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('blog/', views.page),
    path('blog/page<int:num>/', views.page),
]

# views.py
def page(request, num=1):
    ...
   	pass
```

- 在上面的示例中，两个URL模式都指向同一视图`views.page`但是第一个模式未捕获URL中的任何内容。
- 如果第一个模式匹配，该page()函数将使用它的默认参数`num=1`。
- 如果第二个模式匹配， page()将使用num捕获的任何值。

## (2). 错误处理

> 当Django找不到与请求的URL匹配的正则表达式时，或者异常引发时，Django将调用错误处理视图。
>
> 用于这些情况的视图由四个变量指定。它们的默认值对于大多数项目都是足够的，但通过覆盖其默认值可以进一步定制。
>
> 有关详细信息，请参阅自定义错误视图的文档。
>
> 这样的值可以在你的根URLconf中设置。在任何其他URLconf中设置这些变量将不起作用。
>
> 值必须是可调用的，或者代表视图的完整的Python导入路径的字符串，应该被调用来处理手头的错误条件。

#### 关于404错误

- 404的错误页面，**在模板目录中创建一个404.html的页面**，
- 在配置文件中 **settings.py 配置 DEBUG = False**
- 在配置文件中 **settings.py 配置 TEMPLATES = [{'DIRS': [os.path.join(BASE_DIR,'templates')] }]**
- 同时需要在项目的根目录下创建文件夹`templates`，并且在此目录下创建一个`404.html`文件
- 在出现404的情况时，==自动寻找==404页面。
- 也可以在视图函数中 手动报出404错误，带提醒信息

在视图函数中也可以指定返回一个404

```python
注意 Http404需要在django.http的模块中引入
 # 响应404
 raise Http404('404,页面不存在')  # raise主动抛出异常
```

在模板中 404.html

```python
<!DOCTYPE html>
<html>
<head>
    <title>404</title>
</head>
<body>
    <center>
        <h2>404 页面不存在!</h2>
        <h3>请检查是否输出了正确的响应地址</h3>
    </center>
</body>
</html>
```

## (3). 包括其他的URLconf

> 在任何时候，您`urlpatterns`都可以“包含”其他URLconf模块。
>
> 这实质上是将一组网址“植根于”其他网址之下

例如，下面是[Django网站](https://www.djangoproject.com/)本身的URLconf的摘录。它包含许多其他URLconf：

```python
from django.urls import include, path

# 根路由的使用方式
urlpatterns = [
    # ...
    path('community/', include('aggregator.urls')),
    path('contact/', include('contact.urls')),
    # ...
]
```

- 每当Django遇到时include()，它都会截断直到该时间点匹配的URL的任何部分，并将剩余的字符串发送到包含的URLconf中以进行进一步处理每当Django遇到`include()`（[`django.urls.include()`](https://docs.djangoproject.com/en/1.11/ref/urls/#django.conf.urls.include)）时，它会截断与该点匹配的URL的任何部分，并将剩余的字符串发送到包含的URLconf以供进一步处理。

## (4). URL的反向解析

如果在视图、模板中使用硬编码的链接，**在URLconf发生改变时，维护是一件非常麻烦的事情**

- 解决：在做链接时，通过指向URLconf的名称，==动态生成链接地址==
- 视图：使用**django.urls.reverse()**函数
- 模板：使用url模板标签

#### 示例

- 在URLconf中

```python
from django.urls import path
from . import views

urlpatterns = [
    #...
    path('articles/<int:year>/', views.year_archive, name='year_archive'),
    #...
]
```

- 您可以使用以下HTML模板代码获取这些：

```python
<a href="{ %   url 'year_archive' 2020   % }">2020 Archive</a>

<ul>
    {% for yearvar in year_list %}
        <li><a href="{% url 'year_archive' yearvar %}">{{ yearvar }} Archive</a></li>
    {% endfor %}
</ul>
```

- 在Python代码中：

```python
from django.http import HttpResponseRedirect
from django.urls import reverse

def redirect_to_year(request):
    year = 2019
    return HttpResponseRedirect(reverse('year_archive', args=(year,)))
```

- 或简写 (直接使用`redirect`)

```python
from django.shortcuts import redirect
from django.urls import reverse

def index(request):
    year = 2019
    return redirect(reverse('year_archive',args=(year,)))
```

然后在`urls.py`中加一条路由规则

```python
 path("articles/", views.redirect_to_year, name="redirect_to_year"),  # url反向解析
```

# 2.4 Django的模型层

## Model模型

> 模型是你的数据的唯一的、权威的信息源。它包含你所储存数据的必要字段和行为。
>
> 通常，每个模型对应数据库中唯一的一张表。

- 每个模型都是`django.db.models.Model`的一个Python 子类。
- 模型的每个属性都表示为数据库中的一个字段。
- Django 提供一套自动生成的用于数据库访问的API；
- 这极大的减轻了开发人员的工作量，不需要面对因数据库变更而导致的无效劳。

## 模型与数据库的关系

> **模型(Model)负责业务对象和数据库的关系映射(ORM)**

ORM是“对象-关系-映射”的简称，主要任务是：

1. 根据对象的类型生成表结构
2. 将对象、列表的操作，转换为sql语句
3. 将sql查询到的结果转换为对象、列表

## 为什么要用模型?

Model是MVC框架中重要的一部分,主要负责程序中用于处理数据逻辑的部分。通常模型对象负责在数据库中存取数据

它实现了数据模型与数据库的解耦，即数据模型的设计不需要依赖于特定的数据库，通过简单的配置就可以轻松更换数据库

## 配置Mysql数据库

1，登录连接MySQL数据库，并创建数据库mytest。

```python
$ create databases mytest default charset=utf8
```

2，在Django框架中使用MySQL数据库需要加载 MySQLdb模块，也就是需要安装 mysqlclient，若已经安装请略过。

```python
$ pip install  mysqlclient
```

3，在现有的Django项目中的配置数据库连接信息修改settings.py文件中的DATABASE配置项

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'mytest',	# 选择数据库的名,请确认你的mysql中有这个库
        'USER': 'root',
        'PASSWORD': 'root',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

## 开发流程

1. 在`models.py`中定义模型类，要求继承自**models.Model 类**

   ```python
   from django.db import models
   from datetime import datetime
   
   class Users(models.Model):
      id = models.AutoField(primary_key=True)  # 主键可省略不写
      name = models.CharField(max_length=32)
      age = models.IntegerField(default=20)
      phone = models.CharField(max_length=16)
      addtime=models.DateTimeField(default=datetime.now)
   
       #class Meta:
       #    db_table = "myapp_users"  # 指定表名，如果没有写，默认表名称: myapp_users。
   ```

2. 编辑`myweb/settings.py`文件，并将项目应用文件名添加到该INSTALLED_APPS设置。

```python
   INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'myapp', #或全称：myapp.apps.MyappConfig
   ]
```

3. 生成迁移文件 ( 相当于”生成sql语句脚本。)

   ```python
   $ python manage.py makemigrations
   ```

4. 执行迁移 ( 相当于在数据库里面创建数据库表 )

   ```python
   $ python manage.py migrate
   ```

5. 使用模型类进行crud操作（具体详见②）

## ①定义模型

- **在模型中定义属性，会生成表中的字段**
- django根据属性的类型确定以下信息：
  - 当前选择的数据库支持字段的类型
  - 渲染管理表单时使用的默认html控件
  - 在管理站点最低限度的验证
- **django会为表增加自动增长的主键列**，每个模型只能有一个主键列，如果使用选项设置某属性为主键列后，则django不会再生成默认的主键列
- 属性命名限制
  - 不能是python的保留关键字
  - ==由于django的查询方式，不允许使用连续的下划线==

### **定义属性**

- 定义属性时，需要字段类型
- 字段类型被定义在`django.db.models.fields`目录下，为了方便使用，被导入到django.db.models中
- 使用方式
  1. 导入from django.db import models
  2. 通过models.Field创建字段类型的对象，赋值给属性
- **对于重要数据都做逻辑删除，不做物理删除，实现方法是定义isDelete属性，类型为BooleanField，默认值为False**

### 字段类型

- AutoField

  ：一个根据实际ID自动增长的IntegerField，通常不指定

  - 如果不指定，一个主键字段将自动添加到模型中

- BooleanField：true/false 字段，此字段的默认表单控制是CheckboxInput

- NullBooleanField：支持null、true、false三种值

- **CharField**(max_length=字符长度)：字符串，默认的表单样式是 TextInput

- **TextField**：大文本字段，一般超过4000使用，默认的表单控件是Textarea

- **IntegerField**：整数

- DecimalField(max_digits=None, decimal_places=None)：使用python的Decimal实例表示的十进制浮点数

  - DecimalField.max_digits：位数总数
  - DecimalField.decimal_places：小数点后的数字位数

- **FloatField**：用Python的float实例来表示的浮点数

- DateField[auto_now=False, auto_now_add=False])：使用Python的datetime.date实例表示的日期

  - 参数DateField.auto_now：每次保存对象时，自动设置该字段为当前时间，用于"最后一次修改"的时间戳，它总是使用当前日期，默认为false
  - 参数DateField.auto_now_add：当对象第一次被创建时自动设置当前时间，用于创建的时间戳，它总是使用当前日期，默认为false
  - 该字段默认对应的表单控件是一个TextInput. 在管理员站点添加了一个JavaScript写的日历控件，和一个“Today"的快捷按钮，包含了一个额外的invalid_date错误消息键
  - auto_now_add, auto_now, and default 这些设置是相互排斥的，他们之间的任何组合将会发生错误的结果

- TimeField：使用Python的datetime.time实例表示的时间，参数同DateField

- **DateTimeField**：使用Python的datetime.datetime实例表示的日期和时间，参数同DateField

- FileField：一个上传文件的字段

- ImageField：继承了FileField的所有属性和方法，但对上传的对象进行校验，确保它是个有效的image

### 字段选项

- 通过字段选项，可以实现对字段的约束
- 在字段对象时通过关键字参数指定
- null：如果为True，Django 将空值以NULL 存储到数据库中，默认值是 False
- blank：如果为True，则该字段允许为空白，默认值是 False
- **对比：null是数据库范畴的概念，blank是表单验证证范畴的**
- db_column：字段的名称，如果未指定，则使用属性的名称
- db_index：若值为 True, 则在表中会为此字段创建索引
- default：默认值
- primary_key：若为 True, 则该字段会成为模型的主键字段
- unique：如果为 True, 这个字段在表中必须有唯一值

### 关系

- 关系的类型包括
  - ForeignKey：一对多，将字段定义在多的端中
  - ManyToManyField：多对多，将字段定义在两端中
  - OneToOneField：一对一，将字段定义在任意一端中

### 元选项

- 在模型类中定义类Meta，用于设置元信息
- 元信息db_table：定义数据表名称，推荐使用小写字母，
- 数据表的默认名称:<app_name>_<model_name>
- 例如myweb_users
- ordering：对象的默认排序字段，获取对象的列表时使用，接收属性构成的列表

```python
class BookInfo(models.Model):
    ...
    class Meta():
        ordering = ['id']
```

- 字符串前加-表示倒序，不加-表示正序

  ```python
  class BookInfo(models.Model):
      ...
      class Meta():
          ordering = ['-id']
  ```

- 排序会增加数据库的开销

## ②模型实例

### 1. 类的属性

- `objects`：是Manager类型的对象，用于与数据库进行交互

- 当定义模型类时没有指定管理器，则Django会为模型类提供一个名为objects的管理器

- 支持明确指定模型类的管理器

  ```python
  class BookInfo(models.Model):
    ...
    books = models.Manager()
  ```

- 当为模型类指定管理器后，django不再为模型类生成名为objects的默认管理器

### 2. 创建对象

- 当创建对象时，django不会对数据库进行读写操作
- 调用save()方法才与数据库交互，将对象保存到数据库中
- 使用关键字参数构造模型对象很麻烦，推荐使用下面的两种之式
- 说明：*init*方法已经在基类models.Model中使用，在自定义模型中无法使用，

### 3. 实例的属性

- DoesNotExist：==在进行单个查询时，模型的对象不存在时会引发此异常，结合try/except使用==

### 4. 实例的方法

- `__str__(self)`：重写object方法，此方法在将对象转换成字符串时会被调用
- save()：将模型对象保存到数据表中
- delete()：将模型对象从数据表中删除

## ③模型查询

- 查询集表示从数据库中获取的对象集合
- 查询集可以含有零个、一个或多个过滤器
- 过滤器基于所给的参数限制查询的结果
- 从Sql的角度，查询集和select语句等价，过滤器像where和limit子句
- 接下来主要讨论如下知识点
  - 查询集
  - 字段查询：比较运算符，F对象，Q对象

### 1. 查询集

- 在管理器上调用过滤器方法会返回查询集
- **查询集经过过滤器筛选后返回新的查询集，因此可以写成链式过滤**
- **惰性执行：创建查询集不会带来任何数据库的访问，直到调用数据时，才会访问数据库**
- 何时对查询集求值：迭代，序列化，与if合用
- **返回查询集的方法，称为过滤器**
  - all()
  - filter()
  - exclude()
  - order_by()
  - values()：一个对象构成一个字典，然后构成一个列表返回

- 写法：

  ```python
  filter(键1=值1,键2=值2)
  等价于
  filter(键1=值1).filter(键2=值2)
  ```

- **返回单个值的方法**
  - get()：返回单个满足条件的对象
    - 如果未找到会引发"模型类.DoesNotExist"异常
    - 如果多条被返回，会引发"模型类.MultipleObjectsReturned"异常
  - count()：返回当前查询的总条数
  - first()：返回第一个对象
  - last()：返回最后一个对象
  - exists()：判断查询集中是否有数据，如果有则返回True

### 2.限制查询集

- 查询集返回列表，可以使用下标的方式进行限制，等同于sql中的`limit`和`offset`子句

- 注意：不支持负数索引

- 使用下标后返回一个新的查询集，不会立即执行查询

- 如果获取一个对象，直接使用[0]，等同于[0:1].get()，但是如果没有数据，[0]引发IndexError异常，[0:1].get()引发DoesNotExist异常

  ```python
  #这会返回前5个对象 LIMIT 5
  Entry.objects.all()[:5]
  #这将返回第六个到第十个对象 OFFSET 5 LIMIT 5
  Entry.objects.all()[5:10]
  ```

### 3.查询集的缓存

- 每个查询集都包含一个缓存来最小化对数据库的访问

- 在新建的查询集中，缓存为空，首次对查询集求值时，会发生数据库查询，django会将查询的结果存在查询集的缓存中，并返回请求的结果，接下来对查询集求值将重用缓存的结果

- 情况一：**这构成了两个查询集，无法重用缓存，每次查询都会与数据库进行一次交互，增加了数据库的负载**

  ```python
  print([e.title for e in Entry.objects.all()])
  print([e.title for e in Entry.objects.all()])
  ```

- 情况二：**两次循环使用同一个查询集，第二次使用缓存中的数据**

  ```python
  querylist=Entry.objects.all()
  print([e.title for e in querylist])
  print([e.title for e in querylist])
  ```

- 何时查询集不会被缓存：当只对查询集的部分进行求值时会检查缓存，但是如果这部分不在缓存中，那么接下来查询返回的记录将不会被缓存，这意味着使用索引来限制查询集将不会填充缓存，如果这部分数据已经被缓存，则直接使用缓存中的数据

### 4. 字段查询

- 实现where子名，作为方法filter()、exclude()、get()的参数
- 语法：属性名称__比较运算符=值
- 表示==两个下划线==，左侧是属性名称，右侧是比较类型
- 对于外键，使用“属性名_id”表示外键的原始值
- 转义：like语句中使用了%与，匹配数据中的%与，在过滤器中直接写，
- 例如：`filter(title__contains="%") ==> where title like '%\%%'`，表示查找标题中包含%的

#### 比较运算符

- exact：表示判等，大小写敏感；如果没有写“ 比较运算符”，表示判等

  ```python
  filter(isDelete=False)
  ```

- contains：是否包含，大小写敏感

  ```python
  exclude(btitle__contains='传')
  ```

- startswith、endswith：以value开头或结尾，大小写敏感

  ```python
  exclude(btitle__endswith='传')
  ```

- isnull、isnotnull：是否为null

  ```python
  filter(btitle__isnull=False)
  ```

- 在前面加个i表示不区分大小写，如iexact、icontains、istarswith、iendswith

- in：是否包含在范围内

  ```python
  filter(pk__in=[1, 2, 3, 4, 5])
  ```

- gt、gte、lt、lte：大于、大于等于、小于、小于等于

  ```python
  filter(id__gt=3)
  ```

- year、month、day、week_day、hour、minute、second：对日期间类型的属性进行运算

  ```python
  filter(bpub_date__year=1980)
  filter(bpub_date__gt=date(1980, 12, 31))
  ```

#### 跨关联关系的查询：处理join查询

- 语法：模型类名 <属性名> <比较>

- 注：可以没有__<比较>部分，表示等于，结果同inner、 join

- 可返向使用，即在关联的两个模型中都可以使用

  ```python
  filter(heroinfo_ _hcontent_ _contains='八') #查询 heroinfo 和 hcontent 字段里面包含有'八'的条数
  ```

#### 聚合函数

- 使用`aggregate()`函数返回聚合函数的值

- 函数：Avg，Count，Max，Min，Sum

  ```python
  from django.db.models import Max
  maxDate = list.aggregate(Max('bpub_date'))
  ```

- count的一般用法：

  ```python
  count = list.count()
  ```

### 5.实例

`views.py`文件:

```python
from django.shortcuts import render
from django.http import HttpResponse

from myapp.models import Users


# 视图层
def index(request):
    # 执行Model的操作

    # 添加操作

    # ob = Users()  # 实例化一个Users模型
    # ob.name = "李四"
    # ob.age = 26
    # ob.phone = '123456789'
    # ob.save()  # 保存数据

    # 删除操作

    # mod = Users.objects  # 获取users的model对象
    # user = mod.get(id=3)  # 获取id值为6的数据信息
    # print(user.name)
    # user.delete()

    # 修改操作

    # ob = Users.objects.get(id=2)
    # print(ob.name)
    # ob.name = "小刘"
    # ob.age = 99
    # ob.save()  # 保存数据

    # 查询数据

    # mod = Users.objects  # 获取users模型的Model操作对象

    # ulist = mod.all()  # 获取所有数据
    # ulist = mod.filter(name='小刘')  # 获取name值为小刘的信息
    # ulist = mod.filter(age__gt=20)  # 获取所有age>20的信息
    # ulist = mod.filter(age__gte=20)  # 扶取所有age>=20的信息
    # ulist = mod.order_by("age")  # 按age升序排序
    # ulist = mod.order_by("age")[:2]  # 按age升序排序，只获取前2条
    #
    # for u in ulist:
    #     print(u.id, u.name, u.age, u.addtime)

    return HttpResponse('首页')

```

## ④用户信息管理实战

新建一个项目 Project  `django-admin startproject Project`

创建一个应用程序 User `python manage.py startapp User `

编写 子路由 与 根路由 和 视图函数 把项目跑起来

在`settings.py`里面配置

```python
ALLOWED_HOSTS = ["*"] #允许所有的域名进行访问
    
INSTALLED_APPS=[ 
	...
    User  #加载应用程序
]    
"DIRS": [os.path.join(BASE_DIR, "templates")],  #配置模板的文件路径
    #数据库连接 需要自己创建一个User数据库
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": "User",
        "USER": "root",
        "PASSWORD": "root",
        "HOST": "localhost",
        "PORT": "3306",
    }
```

在`models.py`文件里面配置模型

```python
# User 模型层
class User(models.Model):
    id = models.AutoField(primary_key=True)  # 主键可省略不写
    name = models.CharField(max_length=32)
    age = models.IntegerField(default=20)
    phone = models.CharField(max_length=16)
    addtime = models.DateTimeField(default=datetime.now)
```

然后生成迁移文件`python manage.py makemigrations`

执行迁移文件`python manage.py migrate`	 就会在数据库创建数据库表

检测数据库是否可以正常使用,在User里面的`views.py`

```python
from django.shortcuts import render
from django.http import HttpResponse
from User.models import User

# 视图函数
def index(request):
    mod = User.objects  # 获取User的一个模型对象
    ulist = mod.all()  # 获取所有数据
    for u in ulist:
        print(u.id, u.name, u.age, u.addtime)
    return HttpResponse("首页")
	# return HttpResponse("<center><h1>用户主页</h1> <a href='/indexUsers'>学生管理系统</a> </center>")
```

下面在`views.py`里面写业务逻辑

```python
# 浏览用户信息
def indexUsers(request):
    try:
        ulist = User.objects.all()  # 获取所有用户信息
        context = {"ulist": ulist}
        return render(request, "User/index.html", context)  # 加载模板
    except:
        return HttpResponse("没有找到用户信息!")

# 加载添加用户信息表单
def addUsers(request):
    return render(request, "User/add.html")  # 加载模板

# 执行用户信息添加
def insertUsers(request):
    try:
        ob = User()  # 从表单中获取要添加的信息并封装到ob对象中
        ob.name = request.POST["name"]
        ob.age = request.POST["age"]
        ob.phone = request.POST["phone"]
        ob.save()  # 执行保存操作
        context = {"info": "添加成功!"}
    except:
        context = {"info": "添加失败!"}

    return render(request, "User/info.html", context)

# 执行用户信息删除
def delUsers(request, uid=0):
    try:
        ob = User.objects.get(id=uid)  # 获取要删除的数据
        ob.delete()  # 执行删除操作
        context = {"info": "删除成功!"}
    except:
        context = {"info": "删除失败!"}

    return render(request, "User/info.html", context)

# 加载用户信息修改表单
def editUsers(request, uid=0):
    try:
        ob = User.objects.get(id=uid)  # 获取要修改的数据
        context = {"user": ob}
    except:
        context = {"info": "没有找到要修改的数据!"}

    return render(request, "User/edit.html", context)

# 执行用户信息修改
def updateUsers(request):
    try:
        uid = request.POST["id"]
        ob = User.objects.get(id=uid)  # 获取要修改的数据
        ob.name = request.POST["name"]
        ob.age = request.POST["age"]
        ob.phone = request.POST["phone"]
        ob.save()  # 执行保存
        context = {"info": "修改成功"}
    except:
        context = {"info": "没有找到要修改的数据!"}

    return render(request, "User/info.html", context)
```

`urls.py`文件:

```python
from unicodedata import name
from django.urls import path
from . import views

# 配置子路由
urlpatterns = [
    path("", views.index, name="index"),
    path("indexUsers", views.indexUsers, name="indexUsers"),
    path("addUsers", views.addUsers, name="addUsers"),
    path("insertUsers", views.insertUsers, name="insertUsers"),
    path("delUsers/<int:uid>", views.delUsers, name="delUsers"),
    path("editUsers/<int:uid>", views.editUsers, name="editUsers"),
    path("updateUsers", views.updateUsers, name="updateUsers"),
]
```

在`templates`里面创建一个文件夹`User`用于存放模板html文件

### `index.html`

```python
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
    <script></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" />

    <style>
      body {
        width: 1000px;
        text-align: center;
        margin: 0 auto;
      }
      button {
        margin: 5px 0;
      }
    </style>
  </head>
  <body>
    <h1 class="display-4">用户信息管理系统</h1>
    <a href="{% url 'indexUsers' %}"><button type="button" class="btn btn-primary">浏览信息</button></a>
    <a href="{% url 'addUsers' %}"> <button type="button" class="btn btn-danger">添加信息</button></a>
    <hr />

    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th>ID号</th>
          <th>姓名</th>
          <th>年龄</th>
          <th>电话</th>
          <th>添加时间</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {% for user in ulist %}
        <tr>
          <td scope="row">{{user.id}}</td>
          <td>{{user.name}}</td>
          <td>{{user.age}}</td>
          <td>{{user.phone}}</td>
          <td>{{user.addtime}}</td>
          <td>
            <a href="{% url 'editUsers' user.id %}"><button type="button" class="btn btn-info btn-sm">编辑</button></a>
            <a href="{% url 'delUsers' user.id %}"><button type="button" class="btn btn-warning btn-sm">删除</button></a>
          </td>
        </tr>
        {% endfor %}
      </tbody>
    </table>
  </body>
</html>
```

### `add.html`

```python
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" />

    <style>
      body {
        width: 1000px;
        text-align: center;
        margin: 0 auto;
      }
      button {
        margin: 5px 0;
      }
    </style>
  </head>
  <body>
    <h1 class="display-4">用户信息管理系统</h1>
    <a href="{% url 'indexUsers' %}"><button type="button" class="btn btn-primary">浏览信息</button></a>
    <a href="{% url 'addUsers' %}"> <button type="button" class="btn btn-danger">添加信息</button></a>
    <hr />
    <h3>添加用户信息</h3>
    <form action="{% url 'insertUsers' %}" method="post">
      {% csrf_token %} 
      <div class="form-group row">
        <label for="name" class="col-sm-2">性别: </label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="name" name="name" />
        </div>
      </div>
      <div class="form-group row">
        <label for="age" class="col-sm-2">年龄: </label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="age" name="age" />
        </div>
      </div>
      <div class="form-group row">
        <label for="phone" class="col-sm-2">电话: </label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="phone" name="phone" />
        </div>
      </div>

      <button type="submit" class="btn btn-primary">添加</button>
      <button type="resize" class="btn btn-danger">重置</button>
    </form>
  </body>
</html>
```

### `info.html`

```python
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" />

    <style>
      body {
        width: 1000px;
        text-align: center;
        margin: 0 auto;
      }
      button {
        margin: 5px 0;
      }
    </style>
  </head>
  <body>
    <h1 class="display-4">用户信息管理系统</h1>
    <a href="{% url 'indexUsers' %}"><button type="button" class="btn btn-primary">浏览信息</button></a>
    <a href="{% url 'addUsers' %}"> <button type="button" class="btn btn-danger">添加信息</button></a>
    <hr />

    <h3>操作提示信息</h3>
    <h4 class="display-5" style="color: red">{{info}}</h4>
  </body>
</html>
```

### `edit.html`

```python
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" />

    <style>
      body {
        width: 1000px;
        text-align: center;
        margin: 0 auto;
      }
      button {
        margin: 5px 0;
      }
    </style>
  </head>
  <body>
    <h1 class="display-4">用户信息管理系统</h1>
    <a href="{% url 'indexUsers' %}"><button type="button" class="btn btn-primary">浏览信息</button></a>
    <a href="{% url 'addUsers' %}"> <button type="button" class="btn btn-danger">添加信息</button></a>
    <hr />
    <h3>修改用户信息</h3>
    <form action="{% url 'updateUsers' %}" method="post">
      {% csrf_token %}
      <!-- id行 -->
      <input type="hidden" name="id" value="{{user.id}}" />

      <div class="form-group row">
        <label for="name" class="col-sm-2">姓名: </label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="name" name="name" value="{{user.name}}" />
        </div>
      </div>
      <div class="form-group row">
        <label for="age" class="col-sm-2">年龄: </label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="age" name="age" value="{{user.age}}" />
        </div>
      </div>
      <div class="form-group row">
        <label for="phone" class="col-sm-2">电话: </label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="phone" name="phone" value="{{user.phone}}" />
        </div>
      </div>

      <button type="submit" class="btn btn-primary">修改</button>
      <button type="resize" class="btn btn-danger">重置</button>
    </form>
  </body>
</html>
```

# 2.5 Django的视图层

## Django的视图层(View)

> Django框架中的视图（View）是用来负责处理用户请求和返回响应的逻辑程序
>
> 视图（View）简而言之就是一个Python的函数或方法，接受处理Web请求。
>
> 视图的响应可以是网页的HTML内容，重定向或404错误，XML文档或图像。
>
> 视图的代码按惯例是放置一个名为`views.py`的文件中，此文件放在项目或应用程序目录中。（其实视图文件名可以自己定义）

## 1. 一个简单的视图

这是一个返回当前日期和时间的视图，作为HTML文档：

```python
from django.http import HttpResponse
import datetime

def index(request):
    now = datetime.datetime.now()
    html = "<html><body>当前时间是: %s </body></html>" % now.strftime("%Y-%m-%d %H:%M:%S")
    print(now.strftime("%Y-%m-%d %H:%M:%S"))
    return HttpResponse(html)
```

## 2. 返回错误

```python
from django.http import HttpResponse, Http404, HttpResponseNotFound

def error404(request):
    # 直接返回一个404,没有去加载404的模板页面
    return HttpResponseNotFound('<h1>页面没有找到</h1>')

    # 可以直接返回一个status状态码
    # return HttpResponse(status=403)

    # 返回一个404的错误页面
    # raise Http404("我是一个错误页面")
```

## 3.关于重定向

> **重定向(Redirect)就是通过各种方法将各种网络请求重新定个方向转到其它位置**

```python
from django.shortcuts import redirect
from django.urls import reverse

# redirect重定向  reverse反向解析url地址
# return redirect(reverse('userindex'))

# 执行一段js代码，用js进行重定向
# return HttpResponse('<script>alert("添加成功");location.href = "/userindex"; </script>')

# 加载一个提醒信息的跳转页面
context = {'info':'数据添加成功','u':'/userindex'}
return render(request,'info.html',context)
```

## 4. 基于类的基本视图：

示例`views.py`：

```python
from django.http import HttpResponse
from django.views import View

class MyView(View):

    def get(self, request, *args, **kwargs):
        return HttpResponse('我是类视图的响应结果')
```

示例`urls.py`：

```python
from django.urls import path

from myapp.views import MyView

urlpatterns = [
    path('mine/', MyView.as_view(), name='my-view'),
]

# 其中as_view()是接受请求并返回响应的可调用视图['get', 'post', 'put', 'patch', 'delete, 'options'.]
```

## ①HttpResponse对象

1. 在django.http模块中定义了HttpResponse对象的API
2. HttpRequest对象由Django自动创建，HttpResponse对象由程序员创建
3. 在每一个视图函数中必须返回一个HttpResponse对象,当然也可以是HttpResponse子对象

### 1.不用模板,直接返回数据

```python
from django.http import HttpResponse

def index(request):
    return HttpResponse('你好')
```

### 2.调用模板返回数据

```python
from django.http import HttpResponse

# 返回模板
def index(request):
	return render(request,'user/edit.html',{'info':'你好'})
```

### 3.子类HttpResponseRedirect

> 重定向，服务器端跳转
> 构造函数的第一个参数用来指定重定向的地址
> 可以简写为 redirect

```python
from django.shortcuts import redirect
from django.urls import reverse

def index(request):
    return redirect(reverse('myindex')
```

### 4.子类JsonResponse

> 返回json数据，一般用于异步请求
> 帮助用户创建JSON编码的响应
> JsonResponse的默认Content-Type为application/json

```python
from django.http import JsonResponse

def index2(requeset):
  	data = [
        {'id': 1001, 'name': 'zhangsan', 'age': 20},
        {'id': 1002, 'name': 'lisi', 'age': 22},
        {'id': 1003, 'name': 'wangwu', 'age': 23},
    ]
    return JsonResponse({"data": data})
```

### 5.set_cookie方法

> Cookie 是由 Web 服务器保存在用户浏览器（客户端）上的小文本文件，它可以包含有关用户的信息。
>
> 服务器可以利用Cookies包含信息的任意性来筛选并经常性维护这些信息，以判断在HTTP传输中的状态。
>
> Cookies最典型的应用是判定注册用户是否已经登录网站

**设置cookie**

```python
 # 获取当前的 响应对象
 response = HttpResponse('cookie的设置')

 # 使用响应对象进行cookie的设置
 response.set_cookie('user','萧兮')

 # 返回响应对象
 return response
```

案例

```python
# cookie的使用
def resp06(request):
    # 读取
    m = request.COOKIES.get('num', None)
    if m:
        m = int(m) + 1
    else:
        m = 1
    # 获取当前的 响应对象
    response = HttpResponse('cookie记录的计数器值：' + str(m))
    # 使用响应对象进行cookie的设置
    response.set_cookie('num', m)
    # 返回响应对象
    return response
```

**获取cookie**

```python
# 读取
a = request.COOKIES.get('a',None)

if a:
    return HttpResponse('cookie的读取：'+a)
else:
    return HttpResponse('cookie不存在')
```

- 使用cookie做了一个页面访问计数器

```python
def resp06(request):
  # 读取
  m = request.COOKIES.get('num',None)
  if m:
      m = int(m)+1
  else:
      m = 1
  # 获取当前的 响应对象
  response = HttpResponse('cookie记录的计数器值：'+str(m))
  # 使用响应对象进行cookie的设置
  response.set_cookie('num',m)
  # 返回响应对象
  return response
```

## ②HttpReqeust对象

- 服务器接收到http协议的请求后，会根据报文创建HttpRequest对象
- **视图函数的第一个参数是HttpRequest对象**
- 在django.http模块中定义了HttpRequest对象的API

### 属性

下面除非特别说明，属性都是只读的

- path：一个字符串，表示请求的页面的完整路径，不包含域名
- method：一个字符串，表示请求使用的HTTP方法，常用值包括：'GET'、'POST'
- encoding：一个字符串，表示提交的数据的编码方式
    - 如果为None则表示使用浏览器的默认设置，一般为utf-8
    - 这个属性是可写的，可以通过修改它来修改访问表单数据使用的编码，接下来对属性的任何访问将使用新的encoding值
- GET：一个类似于字典的对象，包含get请求方式的所有参数
- POST：一个类似于字典的对象，包含post请求方式的所有参数
- FILES：一个类似于字典的对象，包含所有的上传文件
- COOKIES：一个标准的Python字典，包含所有的cookie，键和值都为字符串
- session：一个既可读又可写的类似于字典的对象，表示当前的会话，只有当Django 启用会话的支持时才可用，详细内容见“状态保持”

### 方法

- `is_ajax()`：如果请求是通过XMLHttpRequest发起的，则返回True

```python
# 测试request对象
def resp07(request):
    print("请求路径", request.path)
    print("请求方法", request.method)
    print("请求编码", request.encoding)
    # print(request.GET)
    print(request.GET['id'])
    print(request.GET.get('name'))
    print(request.GET.get('age', 0))
    return HttpResponse("测试request请求对象")
```

## ③QueryDict对象

-   定义在django.http.QueryDict

-   request对象的属性GET、POST都是QueryDict类型的对象

-   与python字典不同，QueryDict类型的对象用来处理同一个键带有多个值的情况

-   方法get()：根据键获取值

    -   只能获取键的一个值

    -   如果一个键同时拥有多个值，获取最后一个值

        ```python
        dict.get('键',default)
        或简写为
        dict['键']
        ```

-   方法getlist()：根据键获取值

    -   将键的值以列表返回，可以获取一个键的多个值

        ```python
        dict.getlist('键',default)
        ```

**GET && POST**

>   **一键一值**

```python
http://127.0.0.1/get?a=1&b=2&c=3

request.GET['name']
request.GET.get('name',None)
```

>   **一键多值**

```python
http://127.0.0.1/get?a=1&a=2&b=3

request.GET.getlist('name',None)

request.POST.getlist('name',None)
```

## ④验证码实战

```python
# 验证码的输出
def verifycode(request):
    # 引入绘图模块
    from PIL import Image, ImageDraw, ImageFont
    # 引入随机函数模块
    import random
    # 定义变量，用于画面的背景色、宽、高
    bgcolor = (random.randrange(20, 100), random.randrange(20, 100), 255)
    width = 100
    height = 25
    # 创建画面对象
    im = Image.new('RGB', (width, height), bgcolor)
    # 创建画笔对象
    draw = ImageDraw.Draw(im)
    # 调用画笔的point()函数绘制噪点
    for i in range(0, 100):
        xy = (random.randrange(0, width), random.randrange(0, height))
        fill = (random.randrange(0, 255), 255, random.randrange(0, 255))
        draw.point(xy, fill=fill)
    # 定义验证码的备选值
    str1 = 'ABCD123EFGHIJK456LMNOPQRS789TUVWXYZ0'
    # 随机选取4个值作为验证码
    rand_str = ''
    for i in range(0, 4):
        rand_str += str1[random.randrange(0, len(str1))]
    # 构造字体对象
    font = ImageFont.truetype('static/ariali.ttf', 23)
    # font = ImageFont.load_default().font
    # 构造字体颜色
    fontcolor = (255, random.randrange(0, 255), random.randrange(0, 255))
    # 绘制4个字
    draw.text((5, 2), rand_str[0], font=font, fill=fontcolor)
    draw.text((25, 2), rand_str[1], font=font, fill=fontcolor)
    draw.text((50, 2), rand_str[2], font=font, fill=fontcolor)
    draw.text((75, 2), rand_str[3], font=font, fill=fontcolor)
    # 释放画笔
    del draw
    # 存入session，用于做进一步验证
    # request.session['verifycode'] = rand_str
    # 内存文件操作
    """
    python2的为
    # 内存文件操作
    import cStringIO
    buf = cStringIO.StringIO()
    """
    # 内存文件操作-->此方法为python3的
    import io
    buf = io.BytesIO()
    # 将图片保存在内存中，文件类型为png
    im.save(buf, 'png')
    # 将内存中的图片数据返回给客户端，MIME类型为图片png
    return HttpResponse(buf.getvalue(), 'image/png')
```

在模板的html文件中,可以直接引用

```python
<img id='verifycode' src="{% url 'resp08' %}" alt="CheckCode"/>
```

# 2.6 Django的模板层

## Template模板

>   作为Web 框架，Django 需要一种很便利的方法以动态地生成HTML。最常见的做法是使用模板。
>
>   模板包含所需HTML 输出的静态部分，以及一些特殊的语法，描述如何将动态内容插入。

## 模板引擎配置

>   模板引擎使用该TEMPLATES设置进行配置。这是一个配置列表，每个引擎一个。
>
>   默认值为空。在 settings.py由所产生的startproject命令定义一个更有用的值：
>
>   在做下面模板配置的同时，也要在项目的根目录下创建一个`templates`目录

```python
# 项目目录下的settings.py配置文件添加TEMPLATES中的DIRS配置
TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [os.path.join(BASE_DIR,'templates')],
            'APP_DIRS': True,
            'OPTIONS': {
                'context_processors': [
                    'django.template.context_processors.debug',
                    'django.template.context_processors.request',
                    'django.contrib.auth.context_processors.auth',
                    'django.contrib.messages.context_processors.messages',
                ],
            },
        },
    ]
```

## ①模板语法

### 1.变量

-   变量输出语法

    ```js
    {{  var  }}
    ```

-   当模版引擎遇到一个变量，将计算这个变量，然后将结果输出

-   变量名必须由字母、数字、下划线（不能以下划线开头）和点组成

-   当模版引擎遇到点(".")，会按照下列顺序查询：

    -   字典查询，例如：foo["bar"]
    -   属性或方法查询，例如：foo.bar
    -   数字索引查询，例如：foo[bar]

-   如果变量不存在， 模版系统将插入'' (空字符串)

-   在模板中调用方法时不能传递参数

### 2.标签

-   语法

    ```python
    { %  tag  % }
    ```

-   作用

    -   在输出中创建文本
    -   控制循环或逻辑
    -   加载外部信息到模板中

#### for标签

```js
{ %  for ... in ...  % }
    循环逻辑

{ %  endfor  % }
```

#### if标签

```js
{ %  if ...  % }
    逻辑1
{ %  elif ...  % }
    逻辑2
{ %  else  % }
    逻辑3
{ %  endif  % }
```

#### comment标签

```js
{ %  comment  % }
    多行注释
{ %  endcomment  % }
```

#### include：加载模板并以标签内的参数渲染

```js
{ %  include "base/index.html"  % }
```

#### url：反向解析

```js
{ %  url 'name' p1 p2  % }
```

#### csrf_token：这个标签用于跨站请求伪造保护

```js
{ %  csrf_token  % }
```

## ②模板继承

- **模板继承可以减少页面内容的重复定义，实现页面内容的重用**
- 典型应用：网站的头部、尾部是一样的，这些内容可以定义在父模板中，子模板不需要重复定义
- block标签：在父模板中预留区域，在子模板中填充
- **extends继承：继承，写在模板文件的第一行**
- 定义父模板base.html

```js
{ %  block block_name  % }
   这里可以定义默认值
   如果不定义默认值，则表示空字符串
{ %  endblock  % }
```

- 定义子模板index.html

```
{ %  extends "base.html"  % }
```

- 在子模板中使用block填充预留区域

```js
{ %  block block_name  % }
实际填充内容
{ %  endblock  % }
```

**说明**

- **如果在模版中使用extends标签，它必须是模版中的第一个标签**
- **不能在一个模版中定义多个相同名字的block标签**
- 子模版不必定义全部父模版中的blocks，如果子模版没有定义block，则使用了父模版中的默认值
- 如果发现在模板中大量的复制内容，那就应该把内容移动到父模板中
- 使用可以获取父模板中block的内容
- 为了更好的可读性，可以给endblock标签一个名字

```js
{ %  block block_name  % }
    区域内容
{ %  endblock block_name  % }
```

### 三层继承结构

- 三层继承结构使代码得到最大程度的复用，并且使得添加内容更加简单
- 如下图为常见的电商页面

#### 1.创建根级模板

- 名称为“base.html”
- 存放整个站点共用的内容

```js
<!DOCTYPE html>
<html>
    <head>
        <title>{ %  block title  % }{ %  endblock  % } 水果超市</title>
    </head>
    <body>
        top--{{logo}}
        <hr/>
        { %  block left  % }

        { %  endblock  % }

        { %  block content  % }

        { %  endblock  % }
        <hr/>
        bottom
    </body>
</html>
```

#### 2.创建分支模版

- 继承自base.html
- 名为“base_***.html”
- 定义特定分支共用的内容
- 定义base_goods.html

```js
{ %  extends 'temtest/base.html'  % }

{ %  block title  % }商品{ %   endblock   % }

{ %  block left  % }
    <h1>goods left</h1>
{ %  endblock  % }
```

- 定义base_user.html

```js
{ %  extends 'temtest/base.html'  % }

{ %  block title  % }用户中心{ %  endblock   % }

{ %  block left  % }
    <font color='blue'>user left</font>
{ %  endblock  % }
```

- 定义index.html，继承自base.html，不需要写left块

```js
{ %  extends 'temtest/base.html'  % }

{ %  block content  % }
    首页内容
{ %  endblock content  % }
```

#### 3.为具体页面创建模板，继承自分支模板

- 定义商品列表页goodslist.html

```js
{ %  extends 'temtest/base_goods.html'  % }
{ %  block content  % }
    商品正文列表
{ %  endblock content  % }
```

- 定义用户密码页userpwd.html

```js
{ %  extends 'temtest/base_user.html'  % }
{ %  block content  % }
    用户密码修改
{ %  endblock content  % }
```

#### 4.视图调用具体页面，并传递模板中需要的数据

- 首页视图index

```py
logo='welcome to itcast'
def index(request):
    return render(request, 'temtest/index.html', {'logo': logo})
```

- 商品列表视图goodslist

```py
def goodslist(request):
    return render(request, 'temtest/goodslist.html', {'logo': logo})
```

- 用户密码视图userpwd

```py
def userpwd(request):
    return render(request, 'temtest/userpwd.html', {'logo': logo})
```

#### 5.配置url

```py
from django.urls import path
from . import views
urlpatterns = [
    path('', views.index, name='index'),
    path('list/', views.goodslist, name='list'),
    path('pwd/', views.userpwd, name='pwd'),
]
```





















































