# Python基础

本章节详细介绍Python的基础知识，帮助初学者快速入门并建立扎实的编程基础。

## 📌 基础语法

### 注释

注释是代码中不会被执行的文本，用于解释代码的功能和逻辑。Python支持单行注释和多行注释。

```python
# 这是一个单行注释

"""
这是一个多行注释
可以包含多行文本
"""

print("Hello, World!")  # 这也是一个单行注释
```

### 变量与数据类型

Python是动态类型语言，变量不需要声明类型。常用的数据类型包括：

#### 数值类型

- **整数（int）**：包括正整数、负整数和零
- **浮点数（float）**：带小数点的数字
- **复数（complex）**：由实部和虚部组成的数

```python
# 数值类型示例
a = 10          # 整数
b = -5          # 负整数
c = 3.14159     # 浮点数
d = 2.5e3       # 科学计数法表示的浮点数，等同于2500
e = 2 + 3j      # 复数
```

#### 字符串类型

字符串是由字符组成的序列，用于表示文本信息。

```python
# 字符串示例
str1 = "Hello, Python!"           # 使用双引号
str2 = 'Python is amazing'        # 使用单引号
str3 = '''这是一个
多行字符串'''     # 使用三引号定义多行字符串
str4 = """这也是一个
多行字符串"""

# 字符串拼接
greeting = "Hello, " + "World!"  # 结果: "Hello, World!"

# 字符串格式化
name = "YG"
age = 25
message = f"My name is {name} and I'm {age} years old."  # f-string格式化
message2 = "My name is {} and I'm {} years old.".format(name, age)  # format方法
```

#### 布尔类型

布尔类型只有两个值：`True` 和 `False`，主要用于条件判断。

```python
# 布尔类型示例
is_valid = True
is_empty = False

# 布尔运算
result1 = True and False  # 逻辑与，结果为False
result2 = True or False   # 逻辑或，结果为True
result3 = not True        # 逻辑非，结果为False
```

#### 类型转换

Python支持不同数据类型之间的转换。

```python
# 类型转换示例
num_str = "123"
num_int = int(num_str)        # 字符串转整数
num_float = float(num_str)    # 字符串转浮点数

num = 123
num_str = str(num)            # 整数转字符串

# 注意：不是所有字符串都能转换为数字
# int("abc")  # 这会抛出错误
```

## 📊 数据结构

Python提供了多种内置的数据结构，用于存储和组织数据。

### 列表（List）

列表是有序的可变序列，可以存储任意类型的元素。

```python
# 列表示例
numbers = [1, 2, 3, 4, 5]           # 整数列表
mixed = [1, "hello", 3.14, True]    # 混合类型列表

# 访问列表元素
first_element = numbers[0]          # 访问第一个元素（索引从0开始）
last_element = numbers[-1]          # 访问最后一个元素

# 修改列表
numbers[0] = 10                     # 修改第一个元素
numbers.append(6)                   # 添加元素到列表末尾
numbers.insert(2, 100)              # 在指定位置插入元素
numbers.remove(3)                   # 删除指定值的元素
numbers.pop()                       # 删除并返回最后一个元素

# 列表切片
subset = numbers[1:4]               # 获取索引1到3的元素（不包括4）
```

### 元组（Tuple）

元组是有序的不可变序列，一旦创建就不能修改。

```python
# 元组示例
colors = ("red", "green", "blue")   # 创建元组
point = (10, 20)                     # 表示坐标的元组

single_element = (42,)               # 只有一个元素的元组，逗号不能省略

# 访问元组元素
the_color = colors[0]

# 元组解包
a, b = point                         # a=10, b=20
```

### 字典（Dictionary）

字典是无序的键值对集合，通过键来访问值。

```python
# 字典示例
person = {
    "name": "YG",
    "age": 25,
    "city": "Beijing"
}

# 访问字典值
name = person["name"]               # 通过键访问值
age = person.get("age")              # 使用get方法访问值

# 修改字典
person["job"] = "Developer"          # 添加新的键值对
person["age"] = 26                  # 修改已有值

# 删除元素
person.pop("city")                   # 删除指定键的元素

# 遍历字典
for key, value in person.items():
    print(f"{key}: {value}")
```

