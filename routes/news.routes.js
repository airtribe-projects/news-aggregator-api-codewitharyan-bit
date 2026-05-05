const newsController = require('../controllers/news.controllers');
const authMiddleware = require('../middlewares/authMiddleware');
const express = require('express');
const router = express.Router();


router.get('/news', authMiddleware, newsController.getNews);
router.post('/news/:id/read', authMiddleware, newsController.read);
router.post('/news/:id/favorite', authMiddleware, newsController.favorite);
router.get('/news/search/:keyword', authMiddleware, newsController.searchNews);

module.exports = router;