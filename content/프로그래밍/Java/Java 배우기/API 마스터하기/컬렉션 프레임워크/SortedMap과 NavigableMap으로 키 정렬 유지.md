---
date: 2024-07-04
updated: 2024-07-04
order: 120
---
## Methods Added by SortedMap

The JDK provides two extensions of the [`Map`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Map.html) interface: [`SortedMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html) and [`NavigableMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html). [`NavigableMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html) is an extension of [`SortedMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html). Both interfaces are implemented by the same class: [`TreeMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/TreeMap.html). The [`TreeMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/TreeMap.html) class is a red-black tree, a well-known data structure.

[`SortedMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html) and [`NavigableMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html) keep their key/value pairs sorted by key. Just as for [`SortedSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedSet.html) and [`NavigableSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableSet.html), you need to provide a way to compare these keys. You have two solutions to do this: either the class of your keys implements [`Comparable`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/Comparable.html), or you provide a [`Comparator`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Comparator.html) for your keys when creating your [`TreeMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/TreeMap.html). If you provide a [`Comparator`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Comparator.html), it will be used even if your keys are comparable.

If the implementation you chose for your [`SortedMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html) or [`NavigableMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html) is [`TreeMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/TreeMap.html), then you can safely cast the set returned by a call to [`keySet()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Map.html#keySet()) or [`entrySet()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Map.html#entrySet()) to [`SortedSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedSet.html) or [`NavigableSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableSet.html). [`NavigableMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html) has a method, [`navigableKeySet()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#navigableKeySet()) that returns an instance of [`NavigableSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableSet.html) that you can use instead of the plain [`keySet()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Map.html#keySet()) method. Both methods return the same object.

The [`SortedMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html) interface adds the following methods to [`Map`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Map.html):

- [`firstKey()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html#firstKey()) and [`lastKey()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html#lastKey()): returns the lowest and the greatest key of your map;
- [`headMap(toKey)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html#headMap(K)) and [`tailMap(fromKey)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html#tailMap(K)): returns a [`SortedMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html) whose keys are strictly less than `toKey`, or greater than or equal to `fromKey`;
- [`subMap(fromKey, toKey)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html#subMap(K,K)): returns a [`SortedMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html) whose keys are strictly lesser than `toKey`, or greater than or equal to `fromKey`.

These maps are instances of [`SortedMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html) and are views backed by this map. Any change made to this map will be seen in these views. These views can be updated, with a restriction: you cannot insert a key outside the boundaries of the map you built.

You can see this behavior on the following example:

```java
SortedMap<Integer, String> map = new TreeMap<>();
map.put(1, "one");
map.put(2, "two");
map.put(3, "three");
map.put(5, "five");
map.put(6, "six");

SortedMap<Integer, String> headMap = map.headMap(3);
headMap.put(0, "zero"); // this line is ok
headMap.put(4, "four"); // this line throws an IllegalArgumentException
```

 

## Methods Added by NavigableMap

### Accessing to Specific Keys or Entries

The [`NavigableMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html) adds more methods to [`SortedMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html). The first set of methods gives you access to specific keys and entries in your map.

- [`firstKey()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#firstKey()), [`firstEntry()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#firstEntry()), [`lastEntry()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#lastEntry()), and [](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html#lastKey())[`lastKey()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html#lastKey()): return the lowest or greatest key or entry from this map.
- [`ceilingKey(key)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#ceilingKey(K)), [`ceilingEntry(key)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#ceilingEntry(K)), [`higherKey(key)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#higherKey(K)), [`higherEntry(key)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#higherEntry(K)): return the lowest key or entry greater than the provided key. The `ceiling` methods may return a key that is equal to the provided key, whereas the key returned by the `higher` methods is strictly greater.
- [`floorKey(key)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#floorKey(K)), [`floorEntry(key)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#floorEntry(K)), [`lowerKey(key)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#lowerKey(K)), [`lowerEntry(key)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#lowerEntry(K)): return the greatest key or entry lesser than the provided key. The `floor` methods may return a key that is equal to the provided key, whereas the key returned by the `higher` methods is strictly lower.

### Accessing your Map with Queue-Like Features

The second set gives you queue-like features:

- [`pollFirstEntry()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#pollFirstEntry()): returns and removes the lowest entry
- [`pollLastEntry()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#pollLastEntry()): returns and removes the greatest entry.

### Traversing your Map in the Reverse Order

The third set reverses your map, as if it had been built on the reversed comparison logic.

- [`navigableKeySet()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#navigableKeySet()) is a convenience method that returns a [`NavigableSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableSet.html) so that you do not have to cast the result of [`keySet()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Map.html#keySet())
- [`descendingKeySet()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#descendingKeySet()): returns a [`NavigableSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableSet.html) backed by the map, on which you can iterate in the descending order
- [`descendingMap()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#descendingMap()): returns a [`NavigableMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html) with the same semantic.

Both views support element removal, but you cannot add anything through them.

Here is an example to demonstrate how you can use them.

```java
NavigableMap<Integer, String> map = new TreeMap<>();
map.put(1, "one");
map.put(2, "two");
map.put(3, "three");
map.put(4, "four");
map.put(5, "five");

map.keySet().forEach(key -> System.out.print(key + " "));
System.out.println();

NavigableSet<Integer> descendingKeys = map.descendingKeySet();
descendingKeys.forEach(key -> System.out.print(key + " "));
```

Running this code prints out the following result.

```text
1 2 3 4 5 
5 4 3 2 1 
```

### Getting Submap Views

The last set of methods give you access to views on portions of your map.

- [`subMap(fromKey, fromInclusive, toKey, toInclusive)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#subMap(K,boolean,K,boolean)): returns a submap where you can decide to include or not the boundaries
- [`headMap(toKey, inclusive)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#headMap(K)): same for the head map
- [`tailMap(fromKey, inclusive)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#tailMap(K)): same for the tail map.

These maps are views on this map, which you can update by removing or adding key/value pairs. There is one restriction on adding elements though: you cannot add keys outside the boundaries on which the view has been created.

---
Last update: September 14, 2021