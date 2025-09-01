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
 * 관리자 대시보드 메인 페이지
 */
router.get('/', adminAuth, async (req, res) => {
  try {
    // 통계 데이터 조회
    const userCount = await User.count();
    const productCount = await Good.count();
    const bidCount = await Auction.count();
    
    // 최근 등록된 사용자 (최근 5명)
    const recentUsers = await User.findAll({
      order: [['createdAt', 'DESC']],
      limit: 5,
      attributes: ['id', 'email', 'nick', 'createdAt']
    });
    
    // 최근 등록된 상품 (최근 5개)
    const recentProducts = await Good.findAll({
      order: [['createdAt', 'DESC']],
      limit: 5,
      include: [{
        model: User,
        as: 'Owner',
        attributes: ['nick']
      }],
      attributes: ['id', 'name', 'price', 'createdAt']
    });
    
    // 최근 입찰 (최근 5개)
    const recentBids = await Auction.findAll({
      order: [['createdAt', 'DESC']],
      limit: 5,
      include: [
        {
          model: User,
          as: 'User',
          attributes: ['nick']
        },
        {
          model: Good,
          as: 'Good',
          attributes: ['name']
        }
      ],
      attributes: ['id', 'bid', 'msg', 'createdAt']
    });
    
    res.render('dashboard', {
      title: '관리자 대시보드',
      stats: {
        userCount,
        productCount,
        bidCount
      },
      recentUsers,
      recentProducts,
      recentBids,
      admin: req.session.admin
    });
  } catch (error) {
    console.error('대시보드 데이터 조회 오류:', error);
    res.status(500).render('error', { 
      title: '오류',
      error: '데이터를 불러오는 중 오류가 발생했습니다.' 
    });
  }
});

module.exports = router;
