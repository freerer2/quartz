## @Configuration, @Bean
```java
@Configuration
public class BeanConfig {

    @Bean
    public Resource resource() {
        return new Resource();
    }
    
    @Bean(name = "resource2")
    @Primary
    public Resource resource2() {
        return new Resource();
    }
    
    @Bean(name = "resource3")
    @Qualifier("resource3Qualifier")
    public Resource resource3() {
        return new Resource();
    }
}
```
- 스프링 컨테이너는 @Configuration이 붙어있는 클래스를 자동으로 빈으로 등록해두고, 해당 클래스를 파싱해서 @Bean이 있는 메소드를 찾아서 빈을 생성해준다.
- 하지만 어떤 임의의 클래스를 만들어서 @Bean 어노테이션을 붙인다고 되는 것이 아니고, @Bean을 사용하는 클래스에는 반드시 @Configuration 어노테이션을 활용하여 해당 클래스에서 Bean을 등록하고자 함을 명시해주어야 한다.
- 스프링 빈으로 등록된 다른 클래스 안에서 @Bean으로 직접 빈을 등록해주는 것도 동작은 한다. 하지만 @Configuration 안에서 @Bean을 사용해야 싱글톤을 보장받을 수 있다.
- 이러한 @Bean 어노테이션의 경우는 수동으로 빈을 직접 등록해줘야만 하는 상황인데, 주로 다음과 같을 때 사용한다.
	1. 개발자가 직접 제어가 불가능한 라이브러리를 활용할 때
	2. 애플리케이션 전범위적으로 사용되는 클래스를 등록할 때
	3. 다형성을 활용하여 여러 구현체를 등록해주어야 할 때
### 요약
- 수동으로 스프링 컨테이너에 빈을 등록하는 방법
- 개발자가 직접 제어가 불가능한 라이브러리를 빈으로 등록할 때 불가피하게 사용
- 유지보수성을 높이기 위해 애플리케이션 전범위적으로 사용되는 클래스나 다형성을 활용하여 여러 구현체를 빈으로 등록 할 때 사용
- 1개 이상의 @Bean을 제공하는 클래스의 경우 반드시 @Configuration을 명시해 주어야 싱글톤이 보장됨

#### 한줄요약
- 남이 만든 모든 클래스는 @Configuration, @Bean을 사용하자.

## @Component
```java
@Component
public class Resource {

	public void func(){
		System.out.println("ㅎㅇ");
	}
	
}
```
- 스프링 빈을 수동으로 등록하는 것은 너무 비효율적이다
- 스프링은 컴포넌트 스캔(@ComponentScan)을 사용해 @Component 어노테이션이 있는 클래스들을 찾아서 자동으로 빈 등록을 해준다.
- 그래서 우리가 직접 개발한 클래스를 빈으로 편리하게 등록하고자 하는 경우에는 @Component 어노테이션을 활용하면 된다.
- 스프링은 기본적으로 컴포넌트 스캔을 이용한 자동 빈 등록 방식을 권장한다. 또한 직접 개발한 클래스는 @Component를 통해 해당 클래스를 빈으로 등록함을 노출하는 것이 좋다. 왜냐하면 해당 클래스에 있는 @Component만 보면 해당 빈이 등록되도록 잘 설정되었는지를 바로 파악할 수 있기 때문이다
### 요약
- 자동으로 스프링 컨테이너에 빈을 등록하는 방법
- 스프링의 컴포넌트 스캔 기능이 @Component 어노테이션이 있는 클래스를 자동으로 찾아서 빈으로 등록함
- 대부분의 경우 @Component를 이용한 자동 등록 방식을 사용하는 것이 좋음
- @Component 하위 어노테이션으로 @Configuration, @Controller, @Service, @Repository 등이 있음
#### 한줄요약
- 내가 만든 모든 클래스는 @Component를 사용하자 

## Bean 이름 지정 기준
1. 이름을 명시 하지 않을 때
	- @Bean : 소문자로 시작하는 메서드 이름
	- @Component : 소문자로 시작하는 클래스 이름

1. 이름을 명시 할 때
	- @Bean : `@Bean(name="이름")`
	- @Component : `@Component("이름")`

## Bean 우선순위 및 한정자(alias) 부여
1. @Primary : @Autowired(스프링 4.3 이상 생략 가능) 또는 를 통한 동일 Bean 호출 시 우선순위를 부여한다.
2. @Qualifier : Alias를 부여한다.

## 의문점
### Bean name과 Qualifier의 차이는?
- @Bean : 스프링이 관리하는 빈으로 등록하기 위한 코드
- @Qualifier : 스프링이 빈을 식별하기 위한 어노테이션(Alias)
- Bean을 등록하는 관점, 사용하는 관점으로 보면 된다.

### 각기 다른 Bean에서 (name="") 과 Qualifier가 동일 한 경우는?
1. 고양이 함수에 @Bean, 멍멍이 함수에 @Qualifier("고양이")
	- 호출 시 동일 우선순위로 인한 충돌에러
2. 고양이 함수에 @Qualifier("호랑이"), 멍멍이 함수에 @Bean("호랑이")
	- 호출 시 동일 우선순위로 인한 충돌에러

# **Links**
---
- [[Spring Bean]]
- [[Spring Framework Dependency Injection]]