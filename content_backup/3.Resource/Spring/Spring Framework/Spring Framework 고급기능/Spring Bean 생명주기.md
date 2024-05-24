## Example
```java
@Component
class SomeClass {
	private SomeSependency someSependency;
	
	public SomeClass(SomeSependency someSependency){
		super();
		this.someSependency = someSependency;
		System.out.println("모든 의존성들이 준비됨");
	}

	@PostConstruct
	public void initialize(){
		someSependency.getReady();
	}

	@PreDestroy
	public void cleanup(){
		System.out.println("cleanup");
	}
	
}

@Component
class SomeSependency {
	public void getReady(){
		System.out.println("SomeSependency을 사용함");
	}

}

@Configuration
@ComponentScan
public class Application {

	public static void main(String[] args){

		try(var context = new AnnotationConfigApplicationContext(SomeClass.class)){
		}
	}
}
```
## PostConstruct
- 컨테이너에서 bean 초기화 직후에 Method를 바로 실행함
- 기본 사용자라던가, 딱 한번만 등록하면 되는 key 값 등을 등록하여 사용할 수 있다.
## PreDestroy
- 컨테이너에서 bean 제거 직전에 Method를 바로 실행함
- 예를 들어 db자원 반환등 종료처리가 가능하다.