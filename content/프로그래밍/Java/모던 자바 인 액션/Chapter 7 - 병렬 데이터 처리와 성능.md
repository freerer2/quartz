---
date: 2024-08-09
updated: 2024-08-09
order: 70
---


# Chapter 7 - 병렬 데이터 처리와 성능

자바 7은 쉽게 병렬화를 수행하면서 에러를 최소화할 수 있도록 포크/조인 프레임워크(fork/join framework) 기능을 제공한다. 

## 병렬 스트림

컬렉션에 `parallelStream`을 호출하면 **병렬 스트림**이 생성된다. 병렬 스트림은 각각의 스레드에서 처리할 수 있도록 스트림 요소를 여러 청크로 분할한 스트림이다. 따라서 병렬 스트림을 이용하면 모든 멀티코어 프로세서가 각각의 청크를 처리하도록 할당할 수 있다.

stream에서 parallel을 호출하면 내부적으로 이후 연산이 병렬로 수행해야 함을 의미하는 불리언 플래그가 설정된다. 반대로 sequential로 병렬 스트림을 순차 스트림으로 바꿀 수 있다. 이 두 메서드를 이용해서 어떤 연산을 병렬로 실행하고 어떤 연산을 순차로 실행할지 제어할 수 있다. parallel과 sequential 두 메서드 중 최종적으로 호출된 메서드가 전체 파이프라인에 영향을 미친다.

### 스트림 성능 측정

병렬화를 이용하면 순차나 반복 형식에 비해 성능이 더 좋아질 것이라 추측했다. 하지만 가장 좋은 방법은 직접 측정하는 것이다. 자바 마이크로벤치마크 하니스(Java Microbenchmark Harness) JHM 라이브러리를 이용해 벤치마크를 구현하자.

JMH를 이용하면 간단하고, 어노테이션 기반 방식을 지원하며, 안정적으로 자바 프로ㅓ그램이나 자바 가상 머신(JVM)을 대상으로 하는 다른 언어용 벤치마크를 구현할 수 있다.

### maven 설정

```xml
<!-- 예제의 버전은 1.17.4 입니다. -->
<dependency>
	<groupId>org.openjdk.jmh</groupId>
	<artifactId>jmh-core</artifactId>
	<version>1.17.4</version>
</dependency>
<dependency>
	<groupId>org.openjdk.jmh</groupId>
	<artifactId>jmh-generator-annprocess</artifactId>
	<version>1.17.4</version>
</dependency>

<build>
	<plugins>
		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-shade-plugin</artifactId>
			<executions>
				<execution>
					<phase>package</phase>
					<goals><goal>shade</goal></goals>
					<configuration>
						<finalName>benchmarks</finalName>
						<transformers>
							<transformer implementation=
									"org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
								<mainClass>org.openjdk.jmh.Main</mainClass>
							</transformer>
						</transformers>
					</configuration>
				</execution>
			</executions>
		</plugin>
	</plugins>
</build>
```

- n개의 숫자를 더하는 함수의 성능 측정

```java
@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.MILLISECONDS)
@Fork(value = 2, jvmArgs = {"-Xms4G", "-Xmx4G"})
@State(Scope.Benchmark)
public class MyBenchmark {
    private static final long N = 10_000_000L;

    @Benchmark  // 벤치마크 대상 메서드
    public long benchmark() {
			// n개의 숫자를 더하는 로직 구현
    }

    @TearDown(Level.Invocation) // 매 번 벤치마크를 실행한 다음에는 가비지 컬렉터 동작 시도
    public void tearDown() {
        System.gc();
    }
}
```

### 실행

```java
$ mvn clean install
$ java -jar target/benchmark.jar
```

### 결과

- Stream.iterate

```java
@Benchmark
public long sequentialSum() {
    return Stream.iterate(1L, i -> i + 1).limit(N)
        .reduce(0L, Long::sum);
}
```

```java
# Run complete. Total time: 00:01:22

Benchmark                  Mode  Cnt   Score   Error  Units
MyBenchmark.sequentialSum  avgt   40  **78.975** ± 0.156  ms/op
```

- for-loop문

```java
@Benchmark
public long iterativeSum() {
    long result = 0;
    for (long i = 1L; i <= N; i++) {
        result += i;
    }
    return result;
}
```

```java
# Run complete. Total time: 00:01:21

Benchmark                 Mode  Cnt  Score   Error  Units
MyBenchmark.iterativeSum  avgt   40  **2.870** ± 0.017  ms/op
```

