const axios = require('axios');

exports.getAllNews = async (req, res, next) => {
    try {
        var url = 'http://newsapi.org/v2/top-headlines?' +
            'country=in&' +
            'apiKey=16aa27012eb6426fb2c2b7a0a125a4d3';
        const news_get = await axios.get(url)
        var news = new Array();
        const articles = news_get.data.articles
        articles.forEach(function (article, index) {
            if ((typeof article.url == 'object') || (typeof article.title == 'object') || (typeof article.urlToImage == 'object') || (typeof article.content == 'object') || (typeof article.description == 'object')) {
            } else {
                var data = {
                    link: article.url,
                    title: article.title,
                    description: article.description,
                    pubDate: article.publishedAt,
                    contentEncoded: article.content
                };
                news.push(data)
            }
        })
        var rec = ({
            success: true,
            news: news
        });
        return res.send(rec)
    } catch (e) {
        console.log(e);
        return res.send({ success: false, message: e.message })
    }
}
exports.searchNews = async (req, res, next) => {
    try {
        const { search } = req.body;
        var url = `http://newsapi.org/v2/everything?q=${search}&apiKey=16aa27012eb6426fb2c2b7a0a125a4d3`
        const news_get = await axios.get(url)
        var news = new Array();
        const articles = news_get.data.articles
        articles.forEach(function (article, index) {
            if ((typeof article.url == 'object') || (typeof article.title == 'object') || (typeof article.urlToImage == 'object') || (typeof article.content == 'object') || (typeof article.description == 'object')) {
            } else {
                var data = {
                    link: article.url,
                    title: article.title,
                    description: article.description,
                    pubDate: article.publishedAt,
                    contentEncoded: article.content
                };
                news.push(data)
            }
        })
        var rec = ({
            success: true,
            news: news
        });
        return res.send(rec)
    } catch (e) {
        console.log(e);
        return res.send({ success: false, message: e.message })
    }
}

exports.categoryNews = async (req, res, next) => {
    try {
        const { category } = req.params;
        var url = 'http://newsapi.org/v2/top-headlines?country=in&category=' + category + '&apiKey=16aa27012eb6426fb2c2b7a0a125a4d3';
        const news_get = await axios.get(url)
        var news = new Array();
        const articles = news_get.data.articles
        articles.forEach(function (article, index) {
            if ((typeof article.url == 'object') || (typeof article.title == 'object') || (typeof article.urlToImage == 'object') || (typeof article.content == 'object')) {
            } else {
                var data = {
                    link: article.url,
                    title: article.title,
                    description: article.description,
                    pubDate: article.publishedAt,
                    contentEncoded: article.content
                };
                news.push(data)
            }
        })
        var rec = ({
            success: true,
            news: news
        });
        return res.send(rec)
    } catch (e) {
        console.log(e);
        return res.send({ success: false, message: e.message })
    }
}