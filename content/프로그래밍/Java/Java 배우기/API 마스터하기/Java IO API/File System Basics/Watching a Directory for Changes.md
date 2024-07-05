---
date: 2024-07-05
updated: 2024-07-05
order: 100
---
To implement _file change notification_, a program must be able to detect what is happening to the relevant directory on the file system. One way to do so is to poll the file system looking for changes, but this approach is inefficient. It does not scale to applications that have hundreds of open files or directories to monitor.

The [`java.nio.file`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/package-summary.html) package provides a file change notification API, called the _Watch Service API_. This API enables you to register a directory (or directories) with the watch service. When registering, you tell the service which types of events you are interested in: file creation, file deletion, or file modification. When the service detects an event of interest, it is forwarded to the registered process. The registered process has a thread (or a pool of threads) dedicated to watching for any events it has registered for. When an event comes in, it is handled as needed.

 

## Watch Service Overview

The [`WatchService`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/WatchService.html) API is fairly low level, allowing you to customize it. You can use it as is, or you can choose to create a high-level API on top of this mechanism so that it is suited to your particular needs.

Here are the basic steps required to implement a watch service:

- Create a [`WatchService`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/WatchService.html) "watcher" for the file system.
- For each directory that you want monitored, register it with the watcher. When registering a directory, you specify the type of events for which you want notification. You receive a [`WatchKey`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/WatchKey.html) instance for each directory that you register.
- Implement an infinite loop to wait for incoming events. When an event occurs, the key is signaled and placed into the watcher's queue.
- Retrieve the key from the watcher's queue. You can obtain the file name from the key.
- Retrieve each pending event for the key (there might be multiple events) and process as needed.
- Reset the key, and resume waiting for events.
- Close the service: The watch service exits when either the thread exits or when it is closed (by invoking its [`close()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/WatchService.html#close()) method).

`WatchKeys` are thread-safe and can be used with the [`java.nio.concurrent`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/concurrent/package-summary.html) package. You can dedicate a thread pool to this effort.

 

## Try It Out

Because this API is more advanced, try it out before proceeding. Save see the [`WatchDir`](https://dev.java/learn/java-io/file-system/watching-dir-changes/#watch-dir) example at the end of this section. Save it to your computer, and compile it. Create a test directory that will be passed to the example. [`WatchDir`](https://dev.java/learn/java-io/file-system/watching-dir-changes/#watch-dir) uses a single thread to process all events, so it blocks keyboard input while waiting for events. Either run the program in a separate window, or in the background, as follows:

```shell
$ java WatchDir test &
```

Play with creating, deleting, and editing files in the test directory. When any of these events occurs, a message is printed to the console. When you have finished, delete the test directory and `WatchDir` exits. Or, if you prefer, you can manually kill the process.

You can also watch an entire file tree by specifying the `-r` option. When you specify `-r`, `WatchDir` walks the file tree, registering each directory with the watch service.

 

## Creating a Watch Service and Registering for Events

The first step is to create a new [`WatchService`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/WatchService.html) by using the [`newWatchService()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/FileSystem.html#newWatchService()) method in the FileSystem class, as follows:

```java
WatchService watcher = FileSystems.getDefault().newWatchService();
```

Next, register one or more objects with the watch service. Any object that implements the [`Watchable`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Watchable.html) interface can be registered. The [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) class implements the [`Watchable`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Watchable.html) interface, so each directory to be monitored is registered as a [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) object.

As with any [`Watchable`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Watchable.html), the [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) interface implements two register methods. This page uses the two-argument version, [`register(WatchService, WatchEvent.Kind...)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html#register(java.nio.file.WatchService,java.nio.file.WatchEvent.Kind...)). (The three-argument version takes a [`WatchEvent.Modifier`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/WatchEvent.Modifier.html), which is not currently implemented.)

When registering an object with the watch service, you specify the types of events that you want to monitor. The supported [`StandardWatchEventKinds`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/StandardWatchEventKinds.html) event types follow:

- [`ENTRY_CREATE`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/StandardWatchEventKinds.html#ENTRY_CREATE) – A directory entry is created.
- [`ENTRY_DELETE`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/StandardWatchEventKinds.html#ENTRY_DELETE) – A directory entry is deleted.
- [`ENTRY_MODIFY`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/StandardWatchEventKinds.html#ENTRY_MODIFY) – A directory entry is modified.
- [`OVERFLOW`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/StandardWatchEventKinds.html#OVERFLOW) – Indicates that events might have been lost or discarded. You do not have to register for the [`OVERFLOW`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/StandardWatchEventKinds.html#OVERFLOW) event to receive it.

The following code snippet shows how to register a [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) instance for all three event types:

```java
import static java.nio.file.StandardWatchEventKinds.*;

Path dir = ...;
try {
    WatchKey key = dir.register(watcher,
                           ENTRY_CREATE,
                           ENTRY_DELETE,
                           ENTRY_MODIFY);
} catch (IOException x) {
    System.err.println(x);
}
```

 

## Processing Events

The order of events in an event processing loop follow:

1. Get a watch key. Three methods are provided on the [`WatchService`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/WatchService.html) class:
    - [`poll()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/WatchService.html#poll()) – Returns a queued key, if available. Returns immediately with a null value, if unavailable.
    - [`poll(long, TimeUnit)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/WatchService.html#poll(long,java.util.concurrent.TimeUnit)) – Returns a queued key, if one is available. If a queued key is not immediately available, the program waits until the specified time. The [`TimeUnit`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/concurrent/TimeUnit.html) argument determines whether the specified time is nanoseconds, milliseconds, or some other unit of time.
    - [`take()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/WatchService.html#take()) – Returns a queued key. If no queued key is available, this method waits.
2. Process the pending events for the key. You fetch the `List` of [`WatchEvent`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/WatchEvent.html) objects from the [`pollEvents()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/WatchService.html#pollEvents()) method.
3. Retrieve the type of event by using the [`kind()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/WatchEvent.html#kind()) method of your [`WatchEvent`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/WatchEvent.html) object. No matter what events the key has registered for, it is possible to receive an [`OVERFLOW`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/StandardWatchEventKinds.html#OVERFLOW) event. You can choose to handle the overflow or ignore it, but you should test for it.
4. Retrieve the file name associated with the event. The file name is stored as the context of the event, so the [`context()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/WatchEvent.html#context()) method is used to retrieve it.
5. After the events for the key have been processed, you need to put the key back into a `ready` state by invoking the [`reset()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/WatchKey.html#reset()) of this [`WatchKey`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/WatchKey.html) object. If this method returns `false`, the key is no longer valid and the loop can exit. This step is very important. If you fail to invoke [`reset()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/WatchKey.html#reset()), this key will not receive any further events.

A watch key has a state. At any given time, its state might be one of the following:

- `Ready` indicates that the key is ready to accept events. When first created, a key is in the ready state.
- `Signaled` indicates that one or more events are queued. Once the key has been signaled, it is no longer in the ready state until the [`reset()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/WatchKey.html#reset()) method is invoked.
- `Invalid` indicates that the key is no longer active. This state happens when one of the following events occurs:
    - The process explicitly cancels the key by using the [`cancel()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/WatchKey.html#cancel()) method.
    - The directory becomes inaccessible.
    - The watch service is closed.

Here is an example of an event processing loop. It watches a directory, waiting for new files to appear. When a new file becomes available, it is examined to determine if it is a text/plain file by using the [`probeContentType(Path)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#probeContentType(java.nio.file.Path)) method.

```java
for (;;) {

    // wait for key to be signaled
    WatchKey key;
    try {
        key = watcher.take();
    } catch (InterruptedException x) {
        return;
    }

    for (WatchEvent<?> event: key.pollEvents()) {
        WatchEvent.Kind<?> kind = event.kind();

        // This key is registered only
        // for ENTRY_CREATE events,
        // but an OVERFLOW event can
        // occur regardless if events
        // are lost or discarded.
        if (kind == OVERFLOW) {
            continue;
        }

        // The filename is the
        // context of the event.
        WatchEvent<Path> ev = (WatchEvent<Path>)event;
        Path filename = ev.context();

        // Verify that the new
        //  file is a text file.
        try {
            // Resolve the filename against the directory.
            // If the filename is "test" and the directory is "foo",
            // the resolved name is "test/foo".
            Path child = dir.resolve(filename);
            if (!Files.probeContentType(child).equals("text/plain")) {
                System.err.format("New file '%s'" +
                    " is not a plain text file.%n", filename);
                continue;
            }
        } catch (IOException x) {
            System.err.println(x);
            continue;
        }

        // Email the file to the
        //  specified email alias.
        System.out.format("Emailing file %s%n", filename);
        //Details left to reader....
    }

    // Reset the key -- this step is critical if you want to
    // receive further watch events.  If the key is no longer valid,
    // the directory is inaccessible so exit the loop.
    boolean valid = key.reset();
    if (!valid) {
        break;
    }
}
```

 

## Retrieving the File Name

The file name is retrieved from the event context. The previous example retrieves the file name with this code:

```java
WatchEvent<Path> ev = (WatchEvent<Path>)event;
Path filename = ev.context();
```

When you compile this example, it generates the following error:

```shell
Note: Example.java uses unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.
```

This error is a result of the line of code that casts the `WatchEvent<T>` to a `WatchEvent<Path>`. The `WatchDir` example avoids this error by creating a utility cast method that suppresses the unchecked warning, as follows:

```java
@SuppressWarnings("unchecked")
static <T> WatchEvent<T> cast(WatchEvent<?> event) {
    return (WatchEvent<Path>)event;
}
```

If you are unfamiliar with the [`@SuppressWarnings`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/SuppressWarnings.html) syntax, see the section on [Annotations](https://dev.java/learn/annotations/).

 

## When to Use and Not Use This API

The Watch Service API is designed for applications that need to be notified about file change events. It is well suited for any application, like an editor or IDE, that potentially has many open files and needs to ensure that the files are synchronized with the file system. It is also well suited for an application server that watches a directory, perhaps waiting for `.jsp` or `.jar` files to drop, in order to deploy them.

This API is not designed for indexing a hard drive. Most file system implementations have native support for file change notification. The Watch Service API takes advantage of this support where available. However, when a file system does not support this mechanism, the Watch Service will poll the file system, waiting for events.

 

## The WatchDir Example

```java
import java.nio.file.*;
import static java.nio.file.StandardWatchEventKinds.*;
import static java.nio.file.LinkOption.*;
import java.nio.file.attribute.*;
import java.io.*;
import java.util.*;

/**
 * Example to watch a directory (or tree) for changes to files.
 */

public class WatchDir {

    private final WatchService watcher;
    private final Map<WatchKey,Path> keys;
    private final boolean recursive;
    private boolean trace = false;

    @SuppressWarnings("unchecked")
    static <T> WatchEvent<T> cast(WatchEvent<?> event) {
        return (WatchEvent<T>)event;
    }

    /**
     * Register the given directory with the WatchService
     */
    private void register(Path dir) throws IOException {
        WatchKey key = dir.register(watcher, ENTRY_CREATE, ENTRY_DELETE, ENTRY_MODIFY);
        if (trace) {
            Path prev = keys.get(key);
            if (prev == null) {
                System.out.format("register: %s\n", dir);
            } else {
                if (!dir.equals(prev)) {
                    System.out.format("update: %s -> %s\n", prev, dir);
                }
            }
        }
        keys.put(key, dir);
    }

    /**
     * Register the given directory, and all its sub-directories, with the
     * WatchService.
     */
    private void registerAll(final Path start) throws IOException {
        // register directory and sub-directories
        Files.walkFileTree(start, new SimpleFileVisitor<Path>() {
            @Override
            public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs)
                    throws IOException
            {
                register(dir);
                return FileVisitResult.CONTINUE;
            }
        });
    }

    /**
     * Creates a WatchService and registers the given directory
     */
    WatchDir(Path dir, boolean recursive) throws IOException {
        this.watcher = FileSystems.getDefault().newWatchService();
        this.keys = new HashMap<WatchKey,Path>();
        this.recursive = recursive;

        if (recursive) {
            System.out.format("Scanning %s ...\n", dir);
            registerAll(dir);
            System.out.println("Done.");
        } else {
            register(dir);
        }

        // enable trace after initial registration
        this.trace = true;
    }

    /**
     * Process all events for keys queued to the watcher
     */
    void processEvents() {
        for (;;) {

            // wait for key to be signalled
            WatchKey key;
            try {
                key = watcher.take();
            } catch (InterruptedException x) {
                return;
            }

            Path dir = keys.get(key);
            if (dir == null) {
                System.err.println("WatchKey not recognized!!");
                continue;
            }

            for (WatchEvent<?> event: key.pollEvents()) {
                WatchEvent.Kind kind = event.kind();

                // TBD - provide example of how OVERFLOW event is handled
                if (kind == OVERFLOW) {
                    continue;
                }

                // Context for directory entry event is the file name of entry
                WatchEvent<Path> ev = cast(event);
                Path name = ev.context();
                Path child = dir.resolve(name);

                // print out event
                System.out.format("%s: %s\n", event.kind().name(), child);

                // if directory is created, and watching recursively, then
                // register it and its sub-directories
                if (recursive && (kind == ENTRY_CREATE)) {
                    try {
                        if (Files.isDirectory(child, LinkOption.NOFOLLOW_LINKS)) {
                            registerAll(child);
                        }
                    } catch (IOException x) {
                        // ignore to keep sample readbale
                    }
                }
            }

            // reset key and remove from set if directory no longer accessible
            boolean valid = key.reset();
            if (!valid) {
                keys.remove(key);

                // all directories are inaccessible
                if (keys.isEmpty()) {
                    break;
                }
            }
        }
    }

    static void usage() {
        System.err.println("usage: java WatchDir [-r] dir");
        System.exit(-1);
    }

    public static void main(String[] args) throws IOException {
        // parse arguments
        if (args.length == 0 || args.length > 2)
            usage();
        boolean recursive = false;
        int dirArg = 0;
        if (args[0].equals("-r")) {
            if (args.length < 2)
                usage();
            recursive = true;
            dirArg++;
        }

        // register directory and process its events
        Path dir = Paths.get(args[dirArg]);
        new WatchDir(dir, recursive).processEvents();
    }
}
```

---
Last update: January 25, 2023