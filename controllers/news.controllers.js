const axios = require('axios');
const users = require('./user.controllers').users;
const apiError = require('../utils/apiError');
const asyncHandler = require('../utils/asyncHandler');

let newsCache = {};

const getNews = asyncHandler(async (req, res) => {
     const user = users.find(u => u.email === req.user.email);
    if (!user) {
        throw new apiError(401, 'User not found');
    }
    const preferences = user.preferences.join(',');
    if(newsCache[preferences]){
        return res.status(200).json({ news: newsCache[preferences] });
    }


    try {
        const apiKey = process.env.NEWS_API_KEY;
    
        const url = `https://newsapi.org/v2/top-headlines?category=${encodeURIComponent(preferences)}&apiKey=${apiKey}`;
    
        const response = await axios.get(url);
    
        newsCache[preferences] = response.data.articles;
    
        res.status(200).json({ news: response.data.articles });

    } catch (error) {
        throw new apiError(500, 'Failed to fetch news');
    }
});

const read = asyncHandler(async (req, res) => {
    const user = users.find(u => u.email === req.user.email);
    if (!user) {
        throw new apiError(401, 'User not found');
    }
    user.read.push(req.params.id);
    return res.status(200).json({ message: 'News marked as read' });
});

const favorite = asyncHandler(async (req, res) => {
    const user = users.find(u => u.email === req.user.email);
    if (!user) {
        throw new apiError(401, 'User not found');
    }
    user.favorites.push(req.params.id);
    return res.status(200).json({ message: 'News added to favorites' });
})

const searchNews = asyncHandler(async (req, res) => {
    const keyword =  req.params.keyword;
    try {
        const resposne = await axios.get(`https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&apiKey=${process.env.NEWS_API_KEY}`);
        return res.status(200).json({ news: resposne.data.articles });
    } catch (error) {
        throw new apiError(500, 'Failed to search news');
    }
})

module.exports = {
    getNews,
    read,
    favorite,
    searchNews
};