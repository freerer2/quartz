## 애플리케이션 빌드 시 많은 설정이 필요하다
- Component Scan, Dispatcher Servlet, Data Sources, JSON Conversion 등등...
## 이를 쉽게 하는 방법은?
### Auto Configuration
- 자동 설정 기준
	- 자동 설정은 클래스 경로에 있는 프레임워크에 따라 생성 됨
	- 자동 설정 로직은 spring-boot-autoconfigure.jar에 있음
	- 오버라이드를 통한 자체 설정도 가능
	- 설정변경은 application.properties에 추가하면 됨
		- 예) logging.level.패키지명 = debug
### Spring Boot Start Web에 세팅된 자동설정
- Dispatcher Servlet
- Embedded Servlet Container
- Default Error Pages
- Bean<->SON
- etc...