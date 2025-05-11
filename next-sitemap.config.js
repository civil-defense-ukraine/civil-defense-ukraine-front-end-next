module.exports = {
  siteUrl: 'https://www.civil-defense-ukraine.com',
  generateRobotsTxt: true,
  additionalPaths: async () => {
    const res = await fetch('https://cdu-backend-service-latest-am7e.onrender.com/api/public/news');
    const news = await res.json();

    return news.map(newsItem => ({
      loc: `https://www.civil-defense-ukraine.com/news/${newsItem.id}`,
      lastmod: newsItem.lastUpdated,
    }));
  },
}
