module.exports = {
  siteUrl: 'https://www.civil-defense-ukraine.com',
  generateRobotsTxt: true,
  additionalPaths: async () => {
    const res = await fetch('https://cdu-backend-service-latest-am7e.onrender.com/api/public/news');
    const news = await res.json();
    const staticUrls = [
      { loc: 'https://www.civil-defense-ukraine.com/' },
      { loc: 'https://www.civil-defense-ukraine.com/about-us' },
      { loc: 'https://www.civil-defense-ukraine.com/donate' },
      { loc: 'https://www.civil-defense-ukraine.com/news' },
      { loc: 'https://www.civil-defense-ukraine.com/reports' },
    ];

    const newsUrls = news.map(newsItem => ({
      loc: `https://www.civil-defense-ukraine.com/news/${newsItem.link}`,
      lastmod: newsItem.lastUpdated,
    }));

    return [
      ...staticUrls,
      ...newsUrls,
    ];
  },
}