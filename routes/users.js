const express = require('express');
const router = express.Router();
const { User, Good, Auction } = require('../models');

/**
 * 관리자 인증 미들웨어
 */
const adminAuth = (req, res, next) => {
  if (req.session.admin) {
    return next();
  }
  res.redirect('/auth/login');
};

/**
 * 사용자 관리 페이지
 */
router.get('/', adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    
    const { count, rows: users } = await User.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'email', 'nick', 'money', 'createdAt']
    });
    
    const totalPages = Math.ceil(count / limit);
    
    res.render('users', {
      title: '사용자 관리',
      users,
      pagination: {
        currentPage: page,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
        nextPage: page + 1,
        prevPage: page - 1
      },
      admin: req.session.admin
    });
  } catch (error) {
    console.error('사용자 목록 조회 오류:', error);
    res.status(500).render('error', { 
      title: '오류',
      error: '사용자 목록을 불러오는 중 오류가 발생했습니다.' 
    });
  }
});

/**
 * 사용자 삭제
 */
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const userId = req.params.id;
    
    // 관련 입찰과 상품도 함께 삭제
    await Auction.destroy({ where: { UserId: userId } });
    await Good.destroy({ where: { OwnerId: userId } });
    await User.destroy({ where: { id: userId } });
    
    res.json({ success: true, message: '사용자가 삭제되었습니다.' });
  } catch (error) {
    console.error('사용자 삭제 오류:', error);
    res.status(500).json({ success: false, message: '사용자 삭제 중 오류가 발생했습니다.' });
  }
});

module.exports = router;
