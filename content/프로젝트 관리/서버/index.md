---
title: 서버
aliases:
  - 서버
---
각 서버는 오라클 클라우드의 가상머신으로 구축되었습니다.
- **서버 사양**
	- **운영체제** : Canonical Ubuntu 22.04
	- **CPU** : VM.Standard.E2.1.Micro[^1] 1OCPU[^2]
	- **메모리** : 1GB
	- **볼륨** : 50GB
	- **대역폭** : 0.48Gbps
	- **트래픽 제한**: 10TB/월
	
## 서버 목록
- ~~**데이터베이스 서버(deprecated)**~~  
	- ~~**DBMS** : PostgreSQL~~
	- ~~**버전** : 16~~
	- ~~**용도** : 애플리케이션 서버에서 사용할 데이터 관리~~
- **애플리케이션 서버**  
	- **용도** : 개발된 프로그램들의 실행

---
[^1]: 오라클 클라우드 인프라는 다음 프로세서 중 하나를 할당합니다:  
	- AMD EPYC 7551. Base frequency 2.0 GHz, max boost frequency 3.0 GHz.
	- AMD EPYC 7742. Base frequency 2.25 GHz, max boost frequency 3.4 GHz.
	- AMD EPYC 7J13. Base frequency 2.55 GHz, max boost frequency 3.5 GHz.

[^2]: x86 CPU 아키텍처의 1 OCPU = 2 vCPUs  
	Arm CPU 아키텍처의 1 OCPU = 1 vCPU