---
title: 명령형에서 함수형 스타일로 리팩토링하기
aliases:
  - 명령형에서 함수형 스타일로 리팩토링하기
order: 140
---

이 튜토리얼에서는 흔히 볼 수 있는 명령형 스타일 코드에 해당하는 함수형 스타일을 배우는 데 도움이 됩니다. 프로젝트를 진행하면서 적절한 경우 이 자습서에서 배운 매핑을 사용하여 명령형 스타일 코드를 함수형 스타일 코드로 변경할 수 있습니다.

이 시리즈에서는 명령형에서 기능형 스타일로의 전환을 다음과 같이 다룹니다:

| Tutorial                 | 명령형 스타일                                 | 같은 기능의 함수형 스타일                 |
| ------------------------ | --------------------------------------- | ------------------------------ |
| [[단순 루프 변환하기]]           | `for()`                                 | `range()` or `rangeClosed()`   |
| [[단계가 있는 루프 변환하기]]       | `for(...i = i + ...)`                   | `iterate()` with `takeWhile()` |
| [[if를 사용한 foreach 변환하기]] | `foreach(...) { if... }`                | `stream()` with `filter()`     |
| [[변환을 사용하여 반복문 변환하기]]    | `foreach(...) { ...transformation... }` | `stream()` with `map()`        |
| [[데이터 소스를 스트림으로 변환]]     | `File read operation`                   | `Files.lines()`                |

  

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
	