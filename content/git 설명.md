## 구조

```mermaid
flowchart TB
  subgraph 원격저장소
    direction TB
	  subgraph rep1["리포지토리(프로젝트1)"]
	    direction TB
	    ori_rep1_master["master(운영서버)"]
	    ori_rep1_realease["realease(검증서버)"]
	    ori_rep1_develop["realease(개발서버)"]
	    ori_rep1_feature["feature(개발작업)"]
	    ori_rep1_hotfix["hotfix(이슈수정)"]
	    ori_rep1_master ~~~ ori_rep1_realease ~~~ ori_rep1_develop ~~~ ori_rep1_feature ~~~ ori_rep1_hotfix
	  end
	  subgraph rep2["리포지토리(프로젝트2)"]
	    direction TB
	    ori_rep2_master["master(운영서버)"]
	    ori_rep2_realease["realease(검증서버)"]
	    ori_rep2_develop["realease(개발서버)"]
	    ori_rep2_feature["feature(개발작업)"]
	    ori_rep2_hotfix["hotfix(이슈수정)"]
	    ori_rep2_master ~~~ ori_rep2_realease ~~~ ori_rep2_develop ~~~ ori_rep2_feature ~~~ ori_rep2_hotfix
	  end
  end
```
- master : 제품으로 출시될 수 있는 브랜치
- release : 이번 출시 버전을 준비하는 브랜치
- develop : 다음 출시 버전을 개발하는 브랜치
- feature : 기능을 개발하는 브랜치
- hotfix : 출시 버전에서 발생한 버그를 수정 하는 브랜치

---
## clone :  리포지토리를 새 디렉터리에 복제하기

그림1
```mermaid
flowchart TB
  subgraph 원격저장소
    direction TB
	  subgraph rep1["리포지토리(프로젝트1)"]
	    direction LR
	    ori_rep1_master["master(운영서버)"]
	    ori_rep1_realease["realease(검증서버)"]
	    ori_rep1_develop["realease(개발서버)"]
	    ori_rep1_feature["feature(개발작업)"]
	    ori_rep1_master ~~~ ori_rep1_realease
	    ori_rep1_develop ~~~ ori_rep1_feature
	  end
  end
  
  subgraph loc1["로컬저장소A(개인 컴퓨터)"]
    direction TB
	  subgraph loc1_rep1["리포지토리(프로젝트1)"]
        direction TB
		loc1_rep1_master["master(운영서버)"]
		loc1_rep1_realease["realease(검증서버)"]
		loc1_rep1_develop["realease(개발서버)"]
		loc1_rep1_feature["feature(개발작업)"]
		loc1_rep1_master ~~~ loc1_rep1_realease ~~~ loc1_rep1_develop ~~~ loc1_rep1_feature
	  end
  end
  
  subgraph loc2["로컬저장소B(개인 컴퓨터)"]
    direction TB
  end
  
rep1 -->|"클론(체크아웃)"| loc1_rep1
rep1 ~~~ loc2
```

그림2
```mermaid
flowchart TB
  subgraph 원격저장소
    direction TB
	  subgraph rep1["리포지토리(프로젝트1)"]
	    direction LR
	    ori_rep1_master["master(운영서버)"]
	    ori_rep1_realease["realease(검증서버)"]
	    ori_rep1_develop["realease(개발서버)"]
	    ori_rep1_feature["feature(개발작업)"]
	    ori_rep1_master ~~~ ori_rep1_realease
	    ori_rep1_develop ~~~ ori_rep1_feature
	  end
  end
  
  subgraph loc1["로컬저장소A(개인 컴퓨터)"]
    direction TB
	  subgraph loc1_rep1["리포지토리(프로젝트1)"]
        direction TB
		loc1_rep1_master["master(운영서버)"]
		loc1_rep1_realease["realease(검증서버)"]
		loc1_rep1_develop["realease(개발서버)"]
		loc1_rep1_feature["feature(개발작업)"]
		loc1_rep1_master ~~~ loc1_rep1_realease ~~~ loc1_rep1_develop ~~~ loc1_rep1_feature
	  end
  end
  
  subgraph loc2["로컬저장소B(개인 컴퓨터)"]
    direction TB
	  subgraph loc2_rep1["리포지토리(프로젝트1)"]
        direction TB
		loc2_rep1_master["master(운영서버)"]
		loc2_rep1_realease["realease(검증서버)"]
		loc2_rep1_develop["realease(개발서버)"]
		loc2_rep1_feature["feature(개발작업)"]
		loc2_rep1_master ~~~ loc2_rep1_realease ~~~ loc2_rep1_develop ~~~ loc2_rep1_feature
	  end
  end
  
rep1 ~~~ loc1
rep1 -->|"클론(체크아웃)"| loc2

```

## add : 기록할 변경사항 추가하기

## commit : 로컬저장소에 변경사항 기록하기

## fetch : 변경사항 확인하기

## pull : 변경사항 땡겨오기
## push : 변경사항 원격 저장소에 밀어넣기

그림1
```mermaid
flowchart BT
  subgraph ori["원격저장소"]
    direction TB
	  subgraph rep1["리포지토리(프로젝트1)"]
	    ori_rep1_feature["feature(개발작업)"]
	    ori_rep1_hotfix["hotfix(이슈수정)"]
	  end
  end
  
  subgraph loc1["로컬저장소A(개인 컴퓨터)"]
	  subgraph loc1_rep1["리포지토리(프로젝트1)"]
		loc1_rep1_feature["feature(개발작업)"]
	    loc1_rep1_hotfix["hotfix(이슈수정)"]
	  end
  end
  
  subgraph loc2["로컬저장소B(개인 컴퓨터)"]
	  subgraph loc2_rep1["리포지토리(프로젝트1)"]
		loc2_rep1_feature["feature(개발작업)"]
	    loc2_rep1_hotfix["hotfix(이슈수정)"]
	  end
  end
  
loc1_rep1_hotfix -->|"1.Push"| ori_rep1_hotfix
loc2_rep1_hotfix --->|"2.Push시 충돌위험 다량 함유"| ori_rep1_hotfix
```

## merge : 브랜치간 변경사항 병합하기

```mermaid
flowchart BT
  subgraph ori["원격저장소"]
	  subgraph rep1["리포지토리(프로젝트1)"]
	    ori_rep1_feature["feature(개발작업)"]
	    ori_rep1_hotfix["hotfix(이슈수정)"]
	  end
  end
  
  subgraph loc1["로컬저장소A(개인 컴퓨터)"]
	  subgraph loc1_rep1["리포지토리(프로젝트1)"]
	    direction BT
		loc1_rep1_feature["feature(개발작업)"]
	    loc1_rep1_hotfix["hotfix(이슈수정)"]
	    loc1_rep1_hotfix --> |"변경사항 적용"| loc1_rep1_feature
	  end
  end
  
  subgraph loc2["로컬저장소B(개인 컴퓨터)"]
	  subgraph loc2_rep1["리포지토리(프로젝트1)"]
		loc2_rep1_feature["feature(개발작업)"]
	    loc2_rep1_hotfix["hotfix(이슈수정)"]
	  end
  end
  
loc1 ~~~ ori
loc2 ~~~ ori
```
