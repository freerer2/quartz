---
date: 2023-1-25
updated: 2023-1-25
order: 60
---
## Introducing I/O Streams on In-Memory Structures

The JAVA I/O API also gives classes to access the content of in-memory structures, namely arrays of characters or bytes, and strings of characters. There are several use cases where this feature is very handy.

Certain file formats (this is the case for the JPEG file format) require a special field at the beginning of the file, that gives the length of certain portions or fields of the file. There are cases where it is not possible to compute these portions in advance. Think of compressed data: computing the size of set of 100 integers is easy, but computing it once it has been gzipped is much harder. With the right class, you can create this gzipped stream in an array of bytes, and simply get the number of the written bytes. This example is covered at the end of this section.

 

## Reading and Writing Arrays of Characters

The [`CharArrayReader`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/CharArrayReader.html) and [`CharArrayWriter`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/CharArrayWriter.html) are both wrapping an array of `char`, specified at the construction of these classes. They are both extensions of [`Reader`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/Reader.html) and `Writer` (respectively), and do not add any methods to these classes.

 

## Reading and Writing Strings of Characters

The [`StringReader`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/StringReader.html) class is also an extension of the abstract class [`Reader`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/Reader.html). It is built on a [`String`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/String.html), passed as an argument to its constructor. It does not add any method to the [`Reader`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/Reader.html) class.

The [`StringWriter`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/StringWriter.html) is a little different. It wraps an internal [`StringBuffer`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuffer.html) and can append characters to it. You can then get this [`StringBuffer`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuffer.html) by calling one of the two following methods.

1. [`getBuffer()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/StringWriter.html#getBuffer()): returns the internal [`StringBuffer`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuffer.html). No defensive copy is made here.
2. [`toString()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/StringWriter.html#toString()): returns a string of characters built by calling the [`toString()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuffer.html#toString()) method of the internal [`StringBuffer`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuffer.html).

 

## Reading and Writing Arrays of Bytes

Two classes are available to read and write bytes in arrays: [`ByteArrayInputStream`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/ByteArrayInputStream.html) and [`ByteArrayOutputStream`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/ByteArrayOutputStream.html).

The first one allows you to read the content of a byte array as an [`InputStream`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/InputStream.html), provided as an argument to the constructor of this class.

The second one allows you to write bytes to a byte array. You can fix the initial size of this array, and it will grow automatically if it becomes full. Once the bytes have been written, you can get the content of this array in different ways.

1. [`size()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/ByteArrayOutputStream.html#size()) gives you the number of bytes contained in this array.
2. [`toString()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/ByteArrayOutputStream.html#toString()) returns the content of the array as a string of characters. This method can take a `CharSet` as an argument to decode these bytes correctly.
3. [`toBytes()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/ByteArrayOutputStream.html#toBytes()) returns a copy of the internal array of this [`ByteArrayOutputStream`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/ByteArrayOutputStream.html).