- Stream.iterate.parallel

```java
@Benchmark
public long parallelSum() {
    return Stream.iterate(1L, i -> i + 1).limit(N).parallel()
        .reduce(0L, Long::sum);
}
```

```java
# Run complete. Total time: 00:01:23

Benchmark                  Mode  Cnt   Score   Error  Units
MyBenchmark.sequentialSum  avgt   40  **76.854** ± 2.293  ms/op
```

- LongStream.sequential

```java
@Benchmark
public long longStreamSequentialSum() {
    return LongStream.rangeClosed(1L, N)
        .reduce(0L, Long::sum);
}
```

```java
# Run complete. Total time: 00:01:21

Benchmark                            Mode  Cnt  Score   Error  Units
MyBenchmark.longStreamSequentialSum  avgt   40  **3.258** ± 0.018  ms/op
```

- LongStream.parallel

```java
@Benchmark
public long longStreamParallelSum() {
    return LongStream.rangeClosed(1L, N).parallel()
        .reduce(0L, Long::sum);
}

```

```java
# Run complete. Total time: 00:01:21

Benchmark                  Mode  Cnt  Score   Error  Units
MyBenchmark.sequentialSum  avgt   40  **2.782** ± 1.084  ms/op
```

### 결과

1. LongStream.parallel - **2.782**
2. for-loop(sequential) - **2.870**
3. LongStream.sequential - **3.258**
4. Stream.iterate.parallel - **76.854**
5. Stream.iterate.sequential - **78.975**

하드웨어 스펙에 따라 차이가 더 날 수 있지만 오토박싱의 오버헤드를 없애고 rangeClosed 메서드를 이용해 쉽게 청크로 분할할 수 있도록 하여 parallel을 적용하니 성능을 개선할 수 있었다.

## 병렬 스트림 효과적으로 사용하기

- 확신이 서지 않으면 직접 측정하라. 순차 스트림에서 병렬 스트림으로 쉽게 바꿀 수 있다. 반드시 적절한 벤치마크로 직접 성능을 측정하자
- 박싱을 주의하라. 되도록이면 기본형 특화 스트림을 사용하자.
- 순차 스트림보다 병렬 스트림에서 성능이 떨어지는 연산들을 피하라. limit나 findFirst처럼 요소의 순서에 의존하는 연산을 병렬 스트림에서 수행하려면 비싼 비용을 치러야 한다.
- 스트림에서 수행하는 전체 파이프라인 비용을 고려하라. 처리해야할 요소 수가 N, 하나의 요소를 처리하는 데 드는 비용이 Q라하면 전체 스트림 파이프라인 처리비용은 N*Q로 예상할 수 있다. Q가 높아진다는 것은 병렬 스트림으로 성능을 개선할 수 있는 가능성이 있음을 의미한다.
- 소량의 데이터에서는 병렬 스트림이 도움되지 않는다. 병렬화 과정에서 생기는 부가 비용을 상쇄할 수 있을 만큼의 이득을 얻지 못하기 때문이다.
- 스트림을 구성하는 자료구조가 적절한지 확인하라. 예로, ArrayList는 LinkedList보다 효율적으로 분할할 수 있다. 또한 range 팩토리 메서드로 만든 기본형 스트림도 쉽게 분해할 수 있다. 또한 **Spliterator**를 구현해서 분해 과정을 완벽하게 제어할 수 있다.
- 최종 연산의 병합 비용을 살펴보라.

## 포크/조인 프레임워크

포크/조인 프레임워크는 병렬화할 수 있는 작업을 재귀적으로 작은 작업으로 분할한 다음 서브태스크 각각의 결과를 합쳐서 전체 결과를 만들도록 설계되었다. 

### RecursiveTask 활용

쓰레드 풀 이용을 위해선 RecursiveTask\<R\>의 서브클래스 혹은 RecursiveAction의 서브클래스를 만들어야 한다. RecursiveTask의 R은 병렬화된 태스크가 생성하는 결과 형식을 의미하면 RecursiveAction은 결과 형식이 없을 경우에 사용한다.

RecursiveTask를 이용하기 위해선 compute 메서드를 구현해야 한다. compute 메서드는 태스크를 서브태스크로 분할하는 로직과 더 이상 분할할 수 없을 때 개별 서브태스크의 결과를 생산할 알고리즘을 정의한다.

- 의사코드

