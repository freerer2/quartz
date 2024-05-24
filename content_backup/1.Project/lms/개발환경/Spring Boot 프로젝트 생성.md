## ⚡️ Spring Boot

#### 🖥️ Intellij Spring Boot 프로젝트 생성

> File > New > Project

![[Pasted image 20240421170033.png]]

Spring Boot 버전에 호환되는 Java 버전을 선택하면 된다.  
참고로 Spring Boot 3 버전 이상부터는 Java 17 버전 이상으로 지원한다고 한다.

Type은 Build 도구이니 본인이 편한 도구를 선택하여 주고 다음으로 넘어가자.

JDK는 17을 사용하는게 정신건강에 좋더라 (gradle빌드시 java 22를 완벽히 지원 안하는 모양)

#### 🖥️ Spring Boot 버전선택 및 의존성 추가

![[Pasted image 20240421173836.png]]

Spring Web까지 세가지가 가장 기본적으로 추가되는 의존성이다.
나는 PostgreSQL도 같이 쓸거라 드라이버를 추가해줬다.

#### 🖥️ 프로젝트 설정

[[JDK 세팅]]을 완료 한 뒤

![[Pasted image 20240421174156.png]]

Default로 Gradle로 사용하겠다고 설정되어있을텐데 이 부분을 Intellij IDE로 바꿔주고, 하단의 Gradle JVM 버전을 동일하게 맞춰주면 된다.

#### 🖥️ 프로젝트 실행

설정이 완료되었다면 Application 클래스를 실행시켜보자.

![[Pasted image 20240421174413.png]]

정상적으로 실행되면 출력되는 결과이다.

정상적으로 실행된 결과를 확인하기 위해 [http://localhost:8080](http://localhost:8080/) 경로로 접속해보자.

![[Pasted image 20240421174516.png]]

에러페이지가 출력이 되었다면 정상적으로 서버가 가동되고 있는 상태이다.