## Var 키워드

Java SE 10부터는 `var` 타입 식별자를 사용하여 지역 변수를 선언할 수 있습니다. 이렇게 하면 컴파일러가 생성하는 변수의 실제 타입이 무엇인지 결정하도록 할 수 있습니다. 일단 생성되면 이 타입은 변경할 수 없습니다.

다음 예제를 살펴보겠습니다.

```java
String message = "Hello world!";
Path path = Path.of("debug.log");
InputStream stream = Files.newInputStream(path);
```

이 경우 세 변수의 명시적 타입을 `message`, `path`, `stream`으로 선언해야 하는 것은 중복됩니다.

`var` 타입 식별자를 사용하면 이전 코드를 다음과 같이 작성할 수 있습니다:

```java
var message = "Hello world!";
var path = Path.of("debug.log");
var stream = Files.newInputStream(path);
```

 

## Var의 예시

다음 예제는 `var` 타입 식별자를 사용하여 코드를 더 읽기 쉽게 만드는 방법을 보여줍니다. 여기서 `strings` 변수에는 [`List<String>`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/util/List.html) 타입이 지정되고 `element` 변수에는 [`String`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/String.html) 타입이 지정됩니다.

```java
var list = List.of("one", "two", "three", "four");
for (var element: list) {
    System.out.println(element);
}
```

이 예제에서 `path` 변수는 [`Path`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/nio/file/Path.html) 타입이고, `stream` 변수는 [`InputStream`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/InputStream.html) 타입입니다.

```java
var path = Path.of("debug.log");
try (var stream = Files.newInputStream(path)) {
    // process the file
}
```

앞의 두 예제에서 `var`를 사용하여 for 문과 try-with-resources 문에서 변수를 선언했습니다. 이 두 문은 이 튜토리얼의 뒷부분에서 다룹니다.

 

## Var 사용에 대한 제한 사항

`var` 타입 식별자 사용에는 제한이 있습니다.

1. 메서드, 생성자 및 이니셜라이저 블록에 선언된 _로컬 변수_에만 사용할 수 있습니다.
2. 메서드나 생성자 매개변수가 아닌 필드에는 `var`를 사용할 수 없습니다.
3. 컴파일러는 변수가 선언될 때 타입을 선택할 수 있어야 합니다. null`은 타입이 없으므로 변수에는 이니셜라이저가 있어야 합니다.

이러한 제한에 따라 다음 클래스는 필드 또는 메서드 매개변수에 `var`를 타입 식별자로 사용할 수 없으므로 컴파일되지 않습니다.

```java
public class User  {
    private var name = "Sue";

    public void setName(var name) {
        this.name = name;
    }
}
```

다음 코드도 마찬가지입니다.

이 경우 컴파일러는 이니셜라이저가 없기 때문에 `greetings`의 실제 타입을 추측할 수 없습니다.

```java
public String greetings(int message) {
    var greetings;
    if (message == 0) {
        greetings = "morning";
    } else {
        greetings = "afternoon";
    }
    return "Good " + greetings;
}
```

---
Last update: September 23, 2021