---
date: 2024-07-05
updated: 2024-07-05
order: 70
---
Some of the methods previously discussed, such as `delete()`, work on files, links and directories. But how do you list all the directories at the top of a file system? How do you list the contents of a directory or create a directory?

 

## Listing a File System's Root Directories

You can list all the root directories for a file system by using the [`FileSystem.getRootDirectories()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/FileSystem.html#getRootDirectories()) method. This method returns an [`Iterable`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/Iterable.html), which enables you to use the enhanced for statement to iterate over all the root directories.

The following code snippet prints the root directories for the default file system:

```java
Iterable<Path> dirs = FileSystems.getDefault().getRootDirectories();
for (Path name: dirs) {
    System.err.println(name);
}
```

Copy

 

## Creating a Directory

You can create a new directory by using the [`Files.createDirectory(Path, FileAttribute)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#createDirectory(java.nio.file.Path,java.nio.file.attribute.FileAttribute...)) method. If you don't specify any [`FileAttribute`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/attribute/FileAttribute.html), the new directory will have default attributes. For example:

```java
Path dir = ...;
Files.createDirectory(path);
```

Copy

The following code snippet creates a new directory on a POSIX file system that has specific permissions:

```java
Set<PosixFilePermission> perms =
    PosixFilePermissions.fromString("rwxr-x---");
FileAttribute<Set<PosixFilePermission>> attr =
    PosixFilePermissions.asFileAttribute(perms);
Files.createDirectory(file, attr);
```

Copy

To create a directory several levels deep when one or more of the parent directories might not yet exist, you can use the convenience method, [`Files.createDirectories(Path, FileAttribute)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#createDirectories(java.nio.file.Path,java.nio.file.attribute.FileAttribute...)). As with the [`Files.createDirectory(Path, FileAttribute)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#createDirectory(java.nio.file.Path,java.nio.file.attribute.FileAttribute...)) method, you can specify an optional set of initial file attributes. The following code snippet uses default attributes:

```java
Files.createDirectories(Paths.get("foo/bar/test"));
```

Copy

The directories are created, as needed, from the top down. In the `foo/bar/test` example, if the `foo` directory does not exist, it is created. Next, the `bar` directory is created, if needed, and, finally, the `test` directory is created.

It is possible for this method to fail after creating some, but not all, of the parent directories.

 

## Creating a Temporary Directory

You can create a temporary directory using one of createTempDirectory methods:

- [`createTempDirectory(Path, String, FileAttribute...)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#createTempDirectory(java.nio.file.Path,java.lang.String,java.nio.file.attribute.FileAttribute...))
- [`createTempDirectory(String, FileAttribute...)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#createTempDirectory(java.nio.file.Path,java.lang.String,java.nio.file.attribute.FileAttribute...))

The first method allows the code to specify a location for the temporary directory and the second method creates a new directory in the default temporary-file directory.

---
Last update: January 25, 2023