```java
if (태스크가 충분히 작거나 더 이상 분할할 수 없으면) {
	순차적으로 태스크 계산
} else {
	태스크를 두 서브 태스크로 분할
	태스크가 다시 서브태스크로 분할되도록 이 메서드를 재귀적으로 호출함
	모든 서브태스크의 연산이 완료될 때까지 기다림
	각 서브태스크의 결과를 합침
}
```

이 알고리즘은 분할정복 알고리즘의 병렬화 버전이다.

### ForkJoinPool

ForkJoinTask를 실행하기 위한 스레드 풀이다. 태스크를 생성하면 생성한 ForkJoinTask를 ForkJoinPool의 invoke 메서드로 전달한다. 일반적으로 애플리케이션은 둘 이상의 ForkJoinPool을 사용하지 않는다. 소프트웨어의 필요한 곳에서 언제든 가져다 쓸 수 있도록 ForkJoinPool을 한 번만 인스턴스화해서 정적 필드에 싱글턴으로 저장한다. 기본 풀의 크기는 `Runtime.availableProcessors`

의 반환값으로 결정된다. 이 값은 사용할 수 있는 프로세서의 갯수를 말하지만, 실제로는 프로세서외에 하이퍼스레딩과 관련된 가상 프로세스도 개수에 포함된다 (내 컴퓨터에서 6 core일 경우 12개로 확인된다).

> ForkJoin Framework에 대하여 참조하면 좋은 글 - [OKKY | [Java] 쓰레드풀 과 ForkJoinPool](https://okky.kr/article/345720)

### 포크/조인 프레임워크를 제대로 사용하는 방법

- join 메서드를 태스크에 호출하면 태스크가 생산하는 결과가 준비될 때까지 호출자를 블록시킨다. join 메서드는 두 서브태스크가 모두 시작된 다음에 호출하자.
- RecursiveTask 내에서는 ForkJoinPool의 invoke 메서드를 사용하지 말아야 한다. 대신 compute나 fork 메서드를 호출하자
- 왼쪽 작업과 오른쪽 모두에 fork메서드를 사용하는 것대신, 한쪽 작업에 compute를 호출하자. 두 서브태스크의 한 태스크에는 같은 스레드를 재사용할 수 있으므로 풀에서 불필요한 태스크를 할당하는 오버헤드를 줄일 수 있다.
- 디버깅이 어렵다는 점을 고려하자.
- 각 서브태스크의 실행시간은 새로운 태스크를 포킹하는 데 드는 시간보다 길어야 한다.

### 작업 훔치기

포크/조인 프레임워크에서는 작업 훔치기(work stealing)라는 기법을 사용한다. 각각의 스레드는 자신에게 할당된 태스크를 포함하는 이중 연결 리스트(doubley linked list)를 참조하면서 작업이 끝날 때마다 큐의 헤드에서 다른 태스크를 가져와서 작업을 처리한다. 이때 한 스레드는 다른 스레드보다 자신에게 할당된 태스크를 더 빨리 처리할 수 있는데, 할일이 없어진 스레드는 유휴 상태로 바뀌는 것이 아니라 다른 스레드의 큐의 꼬리에서 작업을 훔쳐온다. 모든 태스크가 작업을 끝낼 때 까지 이 과정을 반복한다. 따라서 태스크의 크기를 작게 나누어야 작업자 스레드 간의 작업부하를 비슷한 수준으로 유지할 수 있다.

## Spliterator 인터페이스

자바 8에서 Spliterator가 등장했다. Spliterator는 <em>분할할 수 있는 반복자(spliatable iterator)</em>라는 의미다. 자바 8은 컬렉션 프레임워크에 포함된 모든 자료구조에서 사용할 수 있는 디폴드 Spliterator 구현을 제공한다. 

```java
public interface Spliterator<T> {
	boolean tryAdvance(Consumer<? super T> action);
	Spliterator<T> trySplit();
	long estimateSize();
	int characteristics();
}
```

- T : Spliterator에서 탐색하는 요소의 형식
- tryAdvance : Spliterator의 요소를 하나씩 순차적으로 소비하면서 탐색해야 할 요소가 남아있으면 참을 반환한다.
- trySplit : Spliterator의 일부 요소를 분할해서 두 번째 Spliterator를 생성하는 메서드
- estimateSize : 탐색해야 할 요소 수 정보를 제공한다
- characteristics : Spliter의 특성을 의미한다

### 사용

```java
Spliterator<Character> spliterator = new SimpleSpliterator(SENTENCE);
Stream<Character> stream = StreamSupport.stream(spliterator, true); // 2nd 인자 병렬여부
```