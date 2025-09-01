# 🎯 Auction Admin - 경매 관리자 시스템

경매 사이트를 위한 관리자 대시보드 시스템입니다.

## ✨ 기능

- **📊 대시보드**: 전체 통계 및 최근 활동 현황
- **👥 사용자 관리**: 등록된 사용자 목록 및 관리
- **📦 상품 관리**: 경매 상품 등록, 수정, 삭제
- **💰 입찰 관리**: 입찰 내역 및 낙찰 관리
- **🔐 관리자 인증**: 세션 기반 관리자 로그인

## 🛠️ 기술 스택

- **Backend**: Node.js, Express.js
- **Database**: MySQL (Sequelize ORM)
- **Template Engine**: Nunjucks
- **Styling**: Tailwind CSS
- **Process Manager**: PM2 (배포용)

## 🚀 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경변수 설정
`.env` 파일을 생성하고 다음 내용을 추가하세요:
```env
COOKIE_SECRET=your_secret_key
NODE_ENV=development
PORT=8020

# MySQL Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=auction
```

### 3. 데이터베이스 설정
`config/config.json` 파일에서 MySQL 연결 정보를 확인하세요.

### 4. 애플리케이션 실행
```bash
# 개발 모드
npm run dev

# 프로덕션 모드
npm start
```

## 🌐 접속 정보

### 로컬 개발
- **URL**: http://localhost:8020

### 프로덕션 (EC2)
- **URL**: http://54.180.29.240:8020

### 관리자 계정
- **사용자명**: `admin`
- **비밀번호**: `admin123`

## 📁 프로젝트 구조

```
auction_admin/
├── app.js                 # 메인 애플리케이션 파일
├── package.json           # 프로젝트 의존성
├── config/
│   └── config.json        # 데이터베이스 설정
├── controllers/           # 컨트롤러 (미사용)
├── models/                # Sequelize 모델
│   ├── index.js
│   ├── user.js
│   ├── good.js
│   └── auction.js
├── routes/                # 라우터
│   ├── index.js           # 대시보드
│   ├── auth.js            # 인증
│   ├── users.js           # 사용자 관리
│   ├── products.js        # 상품 관리
│   └── bids.js            # 입찰 관리
├── views/                 # 뷰 템플릿
│   ├── layout.html        # 기본 레이아웃
│   ├── login.html         # 로그인 페이지
│   ├── dashboard.html     # 대시보드
│   └── error.html         # 에러 페이지
└── public/                # 정적 파일
    └── admin.css          # 관리자 스타일
```

## 🔧 배포

### PM2를 사용한 배포
```bash
# PM2로 앱 시작
pm2 start app.js --name "auction-admin"

# PM2 상태 확인
pm2 status

# PM2 로그 확인
pm2 logs auction-admin
```

## 📋 주요 API 엔드포인트

- `GET /` - 관리자 대시보드
- `GET /auth/login` - 로그인 페이지
- `POST /auth/login` - 로그인 처리
- `GET /auth/logout` - 로그아웃
- `GET /users` - 사용자 관리
- `GET /products` - 상품 관리
- `GET /bids` - 입찰 관리
- `DELETE /users/:id` - 사용자 삭제
- `DELETE /products/:id` - 상품 삭제

## 🔒 보안

- 세션 기반 인증
- 쿠키 보안 설정
- 환경변수를 통한 비밀키 관리

## 📝 라이선스

MIT License

## 🤝 기여

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Auction Admin** - 경매 시스템 관리의 새로운 경험! 🚀
