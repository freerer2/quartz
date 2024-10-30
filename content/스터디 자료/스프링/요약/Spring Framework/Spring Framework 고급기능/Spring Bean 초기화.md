## 즉시 초기화
```java
@Component
class ClassB {

	private ClassA classA;

	public ClassB(ClassA classA){
		//ClassB가 호출되지 않아도 초기화 됨
		System.out.println("초기화");
		this.classA = classA;
	}
}

@Configuration
@ComponentScan
public class Application {

	public static void main(String[] args){

		try(var context = new AnnotationConfigApplicationContext(Application.class)){}

	}
	
}
```
- Spring Bean의 기본 초기화
- Bean을 로드하지 않고 Bean에서 메서드를 호출하지 않더라도 자동으로 Bean이 초기화 됨
- Spring 구성에 오류가 있으면 Application이 빌드되어 실행 될 때 바로 알 수 있음

## 지연 초기화
```java
@Component
@Lazy
class ClassB {

	private ClassA classA;

	public ClassB(ClassA classA){
		//doSomething 함수가 다른곳에서 호출되면 초기화 됨
		System.out.println("초기화");
		this.classA = classA;
	}

	public void doSomething(){
		System.out.println("아무거나");
	}
}

@Configuration
@ComponentScan
public class Application {

	public static void main(String[] args){

		try(var context = new AnnotationConfigApplicationContext(Application.class)){
			context.getBean(ClassB.class).doSomething;
		}
	}
	
}
```
- @Lazy 어노테이션을 Component Class 또는 Bean Method에 선언하면 지연 초기화가 됨.
- 해당 Class & Method는 호출되면 초기화가 됨
- Spring 구성에 문제가 있다면 초기화가 될 때 까지 에러 발생이 안되므로 위험 부담이 있음.
- 다만 복잡하고 시작 시 초기화 할 필요가 없다면 사용할 수 있음

## Lazy Initalization vs Eager Initalization

| Heading       | Lazy Initalization              | Eager Initalization               |
| :------------ | :------------------------------ | :-------------------------------- |
| 초기화 시점        | 런타임 중간에 Application 내부에서 사용시    | Application이 시작 될 때               |
| 기본값 여부        | NO                              | YES                               |
| Code Snippet  | @Lazy OR @Lazy(value=true)      | @Lazy(value=false) OR (@Lazy 미사용) |
| 초기화 시 에러나는 시점 | 런타임 중간에 Application 내부에서 사용시    | Application이 시작 될 때               |
| 사용빈도          | 가끔                              | 매번                                |
| 메모리 사용량       | 적음(Bean이 시작 될 때 초기화 되므로)        | 많음(모든 Bean이 시작시 초기화 되므로)          |
| 추천사항          | Bean이 복잡하고 시작 시 초기화 할 필요가 없을 경우 | 매번                                |

## 요약
- 웬만하면 즉시 초기화 써라