### 集合（Set）

集合是无序的、不重复的元素集合。

```python
# 集合示例
fruits = {"apple", "banana", "cherry"}
empty_set = set()                    # 创建空集合

# 添加元素
fruits.add("orange")

# 删除元素
fruits.remove("banana")              # 如果元素不存在会抛出错误
fruits.discard("grape")              # 如果元素不存在不会抛出错误

# 集合运算
set1 = {1, 2, 3, 4}
set2 = {3, 4, 5, 6}
union = set1 | set2                  # 并集: {1, 2, 3, 4, 5, 6}
intersection = set1 & set2           # 交集: {3, 4}
difference = set1 - set2             # 差集: {1, 2}
```

## 🎛️ 控制结构

控制结构用于控制程序的执行流程。

### 条件语句

条件语句根据条件的真假来决定执行的代码块。

```python
# 基本条件语句
age = 18
if age >= 18:
    print("成年人")
elif age >= 13:
    print("青少年")
else:
    print("儿童")

# 条件表达式（三元运算符）
result = "成年人" if age >= 18 else "未成年人"

# 嵌套条件语句
temperature = 25
if temperature > 30:
    print("天气炎热")
    print("注意防暑")
elif temperature > 20:
    print("天气舒适")
else:
    print("天气较冷")
    if temperature < 0:
        print("注意保暖")
```

### 循环语句

循环语句用于重复执行一段代码。

#### for循环

for循环用于遍历序列或其他可迭代对象。

```python
# 遍历列表
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    print(num)

# 使用range函数
for i in range(5):              # 生成0-4的序列
    print(i)

for i in range(1, 10, 2):       # 生成1-9的奇数序列
    print(i)

# 遍历字典
person = {"name": "YG", "age": 25}
for key in person:
    print(key, person[key])

for key, value in person.items():
    print(f"{key}: {value}")
```

#### while循环

while循环在条件为真时重复执行代码块。

```python
# 基本while循环
count = 0
while count < 5:
    print(count)
    count += 1

# 无限循环（需要在内部有break语句）
while True:
    user_input = input("请输入内容（输入'退出'结束）：")
    if user_input == "退出":
        break
    print(f"你输入的是：{user_input}")
```

#### 循环控制语句

- `break`：跳出当前循环
- `continue`：跳过当前循环的剩余部分，继续下一次循环
- `else`：循环正常结束时执行（没有被break中断）

```python
# break示例
for i in range(10):
    if i == 5:
        break
    print(i)  # 只会打印0-4

# continue示例
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)  # 只打印奇数

# else示例
for i in range(5):
    print(i)
else:
    print("循环正常结束")
```

## 📝 函数

函数是组织好的、可重复使用的、用来实现特定功能的代码块。

### 函数定义和调用

```python
# 定义函数
def greet(name):
    """打印问候信息（这是文档字符串）"""
    print(f"Hello, {name}!")

# 调用函数
greet("YG")

# 查看函数文档
print(greet.__doc__)
```

### 函数参数

Python函数支持多种参数类型：

```python
# 位置参数
def add(a, b):
    return a + b

result = add(3, 5)

# 默认参数
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

print(greet("YG"))               # 使用默认问候语
print(greet("YG", "Hi"))         # 覆盖默认问候语

# 关键字参数
def describe_person(name, age, city):
    return f"{name} is {age} years old and lives in {city}."

# 使用关键字参数可以改变参数顺序
print(describe_person(age=25, name="YG", city="Beijing"))

# 可变参数（*args）
def sum_numbers(*args):
    """计算任意数量数字的和"""
    total = 0
    for num in args:
        total += num
    return total

print(sum_numbers(1, 2, 3, 4))

# 关键字可变参数（**kwargs）
def print_info(**kwargs):
    """打印任意关键字参数"""
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="YG", age=25, city="Beijing")
```

