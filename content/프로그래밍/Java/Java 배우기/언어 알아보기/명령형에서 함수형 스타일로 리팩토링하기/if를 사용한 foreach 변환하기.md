---
date: 2023-11-14
updated: 2023-11-14
order: 30
---
## foreach로 반복하기

[[프로그래밍/Java/Java 배우기/언어 알아보기/명령형에서 함수형 스타일로 리팩토링하기/index|튜토리얼 시리즈]]의 이전 글에서는 명령형으로 작성된 루프를 함수형으로 변환하는 방법을 살펴봤습니다. 이번 글에서는 `foreach`를 사용해 명령형 반복문을 함수형으로 변환하는 방법을 살펴보겠습니다. 또한 `if` 변환을 사용하여 선택 요소를 함수형 스타일로 변환하는 방법도 살펴보겠습니다.

Java 5에는 매우 인기 있는 `foreach` 구문이 도입되었습니다. 예를 들어, 이름을 나타내는 `String`의 컬렉션을 반복하려면 `for(String name: names)`과 같이 작성합니다. 내부적으로 `foreach`는 바이트코드 수준에서 `Iterator`를 사용하도록 변환되며, 이터레이터는 다른 요소가 있다는 것을 알려주면 처리를 위해 다음 요소를 가져옵니다. 다시 말해, `foreach`는 `Iterator`가 제공하는 요소에 대한 `while` 루프를 사용한 반복을 위한 간결한 Syntax Sugar입니다. 우리는 `foreach`를 함수형 스타일로 아주 쉽게 변환할 수 있습니다. 방법을 살펴보겠습니다.

 

## 명령형에서 함수형 스타일로 전환하기

다음은 이름 모음에 대해 `foreach`를 사용하는 반복의 예입니다:

```java
List<String> names = List.of("Jack", "Paula", "Kate", "Peter");
  
for(String name: names) {
  System.out.println(name);
}
```

반복이 주어진 컬렉션의 한 요소에서 다음 요소로 진행됨에 따라 반복의 각 단계에서 `name` 변수는 새로운 값에 바인딩됩니다. 명령형 스타일인 `foreach`를 함수형 스타일로 변환하는 것은 `forEach` 내부 이터레이터 메서드를 바로 사용하는 것입니다. 다음 요소로의 전진이 외부적으로 또는 명시적으로 처리되는 것이 아니라 내부적으로 자동으로 처리되기 때문에 internal iterator라고 부릅니다.

함수형 스타일을 사용하도록 루프를 리팩터링해 보겠습니다.

```java
List<String> names = List.of("Jack", "Paula", "Kate", "Peter");
  
names.forEach(name -> System.out.println(name));
```

이는 매우 간단합니다. `for` 루프는 컬렉션의 `forEach()` 메서드 호출로 바뀌었습니다. 반복의 각 단계에서 `forEach()`에 인수로 제공된 람다가 컬렉션의 다음 요소와 함께 호출됩니다.

이 반복을 `stream()`을 사용하여 약간 변형한 것이 다음에 나와 있습니다.

```java
List<String> names = List.of("Jack", "Paula", "Kate", "Peter");
  
names.stream()
  .forEach(name -> System.out.println(name));
```

`forEach()` 메서드는 `Collection<T>`와 `Stream<T>`에서 모두 사용할 수 있습니다. 곧 사용하게 될 `filter()`와 같은 함수형은 `Stream<T>`에서만 사용할 수 있고 `Collection`에서는 사용할 수 없습니다. 이는 `forEach()`, `findFirst()` 등과 같이 여러 중간 연산이 터미널 연산에 선행될 수 있는 경우 효율성을 제공하기 위한 설계입니다.

 

## if를 사용하여 선택 요소 선택

반복 도중에 특정 조건에 따라 컬렉션에서 일부 값을 선택하고자 한다고 가정해 보겠습니다. 예를 들어 길이가 4인 이름만 인쇄하고 싶다면 어떻게 해야 할까요? 명령형 스타일에서는 다음과 같이 할 수 있습니다:

```java
List<String> names = List.of("Jack", "Paula", "Kate", "Peter");
  
for(String name: names) {
  if(name.length() == 4) {
    System.out.println(name);
  }
}
```

함수형 스타일의 경우, `Stream`의 `filter` 메서드는 명령형 스타일인 `if`를 직접 대체하게 됩니다. `filter` 메서드는 `filter()` 메서드에 람다로 전달된 predicate가 `true`로 평가되면 컬렉션의 요소를 함수형 파이프라인의 다음 단계로 통과시키고, 그렇지 않으면 더 이상 처리하지 않고 값을 버립니다.

이전 코드를 함수형으로 변환해 보겠습니다:

```java
List<String> names = List.of("Jack", "Paula", "Kate", "Peter");
  
names.stream()
  .filter(name -> name.length() == 4)
  .forEach(name -> System.out.println(name));
```

`filter()` 메서드는 게이트처럼 작동하며, 반복이 진행됨에 따라 일부 요소를 통과시키기 위해 열리고 일부 요소를 거부하거나 버리기 위해 닫힙니다.

이전 기사에서 전통적인 `for` 루프에 해당하는 함수형 스타일을 살펴봤습니다. 이번 기사에서는 Java 5의 명령형 스타일인 `foreach`가 함수형 스타일에서 어떻게 우아한 구문으로 변환되는지 살펴보았습니다. 또한 명령형 스타일의 루프 내의 `if` 조건은 `Stream` API의 `filter()` 메서드에 대한 호출로 변환됩니다.

 

## 매핑하기

`foreach` 루프가 보이는 곳에서는 컬렉션에서 직접 `forEach()` 메서드를 사용하세요. `foreach`의 본문에 일부 값을 선택적으로 선택하는 `if` 문이 있는 경우 `stream()` API를 `filter()` 메서드 호출과 함께 사용하세요.
