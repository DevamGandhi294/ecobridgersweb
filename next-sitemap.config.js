/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ecobridgers.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' }
    ],
  },
  changefreq: 'weekly',
  priority: 0.7,
}