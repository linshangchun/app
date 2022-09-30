## ES6-Class

> 参考学习总结：阮一峰 ES6 入门

### 类函数

```javascript
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ',' + this.y + ')';
};

let p = new Point(1, 2);
console.log(p.x); // 1
console.log(p.y); // 2
console.log(p.toString()); // (1,2)
```

### 定义 class 类

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  // 覆盖toStrng()
  toString() {
    return '(' + this.x + ',' + this.y + ')';
  }
  //计算面积
  getMianji(type) {
    if (type === 1) {
      return this.x * this.y;
    }
    if (type === 2) {
      return this.x * this.x + this.y * this.y;
    }
    return this.x + this.y;
  }
}
let p0 = new Point(1, 2);
console.log(p0.x); // 1
console.log(p0.y); // 2
console.log(p0.toString()); // (1,2)
console.log(p0.getMianji()); // 3
console.log(p0.getMianji(1)); // 2
console.log(p0.getMianji(2)); // 5
console.log(typeof p0); // object
console.log(typeof Point); // function class类的数据类型就是函数，
console.log(Point === Point.prototype.constructor); // true 类本身就指向构造函数
console.log(p0.constructor === Point.prototype.constructor); // true p0是Point的实列， 他的constructor方法就是B类原型的constructor方法
```

注意：

1. 类的方法都定义在 prototype 对象上面，所以类的新方法可以添加在 prototype 对象上面。Object.assign 方法可以很方便地一次向类添加多个方法。

   ```javascript
   Object.assign(Point.prototype, {
     toString() {},
     toValue() {},
   });
   ```

2. 类的内部所有定义的方法，都是不可枚举的（non-enumerable）,但原型链上 prototype 上附加的方法可枚举

   ```javascript
   // 使用Object.Keys()可枚举对象中的key
   console.log(Object.keys(Point.prototype)); // []
   console.log(Object.getOwnPropertyNames(Point.prototype)); // [ 'constructor', 'toString', 'getMianji' ]
   ```

3. 类必须使用 new 调用创建实例

### 认识 Class 类

#### constructor 方法

constructor 方法是类的默认方法，通过 new 命令生成对象实例时，自动调用该方法。

一个类必须有 constructor 方法，如果没有显式定义，一个空的 constructor 方法会被默认添加。

constructor 方法默认返回实例对象（即 this），完全可以指定返回另外一个对象。

```javascript
class Foo {
  constructor() {
    return Object.create(null);
  }
}
console.log(new Foo() instanceof Foo); // false
// constructor函数返回一个全新的对象，结果导致实例对象不是Foo类的实例。
```

#### 类的实例

与 ES5 一样，实例的属性除非显式定义在其本身（即定义在 this 对象上），否则都是定义在原型上（即定义在 class 上）。

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
var point = new Point(2, 3);
point.toString(); // (2, 3)
point.hasOwnProperty('x'); // true
point.hasOwnProperty('y'); // true
point.hasOwnProperty('toString'); // false
point.__proto__.hasOwnProperty('toString'); // true
```

与 ES5 一样，类的所有实例共享一个原型对象

```javascript
var p1 = new Point(2, 3);
var p2 = new Point(3, 2);
console.log(p1.__proto__ === p2.__proto__); // true
```

#### 取值函数（getter）和存值函数（setter）

与 ES5 一样，在“类”的内部可以使用 get 和 set 关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

```javascript
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: ' + value);
  }
}
let inst = new MyClass();
inst.prop = 123; // setter: 123
console.log(inst.prop); // 'getter'
```

#### 类属性的表达式

类的属性名，可以采用表达式

```java
const methodName = 'getArea';
class Square {
  constructor(length) {
    // ...
  }
  [methodName]() {
    // ...
  }
}
```

#### Class 类的表达式

```javascript
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
```

如果类的内部没用到的话，可以省略 Me，也就是可以写成下面的形式：

```java
const MyClass = class { /* ... */ };
```

采用 Class 类的表达式，可以写出立即执行的 Class

```javascript
let person = new (class {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
})('张三');
console.log(person.name); // 张三
person.sayName(); // 张三
// person是一个立即执行的类的实例
```

#### 静态方法

概念：类相当于实例的原型，所有在类中定义的方法，都会被实例继承。 如果在类的一个方法前，加上 static 关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为“静态方法”

