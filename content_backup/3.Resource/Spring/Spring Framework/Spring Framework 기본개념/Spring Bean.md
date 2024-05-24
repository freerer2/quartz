## 정의
- Spring 애플리케이션을 구성하는 POJO(Plain Old Java Object)
- IoC 컨테이너에 의해 생성 및 관리된다
>[!note]- POJO란?
>어려울거 없다. 자바로 만드는 모든 객체(클래스)를 뜻한다

>[!note]- [[IoC Container]]란?
>별거 없고 그냥 객체를 관리해주는 친구이다.

## 구성요소
- class: Bean으로 등록할 Java 클래스 
- id: Bean의 고유 식별자 
- scope: Bean을 생성하기 위한 방법(singleton, prototype 등) 
- constructor-arg: Bean 생성 시 생성자에 전달할 파라미터 
- property: Bean 생성 시 setter에 전달할 인수

위의 구성요소를 바탕으로 등록 된 Bean을 [[Singleton Pattern|싱글톤]] 객체로 생성하여 관리한다.

# **Links**
---
- [[Spring Bean 등록 방법(스프링 빈 생성 방법)]]
- [[Spring Framework Dependency Injection]]