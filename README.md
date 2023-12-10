# cerebro project (internship) refactoring

## :blue_heart:About Project
- Developer: FE 김수정
- 2023.06-2023.08
  
이 프로젝트는 인턴으로 참여했던 프로젝트의 코드를 리팩토링하여 간단한 메모 기능과 태그 생성 기능을 포함하고 있습니다. (해당 기능들은 직접 개발한 부분들로 참여하였던 프로젝트의 CTO분으로부터 해당 기능들에 한해 포트폴리오의 사용을 허가 받았음을 알립니다.)

기존에 참여하였던 프로젝트는 인플루언서 데이터를 관리하고 클라이언트가 직접 접근해서 정보에 대한 열람과 인플루언서 분류 및 관련 정보를 기록할 수 있는 admin 시스템을 개발하는 것을 목표로 하였습니다. 현재 업로드된 프로젝트는 해당 프로젝트에서 맡았던 기능들을 분리하여 리팩토링한 프로젝트입니다.



## :blue_heart:Stacks
- TypeScript: 4.5.3
- Next.js:
- Tailwind CSS: 3.2.4
- Axios: 1.4.0
- @types/react: 18.0.22
- @types/react-dom: 18.0.7
- React-select: 5.7.3

## :blue_heart:Features

> #### 기능 1. 메모 기능 (기여도 100)
인플루언서 개인에 대해 사용자가 메모를 남기고 같은 팀원들끼리 공유할 수 있는 기능 개발.

<img width="1280" alt="스크린샷 2023-07-29 155153" src="https://github.com/reveur96/cerebro_project/assets/102032487/7f459221-0705-4db3-9c63-aa79ca3b95ac">
<img width="188" alt="스크린샷 2023-07-29 155219" src="https://github.com/reveur96/cerebro_project/assets/102032487/ea01306a-4863-4958-b458-b009cbd092cb">
<img width="188" alt="스크린샷 2023-07-29 165114" src="https://github.com/reveur96/cerebro_project/assets/102032487/fc0f7dc6-9a24-4121-9e35-8017d4d511b7">
  
  - 메모 CRUD 기능 구현
  - Tailwind에서 제공하는 style component를 변형하여 UI 통일성을 유지하며 프로덕트에 적용하여 화면 구현
  - 인증/ 인가 과정을 통한 CRUD 사용자 권한 제한
  - 메모 생성시 발생하는 문제를 해결하여 사용자 경험 향상을 위한 서비스 개선
 
<br>
<br> 

> #### 기능 2. 태그 기능 (기여도 90)
  사용자가 원하는 태그를 생성하여 인플루언서에게 부여하고 해당 태그들로 폴더를 생성하여 인플루언서 데이터 관리
  
  <img width="224" alt="스크린샷 2023-07-30 130451" src="https://github.com/reveur96/cerebro_project/assets/102032487/370e6f24-fd25-4b35-874e-7315af6d1adf">
<img width="180" alt="스크린샷 2023-07-30 130354" src="https://github.com/reveur96/cerebro_project/assets/102032487/958876cd-b4b9-44ae-9683-19b31b92e86a">
<img width="180" alt="스크린샷 2023-07-30 130407" src="https://github.com/reveur96/cerebro_project/assets/102032487/29004cde-c56e-41b0-8d82-9f9796a328b1">
<img width="180" alt="스크린샷 2023-07-30 130423" src="https://github.com/reveur96/cerebro_project/assets/102032487/caf19285-6dd0-4c0c-82e9-5b5e673758cd">
<img width="180" alt="스크린샷 2023-07-30 130521" src="https://github.com/reveur96/cerebro_project/assets/102032487/fe328924-f672-404d-a114-b0b5a90acbf3">
  
  - React Select 라이브러리를 사용하여 태그를 생성하는 select box 구현하여  검색과 추가 생성 과정을 간소화
  - 태그 및 태그 타입 수정 및 삭제 기능 구현
  - 태그 및 태그 타입 수정 및 삭제 시 태그 리스트 재호출에 대한 비동기 처리
  - 인증/ 인가를 통한 수정 및 삭제 권한 제한
 
 ## :blue_heart:Issue
 -  메모 작성 시 컨텐츠 높이에 따른 높이 자동 조절 오류  useRef로 해결 되지 않은 오류들을 onChange 이벤트 리스너와 scrollHeight를 이용해 해결하여 사용자 경험 향상<br>
[해결 과정 보러가기](https://reveur1996.tistory.com/106)

-  React Select library를 사용해 분리 되어있던 태그 선택과 태그 생성 기능 통합<br>
  [해결 과정 보러가기](https://reveur1996.tistory.com/108)
 



