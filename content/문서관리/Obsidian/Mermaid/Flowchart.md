---
order: 10
---
## 방향

```mermaid
flowchart RL
    Start --> Stop
```
- TB - Top to bottom
- TD - Top-down/ same as top to bottom
- BT - Bottom to top
- RL - Right to left
- LR - Left to right

## 노드 모양

```mermaid
flowchart LR
    a["[Square]"]
    b("(round edge)")
		c(["([stadium shaped])"])
    d[["[[subroutine shape]]"]]
    e>">asymmetric shape]"]
    f[("[(cylindrical shape)]")]
    g(("((circle))"))
    h((("(((Double circle)))")))
    i{"{rhombus}"}
    j{{"{{hexagon}}"}}
    k[/"[/Parallelogram/]"/] 
    l[\"[\Parallelogram alt\]"\]
    m[/"[/Trapezoid\]"\]
    n[\"[\Trapezoid alt/]"/]
    
	a ~~~ b ~~~ c
	d ~~~ e ~~~ f
	g ~~~ h
	i ~~~ j ~~~ k
	l ~~~ m ~~~ n
```

## 링크 및 화살표 머리

```mermaid
flowchart LR
    A0---|---|A1-..-|-..-|A2=====|=====|A3
    B0-.->|-.->|B1===>|===>|B2---->|---->|B3
    C0==x|==x|C1---x|---x|C2-...-x|-...-x|C3
    D0--o|--o|D1-..-o|-..-o|D2====o|====o|D3
	
	E0~~~|~#126;~|E1
```

## 하위 그래프

```mermaid
flowchart LR
  subgraph TOP
    direction TB
    subgraph B1
        direction RL
        i1 -->f1
    end
    subgraph B2
        direction BT
        i2 -->f2
    end
  end
  A --> TOP --> B
  B1 --> B2
```

## 해석
```mermaid
flowchart LR
    a[처리단계]
	c([순서도 시작/끝])
    d[[서브루틴]]
    f[(데이터베이스)]
    g((연결자))
    i{판단}
    j{{준비/전처리}}
    k[/데이터 입/출력/] 
    n[\키보드 입력/]
    
	a ~~~ c ~~~ d
	f ~~~ g ~~~ i
	j ~~~ k ~~~ n
```

