
| Annotation     | Description                                                                                             |
| -------------- | --------------------------------------------------------------------------------------------------------- |
| @Configuration | 클래스가 @Bean Method를 하나 이상 선언함을 나타냄. Java 설정 파일을 만드는 경우에 사용하며, Method로 반환되는 모든 값에 Spring이 Bean을 자동으로 생성해줌 |
| @ComponentScan | 컴포넌트 스캔할 패키지를 명시할 수 있음<br>지정하지 않으면 이 어노테이션을 선언한 클래스의 패키지에서(하위포함) 스캔함                                    |
| @Bean          | Method의 반환 값이 Bean임을 나타내며, IoC 컨테이너에서 관리되는 것임을 표현                                                       |
| @Component     | 클래스가 Bean임을 나타내며, IoC 컨테이너에서 관리되는 것임을 표현                                                                |
| @Service       | 클래스에 비즈니스 로직이 있다는것을 표현                                                                                  |
| @Controller    | 클래스가 웹 어플리케이션, REST API라는 것을 표현                                                                         |
| @Repository    | 클래스가 데이터베이스를 조작하는데 사용한다는 것임을 표현                                                                         |
| @Primary       | 여러 동일한 Bean이 Autowiring 될 경우 우선순위를 부여                                                                   |
| @Qualifier     | Bean에 Alias를 부여                                                                                         |
| @Lazy          | Bean을 지연초기화 할 경우 사용                                                                                     |
| @Scope         | Bean의 인스턴스가 생성되는 시점을 정의                                                                                 |
| @PostConstruct | 의존성 주입이 수행 된 직후 실행될 Method를 표현                                                                          |
| @PreDestroy    | 컨테이너에서 Bean 인스턴스가 삭제 되기 직전 실행될 Method를 표현                                                               |
| @Named         | Spring에서 CDI를 구현하는 규격이며, @Component와 유사                                                                 |
| @Inject        | Spring에서 CDI를 구현하는 규격이며, @Autowired와 유사                                                                 |
