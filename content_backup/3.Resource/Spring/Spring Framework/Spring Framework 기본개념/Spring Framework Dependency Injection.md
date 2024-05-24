## Field Injection(비권장)
```java
@Component
class YourBusinessClass {

	@Autowired
	private Dependency1 dependency1;
	
	@Autowired
	private Dependency2 dependency2;
	  
	public String toString() {
		return "Using " + dependency1 + " and " + dependency2;
	}
}
  
@Component //Bean1
class Dependency1 {

}

@Component //Bean2
class Dependency2 {

}
```

매우 간단한 방법이지만, 단점이 많아서 권장되고 있지 않은 방법이다.

1. 단일 책임의 원칙 위반  
    의존성을 주입하기가 쉽다. @Autowired 선언 아래 3개든 10개든 막 추가할 수 있으니 말이다. 여기서 Constructor Injection을 사용하면 다른 Injection 타입에 비해 위기감 같은 걸 느끼게 해준다. Constructor의 파라미터가 많아짐과 동시에 하나의 클래스가 많은 책임을 떠안는다는 걸 알게된다. 이때 이러한 징조들이 리팩토링을 해야한다는 신호가 될 수 있다.
    
2. 의존성이 숨는다.  
    DI(Dependency Injection) 컨테이너를 사용한다는 것은 클래스가 자신의 의존성만 책임진다는게 아니다. 제공된 의존성 또한 책임진다. 그래서 클래스가 어떤 의존성을 책임지지 않을 때, 메서드나 생성자를 통해(Setter나 Contructor) 확실히 커뮤니케이션이 되어야한다. 하지만 Field Injection은 숨은 의존성만 제공해준다.
    
3. DI 컨테이너의 결합성과 테스트 용이성  
    DI 프레임워크의 핵심 아이디어는 관리되는 클래스가 DI 컨테이너에 의존성이 없어야 한다. 즉, 필요한 의존성을 전달하면 독립적으로 인스턴스화 할 수 있는 단순 POJO여야한다. DI 컨테이너 없이도 유닛테스트에서 인스턴스화 시킬 수 있고, 각각 나누어서 테스트도 할 수 있다. 컨테이너의 결합성이 없다면 관리하거나 관리하지 않는 클래스를 사용할 수 있고, 심지어 다른 DI 컨테이너로 전환할 수 있다. 하지만, Field Injection을 사용하면 필요한 의존성을 가진 클래스를 곧바로 인스턴스화 시킬 수 없다.
    
4. 불변성(Immutability)  
    Constructor Injection과 다르게 Field Injection은 final을 선언할 수 없다. 그래서 객체가 변할 수 있다.
    
5. 순환 의존성  
    Constructor Injection에서 순환 의존성을 가질 경우 BeanCurrentlyCreationExeption을 발생시킴으로써 순환 의존성을 알 수 있다.
## Setter Injection(Spring 3.x 권장)
```java
@Component
class YourBusinessClass {

	private Dependency1 dependency1;
	private Dependency2 dependency2;
	
	@Autowired
	public void setDependency1(Dependency1 dependency1) {
		System.out.println("Setter Injection - setDependency1 ");
		this.dependency1 = dependency1;
	}

	@Autowired
	public void setDependency2(Dependency2 dependency2) {
		System.out.println("Setter Injection - setDependency2 ");
		this.dependency2 = dependency2;
	}
	
	public String toString() {
		return "Using " + dependency1 + " and " + dependency2;
	}
}
  
@Component //Bean1
class Dependency1 {

}

@Component //Bean2
class Dependency2 {

}
```
## Constructor Injection(Spring 4.x 이후 권장)
```java
@Component
class YourBusinessClass {

	private Dependency1 dependency1;
	private Dependency2 dependency2;
	
	public YourBusinessClass(Dependency1 dependency1, Dependency2 dependency2) {
		super();
		System.out.println("Constructor Injection - YourBusinessClass ");
		this.dependency1 = dependency1;
		this.dependency2 = dependency2;
	}
	
	public String toString() {
		return "Using " + dependency1 + " and " + dependency2;
	}
}
  
@Component //Bean1
class Dependency1 {

}

@Component //Bean2
class Dependency2 {

}
```
### Lombok 적용 시
```java
@Component
@AllArgsConstructor
class YourBusinessClass {

	private final Dependency1 dependency1;	
	private final Dependency2 dependency2;
	
	public String toString() {
		return "Using " + dependency1 + " and " + dependency2;
	}
}
  
@Component //Bean1
class Dependency1 {

}

@Component //Bean2
class Dependency2 {

}
```

모든 클래스의 초기화는 하나의 메서드에서 실행하며 초기화가 완료되어야 Bean을 사용할 준비가 되는 것이다.
모든 면에서 안전하니 생성자방법을 사용하자

# **Links**
---
- [[Spring Bean]]
- [[Spring Bean 등록 방법(스프링 빈 생성 방법)]]