```javascript
class Foo {
  static classMethod() {
    return 'Hello Foo';
  }
}
console.log(Foo.classMethod()); // Hello Foo
let foo = new Foo();
console.log(foo.classMethod()); // TypeError: foo.classMethod is not a function
```

静态方法中的 this 指向的是类。而不是实例, 且静态方法可以与非静态方法重名

```javascript
class Foo {
  static bar() {
    // 1
    this.baz();
  }
  static baz() {
    // 2
    console.log('hello baz-class');
  }
  baz() {
    // 未执行
    console.log('hello baz-new class');
  }
}
Foo.bar(); // hello baz-class
```

父类的静态方法，可以被子类继承

```javascript
class Foo {
  static classMethod() {
    return 'hello Foo';
  }
}
class Bar extends Foo {}
console.log(Bar.classMethod()); //hello Foo
```

父类的静态方法可以从子类中的 super 对象上调用

```javascript
class Foo {
  static classMethod() {
    return 'hello Foo';
  }
}
class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + '-with Bar';
  }
}
console.log(Bar.classMethod()); // hello Foo-with Bar
// 子类的静态方法重写覆盖了父类的静态方法
```

#### 静态属性

静态属性指的是 Class 本身的属性，即 Class.propName，而不是定义在实例对象（this）上的属性

```javascript
class Foo {}
Foo.prop = 1;
console.log(Foo.prop); // 1
```

#### 实例属性的新写法

属性可以定义在类的最顶层，这时，不需要在实例属性前面加上 this

```javascript
class Foo {
  // count = 0; // 放置外层会报错 SyntaxError: Unexpected token =
  constructor() {
    this.count = 0; // 替代演示
  }
  get value() {
    console.log('getting the current value...');
    return this.count;
  }
  increment(num) {
    if (num !== 0 && typeof num === 'number') {
      this.count += num;
    } else {
      this.count++;
    }
  }
}
let foo = new Foo();
console.log(foo.count); // 0
foo.increment('212');
console.log(foo.count); // 1
foo.increment(-2);
console.log(foo.count); // -1
```

### Class-Extends

```javascript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    console.log(`调用了${new.target.name}类或继承类的构造函数`);
  }
  // 父类的静态方法，也会被子类继承
  static methodStatic() {
    console.log('Point类的静态方法methodStatic');
  }
  toString() {
    return `x：${this.x}，y：${this.y}`;
  }
}

class PointColor extends Point {
  constructor(x, y, color) {
    // this.color = color; // ReferenceError ！！！在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }
  get Px() {
    return super.x;
  }
  toString() {
    return `${super.toString()}，color：${this.color}`; // 重写覆盖并调用父类的tostring()方法
  }
}

PointColor.methodStatic(); // 子类调用来自继承父类的静态方法
const pointColor = new PointColor(2,4,'#888');
console.log(pointColor.toString());
console.log(pointColor instanceof PointColor); // true
console.log(pointColor instanceof Point); // true

控制台输出：———————————————————————
Point类的静态方法methodStatic
调用了PointColor类或继承类的构造函数
x：2，y：4，color：#888
true
true
—————————————————————————————————
```

子类必须在 constructor 方法中调用 super 方法，否则新建实例时会报错，这是因为子类自己的 this 对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用 super 方法，子类就得不到 this 对象。

ES5 的继承，实质是先创造子类的实例对象 this，然后再将父类的方法添加到 this 上面（Parent.apply(this)），ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到 this 上面（所以必须先调用 super 方法），然后再用子类的构造函数修改 this。

Object.getPrototypeOf 方法可以用来从子类上获取父类。可以使用这个方法判断，一个类是否继承了另一个类。

```javascript
console.log(Object.getPrototypeOf(Point)); // [Function]
console.log(Object.getPrototypeOf(PointColor)); // [Function: Point]
console.log(Object.getPrototypeOf(pointColor)); // PointColor {}
```

### Class-Super

super()只能用在子类的构造函数之中，用在其他地方就会报错。

调用 super 继承父类构造函数时，super 内部的 this 指向是当前本身调用类的实例，而并不会返回其代表的父类,因此调用 super()时相当于：父类.prototype.constructor.call(this)。

super 作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

super 指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过 super 调用的。

```javascript
console.log(pointColor.Px); // undefined
```

