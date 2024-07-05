---
title: File System Basics
aliases:
  - File System Basics
order: 30
---
# File System Basics

This part of the tutorial covers all the interactions with the file system. It includes file manipulation with the [`File`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/File.html) class and the [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) interface, and directory creation. It shows you how to access file metadata, depending on the file system you are working with. It presents the patterns to explore the content of a directory tree using a visitor pattern, and how to monitor a directory for file creation and deletion events.

  

1. [[Accessing Resources using Paths]]  
    
    How to access resources using the Path interface, and how to refactor your old-style File code to using Path.
    
2. [[Working with Paths]]  
    
    The Path interface includes various methods that can be used to obtain information about the path, access elements of the path, convert the path to other forms, or extract portions of a path. There are also methods for matching the path string and methods for removing redundancies in a path. This section addresses these Path methods, sometimes called syntactic operations, because they operate on the path itself and do not access the file system.
    
3. [[Accessing the File System]]  
    
    How to access file systems and file stores.
    
4. [[Manipulating Files and Directories]]  
    
    This section shows you how to check for the existence and different elements of files and directories, and how to copy, move and delete files and directories.
    
5. [[Links, Symbolics and Otherwise]]  
    
    How to create soft and hard links, how to detect a symbolic link, and how to find the target of a link.
    
6. [[Managing Files Attributes]]  
    
    The definition of metadata is: data about other data. With a file system, the data is contained in its files and directories, and the metadata tracks information about each of these objects: Is it a regular file, a directory, or a link? What is its size, creation date, last modified date, file owner, group owner, and access permissions?
    
7. [[Creating and Reading Directories]]  
    
    How to read, create and delete directory on a file system. This section covers the functionality specific to directories.
    
8. [[Listing the Content of a Directory]]  
    
    How to efficiently list and filter the content of a directory on a file system.
    
9. [[Walking the File Tree]]  
    
    How to walk a file tree, visiting every file and directory recursively with a file visitor.
    
10. [[Watching a Directory for Changes]]  
    
    How to write a program to detect what is happening in a directory on the file system.