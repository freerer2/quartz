---
date: 2024-07-05
updated: 2024-07-05
order: 40
---
## Checking a File or Directory

You have a [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) instance representing a file or directory, but does that file exist on the file system? Is it readable? Writable? Executable?

### Verifying the Existence of a File or Directory

The methods in the [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) class are syntactic, meaning that they operate on the [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) instance. But eventually you must access the file system to verify that a particular [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) exists, or does not exist. You can do so with the [`exists(Path, LinkOption...)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#exists(java.nio.file.Path,java.nio.file.LinkOption...)) and the [`notExists(Path, LinkOption...)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#notExists(java.nio.file.Path,java.nio.file.LinkOption...)) methods. Note that [`!Files.exists(path)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#exists(java.nio.file.Path,java.nio.file.LinkOption...)) is not equivalent to [`Files.notExists(path)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#notExists(java.nio.file.Path,java.nio.file.LinkOption...)). When you are testing a file's existence, three results are possible:

- The file is verified to exist.
- The file is verified to not exist.
- The file's status is unknown. This result can occur when the program does not have access to the file.

If both [`exists()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#exists(java.nio.file.Path,java.nio.file.LinkOption...)) and [`notExists()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#notExists(java.nio.file.Path,java.nio.file.LinkOption...)) return `false`, the existence of the file cannot be verified.

### Checking File Accessibility

To verify that the program can access a file as needed, you can use the [`isReadable(Path)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#isReadable()), [`isWritable(Path)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#isWritable()), and [`isExecutable(Path)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#isExecutable()) methods.

The following code snippet verifies that a particular file exists and that the program has the ability to execute the file.

```java
Path file = ...;
boolean isRegularExecutableFile = Files.isRegularFile(file) &
Files.isReadable(file) & Files.isExecutable(file);
```

Copy

> Note: Once any of these methods completes, there is no guarantee that the file can be accessed. A common security flaw in many applications is to perform a check and then access the file. For more information, use your favorite search engine to look up TOCTTOU (pronounced TOCK-too).

### Checking Whether Two Paths Locate the Same File

When you have a file system that uses symbolic links, it is possible to have two different paths that locate the same file. The [`isSameFile(Path, Path)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#isSameFile(java.nio.file.Path,java.nio.file.Path)) method compares two paths to determine if they locate the same file on the file system. For example:

```java
Path p1 = ...;
Path p2 = ...;

if (Files.isSameFile(p1, p2)) {
    // Logic when the paths locate the same file
}
```

Copy

 

## Deleting a File or Directory

You can delete files, directories or links. With symbolic links, the link is deleted and not the target of the link. With directories, the directory must be empty, or the deletion fails.

The [`Files`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html) class provides two deletion methods.

The [`delete(Path)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#delete(java.nio.file.Path)) method deletes the file or throws an exception if the deletion fails. For example, if the file does not exist a [NoSuchFileException](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/NoSuchFileException.html) is thrown. You can catch the exception to determine why the delete failed as follows:

```java
try {
    Files.delete(path);
} catch (NoSuchFileException x) {
    System.err.format("%s: no such" + " file or directory%n", path);
} catch (DirectoryNotEmptyException x) {
    System.err.format("%s not empty%n", path);
} catch (IOException x) {
    // File permission problems are caught here.
    System.err.println(x);
}
```

Copy

The [`deleteIfExists(Path)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#delete(java.nio.file.Path)) method also deletes the file, but if the file does not exist, no exception is thrown. Failing silently is useful when you have multiple threads deleting files and you do not want to throw an exception just because one thread did so first.

 

## Copying a File or Directory

You can copy a file or directory by using the [`copy(Path, Path, CopyOption...)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#copy(java.nio.file.Path,java.nio.file.Path,java.nio.file.CopyOption...)) method. The copy fails if the target file exists, unless the [`REPLACE_EXISTING`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/StandardCopyOption.html#REPLACE_EXISTING) option is specified.

Directories can be copied. However, files inside the directory are not copied, so the new directory is empty even when the original directory contains files.

When copying a symbolic link, the target of the link is copied. If you want to copy the link itself, and not the contents of the link, specify either the [`NOFOLLOW_LINKS`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/LinkOption.html#NOFOLLOW_LINKS) or [`REPLACE_EXISTING`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/StandardCopyOption.html#REPLACE_EXISTING) option.

This method takes a varargs argument. The following [`StandardCopyOption`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/StandardCopyOption.html) and [`LinkOption`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/LinkOption.html) enums are supported:

- [`REPLACE_EXISTING`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/StandardCopyOption.html#REPLACE_EXISTING) – Performs the copy even when the target file already exists. If the target is a symbolic link, the link itself is copied (and not the target of the link). If the target is a non-empty directory, the copy fails with the [`DirectoryNotEmptyException`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/DirectoryNotEmptyException.html) exception.
- [`COPY_ATTRIBUTES`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/StandardCopyOption.html#COPY_ATTRIBUTES) – Copies the file attributes associated with the file to the target file. The exact file attributes supported are file system and platform dependent, but last-modified-time is supported across platforms and is copied to the target file.
- [`NOFOLLOW_LINKS`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/LinkOption.html#NOFOLLOW_LINKS) – Indicates that symbolic links should not be followed. If the file to be copied is a symbolic link, the link is copied (and not the target of the link).

If you are not familiar with enums, see the section Enum Types.

The following shows how to use the copy method:

```java
import static java.nio.file.StandardCopyOption.*;

Files.copy(source, target, REPLACE_EXISTING);
```

Copy

In addition to file copy, the [`Files`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html) class also defines methods that may be used to copy between a file and a stream. The [`copy(InputStream, Path, CopyOptions...)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#copy(java.nio.file.Path,java.io.OutputStream)) method may be used to copy all bytes from an input stream to a file. The [`copy(Path, OutputStream)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#copy(java.nio.file.Path,java.io.OutputStream)) method may be used to copy all bytes from a file to an output stream.

 

## Moving a File or Directory

You can move a file or directory by using the [`move(Path, Path, CopyOption...)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#move(java.nio.file.Path,java.nio.file.Path,java.nio.file.CopyOption...)) method. The move fails if the target file exists, unless the [`REPLACE_EXISTING`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/StandardCopyOption.html#REPLACE_EXISTING) option is specified.

### Using Varargs

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

### Moving Directories

Empty directories can be moved. If the directory is not empty, the move is allowed when the directory can be moved without moving the contents of that directory. On UNIX systems, moving a directory within the same partition generally consists of renaming the directory. In that situation, this method works even when the directory contains files.

This method takes a varargs argument – the following [`StandardCopyOption`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/StandardCopyOption.html) enums are supported:

- [`REPLACE_EXISTING`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/StandardCopyOption.html#REPLACE_EXISTING) – Performs the move even when the target file already exists. If the target is a symbolic link, the symbolic link is replaced but what it points to is not affected.
- [`ATOMIC_MOVE`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/StandardCopyOption.html#ATOMIC_MOVE) – Performs the move as an atomic file operation. If the file system does not support an atomic move, an exception is thrown. With an [`ATOMIC_MOVE`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/StandardCopyOption.html#ATOMIC_MOVE) you can move a file into a directory and be guaranteed that any process watching the directory accesses a complete file.

The following shows how to use the move method:

```java
import static java.nio.file.StandardCopyOption.*;

Files.move(source, target, REPLACE_EXISTING);
```

Copy

Though you can implement the [`move()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#move(java.nio.file.Path,java.nio.file.Path,java.nio.file.CopyOption...)) method on a single directory as shown, the method is most often used with the file tree recursion mechanism. For more information, see the section Walking the File Tree.

 

## Atomic Operations

Several [`Files`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html) methods, such as [`move()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#move(java.nio.file.Path,java.nio.file.Path,java.nio.file.CopyOption...)), can perform certain operations atomically in some file systems.

An atomic file operation is an operation that cannot be interrupted or "partially" performed. Either the entire operation is performed or the operation fails. This is important when you have multiple processes operating on the same area of the file system, and you need to guarantee that each process accesses a complete file.

 

## Link Awareness

The [`Files`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html) class is "link aware." Every [`Files`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html) method either detects what to do when a symbolic link is encountered, or it provides an option enabling you to configure the behavior when a symbolic link is encountered. For more information on the way you can handle links on a file system, you can check the [Links, Symbolics and Otherwise](https://dev.java/learn/java-io/file-system/links/) section.

---
Last update: January 25, 2023