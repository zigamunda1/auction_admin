const express = require('express');
const router = express.Router();

/**
 * 관리자 로그인 페이지
 */
router.get('/login', (req, res) => {
  res.render('login', { 
    title: '관리자 로그인',
    error: req.query.error 
  });
});

/**
 * 관리자 로그인 처리
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  // 간단한 관리자 인증 (실제 운영에서는 데이터베이스에서 확인)
  if (username === 'admin' && password === 'admin123') {
    req.session.admin = { username: 'admin' };
    res.redirect('/');
  } else {
    res.redirect('/auth/login?error=invalid_credentials');
  }
});

/**
 * 관리자 로그아웃
 */
router.get('/logout', (req, res) => {
  req.session.admin = null;
  res.redirect('/auth/login');
});

module.exports = router;
