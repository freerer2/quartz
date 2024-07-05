---
title: File Operations Basics
aliases:
  - File Operations Basics
order: 20
---
# File Operations Basics

This part covers the writing and reading of files. It makes the difference between small files that you can load in memory, and large files that you need to access through buffers. It shows you how you can use the decorator pattern to add features to basic file access.

  

1. [[Releasing Resources and Catching Exceptions]]  
    
    The Files class is the other primary entrypoint of the java.nio.file package. This class offers a rich set of static methods for reading, writing, and manipulating files and directories. The Files methods work on instances of Path objects.
    
2. [[Reading and Writing Small Files]]  
    
    This section discusses the details of reading, writing, creating, and opening files.
    
3. [[Reading and Writing Text Files]]  
    
    This section discusses the details of reading and writing text files using buffered I/O streams.
    
4. [[Reading and Writing Binary Files]]  
    
    This section discusses the details of reading, writing, creating, and opening files.
    
5. [[Decorating IO Streams]]  
    
    Using decoration to enhance the capabilities of IO streams.
    
6. [[In Memory IO Streams]]  
    
    Setting up character or binary streams on in-memory structures.