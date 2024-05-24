## @Component
- 현재 인스턴스는 스프링 프레임워크에 의해 관리될 것입니다. 라는 어노테이션
## Dependency
- 특정 클래스 기능 실행시 다른 클래스의 구현체가 필요한 것(의존 관계)
## Component Scan
- 스프링이 컴포넌트 클래스들을 찾는 것.
## Dependency Injection
- 클래스 실행 시 컴포넌트 스캔을 하며 모든 구성요소를 찾게 되고 각 컴포넌트들의 의존 관계를 확인 하고 연결(wiring)해주는 것(IoC Container가 제공하는 기능).
### Spring Bean
	- Spring이 관리하는 모든 Java 객체
### IoC(Inversion of Control)
- 각 객체를 생성하기 위해 프로그래머가 명시적으로 코드를 작성해서 의존성을 통해 객체를 생성 하는 것이 아닌 (예 : `Class class = new Class(dependObject)`) Spring Framework에서 해주는 것을 말함
- 즉 객체의 제어권이 프로그래머에서 Spring Framework에 넘어 간 것
### [[IoC Container]]
- Bean의 생명주기와 의존성을 관리하는 Spring Framwork의 컴포넌트
### Autowiring
- Spring Bean에 대한 의존성 연결 프로세스
- Spring이 특정 Bean을 만나면 Bean에게 필요한 의존성이 무엇인지 식별하는 역할