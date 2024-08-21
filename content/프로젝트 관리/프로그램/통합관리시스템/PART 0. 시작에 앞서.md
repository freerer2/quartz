---
date: 2024-08-19
updated: 2024-08-19
order: 0
---
## 개요
[[프로젝트 관리/프로그램/index|프로그램]]에 구현이 완료 되었거나 구상중인 프로그램을 통합적으로 관리하기 위한 통합관리시스템 구축 프로젝트. 가칭 LMS(Lee Management System)

주로 사용하는 환경인 Spring, Java, Jsp를 사용하지 않는 것을 목표로 하며, 한번도 사용해보지 않은 완전히 새로운 환경인 Next.js, React, Typescript를 사용한다.

## 선행학습
Next.js : Next.js 배우기 파트 1~12강
React : Udemy React 강좌 1/5 분량

## 개발환경 구축
```sh
#pnpm 설치
npm i -g pnpm

#nextjs 프로젝트 세팅(pnpm 사용)
npx create-next-app@latest lms --use-pnpm
```

이후 tailwind를 사용하고 디렉토리 구조는 src를 사용하지 않는 구조로 세팅한다.
src폴더를 사용하면 app관련 소스를 한데 모을 수 있으나 불필요한 depth가 생기기에 사용하지 않기로 하였다.

pnpm은 nextjs에서 권장하는 패키지 관리자라고 하는데 일단 써보기로 한다.