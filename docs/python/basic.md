# Python基础

本章节介绍Python的基础知识，帮助初学者快速入门。

## 📌 基础语法

### 变量与数据类型

Python支持多种数据类型，包括整数、浮点数、字符串、布尔值等。

```python
# 定义变量
a = 10  # 整数
b = 3.14  # 浮点数
c = "Hello, Python!"  # 字符串
d = True  # 布尔值
```

### 控制结构

#### 条件语句

```python
age = 18
if age >= 18:
    print("成年人")
elif age >= 13:
    print("青少年")
else:
    print("儿童")
```

#### 循环语句

```python
# for循环
sum = 0
for i in range(1, 101):
    sum += i
print("1到100的和：", sum)

# while循环
count = 0
while count < 5:
    print(count)
    count += 1
```

## 📝 函数

函数是组织好的、可重复使用的、用来实现特定功能的代码块。

```python
def greet(name):
    """打印问候信息"""
    print(f"Hello, {name}!")

# 调用函数
greet("YG")
```

## 📚 常用内置函数

- `print()` - 输出信息
- `input()` - 获取用户输入
- `len()` - 计算长度
- `type()` - 查看数据类型
- `range()` - 生成数字序列
- `list()` - 创建列表
- `dict()` - 创建字典

## 💡 学习提示

- 多动手练习，编写小程序
- 阅读官方文档和优质教程
- 参与编程社区，解决实际问题
- 学习调试技巧，理解错误信息