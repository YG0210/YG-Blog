# Python进阶

本章节详细介绍Python的高级特性，帮助开发者提升编程技能，编写更加优雅、高效的Python代码。

## 🧱 面向对象编程

Python是一种面向对象的编程语言，支持类、继承、多态等OOP概念。

### 类与对象

```python
# 定义类
class Person:
    # 类变量（所有实例共享）
    species = "Homo sapiens"
    
    # 构造方法
    def __init__(self, name, age):
        # 实例变量（每个实例独有）
        self.name = name
        self.age = age
        # 私有属性（约定以单下划线开头）
        self._private_var = "这是私有变量"
        # 私有属性（以双下划线开头会触发名称修饰）
        self.__really_private = "这是真正的私有变量"
    
    # 实例方法
    def greet(self):
        return f"Hello, my name is {self.name}."
    
    # 类方法（使用@classmethod装饰器）
    @classmethod
    def get_species(cls):
        return cls.species
    
    # 静态方法（使用@staticmethod装饰器）
    @staticmethod
    def is_adult(age):
        return age >= 18
    
    # 特殊方法（魔术方法）
    def __str__(self):
        return f"Person(name='{self.name}', age={self.age})"
    
    def __repr__(self):
        return f"Person('{self.name}', {self.age})"

# 创建对象实例
person = Person("YG", 25)

# 访问属性和方法
print(person.name)          # 输出: YG
print(person.greet())       # 输出: Hello, my name is YG.
print(Person.get_species()) # 输出: Homo sapiens
print(Person.is_adult(30))  # 输出: True
print(person)               # 输出: Person(name='YG', age=25)

# 尝试访问私有属性
print(person._private_var)  # 可以访问，但按约定不应该这样做
# print(person.__really_private)  # 直接访问会报错
print(person._Person__really_private)  # 通过修饰后的名称可以访问
```

### 继承与多态

```python
# 基类
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        raise NotImplementedError("子类必须实现此方法")
    
    def move(self):
        return f"{self.name}正在移动"

# 子类继承基类
class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

# 多态：同一接口，不同实现
animals = [Dog("Rex"), Cat("Whiskers")]
for animal in animals:
    print(f"{animal.name} says: {animal.speak()}")
    print(animal.move())

# 多重继承
class Pet:
    def __init__(self, owner):
        self.owner = owner
    
    def get_owner(self):
        return self.owner

class DomesticDog(Dog, Pet):
    def __init__(self, name, owner):
        Dog.__init__(self, name)
        Pet.__init__(self, owner)
    
    def info(self):
        return f"{self.name}属于{self.owner}"

# 使用super()函数访问父类方法
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height

class Square(Rectangle):
    def __init__(self, side_length):
        super().__init__(side_length, side_length)
```

### 抽象类与接口

Python通过abc模块支持抽象类：

```python
from abc import ABC, abstractmethod

# 定义抽象类
class Shape(ABC):
    @abstractmethod
    def area(self):
        """计算面积"""
        pass
    
    @abstractmethod
    def perimeter(self):
        """计算周长"""
        pass

# 实现抽象类
class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        import math
        return math.pi * self.radius ** 2
    
    def perimeter(self):
        import math
        return 2 * math.pi * self.radius

# 尝试实例化抽象类会报错
# shape = Shape()  # 这会抛出错误

# 实例化具体子类
circle = Circle(5)
print(f"Area: {circle.area()}")
print(f"Perimeter: {circle.perimeter()}")
```

## 🎭 装饰器

装饰器是一种特殊的函数，用于修改其他函数的功能，无需修改原函数代码。

### 基础装饰器

```python
# 定义一个简单的装饰器
def log_decorator(func):
    def wrapper(*args, **kwargs):
        print(f"[日志] 调用函数: {func.__name__}")
        result = func(*args, **kwargs)
        print(f"[日志] 函数 {func.__name__} 执行完毕，结果: {result}")
        return result
    return wrapper

# 使用装饰器语法糖
@log_decorator
def add(a, b):
    """计算两个数的和"""
    return a + b

# 调用装饰后的函数
result = add(5, 3)  # 会输出日志信息

# 不使用语法糖的方式调用装饰器
def multiply(a, b):
    return a * b

# 手动应用装饰器
wrapped_multiply = log_decorator(multiply)
result = wrapped_multiply(4, 5)
```

