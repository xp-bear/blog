# openpyxl的学习

## 1.创建工作簿

```python
import openpyxl

wb = openpyxl.Workbook()  # 创建新的工作簿
wb.save('我的工作簿.xlsx')
# 每个workbook创建后，默认会存在一个worksheet。也可以自行创建新的worksheet。
```

## 2.读取工作簿

```python
import openpyxl

wb = openpyxl.load_workbook('我的工作簿.xlsx')
wb.save('我的工作簿.xlsx')
```

## 3.批量创建工作簿

```python
import openpyxl

for i in range(1, 13):
    wb = openpyxl.Workbook()
    wb.save(f'{i}月.xlsx')
    print(i)
```

## 4.工作表对象的获取方法

### 1.获取工作表对象

```python
import openpyxl
wb = openpyxl.load_workbook('我的工作簿.xlsx')

ws = wb.active  # 获取活动工作表

ws2 = wb.worksheets[1]  #索引获取工作表

ws3 = wb['Sheet3']  #工作表名获取
```

### 2.循环工作表

```python
for i in wb.worksheets:
    print(i)
```

### 3.循环工作表名

```python
import openpyxl
wb = openpyxl.load_workbook('我的工作簿.xlsx')

for i in wb.sheetnames:
     print(i)
```

### 4.修改工作表名

```python
wb.worksheets[0].title = '修改工作表名' #修改工作表名
print(wb.worksheets[0].title)
wb.save('我的工作簿.xlsx')
```

### 5.批量修改工作表名

```python
import openpyxl

wb = openpyxl.load_workbook('我的工作簿.xlsx')

for i in wb.worksheets:
    i.title += '-哈哈'
    print(i.title)
wb.save('我的工作簿.xlsx')
```

完整代码:

```python
import openpyxl

wb = openpyxl.load_workbook('测试.xlsx')

# 1.获取当前活动工作表
# ws = wb.active  # 获取活动工作表
# print(ws)

# 2.索引获取
# ws2 = wb.worksheets[1]
# print(ws2)

# 3.已工作表名获取
# ws3 = wb['Sheet3']
# print(ws3)

# 4.循环工作表
# for i in wb.worksheets:
#     print(i)

# 5.循环工作表名
# for i in wb.sheetnames:
#     print(i)


# 6.修改工作表名
# wb.worksheets[0].title = '修改一'
# print(wb.worksheets[0].title)
# wb.save('测试.xlsx')

# 7.批量修改工作表名
# for i in wb.worksheets:
#     i.title += '-哈哈'
#     print(i.title)
# wb.save('测试2.xlsx')
```

## 5.工作表的新建、复制、删除

### 1.创建工作簿的时候,创建工作表

```python
import openpyxl

wb = openpyxl.Workbook()
wb.create_sheet()
wb.create_sheet()
wb.create_sheet()
wb.save('demo.xlsx') #会有4个工作表
```

### 2.已经存在工作簿,创建工作表

```python
import openpyxl

wb = openpyxl.load_workbook('我的工作簿.xlsx')
wb.create_sheet('工资表', 0)  # 指定位置(把这张表放在工作簿的第二张表的位置)
wb.save('我的工作簿.xlsx')
```

### 3.复制工作表

```python
import openpyxl

wb = openpyxl.load_workbook('我的工作簿.xlsx')
ws = wb.copy_worksheet(wb['工资表'])
ws.title = '工资表修改'
wb.save('我的工作簿.xlsx')
```

### 4.删除工作表

```python
wb = openpyxl.load_workbook('测试.xlsx')
wb.remove(wb['工资表'])
wb.save('测试.xlsx')
```

完整代码: 

```python
import openpyxl

# 1.创建工作簿的时候,创建工作表
# wb = openpyxl.Workbook()
# wb.create_sheet()
# wb.create_sheet()
# wb.create_sheet()
# wb.save('demo.xlsx')

# 2.已经存在工作簿,创建工作表
# wb = openpyxl.load_workbook('测试.xlsx')
# wb.create_sheet('工资表', 2)  # 指定位置
# wb.save('测试.xlsx')

# 3.复制工作表
# wb = openpyxl.load_workbook('测试.xlsx')
# ws = wb.copy_worksheet(wb['工资表'])
# ws.title = '工资表修改'
# wb.save('测试3.xlsx')

# 4.删除工作表
# wb = openpyxl.load_workbook('测试.xlsx')
# wb.remove(wb['工资表'])
# wb.save('测试.xlsx')
```

## 6.单元格信息的获取

获取单元格对象: 

获取 b2 单元格里面的值: `ws['b2'].value `

```python
import openpyxl

wb = openpyxl.load_workbook('测试.xlsx')
ws = wb['修改一']
print(ws['b2'].value)
print(ws.cell(1, 2).value)  # 读取行列

# 批量读取序列号
print(ws['c3'].value)
for i in range(3, 10):
    print(ws[f'c{i}'].value)
```

## 7.单元格区域信息获取

### 1.选取指定范围的值

