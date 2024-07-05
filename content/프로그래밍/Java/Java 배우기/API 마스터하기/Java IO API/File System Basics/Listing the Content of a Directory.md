---
date: 2024-07-05
updated: 2024-07-05
order: 80
---
## Listing a the Content of a Directory

You can list all the contents of a directory by using the [`newDirectoryStream(Path)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#createTempDirectory(java.lang.String,java.nio.file.attribute.FileAttribute...)) method. This method returns an object that implements the [`DirectoryStream`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/DirectoryStream.html) interface. The class that implements the [`DirectoryStream`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/DirectoryStream.html) interface also implements [`Iterable`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/Iterable.html), so you can iterate through the directory stream, reading all of the objects. This approach scales well to very large directories.

> Remember: The returned [`DirectoryStream`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/DirectoryStream.html) is a stream. If you are not using a try-with-resources statement, do not forget to close the stream in the finally block. The try-with-resources statement takes care of this for you. You can learn more about stream in the [Stream section](https://dev.java/learn/api/streams/).

The following code snippet shows how to print the contents of a directory:

```java
Path dir = ...;
try (DirectoryStream<Path> stream = Files.newDirectoryStream(dir)) {
    for (Path file: stream) {
        System.out.println(file.getFileName());
    }
} catch (IOException | DirectoryIteratorException x) {
    // IOException can never be thrown by the iteration.
    // In this snippet, it can only be thrown by newDirectoryStream.
    System.err.println(x);
}
```

Copy

The [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) objects returned by the iterator are the names of the entries resolved against the directory. So, if you are listing the contents of the `/tmp` directory, the entries are returned with the form `/tmp/a`, `/tmp/b`, and so on.

This method returns the entire contents of a directory: files, links, subdirectories, and hidden files. If you want to be more selective about the contents that are retrieved, you can use one of the other [`newDirectoryStream()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#newDirectoryStream(java.nio.file.Path)) methods, as described later in this page.

Note that if there is an exception during directory iteration then [`DirectoryIteratorException`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/DirectoryIteratorException.html) is thrown with the [`IOException`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/IOException.html) as the cause. [`Iterator`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Iterator.html) methods cannot throw exceptions.

 

## Filtering a Directory Listing By Using Globbing

If you want to fetch only files and subdirectories where each name matches a particular pattern, you can do so by using the [`newDirectoryStream(Path, String)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#newDirectoryStream(java.nio.file.Path,java.lang.String)) method, which provides a built-in glob filter. If you are not familiar with glob syntax, see the [What Is a Glob](https://dev.java/learn/java-io/file-system/listing/#glob) section, at the end of this page.

For example, the following code snippet lists files relating to Java: _.class_, _.java_, and _.jar_ files.:

```java
Path dir = ...;
try (DirectoryStream<Path> stream =
     Files.newDirectoryStream(dir, "*.{java,class,jar}")) {
    for (Path entry: stream) {
        System.out.println(entry.getFileName());
    }
} catch (IOException x) {
    // IOException can never be thrown by the iteration.
    // In this snippet, it can // only be thrown by newDirectoryStream.
    System.err.println(x);
}
```

Copy

 

## Writing Your Own Directory Filter

Perhaps you want to filter the contents of a directory based on some condition other than pattern matching. You can create your own filter by implementing the [`DirectoryStream.Filter`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/DirectoryStream.Filter.html) interface. This interface consists of one method, [`accept()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/DirectoryStream.Filter.html#accept(T)), which determines whether a file fulfills the search requirement.

For example, the following code snippet implements a filter that retrieves only directories:

```java
DirectoryStream.Filter<Path> filter =
    newDirectoryStream.Filter<Path>() {
    public boolean accept(Path file) throws IOException {
        try {
            return (Files.isDirectory(path));
        } catch (IOException x) {
            // Failed to determine if it's a directory.
            System.err.println(x);
            return false;
        }
    }
};
```

Copy

Once the filter has been created, it can be invoked by using the [`newDirectoryStream(Path, DirectoryStream.Filter)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#newDirectoryStream(java.nio.file.Path,java.nio.file.DirectoryStream.Filter)) method. The following code snippet uses the `isDirectory()` filter to print only the directory's subdirectories to standard output:

```java
Path dir = ...;
try (DirectoryStream<Path>
                       stream = Files.newDirectoryStream(dir, filter)) {
    for (Path entry: stream) {
        System.out.println(entry.getFileName());
    }
} catch (IOException x) {
    System.err.println(x);
}
```

Copy

This method is used to filter a single directory only. However, if you want to find all the subdirectories in a file tree, you would use the mechanism for [Walking the File Tree](https://dev.java/learn/java-io/file-system/listing/).

 

## What is a Glob

You can use glob syntax to specify pattern-matching behavior.

A glob pattern is specified as a string and is matched against other strings, such as directory or file names. Glob syntax follows several simple rules:

- An asterisk, `*`, matches any number of characters (including none).
- Two asterisks, `**`, works like `*` but crosses directory boundaries. This syntax is generally used for matching complete paths.
- A question mark, `?`, matches exactly one character.
- Braces specify a collection of subpatterns. For example:
    - `{sun,moon,stars}` matches "sun", "moon", or "stars".
    - `{temp*,tmp*}` matches all strings beginning with "temp" or "tmp".
- Square brackets convey a set of single characters or, when the hyphen character (`-`) is used, a range of characters. For example:
    - `[aeiou]` matches any lowercase vowel.
    - `[0-9]` matches any digit.
    - `[A-Z]` matches any uppercase letter.
    - `[a-z,A-Z]` matches any uppercase or lowercase letter. Within the square brackets, `*`, `?`, and `\` match themselves.
- All other characters match themselves.
- To match *, ?, or the other special characters, you can escape them by using the backslash character, . For example: \ matches a single backslash, and ? matches the question mark.

Here are some examples of glob syntax:

- `*.html` – Matches all strings that end in .html
- `???` – Matches all strings with exactly three letters or digits
- `*[0-9]*` – Matches all strings containing a numeric value
- `*.{htm,html,pdf}` – Matches any string ending with .htm, .html or .pdf
- `a?*.java` – Matches any string beginning with a, followed by at least one letter or digit, and ending with .java
- `{foo*,*[0-9]*}` – Matches any string beginning with foo or any string containing a numeric value

> Note: If you are typing the glob pattern at the keyboard and it contains one of the special characters, you must put the pattern in quotes (`"*"`), use the backslash (`\*`), or use whatever escape mechanism is supported at the command line.

The glob syntax is powerful and easy to use. However, if it is not sufficient for your needs, you can also use a regular expression. For more information, see the section on Regular Expressions.

For more information about the glob syntax, see the API specification for the [`getPathMatcher(String)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/FileSystem.html#getPathMatcher(java.lang.String)) method in the [`FileSystem`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/FileSystem.html) class.

---
Last update: January 25, 2023