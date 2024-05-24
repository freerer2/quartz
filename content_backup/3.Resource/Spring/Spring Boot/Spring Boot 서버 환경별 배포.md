## 환경별 설정 파일 생성 방법
### 파일명에 환경 추가 및 spring.profiles.active 세팅
- application.properties : *기본설정*
```xml
logging.level.org.springframework=info
<!--spring.profiles.active=dev-->
``` 

- application-dev.properties
```xml
logging.level.org.springframework=debug
``` 

- 빌드시 **spring.profiles.active** 속성에 값을 부여
```
커맨드라인옵션 : --spring.profiles.active=dev
JVM vm옵션 :  -Dspring.profiles.active=dev
```

위처럼 세팅하면 개발 프로필 사용 시 `org.springframework` 패키지 내부의 프로그램 실행 시 디버깅 수준이 `debug`가 됨
