# Python进阶

本章节介绍Python的高级特性。

## 面向对象编程

```python
# 定义类
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hello, my name is {self.name}."

# 创建对象
person = Person("YG", 25)
print(person.greet())
```

## 装饰器

```python
def log_decorator(func):
    def wrapper(*args, **kwargs):
        print(f"调用函数: {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@log_decorator
def add(a, b):
    return a + b

# 使用装饰后的函数
result = add(5, 3)
```

## 生成器

```python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

# 使用生成器
for num in fibonacci(5):
    print(num)
```

## 💡 上下文管理器

上下文管理器用于管理资源，确保资源在使用后被正确释放。

```python
# 使用with语句
with open("example.txt", "r") as f:
    content = f.read()
    print(content)

# 自定义上下文管理器
class Timer:
    def __enter__(self):
        import time
        self.start_time = time.time()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        import time
        print(f"Elapsed time: {time.time() - self.start_time:.4f} seconds")

# 使用自定义上下文管理器
with Timer():
    # 执行一些操作
    import time
    time.sleep(1)
```

## 📚 常用高级模块

- `collections` - 提供额外的数据结构
- `itertools` - 提供高效的迭代工具
- `functools` - 提供函数式编程工具
- `re` - 正则表达式模块
- `threading` - 多线程编程
- `multiprocessing` - 多进程编程