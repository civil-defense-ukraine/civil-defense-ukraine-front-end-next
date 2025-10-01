/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.civil-defense-ukraine.com',
  generateRobotsTxt: true,

  additionalPaths: async () => {
    const staticUrls = [
      { loc: 'https://www.civil-defense-ukraine.com/' },
      { loc: 'https://www.civil-defense-ukraine.com/about-us' },
      { loc: 'https://www.civil-defense-ukraine.com/donate' },
      { loc: 'https://www.civil-defense-ukraine.com/news' },
      { loc: 'https://www.civil-defense-ukraine.com/reports' },
    ];

    try {
      const res = await fetch(
        'https://cdu-backend-service-latest-am7e.onrender.com/api/public/news',
        { timeout: 10000 } // prevent infinite hang
      );

      if (!res.ok) {
        console.error("❌ Failed to fetch news for sitemap:", res.status, res.statusText);
        return staticUrls; // return only static URLs
      }

      let news;
      try {
        news = await res.json();
      } catch (jsonErr) {
        console.error("❌ Invalid JSON returned from backend:", jsonErr);
        return staticUrls; // fallback if HTML or broken JSON
      }

      if (!Array.isArray(news)) {
        console.error("❌ News response is not an array:", news);
        return staticUrls;
      }

      const newsUrls = news.map(newsItem => ({
        loc: `https://www.civil-defense-ukraine.com/news/${newsItem.link}`,
        lastmod: newsItem.lastUpdated,
      }));

      return [...staticUrls, ...newsUrls];
    } catch (err) {
      console.error("❌ Error fetching news for sitemap:", err);
      return staticUrls; 
    }
  },
};
 