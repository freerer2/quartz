---
date: 2021-9-14
updated: 2021-9-14
order: 60
---
## Set 인터페이스 살펴보기

[`Set`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Set.html) 인터페이스는 [`Collection`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Collection.html) 인터페이스에 새로운 메서드를 가져오지 않습니다. 컬렉션 프레임워크는 [`Set`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Set.html) 인터페이스의 하나의 일반 구현을 제공합니다: [`HashSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/HashSet.html). 내부적으로, [`HashSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/HashSet.html)은 나중에 다룰 클래스인 [`HashMap`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/HashMap.html)의 인스턴스를 래핑하여 [`HashSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/HashSet.html)의 대리자 역할을 수행합니다.

이미 보셨듯이 [`Set`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Set.html)이 [`Collection`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Collection.html)에 가져다주는 것은 중복을 금지한다는 것입니다. [`List`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html) 인터페이스에 비해 잃는 것은 요소가 특정한 순서 없이 저장된다는 점입니다. 세트에 추가한 것과 같은 순서로 반복할 가능성이 거의 없습니다.

다음 예제에서 이를 확인할 수 있습니다:

```java
List<String> strings = List.of("one", "two", "three", "four", "five", "six");
Set<String> set = new HashSet<>();
set.addAll(strings);
set.forEach(System.out::println);
```

이 코드를 실행하면 다음과 같은 결과가 생성됩니다:

```text
six
four
one
two
three
five
```

[`Set`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Set.html)의 일부 구현은 해당 요소를 반복할 때 동일한 순서를 제공하지만 이는 보장되지 않으므로 코드에서 이에 의존해서는 안 됩니다.

 

## SortedSet으로 Set 확장

[`Set`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Set.html)의 첫 번째 확장은 [`SortedSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedSet.html) 인터페이스입니다. [`SortedSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedSet.html) 인터페이스는 특정 비교 논리에 따라 요소를 정렬된 상태로 유지합니다. 컬렉션 프레임워크는 [`SortedSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedSet.html)의 한 가지 구현인 [`TreeSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/TreeSet.html)을 제공합니다.

이미 보셨듯이, [`TreeSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/TreeSet.html)을 빌드할 때 비교기를 제공하거나, TreeSet에 넣은 요소에 대해 [`Comparable`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/Comparable.html) 인터페이스를 구현할 수 있습니다. 두 가지를 모두 수행하면 비교기가 우선합니다.

[`SortedSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedSet.html) 인터페이스는 [`Set`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Set.html)에 새로운 메서드를 추가합니다.

- [`first()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/TreeSet.html#first()) 및 [`last()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/TreeSet.html#last()는 집합의 가장 낮은 요소와 가장 큰 요소를 반환합니다.
- [`headSet(toElement)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/TreeSet.html#headSet(E)) 및 [`tailSet(fromElement)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/TreeSet.html#tailSet(E))는 `toElement`보다 낮거나 `fromElement`보다 큰 요소를 포함하는 하위 집합을 반환합니다.
- [`subSet(fromElement, toElement)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/TreeSet.html#subSet(E,E))는 `fromElement`와 `toElement` 사이의 요소의 하위 집합을 반환합니다.

`toElement`와 `fromElement`는 기본 집합의 요소일 필요는 없습니다. 만약 그렇다면, 일반적인 규칙에 따라 `toElement`는 결과에 포함되지 않고 `fromElement`는 포함됩니다.

다음 예를 생각해 보세요:

```java
SortedSet<String> strings = new TreeSet<>(Set.of("a", "b", "c", "d", "e", "f"));
SortedSet<String> subSet = strings.subSet("aa", "d");
System.out.println("sub set = " + subSet);
```

이 코드를 실행하면 다음과 같은 결과가 표시됩니다:

```text
sub set = [b, c]
```

이 메서드가 반환하는 세 개의 하위 집합은 메인 집합의 _views_ 입니다. 복사본이 만들어지지 않으므로 이러한 하위 집합에 대한 모든 변경 사항이 집합에 반영되며, 그 반대의 경우도 마찬가지입니다.

You can remove or add elements to the main set through these subsets. There is one point you need to keep in mind though. These three subsets remember the limits on which they have been built. For consistency reasons, it is not legal to add an element through a subset outside its limits. For instance, if you take a [`headSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedSet.html#headSet(E)) and try to add an element greater than `toElement`, then you will get an [`IllegalArgumentException`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/IllegalArgumentException.html).

 

## SortedSet을 NavigableSet으로 확장하기

Java SE 6에서는 더 많은 메서드가 추가된 [`SortedSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/SortedSet.html)의 확장이 도입되었습니다. [`TreeSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/TreeSet.html) 클래스가 [`NavigableSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableSet.html)을 구현하도록 개조된 것으로 밝혀졌습니다. 따라서 두 인터페이스 모두에 동일한 클래스를 사용할 수 있습니다.

일부 메서드는 [`NavigableSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableSet.html)에 의해 오버로드됩니다.

- [`headSet()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableSet.html#headSet(E)), [`tailSet()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableSet.html#tailSet(E)), [`subSet()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableSet.html#subSet(E))은 추가 `부울` 인수를 받아 결과 하위 집합에 제한(`toElement` 또는 `fromElement`)을 포함할지 여부를 지정할 수 있습니다.

다른 방법이 추가되었습니다.

- [`ceiling(element)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableSet.html#ceiling(E)), [`floor(element)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableSet.html#floor(E))는 제공된 `element`보다 작거나 같은 가장 큰 요소 또는 가장 크거나 같은 가장 낮은 요소를 반환합니다. 그러한 요소가 없으면 `null`이 반환됩니다.
- [`lower(element)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableSet.html#lower(E))와 [`higher(element)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableSet.html#higher(E)는 제공된 `element`보다 큰 요소 또는 가장 작은 요소를 반환합니다. 이러한 요소가 없으면 `null`이 반환됩니다.
- [`pollFirst()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableSet.html#pollFirst()) 및 [`pollLast()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableSet.html#pollLast())는 집합의 가장 낮은 요소 또는 가장 큰 요소를 반환하고 제거합니다.

또한 [`NavigableSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableSet.html)을 사용하면 해당 요소를 내림차순으로 반복할 수도 있습니다. 이를 수행하는 방법은 두 가지가 있습니다.

- [`descendingIterator()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableSet.html#descendingIterator())을 호출하면 내림차순으로 집합을 순회하는 일반 [`Iterator`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Iterator.html)를 얻을 수 있습니다.
- [`descendingSet()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableSet.html#descendingSet())을 호출하면 있습니다. 이 집합에 대한 뷰를 얻을 수 있으며 이는 동일한 집합이 역순으로 정렬된 것처럼 보이게 하는 또 다른 [`NavigableSet`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/NavigableSet.html)입니다.

다음 예는 이를 보여줍니다.

```java
NavigableSet<String> sortedStrings = new TreeSet<>(Set.of("a", "b", "c", "d", "e", "f"));
System.out.println("sorted strings = " + sortedStrings);
NavigableSet<String> reversedStrings = sortedStrings.descendingSet();
System.out.println("reversed strings = " + reversedStrings);
```

이 코드를 실행하면 다음과 같은 결과가 표시됩니다:

```text
sorted strings = [a, b, c, d, e, f]
reversed strings = [f, e, d, c, b, a]
```
