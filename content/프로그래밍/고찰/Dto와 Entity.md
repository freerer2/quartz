---
date: 2024-08-29
updated: 2024-08-29
order: 20
---
프로젝트를 진행하거나 강의, 책을 보면 항상 엔티티를 직접 반환하지말고 DTO로 변환하여 반환하라는 말을 접하거나 보았을 것이다.

하지만 단순히 "아 ~ 그렇게 하라니까 그렇게 해야지" 보다는 **"왜? 엔티티를 직접 사용하지 말고 DTO를 사용해야하는가"** 에 대해 정리해보려고 한다.

![etc-image-0](https://blog.kakaocdn.net/dn/nnLRy/btsj7LKu1vE/5CJ528r3CVYtK39KgETCBk/img.png)

> **DTO와 Entity 구분**

- DTO(Data Transfer Object) : 클라이언트와 서버 간 데이터 전송을 위해 설계된 객체
- Entity : 데이터베이스에 저장되는 데이터 객체로, 데이터베이스와 직접적으로 연결

---

## Enttity를 직접 반환할 경우 생기는 문제점

> **엔티티 구조 변경 시 발생하는 문제**

예를 들어 요구사항이 변경되어 엔티티의 필드 이름이 변경 될 경우, API 스펙이 변경되어 추가 작업이 요구된다.

이는 효과적인 유지 보수가 어려워져 시간과 비용이 증가할 수 있다.

> **필요한 데이터만 전송하기 어렵다.**

엔티티를 직접 반환하면 엔티티에 존재하는 모든 데이터가 반환된다.

(모든 데이터를 반환하게 되면 트래픽이 증가할 수 있으며 성능 및 비용면에서도 현저한 차이를 가져올 수 있다.)

즉, 사용자가 필요로 하는 데이터만 전송하기 어려움이 있다.

이로 인해 **불필요한 데이터를 사용자에게 전달**될 수 있다.

> **순환 참조 문제**

엔티티 간에 양방향 관계가 존재할 경우, 엔티티를 반환하는 순간 순환 참조로 인한 무한 **JSON 직렬화 이슈 발생**할 수 있다.

> **보안 문제**

Entity를 반환하면 테이블을 공개하는 것이나 다름없으므로 **민감한 정보가 노출**될 가능성이 있다.

---

## DTO와 Entity를 분리하여 얻는 장점

> **View와 Model의 분리 (MVC 패턴)**

DTO는 View(사용자 인터페이스)와 Controller(서버) 간의 인터페이스 역할을 하며, Entity는 Model(데이터베이스)의 역할을 한다.

이러한 분리를 통해 **MCV 패턴을 적용**하여, **코드의 가독성과 유지보수를 용이**하게 할 수 있다.

> **필요한 데이터만 선별하여 서버 사용량 최소화**

DTO는 서버에서 클라이언트에 데이터를 전송하는 데 사용된다.

따라서 Entity 범위에서 **필요한 필드를 재정의하여 필요한 데이터만 전송될 수 있도**록 할 수 있다.

이로 인해 전송하는 데이터양과 네트워크 대역폭 사용량이 최적화되어 **더 빠른 응답시간과 전송시간**을 얻을 수 있다.

> **엔티티 구조가 변경되어도 안전**

엔티티 구조가 변경되더라도 DTO를 사용하여 데이터 전송을 처리하면 이 변경 사항이 클라이언트에 직접적으로 영향을 미치지 않는다.

DTO를 사용하면 **엔티티의 변경으로 인한 영향을 최소화**할 수 있으며, **클라이언트에게 필요한 데이터만 전달**할 수 있다.

서버 측에서는 엔티티의 변경을 해결하고 필요한 필드를 추가하거나 수정한 DTO를 클라이언트에 노출시키면 된다.

이렇게 함으로써 클라이언트와 **서버 간의 결합도를 낮추고 유지보수가 용이**해진다.

> **순환 참조 예방**

**DTO**는 엔티티 간의 **양방향 참조가 포함되지 않은 간단한 구조**를 갖는다.

이를 통해 클라이언트와 **서버 간의 통신 과정에서 복잡한 객체 간 참조가 최소화**되며, **순환 참조 문제를 예방**할 수 있다.

> **Validation 코드와 모델링 코드 분리**

- validation 코드 : @NotNull, @NotEmpty, @NotBlank 등
- 모델링 코드 : @Column, @JoinColumn, @ManyToOne, @OneToOne 등

Entity는 DB의 테이블과 매칭되는 필드가 선언되어 있다.

그렇기 때문에 Entity에는 모델링을 위한 코드가 추가된다.

하지만 이 Entity에 validation 코드가 들어가게 된다면 엔티티 클래스는 더 복잡해지고 가독성이 떨어진다.

이 때, **각각의 요청마다 다른 DTO를 만들어 상황에 따라 필요한 validation을 추가**한다면 **Entity 클래스의 모델링에 집중**할 수 있다.

> **보안 강화**

DTO와 Entity를 분리함으로써, 테이블 구조는 서버측에만 알 수 있으므로 해커들이 데이터를 조작하는 것을 어렵게 할 수 있다.

따라서 DTO와 Entity를 분리하여 **API 보안성을 강화시**킬 수 있다.

---

## DTO와 Entity 변환 위치

![etc-image-1](https://blog.kakaocdn.net/dn/bBOND5/btsj8iuU9WL/bQIRQRU8NUd8viGhfA1R71/img.png)

> **Controller - 클라이언트의 요청을 받고 응답을 반환**

컨트롤러에서는 **DTO의 형태로 데이터를 받아 서비스에 전**달한다.

```java
@Service
@RequiredArgsConstructor
public class PostsService {
 
    private final PostsRepository postsRepository;
 
    @Transactional
    public Posts save(PostsSaveRequestDto requestDto) {
        return postsRepository.save(requestDto.toEntity());
    }
 
    @Transactional
    public Posts update(Long id, PostsUpdateRequestDto requestDto) {
        Posts posts = postsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id = " + id));
        posts.update(requestDto.getTitle(), requestDto.getContent());
        return posts;
    }
    ...
}
```

> **Service - 비즈니스 로직을 수행하며 데이터 처리를 담당**

서비스에서는 컨트롤러에서 받은 **DTO를 Entity로 변환**하고, 필요한 작업을 수행한 뒤에 **Repository에 Entity를 전달**한다.

```java
@Service@RequiredArgsConstructorpublic class PostsService {     private final PostsRepository postsRepository;     @Transactional    public Posts save(PostsSaveRequestDto requestDto) {        return postsRepository.save(requestDto.toEntity());    }     @Transactional    public Posts update(Long id, PostsUpdateRequestDto requestDto) {        Posts posts = postsRepository.findById(id)                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id = " + id));        posts.update(requestDto.getTitle(), requestDto.getContent());        return posts;    }    ...}
```

> **📌 Service에서 DTO를 Entity로 변환하는 이유**

1. 비즈니스 로직을 처리하는 곳이므로 다양한 변환 로직을 적용할 수 있다.  
2. JpaRepository는 @Entity 객체를 매핑해서 영속성화를 처리하여 JpaRepository<Entity , ID> Entity를 타입으로 받기 때문이다.  
3. 컨트롤러는 요청/응답 처리를 담당하므로 변환 처리를 하는 것이 책임 범위를 벗어난다.  
4. 리포지토리는 데이터베이스와의 인터페이스 역할을 하므로 DTO 변환 역할을 가지면 책임 범위가 너무 커진다.

> **Repository - 데이터베이스와 인터페이스 역할**

**서비스에서 Entity를 전달 받아 영속화를 처리한다.**

```java
public interface PostsRepository extends JpaRepository<Posts, Long> {}
```

---

## Entity <-> DTO 변환 메서드 구현

**toEntity(), toDto() 같은 메서드를 DTO 클래스에 직접 변환 메서드를 구현하여 상호** **변환을 수행**할 수 있다.

해당 변환 메서드는 해당 클래스의 인스턴스를 기반으로 상대 클래스의 인스턴스를 생성하고 반환한다.

```java
@Getter
@NoArgsConstructor
public class PostsSaveRequestDto {
 
    @NotEmpty
    private String title;
 
    private String content;
 
    private String author;
 
    @Builder
    public PostsSaveRequestDto(String title, String content, String author) {
        this.title = title;
        this.content = content;
        this.author = author;
    }
 
    public Posts toEntity() {
        return Posts.builder()
                .title(title)
                .content(content)
                .author(author)
                .build();
    }
    
    public PostsSaveRequestDto toDto(Posts posts) {
        return PostsSaveRequestDto.builder()
                .title(posts.getTitle())
                .content(posts.getContent)
                .author(posts.getAuthor)
                .build();
    }
}
```

## Mapstruct를 이용한 Entity <-> DTO 변환 메서드 구현
작성중