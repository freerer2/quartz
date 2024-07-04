---
date: 2024-07-04
updated: 2024-07-04
order: 50
---
## Exploring the List Interface

The [`List`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html) interface brings two new functionalities to plain collections.

- This order in which you iterate over the elements of a list is always the same, and it respects the order in which the elements have been added to this list.
- The elements of a list have an index.

 

## Choosing your Implementation of the List Interface

While the [`Collection`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Collection.html) interface as no specific implementation in the Collections Framework (it relies on the implementations of its sub-interfaces), the [`List`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html) interface has 2: [`ArrayList`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ArrayList.html) and [`LinkedList`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/LinkedList.html). As you may guess, the first one is built on an internal array, and the second on a doubly-linked list.

Is one of these implementation better than the other? If you are not sure which one to choose, then your best choice is probably [`ArrayList`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ArrayList.html).

What was true for linked lists when computing was invented in the 60's does not hold anymore, and the capacity of linked lists to outperform arrays on insertion and deletion operations is greatly diminished by modern hardware, CPU caches, and pointer chasing. Iterating over the elements of an [`ArrayList`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ArrayList.html) is much faster that over the elements of a [`LinkedList`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/LinkedList.html), mainly due to pointer chasing and CPU cache misses.

There are still cases where a linked list is faster than an array. A doubly-linked list can access its first and last element faster than an [`ArrayList`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ArrayList.html) can. This is the main use case that makes [`LinkedList`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/LinkedList.html) better than [`ArrayList`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ArrayList.html). So if your application needs a Last In, First Out (LIFO, covered later in this tutorial) stack, or a First In, First Out (FIFO, also covered later) waiting queue, then choosing a linked list is probably your best choice.

On the other hand, if you plan to iterate through the elements of your list, or to access them randomly by their index, then the [`ArrayList`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ArrayList.html) is probably your best bet.

 

## Accessing the Elements Using an Index

The [`List`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html) interface brings several methods to the [`Collection`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Collection.html) interface, that deal with indexes.

### Accessing a Single Object

- [`add(index, element)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html#add(int,E)): inserts the given object at the `index`, adjusting the index if there are remaining elements
- [`get(index)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html#get(int)): returns the object at the given `index`
- [`set(index, element)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html#set(int,E)): replaces the element at the given index with the new element
- [`remove(index)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html#remove(int)): removes the element at the given `index`, adjusting the index of the remaining elements.

Calling these methods work only for valid indexes. If the given index is not valid then an [`IndexOutOfBoundsException`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/IndexOutOfBoundsException.html) exception will be thrown.

### Finding the Index of an Object

The methods [`indexOf(element)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html#indexOf(java.lang.Object)) and [`lastIndexOf(element)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html#lastIndexOf(java.lang.Object)) return the index of the given element in the list, or -1 if the element is not found.

### Getting a SubList

The [`subList(start, end)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html#subList(int,int)) returns a list consisting of the elements between indexes `start` and `end - 1`. If the indexes are invalid then an [`IndexOutOfBoundsException`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/IndexOutOfBoundsException.html) exception will be thrown.

Note that the returned list is a view on the main list. Thus, any modification operation on the sublist is reflected on the main list and vice-versa.

For instance, you can clear a portion of the content of a list with the following pattern:

```java
List<String> strings = new ArrayList<>(List.of("0", "1", "2", "3", "4", "5"));
System.out.println(strings);
strings.subList(2, 5).clear();
System.out.println(strings);
```

Running this code gives you the following result:

```text
[0, 1, 2, 3, 4, 5]
[0, 1, 5]
```

### Inserting a Collection

The last pattern of this list is about inserting a collection at a given indexes: [`addAll(int index, Collection collection)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html#addAll(int,java.util.Collection)).

 

## Sorting the Elements of a List

A list keeps its elements in a known order. This is the main difference with a plain collection. So it makes sense to sort the elements of a list. This is the reason why a [`sort()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html#sort(java.util.Comparator)) method has been added to the [`List`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html) interface in JDK 8.

In Java SE 7 and earlier, you could sort the elements of your [`List`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html) by calling [`Collections.sort()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Collections.html#sort(java.util.List)) and pass you list as an argument, along with a comparator if needed.

Starting with Java SE 8 you can call [`sort()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html#sort(java.util.Comparator)) directly on your list and pass your comparator as an argument. There is no overload of this method that does not take any argument. Calling it with a null comparator will assume that the elements of your [`List`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html) implement [`Comparable`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/Comparable.html), you will get a [`ClassCastException`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/ClassCastException.html) if this is not the case.

If you do not like calling methods will null arguments (and you are right!), you can still call it with [`Comparator.naturalOrder()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Comparator.html#naturalOrder()) to achieve the same result.

 

## Iterating over the Elements of a List

The [`List`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html) interface gives you one more way to iterate over its elements with the [`ListIterator`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ListIterator.html). You can get such an iterator by calling [`listIterator()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html#listIterator()). You can call this method with no argument, or pass an integer index to it. In that case, the iteration will start at this index.

The [`ListIterator`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ListIterator.html) interface extends the regular [`Iterator`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Iterator.html) that you already know. It adds several methods to it.

- [`hasPrevious()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ListIterator.html#hasPrevious()) and [`previous()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ListIterator.html#previous()): to iterate in the descending order rather than the ascending order
- [`nextIndex()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ListIterator.html#nextIndex()) and [`previousIndex()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ListIterator.html#previousIndex()): to get the index of the element that will be returned by the next [`next()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ListIterator.html#next()) call, or the next [`previous()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ListIterator.html#previous()) call
- [`set(element)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ListIterator.html#set(E)): to update the last element returned by [`next()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ListIterator.html#next()) or [`previous()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ListIterator.html#previous()). If neither of these methods have been called on this iterator then an [`IllegalStateException`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/IllegalStateException.html) is raised.

Let us see this [`set()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ListIterator.html#set(E)) method in action:

```java
List<String> numbers = Arrays.asList("one", "two", "three");
for (ListIterator<String> iterator = numbers.listIterator(); iterator.hasNext();) {
    String nextElement = iterator.next();
    if (Objects.equals(nextElement, "two")) {
        iterator.set("2");
    }
}
System.out.println("numbers = " + numbers);
```

Running this code will give you the following result:

```text
numbers = [one, 2, three]
```

---
Last update: September 14, 2021