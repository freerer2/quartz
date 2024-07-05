---
date: 2024-07-05
updated: 2024-07-05
order: 10
---
## Releasing System Resources

Many of the resources that are used in this API, such as streams or channels, implement or extend the [`java.io.Closeable`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/Closeable.html) interface. A requirement of a [`Closeable`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/Closeable.html) resource is that the [`close()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/Closeable.html#close()) method must be invoked to release the resource when no longer required. Neglecting to close a resource can have a negative implication on an application's performance. The _try-with-resources_ statement, described in the next section, handles this step for you.

### Closing a Resource

For the sake of simplicity, the previous examples omits two things: the handling of the exceptions and the closing of your reader.

All the I/O operations throw the same, default exception in the Java I/O API: the [`IOException`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/IOException.html). Depending on the type of resource you are accessing, some more exceptions can be thrown. For instance, if your `reader` reads characters from a file, you may have to handle the [`FileNotFoundException`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/FileNotFoundException.html).

Closing an I/O resource is a must in your application. Leaving resources unclose will cause your application to crash in the long run.

Starting with Java SE 7, the closing of I/O resources can be done using the _try-with-resources_ statement. Let us rewrite the previous code using this pattern.

```java
Path path = Paths.get("file.txt");
try (BufferedReader reader = Files.newBufferedReader(path)) {

    // do something with the reader

} catch (IOException e) {
    // do something with the exception
}
```

Copy

In this example, the `reader` object can be used in the _try_ block. When the program leaves this block, whether it is normally or exceptionally, the `close()` method of the `reader` object will be called for you.

### Closing Several Resources

You may see file readers and buffered readers created using their constructors. These were the patterns used before the introduction of the [`Files`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html) factory class in Java SE 7. In this case, you will see the creation of several intermediate I/O resources, that must be closed in the right order.

In the case of a buffered reader created using a file reader, the correct pattern is the following.

```java
File file = new File("file.txt");

try (FileReader fileReader = new FileReader(file);
     BufferedReader bufferedReader = new BufferedReader(fileReader);) {

    // do something with the bufferedReader or the fileReader

} catch (IOException e) {
    // do something with the exception
}
```

Copy

 

## Catching Exceptions

With file I/O, unexpected conditions are a fact of life: a file exists (or does not exist) when expected, the program does not have access to the file system, the default file system implementation does not support a particular function, and so on. Numerous errors can be encountered.

All methods that access the file system can throw an [`IOException`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/IOException.html). It is best practice to catch these exceptions by embedding these methods into a _try-with-resources statement_, introduced in the Java SE 7 release. The _try-with-resources_ statement has the advantage that the compiler automatically generates the code to close the resource(s) when no longer required. The following code shows how this might look:

```java
Charset charset = Charset.forName("US-ASCII");
String s = ...;
try (BufferedWriter writer = Files.newBufferedWriter(file, charset)) {
    writer.write(s, 0, s.length());
} catch (IOException x) {
    System.err.format("IOException: %s%n", x);
}
```

Copy

For more information, see the section [The try-with-resources Statement](https://dev.java/learn/exceptions/catching-handling/#try-with-resources).

Alternatively, you can embed the file I/O methods in a try block and then catch any exceptions in a `catch` block. If your code has opened any streams or channels, you should close them in a `finally` block. The previous example would look something like the following using the _try-catch-finally_ approach:

```java
Charset charset = Charset.forName("US-ASCII");
String s = ...;
BufferedWriter writer = null;
try {
    writer = Files.newBufferedWriter(file, charset);
    writer.write(s, 0, s.length());
} catch (IOException x) {
    System.err.format("IOException: %s%n", x);
} finally {
    try{
        if (writer != null)
            writer.close();
    } catch (IOException x) {
        System.err.format("IOException: %s%n", x);
    }
}
```

Copy

For more information, see the section [Catching and Handling Exceptions](https://dev.java/learn/exceptions/catching-handling/).

In addition to [`IOException`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/IOException.html), many specific exceptions extend [`FileSystemException`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/FileSystemException.html). This class has some useful methods that return the file involved ([`getFile()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/FileSystemException.html#getFile())), the detailed message string ([`getMessage()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/FileSystemException.html#getMessage())), the reason why the file system operation failed ([`getReason()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/FileSystemException.html#getReason())), and the "other" file involved, if any ([`getOtherFile()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/FileSystemException.html#getOtherFile())).

The following code snippet shows how the [`getFile()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/FileSystemException.html#getFile()) method might be used:

```java
try (...) {
    ...
} catch (NoSuchFileException x) {
    System.err.format("%s does not exist\n", x.getFile());
}
```

Copy

For purposes of clarity, the file I/O examples in this section may not show exception handling, but your code should always include it.

 

## Using Varargs

Several Files methods accept an arbitrary number of arguments when flags are specified. For example, in the following method signature, the ellipses notation after the [`CopyOption`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/CopyOption.html) argument indicates that the method accepts a variable number of arguments, or _varargs_, as they are typically called:

```java
Path Files.move(Path, Path, CopyOption...)
```

Copy

When a method accepts a varargs argument, you can pass it a comma-separated list of values or an array (`CopyOption[]`) of values.

In the following example, the method can be invoked as follows:

```java
Path source = ...;
Path target = ...;
Files.move(source,
           target,
           REPLACE_EXISTING,
           ATOMIC_MOVE);
```

Copy

For more information about varargs syntax, see the section [Arbitrary Number of Arguments](https://dev.java/learn/classes-objects/calling-methods-constructors/#arbitrary-number-of-arguments).

 

## Method Chaining

Many of the file I/O methods support the concept of method chaining.

You first invoke a method that returns an object. You then immediately invoke a method on that object, which returns yet another object, and so on. Many of the I/O examples use the following technique:

```java
String value = Charset.defaultCharset().decode(buf).toString();
UserPrincipal group =
    file.getFileSystem()
        .getUserPrincipalLookupService()
        .lookupPrincipalByName("me");
```

Copy

This technique produces compact code and enables you to avoid declaring temporary variables that you do not need.

---
Last update: January 25, 2023