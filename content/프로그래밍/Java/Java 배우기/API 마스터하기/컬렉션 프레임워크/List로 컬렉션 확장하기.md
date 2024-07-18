---
date: 2021-9-14
updated: 2021-9-14
order: 50
---
## List 인터페이스 살펴보기

[`List`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html) 인터페이스는 일반 컬렉션에 두 가지 새로운 기능을 추가했습니다.

- 목록의 요소를 반복하는 순서는 항상 동일하며, 이 목록에 요소가 추가된 순서를 따릅니다.
- 목록의 요소에는 색인이 있습니다.

 

## List 인터페이스 구현 선택하기

컬렉션 프레임워크에는 [`Collection`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Collection.html) 인터페이스가 특별히 구현되어 있지 않지만(하위 인터페이스의 구현에 의존함), [`List`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html) 인터페이스에는 [`ArrayList`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ArrayList.html)와 [`LinkedList`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/LinkedList.html) 두 가지가 있습니다. 짐작할 수 있듯이 첫 번째는 내부 배열을 기반으로 하고 두 번째는 이중 링크된 목록을 기반으로 합니다.

이 구현 중 어느 것이 다른 구현보다 낫나요? 어느 것을 선택해야 할지 잘 모르겠다면 아마도 [`ArrayList`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ArrayList.html)를 선택하는 것이 가장 좋을 것입니다.

60년대에 컴퓨팅이 발명되었을 때 LinkedList에 대해 사실이었던 것은 더 이상 유지되지 않으며, 삽입 및 삭제 작업에서 배열을 능가하는 LinkedList의 성능은 최신 하드웨어, CPU 캐시 및 포인터 추격으로 인해 크게 감소했습니다. [`ArrayList`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ArrayList.html)의 요소를 반복하는 것이 [`LinkedList`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/LinkedList.html)의 요소를 반복하는 것보다 훨씬 빠르며, 이는 주로 포인터 추격과 CPU 캐시 미스 때문이죠.

LinkedList가 배열보다 빠른 경우가 여전히 있습니다. 이중-LinkedList는 [`ArrayList`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ArrayList.html)보다 첫 번째와 마지막 요소에 더 빠르게 액세스할 수 있습니다. 이것이 [`LinkedList`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/LinkedList.html)가 [`ArrayList`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ArrayList.html)보다 나은 주요 사용 사례입니다. 따라서 애플리케이션에 후입선출(LIFO, 이 튜토리얼의 뒷부분에서 다룹니다) 스택이나 선입선출(FIFO, 나중에 다룹니다) 대기 큐가 필요한 경우 연결된 목록을 선택하는 것이 최선의 선택일 수 있습니다.

반면에 목록의 요소를 반복하거나 인덱스에 따라 무작위로 액세스하려는 경우 [`ArrayList`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ArrayList.html)를 사용하는 것이 가장 좋습니다.

 

## 색인을 사용하여 요소에 액세스하기

[`List`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html) 인터페이스는 인덱스를 처리하는 여러 메서드를 [`Collection`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Collection.html) 인터페이스에 제공합니다.

### 단일 객체에 액세스하기