### 装饰器链

```python
# 定义多个装饰器
def log_entry(func):
    def wrapper(*args, **kwargs):
        print(f"进入函数: {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

def log_exit(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        print(f"离开函数: {func.__name__}")
        return result
    return wrapper

# 应用多个装饰器（从下到上应用）
@log_exit
@log_entry
def divide(a, b):
    if b == 0:
        raise ValueError("除数不能为零")
    return a / b

# 调用函数
result = divide(10, 2)
# 输出:
# 进入函数: divide
# 离开函数: divide
```

### 带参数的装饰器

```python
# 带参数的装饰器
def repeat(n):
    def decorator(func):
        def wrapper(*args, **kwargs):
            results = []
            for i in range(n):
                results.append(func(*args, **kwargs))
            return results
        return wrapper
    return decorator

# 使用带参数的装饰器
@repeat(3)
def greet(name):
    return f"Hello, {name}!"

# 调用函数
greetings = greet("YG")
print(greetings)  # 输出: ['Hello, YG!', 'Hello, YG!', 'Hello, YG!']
```

### functools.wraps

使用functools.wraps保留原函数的元数据：

```python
import functools

def my_decorator(func):
    @functools.wraps(func)  # 保留原函数的元数据
    def wrapper(*args, **kwargs):
        """这是wrapper函数"""
        print(f"调用函数: {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def original_function():
    """这是原函数的文档字符串"""
    return "原函数返回值"

# 检查函数元数据
print(original_function.__name__)  # 输出: original_function
print(original_function.__doc__)   # 输出: 这是原函数的文档字符串
```

### 常见装饰器模式

```python
# 缓存结果（记忆化）
import functools

def memoize(func):
    cache = {}
    
    @functools.wraps(func)
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    
    return wrapper

@memoize
def fibonacci(n):
    """计算斐波那契数列的第n项"""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# 计时装饰器
def timer_decorator(func):
    import time
    
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"函数 {func.__name__} 执行耗时: {end_time - start_time:.4f} 秒")
        return result
    
    return wrapper

@timer_decorator
def slow_function():
    import time
    time.sleep(1)  # 模拟耗时操作
    return "完成"
```

## 🔄 生成器与迭代器

### 生成器

生成器是一种特殊的迭代器，使用yield语句产生值，可有效节省内存。

```python
# 简单的生成器函数
def count_up_to(max_value):
    count = 1
    while count <= max_value:
        yield count
        count += 1

# 使用生成器
counter = count_up_to(5)
for num in counter:
    print(num)  # 输出: 1, 2, 3, 4, 5

# 生成器表达式（类似列表推导式，但使用圆括号）
squares = (x*x for x in range(10))
for square in squares:
    print(square)

# 斐波那契数列生成器
def fibonacci_generator():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# 限制生成器的输出
fib = fibonacci_generator()
for i in range(10):
    print(next(fib))

# 生成器的send()方法
def echo_generator():
    response = yield "Ready for input"
    while True:
        response = yield f"You said: {response}"

# 使用send()方法与生成器交互
gen = echo_generator()
print(next(gen))  # 启动生成器，输出: Ready for input
print(gen.send("Hello"))  # 发送数据，输出: You said: Hello
print(gen.send("Python"))  # 发送数据，输出: You said: Python
```

### 迭代器

迭代器是实现了__iter__()和__next__()方法的对象。

```python
# 自定义迭代器类
class Countdown:
    def __init__(self, start):
        self.start = start
    
    def __iter__(self):
        # 返回迭代器对象自身
        self.current = self.start
        return self
    
    def __next__(self):
        # 当没有更多元素时抛出StopIteration异常
        if self.current < 0:
            raise StopIteration
        value = self.current
        self.current -= 1
        return value

# 使用自定义迭代器
for i in Countdown(5):
    print(i)  # 输出: 5, 4, 3, 2, 1, 0

# 使用iter()和next()函数
numbers = [1, 2, 3]
iterator = iter(numbers)  # 获取迭代器
print(next(iterator))  # 输出: 1
print(next(iterator))  # 输出: 2
print(next(iterator))  # 输出: 3
# print(next(iterator))  # 没有更多元素，抛出StopIteration异常
```

## 💼 上下文管理器

