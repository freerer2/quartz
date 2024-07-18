---
date: 2021-9-14
updated: 2021-9-14
order: 60
---
## Characteristics of a Stream

The Stream API relies on a special object, an instance of the [`Spliterator`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html) interface. The name of this interface comes from the fact that the role of a spliterator in the Stream API looks like the role of an iterator has in the Collection API. Moreover, because the Stream API supports parallel processing, a spliterator object also controls how a stream splits its elements among the different CPUs that handle parallelization. The name is the contraction of _split_ and _iterator_.

Covering this spliterator object in details is beyond the scope of this tutorial. What you need to know is that this spliterator object carries the _characteristics_ of a stream. These characteristics are not something you will often use, but knowing what they are will help you to write better and more efficient pipelines in certain cases.

The characteristics of a stream are the following.

|Characteristic|Comment|
|---|---|
|[_ORDERED_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#ORDERED)|The order in which the elements of the stream are processed matters.|
|[_DISTINCT_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#DISTINCT)|There are no doubles in the elements processed by that stream.|
|[_NONNULL_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#NONNULL)|There are no null elements in that stream.|
|[_SORTED_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#SORTED)|The elements of that stream are sorted.|
|[_SIZED_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#SIZED)|The number of elements this stream processes is known.|
|[_SUBSIZED_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#SUBSIZED)|Splitting this stream produces two [_SIZED_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#SIZED) streams.|

There are two characteristics, [_IMMUTABLE_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#IMMUTABLE) and [_CONCURRENT_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#CONCURRENT), which are not covered in this tutorial.

Every stream has all these characteristics set or unset when it is created.

Remember that a stream can be created in two ways.

1. You can create a stream from a source of data, and we covered several different patterns.
2. Every time you call an intermediate operation on an existing stream, you create a new stream.

The characteristics of a given stream depend on the source it has been created on, or the characteristics of the stream with which it was created, and the operation that created it. If your stream is created with a source, then its characteristics depend on that source, and if you created it with another stream, then they will depend on this other stream and the type of operation you are using.

Let us present each characteristic in more details.

 

## Ordered Streams

[_ORDERED_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#ORDERED) streams are created with ordered sources of data. The fist example that may come to mind is any instance of the [`List`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html) interface. There are others: [`Files.lines(path)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#lines(java.nio.file.Path)) and [`Pattern.splitAsStream(string)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Pattern.html#splitAsStream(java.lang.CharSequence)) also produce [_ORDERED_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#ORDERED) streams.

Keeping track of the order of the elements of a stream may lead to overheads for parallel streams. If you do not need this characteristic, then you can delete it by calling the [`unordered()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/stream/BaseStream.html#unordered()) intermediate method on an existing stream. This will return a new stream without this characteristic. Why would you want to do that? Keeping a stream [_ORDERED_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#ORDERED) may be costly in some cases, for instance when you are using parallel streams.

 

## Sorted Streams

A [_SORTED_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#SORTED) stream is a stream that has been sorted. This stream can be created from a sorted source, such as a [`TreeSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/TreeSet.html) instance, or by a call to the [`sorted()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/stream/Stream.html#sorted()) method. Knowing that a stream has already been sorted may be used by the stream implementation to avoid sorting again an already sorted stream. This optimization may not be used all the time because a [_SORTED_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#SORTED) stream may be sorted again with a different comparator than the one used the first time.

There are some intermediate operations that clear the [_SORTED_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#SORTED) characteristic. In the following code, you can see that both `strings` and `filteredStream` are [_SORTED_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#SORTED) streams, whereas `lengths` is not.

```java
Collection<String> stringCollection = List.of("one", "two", "two", "three", "four", "five");

Stream<String> strings = stringCollection.stream().sorted();
Stream<String> filteredStrings = strings.filtered(s -> s.length() < 5);
Stream<Integer> lengths = filteredStrings.map(String::length);
```

Mapping or flatmapping a [_SORTED_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#SORTED) stream removes this characteristic from the resulting stream.

 

## Distinct Streams

A [_DISTINCT_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#DISTINCT) stream is a stream with no duplicates among the elements it is processing. Such a characteristic is acquired when building a stream from a [`HashSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/HashSet.html) for instance, or from a call to the [`distinct()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/stream/Stream.html#distinct()) intermediate method call.

The [_DISTINCT_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#DISTINCT) characteristic is kept when filtering a stream but is lost when mapping or flatmapping a stream.

Let us examine the following example.

```java
Collection<String> stringCollection = List.of("one", "two", "two", "three", "four", "five");

Stream<String> strings = stringCollection.stream().distinct();
Stream<String> filteredStrings = strings.filtered(s -> s.length() < 5);
Stream<Integer> lengths = filteredStrings.map(String::length);
```

- [`stringCollection.stream()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Collection.html#stream()) is not [_DISTINCT_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#DISTINCT) as it is build from an instance of [`List`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html).
- `strings` is [_DISTINCT_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#DISTINCT) as this stream is created by a call to the [`distinct()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/stream/Stream.html#distinct()) intermediate method.
- `filteredStrings` is still [_DISTINCT_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#DISTINCT): removing elements from a stream cannot create duplicates.
- `length` has been mapped, so the [_DISTINCT_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#DISTINCT) characteristic is lost.

 

## Non-Null Streams

A [_NONNULL_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#NONNULL) stream is a stream that does not contain null values. There are structures from the Collection Framework that do not accept null values, including [`ArrayDeque`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ArrayDeque.html) and the concurrent structures like [`ArrayBlockingQueue`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/concurrent/ArrayBlockingQueue.html), [`ConcurrentSkipListSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/concurrent/ConcurrentSkipListSet.html), and the concurrent set returned by a call to [`ConcurrentHashMap.newKeySet()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/concurrent/ConcurrentHashMap.html#newKeySet()). Streams created with [`Files.lines(path)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#lines(java.nio.file.Path)) and [`Pattern.splitAsStream(line)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Pattern.html#splitAsStream(java.lang.CharSequence)) are also [_NONNULL_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#NONNULL) streams.

As for the previous characteristics, some intermediate operations can produce a stream with different characteristics.

- Filtering or sorting a [_NONNULL_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#NONNULL) stream returns a [_NONNULL_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#NONNULL) stream.
- Calling [`distinct()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/stream/Stream.html#distinct()) on a [_NONNULL_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#NONNULL) stream also returns a [_NONNULL_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#NONNULL) stream.
- Mapping or flatmapping a [_NONNULL_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#NONNULL) stream returns a stream without this characteristic.

 

## Sized and Subsized Streams

### Sized Streams

This last characteristic is very important when you want to use parallel streams. Parallel streams are covered in more detail later in this tutorial.

A [_SIZED_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#SIZED) stream is a stream that knows how many elements it will process. A stream created from any instance of [`Collection`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Collection.html) is such a stream because the [`Collection`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Collection.html) interface has a [`size()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Collection.html#size()) method, so getting this number is easy.

On the other hand, there are cases where you know that your stream will process a finite number of elements, but you cannot know this number unless you process the stream itself.

This is the case for streams created with the [`Files.lines(path)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Files.html#lines(java.nio.file.Path)) pattern. You can get the size of the text file in bytes, but this information does not tell you how many lines this text file has. You need to analyze the file to get this information.

This is also the case for the [`Pattern.splitAsStream(line)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/regex/Pattern.html#splitAsStream(java.lang.CharSequence)) pattern. Knowing the number of characters there are in the string you are analyzing does not give any hint about how many elements this pattern will produce.

### Subsized Streams

The [_SUBSIZED_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#SUBSIZED) characteristic has to do with the way a stream is split when computed as a parallel stream. In a nutshell, the parallelization mechanism splits a stream in two parts and distribute the computation among the different available cores on which the CPU is executing. This splitting is implemented by the instance of the [`Spliterator`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html) the stream uses. This implementation depends on the source of data you are using.

Suppose that you need to open a stream on an [`ArrayList`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ArrayList.html). All the data of this list is held in the internal array of your [`ArrayList`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ArrayList.html) instance. Maybe you remember that the internal array on an [`ArrayList`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ArrayList.html) object is a compact array because when you remove an element from this array, all the following elements are moved one cell to the left so that no hole is left.

This makes the splitting an [`ArrayList`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ArrayList.html) straightforward. To split an instance of [`ArrayList`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ArrayList.html), you can just split this internal array in two parts, with the same amount of elements in both parts. This makes a stream created on an instance of [`ArrayList`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ArrayList.html) [_SUBSIZED_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#SUBSIZED): you can tell in advance how many elements will be held in each part after splitting.

Suppose now that you need to open a stream on an instance of [`HashSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/HashSet.html). A [`HashSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/HashSet.html) stores its elements in an array, but this array is used differently than the one used by [`ArrayList`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ArrayList.html). In fact, more than one element can be stored in a given cell of this array. There is no problem in splitting this array, but you cannot tell in advance how many elements will be held in each part without counting them. Even if you split this array by the middle, you can never be sure that you will have the same number of elements in both halves. This is the reason why a stream created on an instance of [`HashSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/HashSet.html) is [_SIZED_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#SIZED) but not [_SUBSIZED_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#SUBSIZED).

Transforming a stream may change the [_SIZED_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#SIZED) and [_SUBSIZED_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#SUBSIZED) characteristics of the returned stream.

- Mapping and sorting a stream preserves the [_SIZED_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#SIZED) and [_SUBSIZED_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#SUBSIZED) characteristics.
- Flatmapping, filtering, and calling [`distinct()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/stream/Stream.html#distinct()) erases these characteristics.

It is always better to have [_SIZED_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#SIZED) and [_SUBSIZED_](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Spliterator.html#SUBSIZED) stream for parallel computations.
