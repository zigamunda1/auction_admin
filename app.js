const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const nunjucks = require('nunjucks');

// 환경변수 설정
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8020;

// 뷰 엔진 설정 (Nunjucks)
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true
});

// 미들웨어 설정
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET || 'admin_secret_key'));

// 세션 설정
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET || 'admin_secret_key',
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

// 라우터 설정
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/products', require('./routes/products'));
app.use('/bids', require('./routes/bids'));

// 404 에러 처리
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} router not found`);
  error.status = 404;
  next(error);
});

// 전역 에러 처리
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// 서버 시작
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎯 Auction Admin Server is running on port ${PORT}`);
  console.log(`📊 Admin Dashboard: http://54.180.29.240:${PORT}`);
  console.log(`🔗 Public Access: http://54.180.29.240:${PORT}`);
});

module.exports = app;