上下文管理器用于管理资源（如文件、网络连接等），确保资源在使用后被正确释放。

### with语句

```python
# 使用with语句打开文件（自动关闭）
with open("example.txt", "w") as f:
    f.write("Hello, World!")
# 文件在这里自动关闭

# 嵌套的with语句
with open("file1.txt", "r") as f1, open("file2.txt", "w") as f2:
    content = f1.read()
    f2.write(content)
```

### 自定义上下文管理器

通过实现__enter__()和__exit__()方法创建自定义上下文管理器：

```python
# 通过类实现上下文管理器
class Timer:
    def __enter__(self):
        import time
        self.start_time = time.time()
        return self  # 返回的值可以在with语句中使用
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        import time
        self.end_time = time.time()
        self.elapsed_time = self.end_time - self.start_time
        print(f"Elapsed time: {self.elapsed_time:.4f} seconds")
        # 如果返回True，将抑制异常
        return False

# 使用自定义上下文管理器
with Timer() as timer:
    import time
    time.sleep(1)  # 模拟耗时操作
print(f"Total time: {timer.elapsed_time:.4f} seconds")

# 处理异常的上下文管理器
class ErrorHandler:
    def __enter__(self):
        print("进入上下文")
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type is not None:
            print(f"捕获到异常: {exc_type.__name__}: {exc_val}")
            # 返回True表示异常已处理，不会向上传播
            return True
        print("正常退出上下文")
        return False

# 测试异常处理
with ErrorHandler():
    print("执行代码")
    # 故意引发异常
    1/0
print("程序继续执行")  # 由于异常被处理，这行代码会执行
```

### contextlib模块

使用contextlib模块创建上下文管理器：

```python
import contextlib

# 使用contextlib.contextmanager装饰器创建上下文管理器
@contextlib.contextmanager
def file_manager(filename, mode):
    print("打开文件")
    f = open(filename, mode)
    try:
        yield f  # yield语句返回资源给with语句
    finally:
        print("关闭文件")
        f.close()

# 使用自定义上下文管理器
with file_manager("example.txt", "r") as f:
    content = f.read()
    print(f"文件内容: {content}")

# 临时修改环境变量
@contextlib.contextmanager
def temporary_env_var(key, value):
    import os
    # 保存原始值
    original_value = os.environ.get(key)
    # 设置新值
    os.environ[key] = value
    try:
        yield
    finally:
        # 恢复原始值
        if original_value is None:
            del os.environ[key]
        else:
            os.environ[key] = original_value

# 使用临时环境变量
with temporary_env_var("MY_VAR", "my_value"):
    import os
    print(f"临时环境变量: {os.environ.get('MY_VAR')}")
```

## 🎛️ 元编程

元编程是编写能够操作代码的代码，Python提供了多种元编程机制。

### 反射与内省

Python允许程序在运行时检查和修改对象的属性和方法：

```python
# 检查对象的属性和方法
class MyClass:
    def __init__(self, value):
        self.value = value
    
    def my_method(self):
        return self.value * 2

obj = MyClass(42)

# 使用dir()列出对象的所有属性和方法
print(dir(obj))

# 使用hasattr()检查属性是否存在
print(hasattr(obj, "value"))  # 输出: True
print(hasattr(obj, "my_method"))  # 输出: True

# 使用getattr()获取属性值
print(getattr(obj, "value"))  # 输出: 42
method = getattr(obj, "my_method")
print(method())  # 输出: 84

# 使用setattr()设置属性值
setattr(obj, "new_value", 100)
print(obj.new_value)  # 输出: 100

# 使用delattr()删除属性
if hasattr(obj, "new_value"):
    delattr(obj, "new_value")
```

### 动态创建类

可以在运行时动态创建类：

```python
# 使用type()函数动态创建类
# type(name, bases, dict)
DynamicClass = type("DynamicClass", (), {
    "class_var": "这是类变量",
    "instance_method": lambda self, x: x * 2
})

# 创建实例并使用
instance = DynamicClass()
print(instance.class_var)  # 输出: 这是类变量
print(instance.instance_method(5))  # 输出: 10

# 动态创建带有继承的类
BaseClass = type("BaseClass", (), {
    "base_method": lambda self: "这是基类方法"
})

ChildClass = type("ChildClass", (BaseClass,), {
    "child_method": lambda self: "这是子类方法"
})

child = ChildClass()
print(child.base_method())  # 输出: 这是基类方法
print(child.child_method())  # 输出: 这是子类方法
```