```python
 print(ws['a1:b3']) 
#((<Cell '修改一'.B3>, <Cell '修改一'.C3>), (<Cell '修改一'.B4>, <Cell '修改一'.C4>), (<Cell '修改一'.B5>, <Cell '修改一'.C5>))
```

### 2.列表循环方式取值

```python
for item in ws['a1:b3']:  # 或ws['b:c'] 或ws['3:5']
    print(item)  # 按行读取数据
    for ceil in item:
        print(ceil.value)
```

### 3.使用列表推导式的方式取值

```python
print([[c.value for c in row] for row in ws['a1:b3']])
```

### 4.直接使用values获取工作表里面的全部数据

```python
print(ws.values)  # 是一个generator的可以迭代的对象

# 遍历获取所有的行
for value in ws.values:
    print(value)
```

完整代码: 

```python
import openpyxl

wb = openpyxl.load_workbook('测试.xlsx')
ws = wb['修改一']
# ws = wb.active

# 选取指定范围的值
# print(ws['b3:c5'])

# 列表循环方式取值
# for item in ws['b3:c5']:  # 或ws['b:c'] 或ws['3:5']
#     print(item)  # 按行读取数据
#     for ceil in item:
#         print(ceil.value)

# 使用列表推导式的方式取值
# print([[c.value for c in row] for row in ws['b3:c5']])


# 直接使用values获取工作表里面的全部数据
# print(ws.values)  # 是一个generator的可以迭代的对象

# 遍历获取所有的行
# for value in ws.values:
#     print(value)
```

## 8.行列信息的获取

### 1.按照行的方式获取数据

```python
for row in ws.rows:
    print([c.value for c in row])
```

### 2.按照列的方式获取数据

```python
for col in ws.columns:
    print([c.value for c in col])
```

### 3.获取某一列的数据

```python
print([c.value for c in ws['c']])
```

### 4.最小,最大行号与列号的获取

```python
print('行号', ws.min_row, ws.max_row) #行号 1 32
print('列号', ws.min_column, ws.max_column) #列号 1 4
```

完整代码: 

```python
import openpyxl

wb = openpyxl.load_workbook('测试.xlsx')
ws = wb['修改一']
print(ws.rows)

# 按照行的方式获取数据
# for row in ws.rows:
#     print([c.value for c in row])

# 按照列的方式获取数据
# for col in ws.columns:
#     print([c.value for c in col])

# 获取某一列的数据
# print([c.value for c in ws['c']])

# 最小,最大行号与列号的获取
# print('行号', ws.min_row, ws.max_row)
# print('列号', ws.min_column, ws.max_column)
```

## 9.单元格的写入

### 1.单元格写入

```python
ws['a1'] = '我是萧兮' #在A1单元格写入(如果该单元格之前有值,进行一个覆盖)
wb.save('我的工作簿.xlsx')
```

### 2.行列坐标写入

```python
ws.cell(1, 2, '我是中国人')
ws.cell(1, 3).value = '我是武汉人'
wb.save('我的工作簿.xlsx') 
```

完整代码: 

```python
# A1表示法
import openpyxl

wb = openpyxl.load_workbook('测试.xlsx')
# ws = wb.create_sheet('单元格的写入')
ws=wb['单元格的写入']
print(ws.title)

ws['a1'] = '我是萧兮'
wb.save('测试.xlsx')

# r1c1表示法
# ws.cell(1, 2, '我是中国人')
# ws.cell(1, 3).value = '我是武汉人'
# wb.save('测试.xlsx')

```

## 10.批量写入数据

1.写入位置

```python
ws.append(['嘿嘿', '哈哈', '呵呵'])  # 在第一行按顺序写入数据

ws.append({"a": '萧兮', 'c': '我今年18岁'})  # 按列写入 在a列和c列写入

ws.append({2: '加油', 5: "奥利给"})  # 按单元格写入 在第2个和第5个单元格写入
```

完整代码: 

```python
import openpyxl

wb = openpyxl.load_workbook('测试.xlsx')
# ws = wb.create_sheet('批量写入数据')
ws = wb['批量写入数据']
ws.append(['嘿嘿', '哈哈', '呵呵'])  # 在第一行按顺序写入数据

ws.append({"a": '萧兮', 'c': '我今年18岁'})  # 按列写入 在a列和c列写入

ws.append({2: '加油', 5: "奥利给"})  # 按单元格写入 在第2个和第5个单元格写入

wb.save('测试.xlsx')
```

## 11.模拟爬虫数据保存

```python
arr = [
    {"name": "for", 'age': 16},
    {"name": "ttt", 'age': 18},
    {"name": "pp", 'age': 28},
]
import openpyxl

wb = openpyxl.load_workbook('我的工作簿.xlsx')
ws = wb.create_sheet('数据保存', 0)

ws.append(['姓名', '年龄']) # 添加表头

for item in arr:
    print(list(item.values())) #把获取的对象值,转成列表的形式添加
    ws.append(list(item.values()))
wb.save('我的工作簿.xlsx')
```