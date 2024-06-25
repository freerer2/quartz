---
order: 4
---
## StringBuilder 클래스

[`String`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/String.html) 객체는 수정이 가능하다는 점을 제외하면 [`StringBuilder`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html) 객체와 비슷합니다. 내부적으로 이러한 객체는 일련의 문자를 포함하는 가변 길이 배열처럼 취급됩니다. 언제든 메서드 호출을 통해 시퀀스의 길이와 내용을 변경할 수 있습니다.

문자열 빌더가 코드 간소화(이 섹션 끝에 있는 샘플 프로그램 참조) 또는 성능 향상 측면에서 이점을 제공하지 않는 한 항상 문자열을 사용해야 합니다. Java SE 9 이전에는 많은 수의 문자열을 연결해야 하는 경우 StringBuilder 객체에 추가하는 것이 더 효율적일 수 있습니다. Java SE 9에서는 문자열 연결이 최적화되어 [`StringBuilder`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html) 추가보다 더 효율적으로 연결할 수 있습니다.

 

## 길이 및 용량

[`String`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html) 클래스는 [`String`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/String.html) 클래스와 마찬가지로 빌더에 문자 시퀀스의 길이를 반환하는 [`length()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html#length()) 메서드가 있습니다.

문자열과 달리 모든 문자열 빌더에는 할당된 문자 공간의 수인 용량도 있습니다. [`capacity()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html#capacity()) 메서드가 반환하는 용량은 항상 길이보다 크거나 같으며(일반적으로 더 큼), 문자열 빌더에 추가되는 문자를 수용하기 위해 필요에 따라 자동으로 확장됩니다.

다음 [`StringBuilder`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html) 클래스의 생성자를 사용할 수 있습니다:

- [`StringBuilder()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html#%3Cinit%3E()): 16(빈 요소 16개)의 용량을 가진 빈 문자열 빌더를 만듭니다.
- [`StringBuilder(CharSequence cs)`](https://docs.oracle.com/en/java/javase/22/docs/api/java/lang/StringBuilder.html#%3Cinit%3E(java.lang.CharSequence)): 지정된 [`CharSequence`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/CharSequence.html)와 동일한 문자를 포함하는 문자열 빌더와 [`CharSequence`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/CharSequence.html) 뒤에 빈 엘리먼트 16개를 추가로 생성합니다.
- [`StringBuilder(int initCapacity)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html#%3Cinit%3E(int)): 지정된 초기 용량을 가진 빈 문자열 빌더를 만듭니다.
- [`StringBuilder(String s)`](https://docs.oracle.com/en/java/javase/22/docs/api/java/lang/StringBuilder.html#%3Cinit%3E(java.lang.String)): 지정된 문자열로 값이 초기화되고 문자열 뒤에 16개의 빈 요소가 추가되는 문자열 빌더를 만듭니다.

예를 들어 다음 코드가 있습니다.

```java
// creates empty builder, capacity 16
StringBuilder sb = new StringBuilder();
// adds 9 character string at beginning
sb.append("Greetings");
```

길이가 9이고 용량이 16인 문자열 빌더를 생성합니다:

![Length and capacity of a `StringBuilder`](https://dev.java/assets/images/numbers-strings/04_stringbuilder.png)

`StringBuilder`의 길이와 용량

[`StringBuilder`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html) 클래스에는 길이와 용량과 관련된 몇 가지 메서드가 있는데, [`String`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/String.html) 클래스에는 없는 메서드입니다:

- [`void setLength(int newLength)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html#setLength(int)): 문자 시퀀스의 길이를 설정합니다. `newLength`가 [`length()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html#length())보다 작으면, 문자 시퀀스의 마지막 문자가 잘립니다. `newLength`가 [`length()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html#length())보다 크면, 문자 시퀀스 끝에 `null` 문자가 추가됩니다.
- [`void ensureCapacity(int minCapacity)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html#ensureCapacity(int)): 용량이 지정된 최소값 이상인지 확인합니다.

여러 연산(예: [`append()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html#append(java.lang.Object)), [`insert()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html#insert(int,java.lang.Object)) 또는 [`setLength()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html#setLength(int))은 문자열 빌더에서 문자 시퀀스의 길이를 늘려서 결과 [`length()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html#length())가 현재 [`capacity()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html#capacity())보다 크도록 할 수 있습니다. 이 경우 용량이 자동으로 증가합니다.

 

## 문자열 빌더 연산

[`String`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/String.html)에서 사용할 수 없는 [`StringBuilder`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html)의 주요 연산은 모든 타입의 데이터를 허용하도록 오버로드된 [`append()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html#append(java.lang.Object)) 및 [`insert()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html#insert(int,java.lang.Object)) 메서드입니다. 각각 인수를 문자열로 변환한 다음 해당 문자열의 문자를 문자열 빌더의 문자 시퀀스에 추가하거나 삽입합니다. 추가 메서드는 항상 기존 문자 시퀀스의 끝에 문자를 추가하는 반면 삽입 메서드는 지정된 지점에 문자를 추가합니다.

다음은 [`StringBuilder`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html) 클래스의 여러 메서드입니다.

- 기본 타입이나 객체는 [`append()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html#append(java.lang.Object)) 메서드를 사용하여 문자열 빌더에 추가할 수 있습니다. 데이터는 추가 연산이 수행되기 전에 문자열로 변환됩니다.
- [`delete(int start, int end)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html#delete(int,int)) 메서드는 [`StringBuilder`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html)의 문자 시퀀스에서 `start`부터 `end - 1`까지(포함)의 시퀀스를 삭제합니다.
- 인덱스 `index`에서 `char`를 삭제하려면 [`deleteCharAt(int index)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html#deleteCharAt(int)) 메서드를 사용하면 됩니다.
- 주어진 `오프셋`에 원시 타입이나 객체를 삽입하려면 [`insert(int offset)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html#insert(int,java.lang.Object)) 메서드 중 하나를 사용하여 삽입할 수 있습니다. 이 메서드는 삽입할 요소를 두 번째 인수로 받습니다. 데이터는 삽입 작업이 수행되기 전에 문자열로 변환됩니다.
- [`replace(int start, int end, String s)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html#replace(int,int,java.lang.String)) 및 [`setCharAt(int index, char c)`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html#setCharAt(int,char)) 메서드를 사용하여 문자를 바꿀 수 있습니다.
- [`reverse()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html#reverse()) 메서드를 사용하여 이 문자열 빌더의 문자 순서를 반대로 바꿀 수 있습니다.
- [`toString()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html#toString()) 메서드를 사용하여 빌더의 문자 시퀀스가 포함된 문자열을 반환할 수 있습니다.

> Note: 문자열 빌더를 문자열로 변환하려면 먼저 [`StringBuilder`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html) 클래스의 [`toString()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html#toString()) 메서드를 사용하여 문자열 빌더를 문자열로 변환하면 [`String`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/String.html) 객체에서 모든 [`String`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html) 메서드를 사용할 수 있습니다. 그런 다음 [`StringBuilder(String string)`](https://docs.oracle.com/en/java/javase/22/docs/api/java/lang/StringBuilder.html#%3Cinit%3E(java.lang.String)) 존스트럭터를 사용하여 문자열을 다시 문자열 빌더로 변환합니다.

 

## StringBuilder in Action

"문자열"이라는 제목의 섹션에 나열된 `StringDemo` 프로그램은 [`String`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/String.html) 대신 [`StringBuilder`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html)를 사용하면 더 효율적일 수 있는 프로그램의 예입니다.

`StringDemo`는 팔린드롬을 반전시켰습니다. 다음은 다시 한 번 그 목록입니다:

```java
public class StringDemo {
    public static void main(String[] args) {
        String palindrome = "Dot saw I was Tod";
        int len = palindrome.length();
        char[] tempCharArray = new char[len];
        char[] charArray = new char[len];
        
        // put original string in an 
        // array of chars
        for (int i = 0; i < len; i++) {
            tempCharArray[i] = 
                palindrome.charAt(i);
        } 
        
        // reverse array of chars
        for (int j = 0; j < len; j++) {
            charArray[j] =
                tempCharArray[len - 1 - j];
        }
        
        String reversePalindrome =
            new String(charArray);
        System.out.println(reversePalindrome);
    }
}
```

프로그램을 실행하면 이 출력이 생성됩니다:

```shell
doT saw I was toD
```

문자열 반전을 수행하기 위해 프로그램은 문자열을 문자 배열로 변환하고(첫 번째 `for` 루프), 배열을 두 번째 배열로 반전시킨 다음(두 번째 `for` 루프), 다시 문자열로 변환하는 과정을 거칩니다.

팔린드롬 문자열을 문자열 빌더로 변환하는 경우 [`StringBuilder`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html) 클래스에서 [`reverse()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html#reverse()) 메서드를 사용할 수 있습니다. 이렇게 하면 코드가 더 간단하고 읽기 쉬워집니다:

```java
public class StringBuilderDemo {
    public static void main(String[] args) {
        String palindrome = "Dot saw I was Tod";
         
        StringBuilder sb = new StringBuilder(palindrome);
        
        sb.reverse();  // reverse it
        
        System.out.println(sb);
    }
}
```

이 프로그램을 실행하면 동일한 출력이 생성됩니다:

```shell
doT saw I was toD
```

[`println()`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/PrintStream.html#println(java.lang.Object))는 다음과 같이 문자열 빌더를 출력합니다:

```java
System.out.println(sb);
```

왜냐하면 `sb.toString()`은 [`println`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/PrintStream.html#println(java.lang.Object)) 호출에서 다른 객체와 마찬가지로 암시적으로 호출되기 때문입니다.

> Note: 메서드가 동기화되어 있어 스레드 안전하다는 점을 제외하면 [`StringBuffer`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuffer.html) 클래스는 [`StringBuilder`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuilder.html) 클래스와 완전히 동일합니다. 스레드 safe 클래스가 꼭 필요한 경우가 아니라면 [`StringBuffer`](https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/lang/StringBuffer.html)를 사용할 필요가 없습니다.

---
Last update: September 14, 2021