### 元类

元类是创建类的类，用于控制类的创建过程：

```python
# 定义元类
class Meta(type):
    # __new__方法在创建类之前调用
    def __new__(mcs, name, bases, attrs):
        # 添加一个前缀到所有方法名
        new_attrs = {}
        for attr_name, attr_value in attrs.items():
            if not attr_name.startswith("__") and callable(attr_value):
                new_attr_name = f"prefix_{attr_name}"
                new_attrs[new_attr_name] = attr_value
            else:
                new_attrs[attr_name] = attr_value
        
        # 添加一个类属性
        new_attrs["added_by_meta"] = "这是元类添加的属性"
        
        # 创建并返回类
        return super().__new__(mcs, name, bases, new_attrs)

# 使用元类
class MyClass(metaclass=Meta):
    def my_method(self):
        return "Hello from my_method"

# 检查结果
obj = MyClass()
print(hasattr(obj, "my_method"))  # 输出: False
print(hasattr(obj, "prefix_my_method"))  # 输出: True
print(obj.prefix_my_method())  # 输出: Hello from my_method
print(obj.added_by_meta)  # 输出: 这是元类添加的属性
```

## 🔧 高级模块与库

Python提供了许多强大的高级模块，用于各种特定场景。

### collections模块

collections模块提供了额外的数据结构：

```python
from collections import Counter, defaultdict, deque, namedtuple, OrderedDict

# Counter：用于计数
words = ["apple", "banana", "apple", "orange", "banana", "apple"]
word_counts = Counter(words)
print(word_counts)  # 输出: Counter({'apple': 3, 'banana': 2, 'orange': 1})
print(word_counts.most_common(2))  # 输出: [('apple', 3), ('banana', 2)]

# defaultdict：带有默认值的字典
def_dict = defaultdict(int)  # 默认值为0
for word in words:
    def_dict[word] += 1
print(dict(def_dict))  # 输出: {'apple': 3, 'banana': 2, 'orange': 1}

# deque：双端队列
queue = deque([1, 2, 3])
queue.append(4)  # 在右侧添加
queue.appendleft(0)  # 在左侧添加
print(queue)  # 输出: deque([0, 1, 2, 3, 4])
queue.popleft()  # 移除左侧元素
print(queue)  # 输出: deque([1, 2, 3, 4])

# namedtuple：命名元组
Point = namedtuple("Point", ["x", "y"])
p = Point(10, 20)
print(p.x, p.y)  # 输出: 10 20
print(p)  # 输出: Point(x=10, y=20)

# OrderedDict：有序字典
# 注意：Python 3.7+ 中，普通字典也保持插入顺序
ordered_dict = OrderedDict()
ordered_dict["a"] = 1
ordered_dict["b"] = 2
ordered_dict["c"] = 3
for key, value in ordered_dict.items():
    print(key, value)  # 按插入顺序输出
```

### itertools模块

itertools模块提供了高效的迭代工具：

```python
import itertools

# count：无限计数器
counter = itertools.count(start=1, step=2)
for i in range(5):
    print(next(counter))  # 输出: 1, 3, 5, 7, 9

# cycle：循环迭代器
colors = itertools.cycle(["red", "green", "blue"])
for i in range(5):
    print(next(colors))  # 输出: red, green, blue, red, green

# repeat：重复迭代器
repeated = itertools.repeat("hello", 3)
for item in repeated:
    print(item)  # 输出: hello, hello, hello

# chain：连接多个迭代器
combined = itertools.chain([1, 2, 3], [4, 5, 6])
print(list(combined))  # 输出: [1, 2, 3, 4, 5, 6]

# islice：切片迭代器
numbers = range(10)
sliced = itertools.islice(numbers, 2, 8, 2)
print(list(sliced))  # 输出: [2, 4, 6]

# zip_longest：类似于zip但处理不等长序列
a = [1, 2, 3]
b = ["a", "b"]
z = itertools.zip_longest(a, b, fillvalue="None")
print(list(z))  # 输出: [(1, 'a'), (2, 'b'), (3, 'None')]

# 组合和排列
combinations = itertools.combinations([1, 2, 3, 4], 2)
print(list(combinations))  # 输出: [(1, 2), (1, 3), (1, 4), (2, 3), (2, 4), (3, 4)]

permutations = itertools.permutations([1, 2, 3], 2)
print(list(permutations))  # 输出: [(1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2)]
```

