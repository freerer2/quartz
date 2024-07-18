---
date: 2023-1-25
updated: 2023-1-25
order: 20
---
## Creating a Path

### Using the Paths Factory Class

A [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) instance contains the information used to specify the location of a file or directory. At the time it is defined, a [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) is provided with a series of one or more names. A root element or a file name might be included, but neither are required. A [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) might consist of just a single directory or file name.

You can easily create a [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) object by using one of the following get methods from the [`Paths`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Paths.html) (note the plural) helper class:

```java
Path p1 = Paths.get("/tmp/foo");
Path p2 = Paths.get(args[0]);
Path p3 = Paths.get(URI.create("file:///Users/joe/FileTest.java"));
```

The [`Paths.get(String)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Paths.html#get(java.lang.String,java.lang.String...)) method is shorthand for the following code:

```java
Path p4 = FileSystems.getDefault().getPath("/users/sally");
```

The following example creates `/u/joe/logs/foo.log` assuming your home directory is `/u/joe`, or `C:\joe\logs\foo.log` if you are on Windows.

```java
Path p5 = Paths.get(System.getProperty("user.home"),"logs", "foo.log");
```

### Using the Path.of() Factory methods

Two factory methods have been added to the [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) interface in Java SE 9.

The first method takes a string of characters, denoting the path string or the initial part of the path string. It can take further string of characters as a vararg that are joined to form the path string.

The second method takes a [`URI`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/net/URI.html), which is converted to this path.

The following code used the first factory method to create a path.

```java
Path debugFile = Path.of("/tmp/debug.log");
```

 

## Retrieving Information about a Path

You can think of the [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) as storing these name elements as a sequence. The highest element in the directory structure would be located at index `0`. The lowest element in the directory structure would be located at index `[n-1]`, where `n` is the number of name elements in the [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html). Methods are available for retrieving individual elements or a subsequence of the [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) using these indexes.

The examples in this section use the following directory structure.

![Sample Directory Structure](https://dev.java/assets/images/java-io/01_sample-dir-structure.png)

Sample Directory Structure

The following code snippet defines a [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) instance and then invokes several methods to obtain information about the path:

```java
// None of these methods requires that the file corresponding
// to the Path exists.
// Microsoft Windows syntax
Path path = Paths.get("C:\\home\\joe\\foo");

// Solaris syntax
Path path = Paths.get("/home/joe/foo");

System.out.format("toString: %s%n", path.toString());
System.out.format("getFileName: %s%n", path.getFileName());
System.out.format("getName(0): %s%n", path.getName(0));
System.out.format("getNameCount: %d%n", path.getNameCount());
System.out.format("subpath(0,2): %s%n", path.subpath(0,2));
System.out.format("getParent: %s%n", path.getParent());
System.out.format("getRoot: %s%n", path.getRoot());
```

Here is the output for both Windows and the Solaris OS:

|Methode invoked|Returns in the Solaris OS|Returns in Microsoft Windows|Comments|
|---|---|---|---|
|[`toString()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#toString())|`/home/joe/foo`|`C:\home\joe\foo`|Returns the string representation of the [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html). If the path was created using [`Filesystems.getDefault().getPath(String)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/FileSystem.html#getPath(java.lang.String,java.lang.String...)) or [`Paths.get()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Paths.html#get(java.lang.String,java.lang.String...)) or [`Path.of()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#of(java.lang.String,java.lang.String...)) (the latter is a convenience method for getPath), the method performs minor syntactic cleanup. For example, in a UNIX operating system, it will correct the input string `//home/joe/foo` to `/home/joe/foo`.|
|[`getFileName()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#getFileName())|`foo`|`foo`|Returns the file name or the last element of the sequence of name elements.|
|[`getName(0)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#getName(int))||`home`|`home`|
|[`getNameCount()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#getNameCount())|`3`|`3`|Returns the number of elements in the path.|
|[`subpath(0, 2)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#subpath(int,int))|`home/joe`|`home\joe`|Returns the subsequence of the Path (not including a root element) as specified by the beginning and ending indexes.|
|[`getParent()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#getParent())|`/home/joe`|`\home\joe`|Returns the path of the parent directory.|
|[`getRoot()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#getRoot())|`/`|`C:\`|Returns the root of the path.|

The previous example shows the output for an absolute path. In the following example, a relative path is specified:

```java
// Solaris syntax
Path path = Paths.get("sally/bar");
```

```java
// Microsoft Windows syntax
Path path = Paths.get("sally\\bar");
```

Here is the output for Windows and the Solaris OS:

|Methode invoked|Returns in the Solaris OS|Returns in Microsoft Windows|
|---|---|---|
|[`toString()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#toString())|`sally/bar`|`sally\bar`|
|[`getFileName()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#getFileName())|`bar`|`bar`|
|[`getName(0)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#getName(int))|`sally`|`sally`|
|[`getNameCount()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#getNameCount())|`2`|`2`|
|[`subpath(0, 1)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#subpath(int,int))|`sally`|`sally`|
|[`getParent()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#getParent())|`sally`|`sally`|
|[`getRoot()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#getRoot())|`null`|`null`|

 

## Removing Redundancies From a Path

Many file systems use "." notation to denote the current directory and ".." to denote the parent directory. You might have a situation where a [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) contains redundant directory information. Perhaps a server is configured to save its log files in the `/dir/logs/.` directory, and you want to delete the trailing "`/.`" notation from the path.

The following examples both include redundancies:

```shell
/home/./joe/foo
/home/sally/../joe/foo
```

The [`normalize()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#normalize()) method removes any redundant elements, which includes any "." or "directory/.." occurrences. Both of the preceding examples normalize to `/home/joe/foo`.

It is important to note that normalize does not check at the file system when it cleans up a path. It is a purely syntactic operation. In the second example, if `sally` were a symbolic link, removing `sally/..` might result in a [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) that no longer locates the intended file.

To clean up a path while ensuring that the result locates the correct file, you can use the [`toRealPath()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#toRealPath(java.nio.file.LinkOption...)) method. This method is described in the next section.

 

## Converting a Path

You can use three methods to convert the [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html). If you need to convert the path to a string that can be opened from a browser, you can use [`toUri()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#toUri()). For example:

```java
Path p1 = Paths.get("/home/logfile");

System.out.format("%s%n", p1.toUri());
```

Running this code produces the following result:

```shell
file:///home/logfile
```

The [`toAbsolutePath()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#toAbsolutePath()) method converts a path to an absolute path. If the passed-in path is already absolute, it returns the same [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) object. The [`toAbsolutePath()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#toAbsolutePath()) method can be very helpful when processing user-entered file names. For example:

```java
public class FileTest {
    public static void main(String[] args) {

        if (args.length < 1) {
            System.out.println("usage: FileTest file");
            System.exit(-1);
        }

        // Converts the input string to a Path object.
        Path inputPath = Paths.get(args[0]);

        // Converts the input Path
        // to an absolute path.
        // Generally, this means prepending
        // the current working
        // directory.  If this example
        // were called like this:
        //     java FileTest foo
        // the getRoot and getParent methods
        // would return null
        // on the original "inputPath"
        // instance.  Invoking getRoot and
        // getParent on the "fullPath"
        // instance returns expected values.
        Path fullPath = inputPath.toAbsolutePath();
    }
}
```

The [`toAbsolutePath()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#toAbsolutePath()) method converts the user input and returns a [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) that returns useful values when queried. The file does not need to exist for this method to work.

The [`toRealPath()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#toRealPath(java.nio.file.LinkOption...)) method returns the real path of an existing file. This method performs several operations in one:

- If `true` is passed to this method and the file system supports symbolic links, this method resolves any symbolic links in the path.
- If the path is relative, it returns an absolute path.
- If the path contains any redundant elements, it returns a path with those elements removed.

This method throws an exception if the file does not exist or cannot be accessed. You can catch the exception when you want to handle any of these cases. For example:

```java
try {
    Path fp = path.toRealPath();
} catch (NoSuchFileException x) {
    System.err.format("%s: no such" + " file or directory%n", path);
    // Logic for case when file doesn't exist.
} catch (IOException x) {
    System.err.format("%s%n", x);
    // Logic for other sort of file error.
}
```

 

## Joining Two Paths

You can combine paths by using the [`resolve()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#resolve(java.lang.String)) method. You pass in a partial path , which is a path that does not include a root element, and that partial path is appended to the original path.

For example, consider the following code snippet:

```java
// Solaris
Path p1 = Paths.get("/home/joe/foo");

// Result is /home/joe/foo/bar
System.out.format("%s%n", p1.resolve("bar"));
```

or

```java
// Microsoft Windows
Path p1 = Paths.get("C:\\home\\joe\\foo");

// Result is C:\home\joe\foo\bar
System.out.format("%s%n", p1.resolve("bar"));
```

Passing an absolute path to the [`resolve()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#resolve(java.lang.String)) method returns the passed-in path:

```java
// Result is /home/joe
Paths.get("foo").resolve("/home/joe");
```

 

## Creating a Path Between Two Paths

A common requirement when you are writing file I/O code is the capability to construct a path from one location in the file system to another location. You can meet this using the [`relativize()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#relativize(java.nio.file.Path)) method. This method constructs a path originating from the original path and ending at the location specified by the passed-in path. The new path is relative to the original path.

For example, consider two relative paths defined as `joe` and `sally`:

```java
Path p1 = Paths.get("joe");
Path p2 = Paths.get("sally");
```

In the absence of any other information, it is assumed that `joe` and `sally` are siblings, meaning nodes that reside at the same level in the tree structure. To navigate from `joe` to `sally`, you would expect to first navigate one level up to the parent node and then down to `sally`:

```java
// Result is ../sally
Path p1_to_p2 = p1.relativize(p2);

// Result is ../joe
Path p2_to_p1 = p2.relativize(p1);
```

Consider a slightly more complicated example:

```java
Path p1 = Paths.get("home");
Path p3 = Paths.get("home/sally/bar");

// Result is sally/bar
Path p1_to_p3 = p1.relativize(p3);

// Result is ../..
Path p3_to_p1 = p3.relativize(p1);
```

In this example, the two paths share the same node, home. To navigate from `home` to `bar`, you first navigate one level down to `sally` and then one more level down to `bar`. Navigating from `bar` to `home` requires moving up two levels.

A relative path cannot be constructed if only one of the paths includes a root element. If both paths include a root element, the capability to construct a relative path is system dependent.

The recursive `Copy` example uses the [`relativize()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#relativize(java.nio.file.Path)) and resolve methods.

 

## Comparing Two Paths

The [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) interface supports [`equals()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#equals(java.lang.Object)), enabling you to test two paths for equality. The [`startsWith()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#startsWith()) and [`endsWith()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#endsWith()) methods enable you to test whether a path begins or ends with a particular string. These methods are easy to use. For example:

```java
Path path = ...;
Path otherPath = ...;
Path beginning = Paths.get("/home");
Path ending = Paths.get("foo");

if (path.equals(otherPath)) {
    // equality logic here
} else if (path.startsWith(beginning)) {
    // path begins with "/home"
} else if (path.endsWith(ending)) {
    // path ends with "foo"
}
```

The [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) interface extends the [`Iterable`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/Iterable.html) interface. The [`iterator()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/Iterable.html#iterator()) method returns an object that enables you to iterate over the name elements in the path. The first element returned is that closest to the root in the directory tree. The following code snippet iterates over a path, printing each name element:

```java
Path path = ...;
for (Path name: path) {
    System.out.println(name);
}
```

The [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) interface also extends the [`Comparable`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/Comparable.html) interface. You can compare [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) objects by using [`compareTo()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/Comparable.html#compareTo(T)) which is useful for sorting.

You can also put [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) objects into a [`Collection`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Collection.html). See the [Collections tutorial](https://dev.java/learn/api/collections-framework/) for more information about this powerful feature.

When you want to verify that two [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) objects locate the same file, you can use the [`isSameFile()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#isSameFile(java.nio.file.Path,java.nio.file.Path)) method from the [`Files`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html) class, as described in the section [Checking Whether Two Paths Locate the Same File](https://dev.java/learn/java-io/file-system/path/).
