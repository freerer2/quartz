---
date: 2024-08-29
updated: 2024-08-29
order: 10
draft: true
---
다들 VO 사용을 권장하는 것 같네요. 관습이 된 VO 쓰지 말라고 할 수 없으니 단점을 나열해 봅니다. 모르고 쓰면 불편함이 익숙해지지만 알고 쓰면 불편함을 해결 할 수 있거든요.  

1. 오타를 방지할 수 있기 때문에 VO 를 사용한다고 하지만 xml, jsp 등 실행에 필요한 메타, 구문 오타는 알 수 없습니다. 특히 카멜표현법과 축약어로 결합된 이름은 실행시점에 오류가 발생하기 때문에 원인 찾기도 어렵습니다.
    
2. VO 는 객체지향적이지 않습니다. 데이터만 있고 실행시점이 아닌 컴파일 시점에 객체가 결정되기 때문입니다. 쉽게 이야기 해서 VO 를 사용하는 코드는 항상 컴파일을 한 뒤 배포를 해야하는 절차지향적인 코드가 됩니다.
    
3. 간혹 VO 의 get, set 메소드에 검증기능 데이터 가공등의 코드를 적용하기도 하는데 이는 VO 를 사용하는 코드와 역할이 겹치게 되어 모호해지는 코드가 됩니다. 또한 객체지향지적이지 않기 때문에 상속 또는 인터페이스로 VO 를 구성한다 하더라도 컴파일이 필요한 절차지향적인 코드가 됩니다.
    
4. VO 로 비즈니스 로직을 확인할 수 없습니다. VO 는 데이터를 담는 그릇의 역할이고 비즈니스 로직은 그릇에 담긴 데이터로 이해해야 합니다. 코드만 보지 말고 코드를 실행 디버그 또는 로그로 흐름을 확인하거나 요구사항 명세서, 테이블 구조도 등으로 확인하는게 맞습니다.
    
5. 합의 또는 규약에 따라 VO 를 사용하는 것도 문제가 됩니다. 합의는 변경될 수 있고 교체될 수 도 있습니다. 내용 결합으로 만들어진 VO 는 리펙토링이 어렵기 때문에 변경 비용이 증가됩니다. 합의 또는 규약은 VO 가 아닌 기능을 구현할 수 있는 비즈니스 로직에서 정의하고 처리해야 합니다.
    
6. 내용 결합이기 때문에 VO 간 데이터를 전달하는 get, set 코드가 반복됩니다. 개인적으로 정말 쓸모 없는 코드입니다.
    
7. VO 는 시간이 지날 수록 유사한 데이터가 추가됩니다. 예를 들어 int 급여, String 형식화된_급여, long 억단위가넘는__금여 등 유사한 멤버데이터(객체)가 추가되고 VO 는 알아볼 수없게 됩니다. 물론 리펙토링도 힘들기 때문에 고치기도 어렵습니다.
    
8. 데이터 중복을 제거하기 위해 정규화된 데이터를 사용하게 되고 원래의 데이터를 가져오기 위해 조인을 사용합니다. 이를 VO 로 표현하다 보면 유사하고 중복된 VO 가 만들어지는걸 보게 되는데 VO 때문에 코드가 복잡해지는 원인이 됩니다.
    

전 Map 을 사용합니다. 자동화 하기도 쉽고 실행시점에 객체를 결정할 수 있는 데이터 결합을 유도시키기 좋기 때문입니다. 물론 Map 도 단점이 있어 그대로 사용하지 않고 Null 안정성, 디폴트 값, crone, 테이블 등의 기능을 추가해 사용합니다. 그리고 카멜표현법이 간혹 오타를 발생시키기도 하는데 데이터의 KEY 는 언더바(리니어) 를 사용해 해결합니다.