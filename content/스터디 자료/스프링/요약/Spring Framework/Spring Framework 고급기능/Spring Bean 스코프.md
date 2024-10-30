## Example
```java
@Component
class NormalClass {

}

@Scope(value=ConfigurableBeanFactory.Scope_PROTOTYPE)
@Component
class PrototypeClass {

}

@Configuration
@ComponentScan
public class Application {

	public static void main(String[] args){

		try(var context = new AnnotationConfigApplicationContext(Application.class)){
			System.out.println(context.getBean(NormalClass.class));
			System.out.println(context.getBean(NormalClass.class));
			
			System.out.println(context.getBean(PrototypeClass.class));
			System.out.println(context.getBean(PrototypeClass.class));
			System.out.println(context.getBean(PrototypeClass.class));
		}
	}
}
```
## 공통
### Prototype
- Bean을 요청 할 때마다 새로운 인스턴스를 생성함
- Spring [[IoC Container]]당 객체 인스턴스가 여러개
### Singletone
- 하나의 인스턴스만 생성함. 한번 생성되면 그 뒤에 Bean을 아무리 요청해도 이전에 생성된 인스턴스만 사용함
- Spring [[IoC Container]]당 객체 인스턴스가 하나
## 웹 어플리케이션 전용
### Request
- HTTP 요청을 할 때 마다 인스턴스를 생성함
### Session
- Session 마다 인스턴스를 생성함
### Application
- 웹 어플리케이션 전체에서 객체가 단 하나
### Websocket
- 웹 소켓별로 인스턴스를 생성함
## Java Singleton vs Spring Singleton
### Spring Singleton
- Spring [[IoC Container]]마다 객체 인스턴스가 하나
### Java Singleton
- JVM(Java 가상 머신)마다 객체 인스턴스가 하나
### 근데?
- 대부분의 경우가 JVM 하나에 Spring Application을 하나만 올림
## Prototype vs Singleton

| Heading      | Prototype                                             | Singleton                                                            |
| :----------- | :---------------------------------------------------- | :------------------------------------------------------------------- |
| 인스턴스         | Spring [[IoC Container]]마다 객체 인스턴스가 여러개               | Spring [[IoC Container]]마다 객체 인스턴스가 하나                               |
| Beans        | Bean을 참조할 때 마다 새로운 인스턴스를 생성함                          | 기존에 생성된 Bean을 재사용함                                                   |
| 기본값 여부       | NO                                                    | YES                                                                  |
| Code Snippet | @Scope(value=ConfigurableBeanFactory.Scope_PROTOTYPE) | @Scope(value=ConfigurableBeanFactory.Scope_SINGLTON) OR (@Scope 미사용) |
| 사용빈도         | 가끔                                                    | 매번                                                                   |
| 추천사항         | 상태를 관리하는 Bean(사용자 정보)                                 | 매번                                                                   |
## 의문점
- 초기화는 인스턴스 생성 시 진행 될 텐데 스코프가 Singletone타입이 아닐 경우 객체 초기화는 언제 이루어 지는가
	- (예상) IoC 컨테이너에서 초기화 시점과 사용할 때 인스턴스를 생성하는 시점을 다르게 해놨을 수 있을 것 같음 초기화가 완료 된 객체를 가지고 인스턴스를 생성하면 되는거 아님?