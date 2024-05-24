pom.xml
```xml
	<dependency>
		<groupId>jakarta.inject</groupId>
		<artifactId>jakarta.inject-api</artifactId>
		<version>2.0.1</version>
	</dependency>
```

Application.java
```java
//@Component
@Named
class BusinessService {
	private DataService dataService;

	public DataService getDataService(DataService dataService){
		System.out.println("세터");
		return dataService;
	}
	
	//@Autowired
	@Inject
	public void setDataService(DataService dataService){
		this.dataService = dataService;
	}
}

//@Component
@Named
class DataService {

}

@Configuration
@ComponentScan
public class Application {

	public static void main(String[] args){

		try(var context = new AnnotationConfigApplicationContext(SomeClass.class)){
			System.out.println(context.getBean(BusinessService.class).getDataService());
		}
	}
}
```
- CDI 규격 자체는 Java EE 6 버전(2009)에 도입 됨
- Spring Framework에서 CDI를 구현한게 현재 모습
- @Component 대신 @Named, @Autowired 대신 @Inject 를 사용해서 의존성 주입을 관리 할 수 있다.
- Spring Framework에서는 CDI가 구현되므로 CDI어노테이션도 지원됨
	- Inject (Spring의 Autowired)
	- Named (Spring의 Component)
	- Qualifier
	- Scope
	- Singleton

## 의문점
- 근데 굳이...? 이걸 왜 쓰지...?