- [`add(index, element)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html#add(int,E)): 주어진 객체를 `index`에 삽입하고, 남은 요소가 있으면 인덱스를 조정합니다.
- [`get(index)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html#get(int)): 주어진 `index`에 있는 객체를 반환합니다.
- [`set(index, element)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html#set(int,E)): 주어진 인덱스의 요소를 새 요소로 바꿉니다.
- [`remove(index)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html#remove(int)): 주어진 `index`에서 요소를 제거하여 나머지 요소의 인덱스를 조정합니다.

이 메서드 호출은 유효한 인덱스에 대해서만 작동합니다. 지정된 인덱스가 유효하지 않으면 [`IndexOutOfBoundsException`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/IndexOutOfBoundsException.html) 예외가 발생합니다.

### 객체의 Index 찾기

[`indexOf(element)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html#indexOf(java.lang.Object)) 및 [`lastIndexOf(element)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html#lastIndexOf(java.lang.Object)) 메서드는 목록에서 지정된 요소의 색인을 반환하거나 요소를 찾을 수 없는 경우 -1을 반환합니다.

### subList 가져오기

[`subList(start, end)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html#subList(int,int))는 `start`와 `end - 1` 사이의 요소로 구성된 List를 반환합니다. 인덱스가 유효하지 않은 경우 [`IndexOutOfBoundsException`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/IndexOutOfBoundsException.html) 예외가 발생합니다.

반환된 List는 메인 List의 보기라는 점에 유의하세요. 따라서 subList에 대한 모든 수정 작업은 메인 List에 반영되며 그 반대의 경우도 마찬가지입니다.

예를 들어 다음과 같은 패턴으로 목록 콘텐츠의 일부를 지울 수 있습니다:

```java
List<String> strings = new ArrayList<>(List.of("0", "1", "2", "3", "4", "5"));
System.out.println(strings);
strings.subList(2, 5).clear();
System.out.println(strings);
```

이 코드를 실행하면 다음과 같은 결과가 나타납니다:

```text
[0, 1, 2, 3, 4, 5]
[0, 1, 5]
```

### 컬렉션 삽입하기

이 목록의 마지막 패턴은 주어진 인덱스에 컬렉션을 삽입하는 것입니다: [`addAll(int index, Collection collection)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html#addAll(int,java.util.Collection)).

 

## List의 요소 정렬하기

목록은 요소를 알려진 순서대로 유지합니다. 이것이 일반 컬렉션과의 주요 차이점입니다. 따라서 목록의 요소를 정렬하는 것이 합리적입니다. 이것이 바로 JDK 8의 [`sort()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html#sort(java.util.Comparator)) 메서드가 [`List`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html) 인터페이스에 추가된 이유입니다.

Java SE 7 이전 버전에서는 [`Collections.sort()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html)를 호출하여 [`List`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Collections.html#sort(java.util.List))의 요소를 정렬하고 필요한 경우 비교기와 함께 목록을 인수로 전달할 수 있습니다.

Java SE 8부터는 목록에서 직접 [`sort()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html#sort(java.util.Comparator))를 호출하고 비교기를 인수로 전달할 수 있습니다. 인수를 받지 않는 이 메서드에는 오버로드가 없습니다. 널 비교기로 호출하면 [`List`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html)의 요소가 [`Comparable`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/Comparable.html)을 구현한다고 가정하고, 그렇지 않은 경우 [`ClassCastException`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/ClassCastException.html)을 반환합니다.

메서드 호출이 인수를 무효화하는 것이 마음에 들지 않는다면(그리고 맞습니다!), [`Comparator.naturalOrder()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Comparator.html#naturalOrder()로 호출하여 동일한 결과를 얻을 수 있습니다.

 

## List의 요소 반복하기

[`List`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html) 인터페이스는 [`ListIterator`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ListIterator.html)를 사용하여 요소를 반복할 수 있는 또 다른 방법을 제공합니다. 이러한 이터레이터는 [`listIterator()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html#listIterator())를 호출하여 얻을 수 있습니다. 이 메서드는 인자 없이 호출하거나 정수 인덱스를 전달할 수 있습니다. 이 경우 이 인덱스에서 반복이 시작됩니다.

[`ListIterator`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ListIterator.html) 인터페이스는 이미 알고 있는 일반 [`Iterator`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/Iterator.html)를 확장한 것입니다. 여기에는 몇 가지 메서드가 추가됩니다.

- [`hasPrevious()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ListIterator.html#hasPrevious()) 및 [`previous()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ListIterator.html#previous()): 오름차순이 아닌 내림차순으로 반복합니다.
- [`nextIndex()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ListIterator.html#nextIndex()) 및 [`previousIndex()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ListIterator.html#previousIndex()): 다음 [`next()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ListIterator.html#next()) 호출 또는 다음 [`previous()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ListIterator.html#previous()) 호출에서 반환될 요소의 인덱스를 가져옵니다.
- [`set(element)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ListIterator.html#set(E)): [`next()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ListIterator.html#next()) 또는 [`previous()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ListIterator.html#previous())에서 반환한 마지막 요소를 업데이트합니다. 이 이터레이터에서 이 두 메서드 중 어느 것도 호출되지 않으면 [`IllegalStateException`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/IllegalStateException.html)이 발생합니다.

이 [`set()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/ListIterator.html#set(E)) 메서드가 실제로 작동하는 모습을 살펴봅시다:

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

이 코드를 실행하면 다음과 같은 결과가 표시됩니다:

```text
numbers = [one, 2, three]
```