### functools模块

functools模块提供了函数式编程工具：

```python
import functools

# functools.reduce：累积计算
numbers = [1, 2, 3, 4, 5]
sum_result = functools.reduce(lambda x, y: x + y, numbers)
print(sum_result)  # 输出: 15

product_result = functools.reduce(lambda x, y: x * y, numbers)
print(product_result)  # 输出: 120

# functools.partial：部分应用函数
def power(base, exponent):
    return base ** exponent

# 创建一个新函数，固定exponent=2
square = functools.partial(power, exponent=2)
print(square(5))  # 输出: 25

# 创建一个新函数，固定base=2
power_of_two = functools.partial(power, 2)
print(power_of_two(3))  # 输出: 8

# functools.lru_cache：缓存函数结果
@functools.lru_cache(maxsize=None)
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# 调用速度会比不缓存快很多
print(fibonacci(40))  # 输出: 102334155

# functools.wraps：保留原函数的元数据（前面已经介绍过）
```

### re模块

re模块提供了正则表达式功能：

```python
import re

# 基本匹配
pattern = r"\d+"  # 匹配一个或多个数字
text = "There are 123 apples and 456 oranges."
match = re.search(pattern, text)
if match:
    print(f"找到匹配: {match.group()}")  # 输出: 找到匹配: 123

# 查找所有匹配
matches = re.findall(pattern, text)
print(f"所有匹配: {matches}")  # 输出: 所有匹配: ['123', '456']

# 替换
new_text = re.sub(pattern, "X", text)
print(f"替换后: {new_text}")  # 输出: 替换后: There are X apples and X oranges.

# 分割
parts = re.split(r"\s+", "Hello   world\tfrom\nPython")
print(f"分割结果: {parts}")  # 输出: 分割结果: ['Hello', 'world', 'from', 'Python']

# 编译正则表达式（对于重复使用的模式更高效）
compiled_pattern = re.compile(r"([a-zA-Z]+) (\d+)")
text = "I have 3 apples and 5 oranges."
match = compiled_pattern.search(text)
if match:
    print(f"水果: {match.group(1)}, 数量: {match.group(2)}")  # 输出: 水果: have, 数量: 3
```

### 并发编程模块

Python提供了多种并发编程的模块：

#### threading模块

```python
import threading
import time

# 定义线程函数
def print_numbers():
    for i in range(1, 6):
        print(f"数字: {i}")
        time.sleep(1)

def print_letters():
    for letter in ["A", "B", "C", "D", "E"]:
        print(f"字母: {letter}")
        time.sleep(1.5)

# 创建线程
thread1 = threading.Thread(target=print_numbers)
thread2 = threading.Thread(target=print_letters)

# 启动线程
thread1.start()
thread2.start()

# 等待线程结束
thread1.join()
thread2.join()

print("所有线程完成")

# 使用锁防止竞态条件
counter = 0
lock = threading.Lock()

def increment_counter():
    global counter
    for _ in range(100000):
        with lock:  # 自动获取和释放锁
            counter += 1

# 创建多个线程
threads = [threading.Thread(target=increment_counter) for _ in range(5)]

# 启动所有线程
for thread in threads:
    thread.start()

# 等待所有线程结束
for thread in threads:
    thread.join()

print(f"最终计数器值: {counter}")  # 应该是500000
```

#### multiprocessing模块

```python
import multiprocessing
import time

# 定义进程函数
def square_numbers(numbers, result, index):
    for i, n in enumerate(numbers):
        result[index + i] = n * n
        time.sleep(0.1)

# 创建共享内存数组
numbers = [1, 2, 3, 4, 5, 6, 7, 8]
shared_result = multiprocessing.Array('i', len(numbers))

# 创建进程
process1 = multiprocessing.Process(target=square_numbers, args=(numbers[:4], shared_result, 0))
process2 = multiprocessing.Process(target=square_numbers, args=(numbers[4:], shared_result, 4))

# 启动进程
process1.start()
process2.start()

# 等待进程结束
process1.join()
process2.join()

# 打印结果
print(f"平方结果: {list(shared_result)}")

# 使用进程池
def cube(n):
    return n * n * n

# 创建进程池
with multiprocessing.Pool(processes=4) as pool:
    # 使用map方法
    cubes = pool.map(cube, numbers)
    print(f"立方结果: {cubes}")
```

