---
order: 70
---
## Reflection

The face looking back from the mirror this morning told a story. I urgently needed a shave (and still do). And yesterday, whilst sitting outside in our garden, I should have worn sunscreen, or at least a hat. I had tried my hand at making my own bacon, not being able to find such delicacies on Crete, and the five hours of smoking in the Weber were put to good use writing a [Java Specialists Newsletter](https://www.javaspecialists.eu/) about parallel streams and virtual threads (Issue 311). The reflection in the mirror blinked. Enough time staring, it was time to start writing about what I had just witnessed - reflection.

Java reflection allows an object to look in the mirror and discover what fields, methods, and constructors it has. We can read and write fields, invoke methods, and even create new objects by calling the constructors. Just like the stubble on my face and the slight sunburn, we can see ourselves through others' eyes.

Why should you care to read this tutorial? If you already know reflection, you might want to peek through for entertainment value. But if you have never heard of reflection, well, it's time to take a good look in the mirror and discover a new magic that will allow you to sometimes save thousands of fingerbreaking lines of code with a few well-positioned chunks of reflection poetry. Oh and did I mention that some employers post nasty interview questions that have an easy solution via reflection? I hope you will enjoy it and that you will try out the code snippets in the tutorial. Thank you for joining me on this journey.

 

## The Class `Class`

No, this is not a typo. There is a class called [`Class`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/Class.html). And it is a subclass of [`Object`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/Object.html). And [`Object`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/Object.html) has a [`Class`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/Class.html). A nice circular dependency.

How can we get hold of our object's Class? Each object has a [`getClass()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/Object.html#getClass()) method that it inherits from [`java.lang.Object`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/Object.html). When we call that, we get back the actual implementation [`Class`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/Class.html).

For example, consider the following code. Note that for our code snippets we are using the new unnamed classes, which are a preview feature of Java 21. See [JEP 445](https://openjdk.org/jeps/445). We can run them directly with `java --enable-preview --source 21 GetClassDemo.java`

```java
// GetClassDemo.java
import java.util.List;
import java.util.ArrayList;

// Using new Unnamed Classes which is a preview feature of Java 21.
// See JEP 445 
void main() {
    List<String> list1 = new ArrayList<>();
    System.out.println(list1.getClass());
    var list2 = new ArrayList<String>();
    System.out.println(list2.getClass());
}
```

Copy

In other words, it does not matter how the variable is declared, we always get the actual implementation object's class. How can we get the [`List`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html) class? That is fairly easy, using class literals. We simply write the name of the class, followed by `.class`, like so:

```java
// ClassLiteral.java
void main() {
    System.out.println(Number.class); // class java.lang.Number
    System.out.println(java.util.List.class); // interface java.util.List
}
```

Copy

We can also load classes by name as [`String`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/String.html), without even knowing whether the class will be available at runtime. For example, here we are loading whatever class we are entering on the `Console`:

```java
// ClassForName.java
void main() throws ClassNotFoundException {
    var console = System.console();
    String className = console.readLine("Enter class name: ");
    System.out.println(Class.forName(className));
}
```

Copy

For example:

```output
heinz$ java --enable-preview --source 21 ClassForName.java 
Note: ClassForName.java uses preview features of Java SE 21.
Note: Recompile with -Xlint:preview for details.
Enter class name: java.util.Iterator
interface java.util.Iterator
```

Copy

Each class is loaded into a [`ClassLoader`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/ClassLoader.html). The JDK classes all reside in the bootstrap class loader, whereas our classes are in the system class loader, also called application class loader. We can see the class loaders here:

```java
// ClassLoaderDemo.java
void main() {
    System.out.println(String.class.getClassLoader());
    System.out.println(this.getClass().getClassLoader());
}
```

Copy

Interesting is that depending on how we invoke this code, we get different results. For example, if we call it using the `java ClassLoaderDemo.java`, then the type of class loader is a `MemoryClassLoader`, whereas if we first compile it and then call it with `java ClassLoaderDemo`, it is an `AppClassLoader`. The class loader for JDK classes comes back as `null`.

```output
heinz$ java --enable-preview --source 21 ClassLoaderDemo.java 
null
com.sun.tools.javac.launcher.Main$MemoryClassLoader@6483f5ae
```

Copy

And

```output
heinz$ javac --enable-preview --source 21 ClassLoaderDemo.java
heinz$ java --enable-preview ClassLoaderDemo
null
jdk.internal.loader.ClassLoaders$AppClassLoader@3d71d552
```

Copy

The purpose of class loaders is to partition classes for security reasons. Classes in the JDK cannot see our classes at all, and similarly, classes in the `AppClassLoader` have no relation to classes in the `MemoryClassLoader`. This can cause some surprises when we compile our classes and then also launch them with the single-file command `java SomeClass.java`

 

## Shallow Reflective Access

Once we have the class, we can find out a lot of information about it, such as who the superclasses are, what public members it has, what interfaces it has implemented. If it is a `sealed` type, we can even find the subtypes.

Let's try find the methods defined on [`java.util.Iterator`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Iterator.html):

```java
// MethodsOnIterator.java
import java.util.Iterator;
import java.util.stream.Stream;

void main() {
    Stream.of(Iterator.class.getMethods())
            .forEach(System.out::println);
}
```

Copy

We see four methods, two of which are `default` interface methods:

```java
heinz$ java --enable-preview --source 21 MethodsOnIterator.java
public default void java.util.Iterator.remove()
public default void java.util.Iterator.forEachRemaining(java.util.function.Consumer)
public abstract boolean java.util.Iterator.hasNext()
public abstract java.lang.Object java.util.Iterator.next()
```

Copy

If we make an object of type [`java.util.Iterator`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Iterator.html), we would even be able to call these methods. In the next example, we look for the method called [`"forEachRemaining"`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Iterator.html#forEachRemaining(java.util.function.Consumer)) and which takes a [`Consumer`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/function/Consumer.html) as a parameter. We then create an [`Iterator`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Iterator.html) from a [`List.of()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html#of(E...)) and invoke the [`forEachRemaining`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Iterator.html#forEachRemaining(java.util.function.Consumer)) method using reflection. Note that several things could go wrong, most notably that the method does not exist ([`NoSuchMethodException`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/NoSuchMethodException.html)) and that we are not allowed to call the method ([`IllegalAccessException`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/IllegalAccessException.html)). Since Java 7, we have a blanket exception that covers everything that can go wrong with reflection, the [`ReflectiveOperationException`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/ReflectiveOperationException.html).

```java
// MethodsOnIteratorCalling.java
import java.util.List;
import java.util.Iterator;
import java.util.function.Consumer;

void main() throws ReflectiveOperationException {
    var iterator = List.of("Hello", "Dev", "Java").iterator();
    var forEachRemainingMethod = Iterator.class.getMethod(
        "forEachRemaining", Consumer.class);
    Consumer<?> println = System.out::println;
    forEachRemainingMethod.invoke(iterator, println);
}
```

Copy

Our next example is even more interesting, if I may say so myself. We are going to take a [`List`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html) of items and then search through the [`Collections`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Collections.html) class to see whether we can find any methods that we can give the method to. We invoke the method and see what happens to our list. Since the methods are declared `static` in [`Collections`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Collections.html), the first parameter of our [`invoke()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/reflect/Method.html#invoke(java.lang.Object,java.lang.Object...)) method will be `null`. We could use a stream, but they don't "play nice" with checked exceptions, thus the plain old for-in loop it will have to be:

```java
// CollectionsListMethods.java
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

void main() throws ReflectiveOperationException {
    var pi = "3141592653589793".chars()
            .map(i -> i - '0')
            .boxed().collect(Collectors.toList());
    System.out.println(pi);
    for (var method : Collections.class.getMethods()) {
        if (method.getReturnType() == void.class
                && method.getParameterCount() == 1
                && method.getParameterTypes()[0] == List.class) {
            System.out.println("Calling " + method.getName() + "()");
            method.invoke(null, pi);
            System.out.println(pi);
        }
    }
}
```

Copy

This works nicely and we find three methods that match our requirements: [`sort()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Collections.html#sort(java.util.List)), [`shuffle()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Collections.html#shuffle(java.util.List)) and [`reverse()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Collections.html#reverse(java.util.List)). The order of these methods is not guaranteed. For example, in the `Collections.java` file in OpenJDK 21, they are ordered as [`sort()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Collections.html#sort(java.util.List)), [`reverse()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Collections.html#reverse(java.util.List)), [`shuffle()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Collections.html#shuffle(java.util.List)). However, when I run the code, they appear as:

```output
heinz$ java --enable-preview --source 21 CollectionsListMethods.java 
[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3]
Calling reverse()
[3, 9, 7, 9, 8, 5, 3, 5, 6, 2, 9, 5, 1, 4, 1, 3]
Calling sort()
[1, 1, 2, 3, 3, 3, 4, 5, 5, 5, 6, 7, 8, 9, 9, 9]
Calling shuffle()
[5, 7, 4, 9, 9, 9, 2, 1, 6, 5, 3, 3, 1, 5, 3, 8]
```

Copy

 

## Deep Reflective Access

Up to now, we did not do anything that was particularly dangerous. All the methods we discovered and called were `public`. The only part that was a bit dangerous was that we did not have a compiler check that these methods exist and are accessible. However, we can also stare more deeply into the mirror.

For example, let's consider our `Person` class:

```java
public class Person {
    private final String name;
    private final int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String toString() {
        return name + " (" + age + ")";
    }
}
```

Copy

Since we are now working with two separate classes, we will need to compile them. We can use an unnamed class as before for the demo, but we should still compile them both. It would be a mistake to use a single-file call, because in that case `Person` and the demo would exist in different class loaders. This can cause hard to understand runtime errors. I once spent a day chasing this exact error. Don't be me.

Here is our `FountainOfYouth.java` file:

```java
// FountainOfYouth.java
import java.lang.reflect.*;

void main() throws ReflectiveOperationException {
    var person = new Person("Heinz Kabutz", 51);
    System.out.println(person);
    Field ageField = Person.class.getDeclaredField("age");
    ageField.setAccessible(true); // deep reflection engaged!
    int age = (int) ageField.get(person);
    age *= .9;
    ageField.set(person, age);
    System.out.println(person);
}
```

Copy

We first compile the `FountainOfYouth` class, which transitively compiles `Person.java`. We then run it, and _voila_, I've shaved 10% off my age.

```output
heinz$ javac --enable-preview --source 21 FountainOfYouth.java 
heinz$ java --enable-preview FountainOfYouth
Heinz Kabutz (51)
Heinz Kabutz (45)
```

Copy

Note that the `age` field is `private` _and_ `final`, and yet we were able to change it. If we convert `Person` to a record, then it will no longer allow us to change the properties via deep reflection.

### The Java Module System

Deep reflection only works if the module in which the class resides is _open_ to us. Ideally we should ask the author of the module to open the package to our module. They will likely refuse, and with good reason. By opening up their package, they allow unfettered access to their most intimate implementation detail. What if, in the near or distant future, they want to change field names or types? The deep reflective code would likely stop working, and they would be forever having to fix other modules.

We can open up a package in another module for deep reflection with a command line parameter `--add-opens`, but we should only use that as an absolute last resort. It is so undesirable, that I merely mention it here in disgust, but won't show more details of how to use it.

 

## Conclusion

We hope that you got a bit of insight into how reflection works in this tutorial. There are many other topics to explore: arrays, dynamic proxies, generics, sealed classes, etc. How we can read the properties of a record, how parameter names can be preserved. But this is long enough and will hopefully get you started in the right direction.

For many more deep dives into the Java Programming Language, be sure to subscribe to [The Java Specialists' Newsletter](https://www.javaspecialists.eu/), a newsletter for anyone who wants to become more proficient in Java.

---
Last update: September 14, 2021