如果属性定义在父类的原型对象上，super 就可以取到

```javascript
Point.prototype.Py = 666;
console.log(super.Py); // 666
```

ES6 规定，在子类普通方法中通过 super 调用父类的方法时，方法内部的 this 指向当前的子类实例。

```javascript
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}
class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print();
  }
}
let b = new B();
b.m(); // 2
```

this 指向子类实例，所以如果通过 super 对某个属性赋值，这时 super 就是 this，赋值的属性会变成子类实例的属性。

```javascript
class A {
  constructor() {
    this.x = 1;
  }
}
class B extends A {
  constructor() {
    super();
    this.x = 2;
    super.x = 3;
    console.log(super.x); // undefined
    console.log(this.x); // 3
  }
}
let b = new B();
```

如果 super 作为对象，用在静态方法之中，这时 super 将指向父类，而不是父类的原型对象。

```javascript
class Parent {
  constructor() {
    this.p = 1;
  }
  static methodS(msg) {
    console.log('static', msg);
  }
  static print() {
    console.log(this.p);
  }
  methodS(msg) {
    console.log('instance', msg);
  }
}

class Child extends Parent {
  constructor() {
    super();
    this.p = 2;
  }
  static methodS(msg) {
    super.methodS(msg); // 子类静态方法之中，这时super将指向父类
  }
  static pp() {
    super.print(); // 子类的静态方法中通过super调用父类的方法时，方法内部的this指向当前的子类而不是子类的实例
  }
  methodS(msg) {
    super.methodS(msg); // 子类普通方法之中，这时super将指向父类的原型对象
  }
}
Child.methodS('Child'); // static，Child
let child = new Child();
child.methodS('child'); // instance，child
```

在子类的静态方法中通过 super 调用父类的方法时，方法内部的 this 指向当前的子类，而不是子类的实例。

```javascript
Child.p = 3;
console.log(Child.pp());

控制台输出：———————————————————————
3
undefined
—————————————————————————————————
```

### 总结

1. 类不存在变量提升（hoist），这一点与 ES5 完全不同，提前使用未声明的类会报错。

   ```javascript
   new Foo(); // ReferenceError
   class Foo {}
   ```

2. 必须保证子类在父类之后定义

3. ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被 Class 继承，包括 name 属性

   ```javascript
   class Point {}
   Point.name; // "Point"
   ```

4. 如果某个方法之前加上星号（\*），就表示该方法是一个 Generator 函数

   ```javascript
   class Foo {
     constructor(...args) {
       this.args = args;
     }
     *[Symbol.iterator]() {
       for (let arg of this.args) {
         yield arg;
       }
     }
   }

   for (let x of new Foo('hello', 'world')) {
     console.log(x);
   }
   // hello
   // world

   // 上面代码中，Foo类的Symbol.iterator方法前有一个星号，表示该方法是一个 Generator 函数。
   // Symbol.iterator方法返回一个Foo类的默认遍历器，for...of循环会自动调用这个遍历器。
   ```

5. this 的指向

   类的方法内部如果含有 this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错

   ```javascript
   class Logger {
     printName(name = 'there') {
       this.print(`Hello ${name}`);
     }
     print(text) {
       console.log(text);
     }
   }
   const logger = new Logger();
   const { printName } = logger;
   printName(); // TypeError: Cannot read property 'print' of undefined
   ```

   解决方法：

   - 在构造方法中绑定 this

     ```javascript
     class Logger {
       constructor() {
         this.printName = this.printName.bind(this);
       }
       // ...
     }
     ```

   - 使用箭头函数

     ```javascript
     class Obj {
       constructor() {
         this.getThis = () => this;
       }
     }
     const myObj = new Obj();
     myObj.getThis() === myObj; // true
     ```

   - 使用 Proxy，获取方法的时候，自动绑定 this

     ```javascript
     function selfish(target) {
       const cache = new WeakMap();
       const handler = {
         get(target, key) {
           const value = Reflect.get(target, key);
           if (typeof value !== 'function') {
             return value;
           }
           if (!cache.has(value)) {
             cache.set(value, value.bind(target));
           }
           return cache.get(value);
         },
       };
       const proxy = new Proxy(target, handler);
       return proxy;
     }
     const logger = selfish(new Logger());
     ```
