## Bean Factory
- Bean Factory는 스프링의 핵심 컨테이너로서 Bean의 생성, 관리, 의존성 주입(Dependency Injection), 라이프사이클 관리 등의 기능을 제공합니다.
- 주요 인터페이스로는 BeanFactory가 있으며, DefaultListableBeanFactory와 같은 구현체가 사용.
- Bean Factory는 스프링의 가장 기본적인 컨테이너로서, 간단한 Bean 관리 기능을 제공. 
## Application Context
- 애플리케이션 컨텍스트는 Bean Factory의 기능을 확장한 컨테이너로서, Bean Factory의 모든 기능을 포함하며 추가적인 기능을 제공.
- 주요 인터페이스로는 ApplicationContext가 있으며, AnnotationConfigApplicationContext, ClassPathXmlApplicationContext, WebApplicationContext 등이 사용.
- 메세지 소스를 활용한 국제화 기능
	- 한국에서 들어오면 한국어, 영어권에서 들어오면 영어로 출력해주는 기능. ( 국제화(i18n) 지원 )
- 환경변수 - 로컬, 개발, 운영등을 구분해서처리합니다.
- 애플리케이션 이벤트 - 이벤트 발행 및 구독하는 모델을 편리하게 지원.
- 편리한 리소스 조회 - 파일이나 클래스 패스같은 외부 url 같은 곳에서 파일을 불러와서 쓸 때, 편하게 사용할 수 있는 기능을 제공.
- 또한, 애플리케이션 컨텍스트는 Bean을 지연 로딩(lazy-loading)하거나 프로토타입 스코프의 Bean을 여러 번 생성하는 등의 더 복잡한 Bean 관리 기능을 제공.
# **Links**
---
- [[Spring Bean]]