/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://www.ecobridgers.site',
    generateRobotsTxt: true,
    changefreq: 'monthly',
    priority: 0.7,
    sitemapSize: 7000,
    additionalPaths: async (config) => [
        await config.transform(config, '/'),
        await config.transform(config, '/services'),
        await config.transform(config, '/about'),
        await config.transform(config, '/work'),
        await config.transform(config, '/contact'),
    ],
}