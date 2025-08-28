# 🚀 DevFlow-AI

**AI-Powered Developer Assistant** - 개발자 생산성 향상을 위한 차세대 도구

## ✨ 주요 기능

### 🤖 AI 코드 리뷰어
- 자동 코드 품질 분석
- 버그 패턴 감지
- 성능 최적화 제안
- 보안 취약점 가사

### 📝 스마트 커밋 메시지 생성
- 변경사항 자동 분석
- 의미있는 커밋 메시지 AI 생성
- Conventional Commits 규칙 준수
- 다국어 지원 (한국어/영어)

### 📊 프로젝트 구조 분석기
- 코드베이스 자동�문서화
- 의존성 그래프 생성
- 복잡도 분석 리포트
- 리팩토링 권장사항

### ⚡ 개발 워크플로우 자동화
- 테스트/빌드/배포 자동화
- GitHub Actions 통합
- CI/CD 파이프라인 최적화
- 알림 및 리포팅

## 🛠 기술 스택

- **Frontend**: React 18 + TypeScript + Tailwind CSS + Vite
- **Backend**: Node.js + Express + TypeScript
- **AI**: 최신 AI 모델 API 통합
- **Database**: SQLite (로컬) / PostgreSQL (프로덕션)
- **APIs**: GitHub API, Git 분석
- **Deployment**: Docker + Vercel/Railway

## 🚀 빠른 시작

### 필수 요구사항
- Node.js 18+
- Git
- AI API Key
- GitHub Personal Access Token

### 설치 및 실행

```bash
# 레포지토리 클론
git clone https://github.com/junetapa-juncheol/DevFlow-AI.git
cd DevFlow-AI

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일에 API 키들 입력

# 개발 서버 시작
npm run dev
```

## 📁 프로젝트 구조

```
DevFlow-AI/
├── client/                 # React 프론트엔드
│   ├── src/
│   │   ├── components/    # UI 컴포넌트
│   │   ├── pages/        # 페이지 컴포넌트
│   │   ├── hooks/        # Custom Hooks
│   │   ├── utils/        # 유틸리티
│   │   └── types/        # TypeScript 타입
│   ├── public/
│   └── package.json
├── server/                # Node.js 백엔드
│   ├── src/
│   │   ├── routes/       # API 라우트
│   │   ├── services/     # 비즈니스 로직
│   │   ├── utils/        # 유틸리티
│   │   └── types/        # TypeScript 타입
│   └── package.json
├── shared/                # 공유 타입/유틸리티
├── docs/                 # 문서
├── docker-compose.yml    # Docker 설정
└── README.md
```

## 🔧 주요 API 엔듬포인트

### 코드 분석
- `POST /api/analyze/code` - 코드 품질 분석
- `POST /api/analyze/commit` - 커밋 메시지 생성
- `GET /api/analyze/project/:repo` - 프로젝트 구조 분석

### GitHub 퓵합
- `GET /api/github/repos` - 사용자 레포지토리 목록
- `POST /api/github/webhook` - GitHub 웹훅 처리
- `GET /api/github/commits/:repo` - 커밋 히스토리

### AI 서비스
- `POST /api/ai/review` - AI 코드 리뷰
- `POST /api/ai/suggest` - 개선 제안
- `POST /api/ai/document` - 자동 문서 생성

## 🎯 사용 예시

### 1. 코드 리뷰 자동화
```javascript
// Git hook에서 자동 실행
const review = await devflowAI.reviewCode({
  files: changedFiles,
  context: 'pre-commit'
});
```

### 2. 커밋 메시지 생성
```javascript
// 변경사항 기반 자동 생성
const commitMsg = await devflowAI.generateCommitMessage({
  diff: gitDiff,
  language: 'ko'
});
```

### 3. 프로젝트 문서화
```javascript
// 프로젝트 전체 자동 문서화
const docs = await devflowAI.generateDocs({
  repo: 'user/project',
  includeAPI: true,
  format: 'markdown'
});
```

## 🌟 특징

- ⚡ **빠른 분석**: 대용량 코드베이스도 몇 초만에 분석
- 🎯 **정확한 AI**: 최신 AI 모델 기반 고품질 분석
- 🔒 **보안 우선**: 로컬 처리 + 암호화된 API 통신
- 🌐 **다국어**: 한국어/영어 완벽 지원
- 📱 **반응형**: 모바일부터 데스크톱까지

## 🤝 기여하기

1. Fork 프로젝트
2. Feature 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'feat: Add amazing feature'`)
4. 브랜치 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 생성

## 📄 라이센스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일 참조

## 👨‍💻 제작자

**박준철** - [junetapa-juncheol](https://github.com/junetapa-juncheol)

- 🌐 웹사이트: [junetapa.com](https://junetapa.com)
- 📧 이메일: jun22sky@nate.com

## 🙏 감사의 말

개발 과정에서 도움을 받은 오픈소스 프로젝트들과 커뮤니티에 감사드립니다.

- [GitHub](https://github.com) - 코드 호스팅 및 API
- [React](https://reactjs.org) - 프론트엔드 프레임워크
- [Node.js](https://nodejs.org) - 백엔드 런타임
- [TypeScript](https://typescriptlang.org) - 타입 안전성

---

⭐ **이 프로젝트가 유용하다면 스타를 눌러주세요!**

🚀 **개발자를 위한 차세대 AI 도구를 경험해보세요!**