#### asyncio模块

```python
import asyncio

# 定义协程函数
async def say_after(delay, what):
    await asyncio.sleep(delay)
    print(what)

# 主协程
async def main():
    # 并发执行两个协程
    task1 = asyncio.create_task(say_after(1, "Hello"))
    task2 = asyncio.create_task(say_after(2, "World"))
    
    print("started tasks")
    
    # 等待两个任务完成
    await task1
    await task2
    
    print("all tasks completed")

# 运行主协程
asyncio.run(main())

# 使用asyncio.gather并发执行多个协程
async def factorial(n):
    result = 1
    for i in range(2, n+1):
        result *= i
        await asyncio.sleep(0.1)  # 模拟异步操作
    return result

async def main_gather():
    # 并发执行多个协程并收集结果
    results = await asyncio.gather(
        factorial(5),
        factorial(6),
        factorial(7)
    )
    print(f"阶乘结果: {results}")

asyncio.run(main_gather())
```

### 其他实用高级模块

- **json** - 用于JSON数据的编码和解码
- **pickle** - 用于Python对象的序列化和反序列化
- **sqlite3** - 内置的SQLite数据库接口
- **logging** - 灵活的日志记录工具
- **os** - 操作系统接口
- **sys** - Python解释器相关功能
- **datetime** - 日期和时间处理
- **math** - 数学函数
- **random** - 随机数生成
- **hashlib** - 安全哈希算法
- **socket** - 网络通信
- **urllib** - URL处理和网络请求

## 📊 设计模式

设计模式是解决特定问题的成熟解决方案，Python中常见的设计模式包括：

### 单例模式

```python
# 使用模块级别的变量实现单例
_singleton_instance = None

def get_singleton():
    global _singleton_instance
    if _singleton_instance is None:
        _singleton_instance = object()  # 替换为实际的类
    return _singleton_instance

# 使用元类实现单例
class Singleton(type):
    _instances = {}
    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class Database(metaclass=Singleton):
    def __init__(self):
        self.connection_id = id(self)
    
    def get_connection(self):
        return f"Connection ID: {self.connection_id}"

# 测试单例
db1 = Database()
db2 = Database()
print(db1 is db2)  # 输出: True
```

### 工厂模式

```python
# 简单工厂模式
class Animal:
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

class AnimalFactory:
    @staticmethod
    def create_animal(animal_type):
        if animal_type == "dog":
            return Dog()
        elif animal_type == "cat":
            return Cat()
        else:
            raise ValueError(f"不支持的动物类型: {animal_type}")

# 使用工厂创建对象
animal1 = AnimalFactory.create_animal("dog")
print(animal1.speak())  # 输出: Woof!

animal2 = AnimalFactory.create_animal("cat")
print(animal2.speak())  # 输出: Meow!
```

### 观察者模式

```python
# 观察者模式
class Subject:
    def __init__(self):
        self._observers = []
    
    def attach(self, observer):
        if observer not in self._observers:
            self._observers.append(observer)
    
    def detach(self, observer):
        if observer in self._observers:
            self._observers.remove(observer)
    
    def notify(self):
        for observer in self._observers:
            observer.update(self)

class Observer:
    def update(self, subject):
        pass

class ConcreteObserverA(Observer):
    def update(self, subject):
        print("观察者A收到通知")

class ConcreteObserverB(Observer):
    def update(self, subject):
        print("观察者B收到通知")

# 测试观察者模式
subject = Subject()
observer_a = ConcreteObserverA()
observer_b = ConcreteObserverB()

subject.attach(observer_a)
subject.attach(observer_b)
subject.notify()

subject.detach(observer_a)
subject.notify()
```

### 装饰器模式

