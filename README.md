# 🔑 NEXTVIBE Frontend

<img alt="0" src="https://github.com/user-attachments/assets/1de04707-aaef-4cd1-9e8b-eabae55b93a1" />

### 초등학생을 위한 미래형 완전체 컴퓨팅 사고력 학습 플랫폼, NEXTVIBE

순차, 조건, 반복 등의 컴퓨팅 사고 핵심 개념을 개념 학습, 개념 검토, 개념 확장의 3단계로 구성하여 표준화된 학습 흐름을 제공한다. 이때 게임형 시나리오와 자연어 프롬프트 기반의 바이브코딩을 통해 흥미와 접근성을 높이고, 생성형 AI가 전반적인 학습 과정을 안내하여 자율성과 개인화를 보장하되 학습 방향은 교육 목표에 부합하도록 유지하였다. 즉, 생성형 AI가 제공하는 안전한 상호작용 속에서 스스로 개념을 익히고, 오류를 진단 및 수정한 뒤, 규칙의 확장 및 설계까지 경험하게 함으로써 개념의 피상적 이해를 넘어 코딩적 사고 구조를 마련할 수 있도록 하였다.

🔨 기획·디자인·개발 기간 2025.09.04.-2025.11.28.

🔗 [NEXTVIBE 바로가기](https://nextv1be.netlify.app)

🎨 [기획·디자인 보러가기](https://github.com/VibeNext#-plan--design)

## 👾 Member

블라인드

## 👾 Tech Stack

<table>
  <tbody>
    <tr><td>Language</td><td><img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" /></td></tr>
    <tr><td>Framework</td><td><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black" /> <img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" /></td></tr>
    <tr><td>Style</td><td><img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" /></td></tr>
    <tr><td>State Management</td><td><img src="https://img.shields.io/badge/Zustand-423E39?style=for-the-badge&logo=Zustand&logoColor=white"></td></tr>
    <tr><td>Data Fetch</td><td><img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"></td></tr>
    <tr><td>Cloud Infrastructure</td><td><img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" /></td></tr>
  </tbody>
</table>

## 👾 Directory

```
frontend/
│
├── .github/                           # GitHub 파일
│   ├── ISSUE_TEMPLATE/                # 이슈 템플릿
│   └── PULL_REQUEST_TEMPLATE.md       # PR 템플릿
│
├── .vscode/                           # Visual Studio Code 설정
│
├── src/                               # 소스 코드
│   ├── apis/                          # API 호출 관련 코드
│   │   ├── instance.js                # axios 인스턴스
│   │   ├── interceptor.js             # axios 인터셉터
│   │   └── ...                        # API 호출 함수 (도메인별 파일 분리)
│   │
│   ├── assets/                        # 이미지 및 기타 리소스
│   │   ├── fonts/                     # 폰트
│   │   ├── icons/                     # 아이콘 이미지
│   │   └── ...                        # 그외
│   │
│   ├── components/                    # UI 컴포넌트
│   │   ├── common/                    # 공통 컴포넌트
│   │   └── 도메인명/                   # 도메인별 컴포넌트
│   │
│   ├── pages/                         # 페이지 컴포넌트
│   │
│   ├── stores/                        # 전역 상태
│   │   └── ...                        # 전역 상태 Hook
│   │
│   ├── styles/                        # 스타일
│   │   ├── global.js                  # 전역 스타일 설정
│   │   └── theme.js                   # 디자인 토큰 정의
│   │
│   ├── index.jsx                      # 전역 설정
│   └── Router.jsx                     # 라우팅
│
├── .gitignore                         # Git 제외 설정
├── .prettierrc.json                   # Prettier 설정
├── README.md                          # 레포지토리 리드미
├── eslint.config.js                   # ESLint 설정
├── index.html                         # 진입점
├── netlify.toml                       # Netlify 설정
├── nextvibe_logo.png                  # 파비콘
├── package-lock.json                  # 상세한 의존성 정보
├── package.json                       # 프로젝트 기본 정보 및 간략한 의존성 정보
└── vite.config.js                     # Vite 설정
```