### 返回值

函数可以返回一个值、多个值（作为元组）或不返回任何值（实际上返回None）。

```python
# 返回单个值
def square(x):
    return x * x

# 返回多个值
def get_coordinates():
    x = 10
    y = 20
    return x, y  # 实际上返回的是元组 (10, 20)

# 解包多个返回值
x, y = get_coordinates()

# 不返回值的函数
def say_hello():
    print("Hello!")
    # 没有return语句，默认返回None
```

### Lambda函数

Lambda函数是一种小型的、匿名的函数，可以用一行代码定义。

```python
# 基本lambda函数
square = lambda x: x * x
print(square(5))  # 输出: 25

# 在函数中使用lambda
def apply_operation(x, y, operation):
    return operation(x, y)

addition = apply_operation(3, 4, lambda a, b: a + b)
multiplication = apply_operation(3, 4, lambda a, b: a * b)

# 结合内置函数使用
umbers = [1, 2, 3, 4, 5]
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
squared_numbers = list(map(lambda x: x * x, numbers))
```

## ⚠️ 异常处理

异常处理用于捕获和处理程序运行时可能出现的错误。

```python
# 基本异常处理
try:
    num = int(input("请输入一个数字："))
    result = 10 / num
    print(f"结果是：{result}")
except ValueError:
    print("请输入有效的数字！")
except ZeroDivisionError:
    print("除数不能为零！")
except Exception as e:
    print(f"发生错误：{e}")
else:
    print("没有发生异常")
finally:
    print("无论是否发生异常，都会执行这里的代码")

# 抛出异常
def check_positive_number(num):
    if num <= 0:
        raise ValueError("数字必须是正数")
    return num

try:
    check_positive_number(-5)
except ValueError as e:
    print(f"捕获到异常：{e}")
```

## 📚 模块与包

模块是一个包含Python定义和语句的文件。包是一个包含多个模块的目录。

```python
# 导入整个模块
import math
print(math.sqrt(16))  # 输出: 4.0

# 导入模块中的特定函数
from math import sqrt, pi
print(sqrt(25))  # 输出: 5.0
print(pi)        # 输出: 3.141592653589793

# 导入模块的所有内容
from math import *

# 使用别名
import numpy as np
import pandas as pd

# 导入自定义模块
# 假设我们有一个名为 my_module.py 的文件
# import my_module
# my_module.my_function()
```

## 📊 常用内置函数

Python提供了许多内置函数，可以直接使用：

- `print(*objects, sep=' ', end='\n', file=sys.stdout, flush=False)` - 输出信息到控制台
- `input(prompt=None)` - 获取用户输入的字符串
- `len(s)` - 返回对象的长度（元素个数）
- `type(object)` - 返回对象的类型
- `int(x, base=10)` - 将对象转换为整数
- `float(x)` - 将对象转换为浮点数
- `str(object='')` - 将对象转换为字符串
- `bool(x)` - 将对象转换为布尔值
- `list(iterable)` - 创建一个列表
- `tuple(iterable)` - 创建一个元组
- `dict(**kwargs)`, `dict(mapping)`, `dict(iterable)` - 创建一个字典
- `set(iterable)` - 创建一个集合
- `range(start, stop[, step])` - 生成一个整数序列
- `abs(x)` - 返回数字的绝对值
- `max(*args, key=None)` - 返回最大值
- `min(*args, key=None)` - 返回最小值
- `sum(iterable, start=0)` - 求和
- `sorted(iterable, key=None, reverse=False)` - 排序
- `reversed(seq)` - 反转序列
- `enumerate(iterable, start=0)` - 返回枚举对象，包含索引和值
- `zip(*iterables)` - 将多个可迭代对象打包成元组

## 💡 学习提示

- 多动手练习，编写小程序
- 阅读官方文档和优质教程
- 参与编程社区，解决实际问题
- 学习调试技巧，理解错误信息
- 培养良好的代码风格和习惯
- 注重基础知识的扎实掌握
- 尝试用Python解决实际问题