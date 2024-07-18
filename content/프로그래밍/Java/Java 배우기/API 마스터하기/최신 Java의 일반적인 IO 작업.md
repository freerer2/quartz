---
date: 2024-4-24
updated: 2024-4-24
order: 40
---
## Introduction

This article focuses on tasks that application programmers are likely to encounter, particularly in web applications, such as:

- Reading and writing text files
- Reading text, images, JSON from the web
- Visiting files in a directory
- Reading a ZIP file
- Creating a temporary file or directory

The Java API supports many other tasks, which are explained in detail in the [Java I/O API tutorial](https://dev.java/learn/java-io/).

This article focuses on API improvements since Java 8. In particular:

- UTF-8 is the default for I/O since Java 18 ([JEP 400](https://openjdk.org/jeps/400))
- The [`java.nio.file.Files`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html) class, which first appeared in Java 7, added useful methods in Java 8, 11, and 12
- [`java.io.InputStream`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/InputStream.html) gained useful methods in Java 9, 11, and 12
- The [`java.io.File`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/File.html) and [`java.io.BufferedReader`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/BufferedReader.html) classes are now thoroughly obsolete, even though they appear frequently in web searches and AI chats.

 

## Reading Text Files

You can read a text file into a string like this:

```java
String content = Files.readString(path);
```

Here, `path` is an instance of [`java.nio.Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html), obtained like this:

```java
var path = Path.of("/usr/share/dict/words");
```

Before Java 18, you were strongly encouraged to specify the character encoding with any file operations that read or write strings. Nowadays, by far the most common character encoding is UTF-8, but for backwards compatibility, Java used the "platform encoding", which can be a legacy encoding on Windows. To ensure portability, text I/O operations needed parameters [`StandardCharsets.UTF_8`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/charset/StandardCharsets.html#UTF_8). This is no longer necessary.

If you want the file as a sequence of lines, call

```java
List<String> lines = Files.readAllLines(path);
```

If the file is large, process the lines lazily as a [`Stream<String>`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/stream/Stream.html):

```java
try (Stream<String> lines = Files.lines(path)) {
    . . .
}
```

Also use [`Files.lines`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#lines(java.nio.file.Path)) if you can naturally process lines with stream operations (such as [`map`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/stream/Stream.html#map(java.util.function.Function)), [`filter`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/stream/Stream.html#filter(java.util.function.Predicate))). Note that the stream returned by [`Files.lines`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#lines(java.nio.file.Path)) needs to be closed. To ensure that this happens, use a _try-with-resources_ statement, as in the preceding code snippet.

There is no longer a good reason to use the [`readLine`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/BufferedReader.html#readLine()) method of [`java.io.BufferedReader`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/BufferedReader.html).

To split your input into something else than lines, use a [`java.util.Scanner`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Scanner.html). For example, here is how you can read words, separated by non-letters:

```java
Stream<String> tokens = new Scanner(path).useDelimiter("\\PL+").tokens();
```

The [`Scanner`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Scanner.html) class also has methods for reading numbers, but it is generally simpler to read the input as one string per line, or a single string, and then parse it.

Be careful when parsing numbers from text files, since their format may be locale-dependent. For example, the input `100.000` is 100.0 in the US locale but 100000.0 in the German locale. Use [`java.text.NumberFormat`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/text/NumberFormat.html) for locale-specific parsing. Alternatively, you may be able to use [`Integer.parseInt`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/Integer.html#parseInt(java.lang.String))/[`Double.parseDouble`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/Double.html#parseDouble(java.lang.String)).

 

## Writing Text Files

You can write a string to a text file with a single call:

```java
String content = . . .;
Files.writeString(path, content);
```

If you have a list of lines rather than a single string, use:

```java
List<String> lines = . . .;
Files.write(path, lines);
```

For more general output, use a [`PrintWriter`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/PrintWriter.html) if you want to use the [`printf`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/PrintWriter.html#printf(java.lang.String,java.lang.Object...)) method:

```java
var writer = new PrintWriter(path.toFile());
writer.printf(locale, "Hello, %s, next year you'll be %d years old!%n", name, age + 1);
```

Note that [`printf`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/PrintWriter.html#printf(java.lang.String,java.lang.Object...)) is locale-specific. When writing numbers, be sure to write them in the appropriate format. Instead of using [`printf`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/PrintWriter.html#printf(java.lang.String,java.lang.Object...)), consider [`java.text.NumberFormat`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/text/NumberFormat.html) or [`Integer.toString`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/Integer.html#toString())/[`Double.toString`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/Double.html#Double.html#toString(double)).

Weirdly enough, as of Java 21, there is no [`PrintWriter`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/PrintWriter.html) constructor with a [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) parameter.

If you don't use [`printf`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/PrintWriter.html#printf(java.lang.String,java.lang.Object...)), you can use the [`BufferedWriter`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/BufferedWriter.html) class and write strings with the [`write`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/BufferedWriter.html#write(int)) method.

```java
var writer = Files.newBufferedWriter(path);
writer.write(line); // Does not write a line separator
writer.newLine(); 
```

Remember to close the `writer` when you are done.

 

## Reading From an Input Stream

Perhaps the most common reason to use a stream is to read something from a web site.

If you need to set request headers or read response headers, use the [`HttpClient`](https://docs.oracle.com/en/java/javase/22/docs/api/java.net.http/java/net/http/HttpClient.html):

```java
HttpClient client = HttpClient.newBuilder().build();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://horstmann.com/index.html"))
    .GET()
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
String result = response.body();
```

That is overkill if all you want is the data. Instead, use:

```java
InputStream in = new URI("https://horstmann.com/index.html").toURL().openStream();
```

Then read the data into a byte array and optionally turn them into a string:

```java
byte[] bytes = in.readAllBytes();
String result = new String(bytes);
```

Or transfer the data to an output stream:

```java
OutputStream out = Files.newOutputStream(path);
in.transferTo(out);
```

Note that no loop is required if you simply want to read all bytes of an input stream.

But do you really need an input stream? Many APIs give you the option to read from a file or URL.

Your favorite JSON library is likely to have methods for reading from a file or URL. For example, with [Jackson jr](https://github.com/FasterXML/jackson-jr):

```java
URL url = new URI("https://dog.ceo/api/breeds/image/random").toURL();
Map<String, Object> result = JSON.std.mapFrom(url);
```

Here is how to read the dog image from the preceding call:

```java
URL url = new URI(result.get("message").toString()).toURL();
BufferedImage img = javax.imageio.ImageIO.read(url);
```

This is better than passing an input stream to the [`read`](https://docs.oracle.com/en/java/javase/22/docs/api/java.desktop/javax/imageio/ImageIO.html#read(java.net.URL)) method, because the library can use additional information from the URL to determine the image type.

 

## The Files API

The [`java.nio.file.Files`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html) class provides a comprehensive set of file operations, such as creating, copying, moving, and deleting files and directories. The [File System Basics](https://dev.java/learn/java-io/file-system/) tutorial provides a thorough description. In this section, I highlight a few common tasks.

### Traversing Entries in Directories and Subdirectories

For most situations you can use one of two methods. The [`Files.list`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#list(java.nio.file.Path)) method visits all entries (files, subdirectories, symbolic links) of a directory.

```java
try (Stream<Path> entries = Files.list(pathToDirectory)) {
    . . .
}
```

Use a _try-with-resources_ statement to ensure that the stream object, which keeps track of the iteration, will be closed.

If you also want to visit the entries of descendant directories, instead use the method [`Files.walk`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#walk(java.nio.file.Path,java.nio.file.FileVisitOption...))

```java
Stream<Path> entries = Files.walk(pathToDirectory);
```

Then simply use stream methods to home in on the entries that you are interested in, and to collect the results:

```java
try (Stream<Path> entries = Files.walk(pathToDirectory)) {
    List<Path> htmlFiles = entries.filter(p -> p.toString().endsWith("html")).toList();
    . . .
}
```

Here are the other methods for traversing directory entries:

- An overloaded version of [`Files.walk`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#walk(java.nio.file.Path,int,java.nio.file.FileVisitOption...)) lets you limit the depth of the traversed tree.
- Two [`Files.walkFileTree`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#walkFileTree(java.nio.file.Path,java.nio.file.FileVisitor)) methods provide more control over the iteration process, by notifying a [`FileVisitor`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/FileVisitor.html) when a directory is visited for the first and last time. This can be occasionally useful, in particularly for emptying and deleting a tree of directories. See the tutorial [Walking the File Tree](https://dev.java/learn/java-io/file-system/walking-tree/) for details. Unless you need this control, use the simpler [`Files.walk`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#walk(java.nio.file.Path,java.nio.file.FileVisitOption...)) method.
- The [`Files.find`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#find(java.nio.file.Path,int,java.util.function.BiPredicate,java.nio.file.FileVisitOption...)) method is just like [`Files.walk`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#walk(java.nio.file.Path,java.nio.file.FileVisitOption...)), but you provide a filter that inspects each path and its [`BasicFileAttributes`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/attribute/BasicFileAttributes.html). This is slightly more efficient than reading the attributes separately for each file.
- Two [`Files.newDirectoryStream(Path)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#newDirectoryStream(java.nio.file.Path)) methods yields [`DirectoryStream`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/DirectoryStream.html) instances, which can be used in enhanced `for` loops. There is no advantage over using [`Files.list`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#list(java.nio.file.Path)).
- The legacy [`File.list`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/File.html#list()) or [`File.listFiles`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/File.html#listFiles()) methods return file names or [`File`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/File.html) objects. These are now obsolete.

### Working with ZIP Files

Ever since Java 1.1, the [`ZipInputStream`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/zip/ZipInputStream.html) and [`ZipOutputStream`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/zip/ZipOutputStream.html) classes provide an API for processing ZIP files. But the API is a bit clunky. Java 8 introduced a much nicer _ZIP file system_:

```java
try (FileSystem fs = FileSystems.newFileSystem(pathToZipFile)) {
    . . .
}
```

The _try-with-resources_ statement ensures that the [`close`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/AutoCloseable.html#close()) method is called after the ZIP file operations. That method updates the ZIP file to reflect any changes in the file system.

You can then use the methods of the [`Files`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html) class. Here we get a list of all files in the ZIP file:

```java
try (Stream<Path> entries = Files.walk(fs.getPath("/"))) {
    List<Path> filesInZip = entries.filter(Files::isRegularFile).toList();
}
```

To read the file contents, just use [`Files.readString`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#readString(java.nio.file.Path)) or [`Files.readAllBytes`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#readAllBytes(java.nio.file.Path)):

```java
String contents = Files.readString(fs.getPath("/LICENSE"));
```

You can remove files with [`Files.delete`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#delete(java.nio.file.Path)). To add or replace files, simply use [`Files.writeString`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#writeString(java.nio.file.Path,java.lang.CharSequence,java.nio.file.OpenOption...)) or [`Files.write`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#write(java.nio.file.Path,byte%5B%5D,java.nio.file.OpenOption...)).

### Creating Temporary Files and Directories

Fairly often, I need to collect user input, produce files, and run an external process. Then I use temporary files, which are gone after the next reboot, or a temporary directory that I erase after the process has completed.

I use the two methods [`Files.createTempFile`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#createTempFile(java.lang.String,java.lang.String,java.nio.file.attribute.FileAttribute...)) and [`Files.createTempDirectory`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#createTempDirectory(java.nio.file.Path,java.lang.String,java.nio.file.attribute.FileAttribute...)) for that.

```java
Path filePath = Files.createTempFile("myapp", ".txt");
Path dirPath = Files.createTempDirectory("myapp");
```

This creates a temporary file or directory in a suitable location (`/tmp` in Linux) with the given prefix and, for a file, suffix.

 

## Conclusion

Web searches and AI chats can suggest needlessly complex code for common I/O operations. There are often better alternatives:

1. You don't need a loop to read or write strings or byte arrays.
2. You may not even need a stream, reader or writer.
3. Become familiar with the [`Files`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html) methods for creating, copying, moving, and deleting files and directories.
4. Use [`Files.list`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#list(java.nio.file.Path)) or [`Files.walk`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#walk(java.nio.file.Path,java.nio.file.FileVisitOption...)) to traverse directory entries.
5. Use a ZIP file system for processing ZIP files.
6. Stay away from the legacy [`File`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/File.html) class.
