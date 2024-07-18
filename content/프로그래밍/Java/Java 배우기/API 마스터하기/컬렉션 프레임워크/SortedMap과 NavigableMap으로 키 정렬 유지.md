---
date: 2021-9-14
updated: 2021-9-14
order: 120
---
## SortedMap에 추가된 메서드

JDK는 [`Map`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Map.html) 인터페이스의 두 가지 확장을 제공합니다: [`SortedMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html)과 [`NavigableMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html). [`NavigableMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html)은 [`SortedMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html)의 확장입니다. 두 인터페이스는 모두 같은 클래스에 의해 구현됩니다: [`TreeMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/TreeMap.html) 클래스는 잘 알려진 데이터 구조인 레드-블랙랙 트리입니다.

[`SortedMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html) 및 [`NavigableMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html)은 키/값 쌍을 키별로 정렬된 상태로 유지합니다. [`SortedSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedSet.html) 및 [`NavigableSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableSet.html)과 마찬가지로 이러한 키를 비교할 수 있는 방법을 제공해야 합니다. 이를 위한 두 가지 해결책이 있습니다: 키의 클래스에서 [`Comparable`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/Comparable.html)을 구현하거나 [`TreeMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/TreeMap.html)을 만들 때 키에 대한 [`Comparator`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Comparator.html)를 제공하는 것입니다. [`Comparator`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Comparator.html)를 제공하면 키가 비슷하더라도 비교자가 사용됩니다.

만약 [`SortedMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html) 또는 [`NavigableMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html)에 대해 선택한 구현이 [`TreeMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/TreeMap.html)이라면, [`keySet()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Map.html#keySet()) 또는 [`entrySet()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Map.html#entrySet())에 대한 호출로 반환된 set를 [`SortedSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedSet.html) 또는 [`NavigableSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableSet.html)에 안전하게 캐스팅할 수 있습니다. [`NavigableMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html)에는 일반 [`keySet()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Map.html#keySet()) 메서드 대신 사용할 수 있는 [`NavigableSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableSet.html)의 인스턴스를 반환하는 [`navigableKeySet()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#navigableKeySet()) 메서드가 있습니다. 두 메서드 모두 동일한 객체를 반환합니다.

[`SortedMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html) 인터페이스는 [`Map`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Map.html)에 다음 메서드를 추가합니다:

- [`firstKey()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html#firstKey()) 및 [`lastKey()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html#lastKey()): map의 가장 낮은 키와 가장 큰 키를 반환합니다;
- [`headMap(toKey)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html#headMap(K)) 및 [`tailMap(fromKey)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html#tailMap(K)): 키가 `toKey`보다 작거나 `fromKey`보다 크거나 같은 [`SortedMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html)을 반환합니다;
- [`subMap(fromKey, toKey)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html#subMap(K,K)): 키가 `toKey`보다 엄격하게 작거나 `fromKey`보다 크거나 같은 [`SortedMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html)을 반환합니다.

이 맵은 [`SortedMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html)의 인스턴스이며 이 맵에 의해 뒷받침되는 뷰입니다. 이 Map에 대한 모든 변경 사항은 이 보기에서 볼 수 있습니다. 이러한 보기는 업데이트할 수 있지만 사용자가 만든 Map의 경계 외부에 키를 삽입할 수 없다는 제한이 있습니다.

다음 예제에서 이 동작을 확인할 수 있습니다:
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

 

## NavigableMap에 추가된 메서드

### 특정 키 또는 항목에 액세스하기

[`NavigableMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html)은 [`SortedMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html)에 더 많은 메서드를 추가합니다. 첫 번째 메서드 세트는 Map의 특정 키와 항목에 대한 액세스를 제공합니다.

- [`firstKey()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#firstKey()), [`firstEntry()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#firstEntry()), [`lastEntry()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#lastEntry()), [](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html#lastKey())[`lastKey()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedMap.html#lastKey()): 이 맵에서 가장 낮거나 큰 키 또는 엔트리를 반환합니다.
- [`ceilingKey(key)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#ceilingKey(K)), [`ceilingEntry(key)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#ceilingEntry(K)), [`higherKey(key)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#higherKey(K)), [`higherEntry(key)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#higherEntry(K)): 가장 낮은 키 또는 제공된 키보다 큰 엔트리를 반환합니다. `ceiling` 메서드는 제공된 키와 동일한 키를 반환할 수 있지만, `higher` 메서드가 반환하는 키는 엄밀히 말하면 더 큰 키입니다.
- [`floorKey(key)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#floorKey(K)), [`floorEntry(key)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#floorEntry(K)), [`lowerKey(key)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#lowerKey(K)), [`lowerEntry(key)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#lowerEntry(K)): 제공된 키보다 큰 키 또는 작은 항목을 반환합니다. `floor` 메서드는 제공된 키와 같은 키를 반환할 수 있지만 `higher` 메서드가 반환하는 키는 엄밀히 말해 더 낮습니다.

### Queue-Like 기능으로 Map에 액세스하기

두 번째 세트는 Queue와 유사한 기능을 제공합니다:

- [`pollFirstEntry()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#pollFirstEntry()): 가장 낮은 항목을 반환하고 제거합니다.
- [`pollLastEntry()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#pollLastEntry()): 가장 큰 항목을 반환하고 제거합니다.

### 역순으로 Map 트래버스하기

세 번째 Set은 마치 역 비교 로직에 기반한 것처럼 Map을 반전시킵니다.

- [`navigableKeySet()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#navigableKeySet())은 [`keySet()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Map.html#keySet())의 결과를 캐스팅할 필요가 없도록 [`NavigableSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableSet.html)을 반환하는 편리한 메서드입니다.
- [`descendingKeySet()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#descendingKeySet()): 내림차순으로 반복할 수 있는 Map에 의해 뒷받침되는 [`NavigableSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableSet.html)을 반환합니다.
- [`descendingMap()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#descendingMap()): 동일한 의미를 가진 [`NavigableMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html)을 반환합니다.

두 뷰 모두 요소 제거를 지원하지만 이를 통해 아무것도 추가할 수 없습니다.

다음은 두 뷰를 사용하는 방법을 보여주는 예제입니다.

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

이 코드를 실행하면 다음과 같은 결과가 출력됩니다.

```text
1 2 3 4 5 
5 4 3 2 1 
```

### 하위 Submap 뷰 가져오기

마지막 메서드 세트는 Map의 일부에 대한 보기에 액세스할 수 있게 해줍니다.

- [`subMap(fromKey, fromInclusive, toKey, toInclusive)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#subMap(K,boolean,K,boolean)): 경계를 포함할지 여부를 결정할 수 있는 하위 맵을 반환합니다.
- [`headMap(toKey, inclusive)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#headMap(K)): 헤드 맵과 동일합니다.
- [`tailMap(fromKey, inclusive)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableMap.html#tailMap(K)): 꼬리 맵과 동일합니다.

이러한 맵은 이 맵의 보기이며, 키/값 쌍을 제거하거나 추가하여 업데이트할 수 있습니다. 하지만 요소를 추가할 때 한 가지 제한 사항이 있습니다. 뷰가 만들어진 경계 밖에서는 키를 추가할 수 없습니다.

