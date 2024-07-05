---
date: 2024-07-05
updated: 2024-07-05
order: 50
---
As mentioned previously, the [`java.nio.file`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/package-summary.html) package, and the [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) class in particular, is "link aware." Every [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) method either detects what to do when a symbolic link is encountered, or it provides an option enabling you to configure the behavior when a symbolic link is encountered.

The discussion so far has been about symbolic or soft links, but some file systems also support hard links. Hard links are more restrictive than symbolic links, as follows:

- The target of the link must exist.
- Hard links are generally not allowed on directories.
- Hard links are not allowed to cross partitions or volumes. Therefore, they cannot exist across file systems.
- A hard link looks, and behaves, like a regular file, so they can be hard to find.
- A hard link is, for all intents and purposes, the same entity as the original file. They have the same file permissions, time stamps, and so on. All attributes are identical.

Because of these restrictions, hard links are not used as often as symbolic links, but the [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) methods work seamlessly with hard links.

 

## Creating a Symbolic Link

If your file system supports it, you can create a symbolic link by using the [`createSymbolicLink(Path, Path, FileAttribute)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#createSymbolicLink(java.nio.file.Path,java.nio.file.Path,java.nio.file.attribute.FileAttribute...)) method. The second [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) argument represents the target file or directory and might or might not exist. The following code snippet creates a symbolic link with default permissions:

```java
Path newLink = ...;
Path target = ...;
try {
    Files.createSymbolicLink(newLink, target);
} catch (IOException x) {
    System.err.println(x);
} catch (UnsupportedOperationException x) {
    // Some file systems do not support symbolic links.
    System.err.println(x);
}
```

Copy

The [`FileAttribute`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/attribute/FileAttribute.html) vararg enables you to specify initial file attributes that are set atomically when the link is created. However, this argument is intended for future use and is not currently implemented.

 

## Creating a Hard Link

You can create a hard (or regular) link to an existing file by using the [`createLink(Path, Path)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#createLink(java.nio.file.Path,java.nio.file.Path)) method. The second [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) argument locates the existing file, and it must exist or a [`NoSuchFileException`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/NoSuchFileException.html) is thrown. The following code snippet shows how to create a link:

```java
Path newLink = ...;
Path existingFile = ...;
try {
    Files.createLink(newLink, existingFile);
} catch (IOException x) {
    System.err.println(x);
} catch (UnsupportedOperationException x) {
    // Some file systems do not
    // support adding an existing
    // file to a directory.
    System.err.println(x);
}
```

Copy

 

## Detecting a Symbolic Link

To determine whether a [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) instance is a symbolic link, you can use the [`isSymbolicLink(Path)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#isSymbolicLink(java.nio.file.Path)) method. The following code snippet shows how:

```java
Path file = ...;
boolean isSymbolicLink =
    Files.isSymbolicLink(file);
```

Copy

For more information, see the section [Managing Metadata](https://dev.java/learn/java-io/file-system/metadata/).

 

## Finding the Target of a Link

You can obtain the target of a symbolic link by using the [`readSymbolicLink(Path)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#readSymbolicLink(java.nio.file.Path)) method, as follows:

```java
Path link = ...;
try {
    System.out.format("Target of link" +
        " '%s' is '%s'%n", link,
        Files.readSymbolicLink(link));
} catch (IOException x) {
    System.err.println(x);
}
```

Copy

If the [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) is not a symbolic link, this method throws a [`NotLinkException`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/NotLinkException.html).

---
Last update: January 25, 2023