```python
# 装饰器模式
class Component:
    def operation(self):
        pass

class ConcreteComponent(Component):
    def operation(self):
        return "基础组件"

class Decorator(Component):
    def __init__(self, component):
        self._component = component
    
    def operation(self):
        return self._component.operation()

class ConcreteDecoratorA(Decorator):
    def operation(self):
        return f"装饰器A({self._component.operation()})"

class ConcreteDecoratorB(Decorator):
    def operation(self):
        return f"装饰器B({self._component.operation()})"

# 测试装饰器模式
component = ConcreteComponent()
print(component.operation())  # 输出: 基础组件

decorated_a = ConcreteDecoratorA(component)
print(decorated_a.operation())  # 输出: 装饰器A(基础组件)

decorated_b = ConcreteDecoratorB(decorated_a)
print(decorated_b.operation())  # 输出: 装饰器B(装饰器A(基础组件))
```

## 💡 性能优化

Python性能优化的一些技巧和最佳实践：

### 代码优化

```python
# 使用生成器表达式代替列表推导式（对于大数据集）
# 列表推导式（会一次性创建整个列表）
squares_list = [x*x for x in range(1000000)]

# 生成器表达式（按需生成值）
squares_gen = (x*x for x in range(1000000))

# 使用局部变量
import time

def slow_function():
    start = time.time()
    for _ in range(1000000):
        result = time.time()  # 每次都访问模块级别的变量
    return time.time() - start

def fast_function():
    start = time.time()
    local_time = time.time  # 缓存到局部变量
    for _ in range(1000000):
        result = local_time()
    return time.time() - start

# 避免频繁的字符串拼接（使用join）
def slow_string_concat(n):
    result = ""
    for i in range(n):
        result += str(i)  # 每次都会创建新的字符串
    return result

def fast_string_concat(n):
    parts = []
    for i in range(n):
        parts.append(str(i))
    return "".join(parts)  # 更高效的字符串连接
```

### 使用更高效的数据结构

```python
# 使用集合进行成员检查
# 列表成员检查（O(n)时间复杂度）
my_list = list(range(10000))
if 9999 in my_list:  # 较慢
    pass

# 集合成员检查（O(1)时间复杂度）
my_set = set(range(10000))
if 9999 in my_set:  # 更快
    pass

# 使用字典映射代替多个条件判断
# 多个条件判断
def process_data(data_type, data):
    if data_type == "int":
        return int(data)
    elif data_type == "float":
        return float(data)
    elif data_type == "str":
        return str(data)
    else:
        return data

# 使用字典映射
process_map = {
    "int": int,
    "float": float,
    "str": str
}

def process_data_fast(data_type, data):
    return process_map.get(data_type, lambda x: x)(data)
```

### 并行计算

```python
# 使用multiprocessing进行并行计算
import multiprocessing
import time

# 计算密集型任务
def compute_intensive_task(n):
    result = 0
    for i in range(n):
        result += i ** 2
    return result

# 串行计算
start_time = time.time()
results_serial = [compute_intensive_task(10000000) for _ in range(4)]
serial_time = time.time() - start_time
print(f"串行计算时间: {serial_time:.2f}秒")

# 并行计算
start_time = time.time()
with multiprocessing.Pool(processes=4) as pool:
    results_parallel = pool.map(compute_intensive_task, [10000000]*4)
parallel_time = time.time() - start_time
print(f"并行计算时间: {parallel_time:.2f}秒")
print(f"加速比: {serial_time/parallel_time:.2f}x")
```

### 其他优化技巧

- 使用更高效的算法和数据结构
- 避免不必要的对象创建
- 使用内置函数和模块（通常用C实现，速度更快）
- 使用生成器和迭代器减少内存使用
- 对于性能关键部分，考虑使用C扩展或JIT编译器（如Numba）
- 使用适当的性能分析工具（如cProfile）找出性能瓶颈
- 考虑使用异步编程处理I/O密集型任务
- 避免在循环中进行昂贵的操作
- 使用缓存避免重复计算

## 📝 最佳实践与编码规范

编写高质量Python代码的一些最佳实践：

### PEP 8规范

PEP 8是Python的官方代码风格指南，主要内容包括：

- 使用4个空格进行缩进（不使用制表符）
- 每行不超过79个字符
- 顶层函数和类之间使用两个空行
- 类内方法之间使用一个空行
- 使用空格围绕运算符和逗号
- 函数和变量名使用小写字母和下划线（snake_case）
- 类名使用驼峰命名法（CamelCase）
- 常量使用全大写字母和下划线
- 避免不必要的括号
- 导入语句放在文件顶部，分组导入

