---
title: 명령형에서 함수형 스타일로 리팩토링하기
aliases:
  - 명령형에서 함수형 스타일로 리팩토링하기
---

This page was contributed by [Venkat Subramaniam](https://dev.java/author/VenkatSubramaniam) under the [UPL](https://oss.oracle.com/licenses/upl/)  

This part of the tutorial helps you to learn the functional style equivalent of the imperative style code we often find. As you move forward in your projects, wherever it makes sense, you can change imperative style code to functional style code using the mappings you learn in this tutorial.

In this series we cover the following conversions from the imperative to the functional style:

|Tutorial|Imperative Style|Functional Style Equivalent|
|---|---|---|
|[Converting Simple Loops](https://dev.java/learn/refactoring-to-functional-style/simpleloops/)|`for()`|`range()` or `rangeClosed()`|
|[Converting Loops with Steps](https://dev.java/learn/refactoring-to-functional-style/loopswithsteps/)|`for(...i = i + ...)`|`iterate()` with `takeWhile()`|
|[Converting foreach with if](https://dev.java/learn/refactoring-to-functional-style/foreachwithif/)|`foreach(...) { if... }`|`stream()` with `filter()`|
|[Converting Iteration with transformation](https://dev.java/learn/refactoring-to-functional-style/iteartionwithtransformation/)|`foreach(...) { ...transformation... }`|`stream()` with `map()`|
|[Converting to Streams](https://dev.java/learn/refactoring-to-functional-style/convertingtostreams/)|`File read operation`|`Files.lines()`|

  

1. [[단순 루프 변환하기]]
	단순 명령형 루프를 함수형 스타일로 변환하기.
	
2. [[단계가 있는 루프 변환하기]]
	단계가 있는 명령형 루프를 함수형 스타일로 변환하기.
	
3. [[if를 사용한 foreach 변환하기]]
	if를 사용한 명령형 반복을 함수형 스타일로 변환하기.
	
4. [[변환을 사용하여 반복문 변환하기]]
	변환이 있는 명령형 반복을 함수형 스타일로 변환하기.
	
5. [[데이터 소스를 스트림으로 변환]]
	데이터 소스를 스트림으로 변환하기.
	