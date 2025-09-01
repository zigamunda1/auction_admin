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
 * 입찰 관리 페이지
 */
router.get('/', adminAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    
    const { count, rows: bids } = await Auction.findAndCountAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          as: 'User',
          attributes: ['nick', 'email']
        },
        {
          model: Good,
          as: 'Good',
          attributes: ['name', 'price']
        }
      ],
      attributes: ['id', 'bid', 'msg', 'createdAt']
    });
    
    const totalPages = Math.ceil(count / limit);
    
    res.render('bids', {
      title: '입찰 관리',
      bids,
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
    console.error('입찰 목록 조회 오류:', error);
    res.status(500).render('error', { 
      title: '오류',
      error: '입찰 목록을 불러오는 중 오류가 발생했습니다.' 
    });
  }
});

module.exports = router;