### 代码组织

```python
# 模块结构示例
"""模块文档字符串"""

# 导入标准库
import sys
import os

# 导入第三方库
import numpy as np
import pandas as pd

# 导入本地模块
from .utils import helper_function

# 常量定义
MAX_RETRY = 3
DEFAULT_TIMEOUT = 60

# 类定义
class MyClass:
    """类文档字符串"""
    def __init__(self, param1, param2=None):
        """初始化方法"""
        self.param1 = param1
        self.param2 = param2
    
    def my_method(self):
        """方法文档字符串"""
        # 实现代码
        pass

# 函数定义
def my_function(arg1, arg2):
    """函数文档字符串"""
    # 实现代码
    pass

# 条件执行（仅当作为脚本运行时执行）
if __name__ == "__main__":
    # 测试代码或主程序入口
    pass
```

### 文档字符串

```python
# 函数文档字符串示例
def calculate_area(length, width):
    """计算矩形的面积
    
    参数:
        length (float): 矩形的长度
        width (float): 矩形的宽度
        
    返回:
        float: 矩形的面积
        
    示例:
        >>> calculate_area(10, 5)
        50.0
    """
    return length * width

# 类文档字符串示例
class Rectangle:
    """表示矩形的类
    
    属性:
        length (float): 矩形的长度
        width (float): 矩形的宽度
        
    方法:
        calculate_area(): 计算矩形的面积
        calculate_perimeter(): 计算矩形的周长
    """
    def __init__(self, length, width):
        """初始化矩形
        
        参数:
            length (float): 矩形的长度
            width (float): 矩形的宽度
        """
        self.length = length
        self.width = width
    
    def calculate_area(self):
        """计算矩形的面积
        
        返回:
            float: 矩形的面积
        """
        return self.length * self.width
```

### 错误处理

```python
# 良好的错误处理示例
def read_file(filename):
    """读取文件内容
    
    参数:
        filename (str): 文件名
        
    返回:
        str: 文件内容
        
    异常:
        FileNotFoundError: 当文件不存在时
        PermissionError: 当没有权限读取文件时
        IOError: 当发生其他I/O错误时
    """
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        raise FileNotFoundError(f"文件不存在: {filename}")
    except PermissionError:
        raise PermissionError(f"没有权限读取文件: {filename}")
    except IOError as e:
        raise IOError(f"读取文件时发生错误: {e}")

# 使用此函数
try:
    content = read_file("example.txt")
except Exception as e:
    print(f"错误: {e}")
```

### 单元测试

```python
# 单元测试示例（使用unittest模块）
import unittest

class TestMathFunctions(unittest.TestCase):
    def test_addition(self):
        self.assertEqual(1 + 1, 2)
        self.assertEqual(-1 + 1, 0)
        self.assertEqual(100 + 200, 300)
    
    def test_subtraction(self):
        self.assertEqual(5 - 3, 2)
        self.assertEqual(0 - 1, -1)
    
    def test_multiplication(self):
        self.assertEqual(2 * 3, 6)
        self.assertEqual(-2 * 3, -6)
        self.assertEqual(0 * 5, 0)
    
    def test_division(self):
        self.assertEqual(6 / 3, 2)
        self.assertAlmostEqual(1 / 3, 0.3333333333)
        
        # 测试除以零的情况
        with self.assertRaises(ZeroDivisionError):
            result = 1 / 0

# 运行测试
if __name__ == '__main__':
    unittest.main()

# 或使用pytest框架
# def test_addition():
#     assert 1 + 1 == 2
#     assert -1 + 1 == 0
#     assert 100 + 200 == 300
```

## 🚀 总结

Python的高级特性为开发者提供了强大的工具，可以编写更加优雅、高效、可维护的代码。掌握这些特性不仅可以提高编程效率，还可以解决更复杂的问题。建议在学习完基础知识后，逐步探索这些高级特性，并在实际项目中灵活应用。

继续学习的方向：

- 深入学习Python的标准库和常用第三方库
- 探索特定领域的Python应用（如Web开发、数据分析、人工智能等）
- 学习Python的底层实现原理
- 参与开源项目，积累实战经验
- 关注Python社区的最新发展趋势